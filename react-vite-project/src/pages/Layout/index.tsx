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
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { clearUserInfo, fetchUserInfo } from "@/store/modules/user";
import { useUserDispatch, useUserSelector } from "@/hooks";

const { Header, Sider } = Layout;

const items = [
  {
    label: "Home",
    key: "/",
    icon: <HomeOutlined />,
  },
  {
    label: "article",
    key: "/article",
    icon: <DiffOutlined />,
  },
  {
    label: "publish",
    key: "/publish",
    icon: <EditOutlined />,
  },
];

const Main = () => {
  const navigate = useNavigate();
  const onMenuClick = ({ key }: { key: string }) => {
    const path = key;
    navigate(path);
  };

  const location = useLocation();
  const selectedKey = location.pathname;

  const dispatch = useUserDispatch();
  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);

  const user = useUserSelector();

  const onConfirm = () => {
    dispatch(clearUserInfo());
    navigate("/login");
  };

  return (
    <Layout>
      <Header className="header">
        <Avatar className="avatar" />
        <div className="user-info">
          <span className="user-name">{user.userInfo.name}</span>
          <span className="user-logout">
            <Popconfirm
              title="是否确认退出？"
              okText="退出"
              cancelText="取消"
              onConfirm={onConfirm}
            >
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
            defaultSelectedKeys={[selectedKey]}
            onClick={onMenuClick}
            items={items}
            style={{ height: "100%", borderRight: 0 }}
          ></Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Main;
