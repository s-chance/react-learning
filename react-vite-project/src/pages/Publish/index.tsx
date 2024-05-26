import { Breadcrumb, Button, Card, Form, Input, Select, Space } from "antd";
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
import { getChannelApi } from "@/apis/article";
import EditorOnChangePlugin from "./plugins/EditorOnChangePlugin";

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

  type FormType = {
    title: string;
    channel_id: string;
    content: string;
  };

  const onFinish = (formValue: FormType) => {
    console.log(formValue);
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
          initialValues={{ type: 1 }}
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
