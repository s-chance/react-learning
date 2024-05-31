import {
  Breadcrumb,
  Button,
  Card,
  Form,
  Input,
  Radio,
  RadioChangeEvent,
  Select,
  Space,
  Upload,
  message,
} from "antd";
import { Link, useSearchParams } from "react-router-dom";
import "./index.scss";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { HeadingNode } from "@lexical/rich-text";

import Theme from "./Theme";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import { useEffect, useState } from "react";
import {
  createArticleApi,
  getArtcicleByIdApi,
  updateArticleApi,
} from "@/apis/article";
import EditorOnChangePlugin from "./plugins/EditorOnChangePlugin";
import { FormType } from "./types";
import { PlusOutlined } from "@ant-design/icons";
import { UploadChangeParam, UploadFile } from "antd/es/upload";
import { useChannel } from "@/hooks";
import dayjs from "dayjs";
import { EditorState, ParagraphNode, TextNode } from "lexical";

const Placeholder = () => {
  return <div className="editor-placeholder">Enter some rich text...</div>;
};

const onError = (error: Error) => {
  console.error(error);
};

const initialConfig = {
  namespace: "default",
  nodes: [HeadingNode, ParagraphNode, TextNode],
  onError,
  theme: Theme,
};

const EditorComponent = ({ initialContent }: { initialContent: string }) => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (initialContent !== "") {
      editor.update(() => {
        const editorState = editor.parseEditorState(initialContent);
        editor.setEditorState(editorState);
      });
    }
  }, [editor, initialContent]);

  return null;
};

const Publish = () => {
  const { channelList } = useChannel();

  const [form] = Form.useForm();
  const [initialContent, setInitialContent] = useState<string>("");

  const onChange = (editorState: EditorState) => {
    const editorStateJSON = editorState.toJSON();
    form.setFieldsValue({ content: JSON.stringify(editorStateJSON) });
  };

  const onFinish = (formValue: FormType) => {
    const maxCount = imageType === 1 ? 1 : 3;
    if (imageList.length > maxCount) return message.warning("图片数量过多");
    const data = {
      ...formValue,
      cover: {
        type: imageType || 0,
        images: imageList.map((item) => {
          if (item.response?.data) {
            return item.response.data.url;
          } else {
            return item.url;
          }
        }),
      },
    };
    if (articleId) {
      updateArticleApi({
        ...data,
        id: articleId,
        pubdate: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      });
    } else {
      createArticleApi(data);
    }
  };

  const [imageList, setImageList] = useState<UploadFile[]>([]);

  const handleUploadChange = (file: UploadChangeParam) => {
    setImageList(file.fileList);
  };

  const [imageType, setImageType] = useState<number>();
  const onTypeChange = ({ target }: RadioChangeEvent) => {
    setImageType(target.value);
  };

  const [searchParams] = useSearchParams();
  const articleId = searchParams.get("id");
  useEffect(() => {
    const getArticle = async () => {
      if (articleId !== null) {
        const res = await getArtcicleByIdApi(articleId);
        const { cover, content } = res.data;
        form.setFieldsValue({
          ...res.data,
          type: cover.type,
        });
        setImageType(cover.type);
        setImageList(
          cover.images.map((url: string) => {
            return { url };
          })
        );
        setInitialContent(content);
      }
    };
    getArticle();
  }, [articleId, form]);

  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb
            items={[
              { title: <Link to="/">首页</Link> },
              { title: `${articleId ? "编辑" : "发布"}文章` },
            ]}
          />
        }
      >
        <Form
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 0 }}
          validateTrigger="onBlur"
          onFinish={onFinish}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: "请输入标题" }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: "请选择频道" }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {channelList.map((item) => (
                // 若后端定义channel_id为number类型，则此处使用Number转换
                // 若后端定义channel_id为string类型，则此处不需要转换
                <Select.Option key={item.id} value={Number(item.id)}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={onTypeChange}>
                <Radio value={1}>单个</Radio>
                <Radio value={2}>多个</Radio>
                <Radio value={3}>无</Radio>
              </Radio.Group>
            </Form.Item>
            {(imageType === 1 || imageType === 2) && (
              <Upload
                listType="picture-card"
                showUploadList
                action={"http://127.0.0.1:4523/m1/4549877-0-default/upload"}
                name="image"
                onChange={handleUploadChange}
                maxCount={imageType === 1 ? 1 : 3}
                fileList={imageList}
              >
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                </div>
              </Upload>
            )}
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: "请输入内容" }]}
          >
            <LexicalComposer initialConfig={initialConfig}>
              <div className="editor-container">
                <div className="editor-toolbar">
                  <ToolbarPlugin />
                </div>

                <div className="editor-inner">
                  <RichTextPlugin
                    contentEditable={
                      <ContentEditable className="editor-input" />
                    }
                    placeholder={<Placeholder />}
                    ErrorBoundary={LexicalErrorBoundary}
                  />
                  <HistoryPlugin />
                  <AutoFocusPlugin />
                  <EditorOnChangePlugin onChange={onChange} />
                  <EditorComponent initialContent={initialContent} />
                </div>
              </div>
            </LexicalComposer>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                发布
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Publish;
