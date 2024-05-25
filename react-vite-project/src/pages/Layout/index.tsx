import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { request } from "@/utils";
import { Avatar, Layout, Menu, Popconfirm } from "antd";
import { useEffect } from "react";
import "./index.scss";

const { Header, Sider } = Layout;

const items = [
  {
    label: "Home",
    key: "1",
    icon: <HomeOutlined />,
  },
  {
    label: "article",
    key: "2",
    icon: <DiffOutlined />,
  },
  {
    label: "new",
    key: "3",
    icon: <EditOutlined />,
  },
];

const Main = () => {
  useEffect(() => {
    request.get("/test");
  }, []);
  return (
    <Layout>
      <Header className="header">
        <Avatar className="avatar" />
        <div className="user-info">
          <span className="user-name">user</span>
          <span className="user-logout">
            <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消">
              <LogoutOutlined />
              退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-backgroun">
          <Menu
            mode="inline"
            theme="dark"
            defaultSelectedKeys={["1"]}
            items={items}
            style={{ height: "100%", borderRight: 0 }}
          ></Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          内容
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Main;
