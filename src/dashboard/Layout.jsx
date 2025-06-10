import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { Button, Dropdown, Layout, Menu, theme, Space, Avatar } from "antd";
import { Outlet } from "react-router-dom";
const { Header, Sider } = Layout;
const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const menuItems = [
    {
      key: "1",
      icon: <UserOutlined />,
      label: "Profile",
    },
    {
      key: "2",
      icon: <LogoutOutlined />,
      label: "Logout",
    },
  ];
  return (
    <Layout style={{ height: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <img
          src="https://www.rightupnextinnovations.com/_next/static/media/logo.19116a02.png"
          alt="logo"
          className="bg-white  mx-[10px] w-[180px] my-[10px]"
        />
        <Menu
          theme="dark"
          mode="inline"
          className="custom-sidebar-menu"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <MdOutlineDashboardCustomize />,
              label: "Home",
            },
            {
              key: "2",
              icon: <VideoCameraOutlined />,
              label: "New Orders",
            },
            {
              key: "3",
              icon: <UploadOutlined />,
              label: "nav 3",
            },
          ]}
        />
      </Sider>
      <Layout style={{ overflowY: "scroll" }}>
        <Header
          style={{
            padding: "0 16px",
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <Space>
            <Dropdown
              menu={{ items: menuItems }}
              placement="bottomRight"
              trigger={["click"]}
            >
              <Avatar
                style={{ backgroundColor: "#000000", cursor: "pointer" }}
                icon={<UserOutlined />}
              />
            </Dropdown>
          </Space>
        </Header>

        <Outlet />
      </Layout>
    </Layout>
  );
};
export default DashboardLayout;
