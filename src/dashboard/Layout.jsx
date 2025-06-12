import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { BiSolidStore } from "react-icons/bi";
import { Button, Dropdown, Layout, Menu, theme, Space, Avatar } from "antd";
import { Link, Outlet } from "react-router-dom";
import { TbCategory } from "react-icons/tb";
import { SlHome } from "react-icons/sl";
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
              icon: <SlHome />,
              label: <Link to="/admin">Home</Link>,
            },
            {
              key: "2",
              icon: <SlHome />,
              label: <Link to="hero">Hero</Link>,
            },
            {
              key: "3",
              icon: <TbCategory />,
              label: <Link to="category">Category</Link>,
            },
            {
              key: "4",
              icon: <BiSolidStore />,
              label: <Link to="inventory">Inventory"</Link>,
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
