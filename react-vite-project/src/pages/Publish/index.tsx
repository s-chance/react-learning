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
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 1 }}
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
              <Select.Option value={1}>前端</Select.Option>
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
