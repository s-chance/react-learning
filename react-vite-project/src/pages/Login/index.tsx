import { Avatar, Button, Card, Form, FormProps, Input, message } from "antd";
import "./index.scss";
import avatar from "@/assets/avatar.avif";
import { useUserDispatch } from "@/hooks";
import { fetchLogin } from "@/store/modules/user";
import { LoginForm as FieldType } from "@/pages/Login/types";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useUserDispatch();
  const navigate = useNavigate();
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    // console.log(values);
    await dispatch(fetchLogin(values));
    navigate("/");
    message.success("登录成功");
  };

  return (
    <div className="login">
      <Card className="login-container">
        <Avatar size={64} src={avatar} className="login-avatar" />
        <Form validateTrigger="onBlur" onFinish={onFinish}>
          <Form.Item
            hasFeedback
            name="phone"
            rules={[
              { required: true, message: "请输入手机号" },
              { pattern: /^1[3-9]\d{9}$/, message: "手机号格式不正确" },
            ]}
          >
            <Input size="large" placeholder="请输入手机号" />
          </Form.Item>
          <Form.Item
            hasFeedback
            name="code"
            rules={[{ required: true, message: "请输入验证码" }]}
          >
            <Input size="large" placeholder="请输入验证码" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large">
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
