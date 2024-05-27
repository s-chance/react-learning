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
} from "antd";
import { Link } from "react-router-dom";
import "./index.scss";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";

import Theme from "./Theme";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import { useEffect, useState } from "react";
import { createArticleApi, getChannelApi } from "@/apis/article";
import EditorOnChangePlugin from "./plugins/EditorOnChangePlugin";
import { FormType } from "./types";
import { PlusOutlined } from "@ant-design/icons";
import { UploadChangeParam, UploadFile } from "antd/es/upload";

const Placeholder = () => {
  return <div className="editor-placeholder">Enter some rich text...</div>;
};

const onError = (error: Error) => {
  console.error(error);
};

const initialConfig = {
  namespace: "default",
  nodes: [],
  onError,
  theme: Theme,
};

const Publish = () => {
  type ChannelsType = [
    {
      id: string;
      name: string;
    }
  ];
  const [channelList, setChannelList] = useState<ChannelsType>([
    { id: "", name: "" },
  ]);

  useEffect(() => {
    const getChannelList = async () => {
      const res = await getChannelApi();
      setChannelList(res.data.channels);
    };
    getChannelList();
  }, []);

  const [form] = Form.useForm();

  const onChange = (content: string) => {
    if (content !== "") {
      form.setFieldsValue({ content: content });
    }
  };

  const onFinish = (formValue: FormType) => {
    createArticleApi(formValue);
  };

  const [imageList, setImageList] = useState<UploadFile[]>([]);

  const handleUploadChange = (file: UploadChangeParam) => {
    setImageList(file.fileList);
  };

  const [imageType, setImageType] = useState<number>();
  const onTypeChange = ({ target }: RadioChangeEvent) => {
    setImageType(target.value);
  };

  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb
            items={[{ title: <Link to="/">首页</Link> }, { title: "发布文章" }]}
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
                <Select.Option key={item.id} value={item.id}>
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
