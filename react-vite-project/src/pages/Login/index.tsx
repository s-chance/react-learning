import { Avatar, Button, Card, Form, Input } from "antd";
import "./index.scss";
import avatar from "@/assets/avatar.avif";

const Login = () => {
  return (
    <div className="login">
      <Card className="login-container">
        <Avatar size={64} src={avatar} className="login-avatar" />
        <Form>
          <Form.Item>
            <Input size="large" placeholder="请输入手机号" />
          </Form.Item>
          <Form.Item>
            <Input size="large" placeholder="请输入验证码" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" size="large">
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
