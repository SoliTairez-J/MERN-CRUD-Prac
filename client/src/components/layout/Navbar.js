import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Menu } from "antd";
import {
  AppstoreOutlined,
  UserAddOutlined,
  HomeOutlined,
  LoginOutlined,
  DownOutlined,
} from "@ant-design/icons";

// Redux
import { useDispatch, useSelector } from "react-redux";

const { SubMenu } = Menu;

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));
  const history = useNavigate();

  const [current, setCurrent] = useState("mail");

  const handleClick = (e) => {
    // console.log("click ", e);
    setCurrent({ current: e.key });
  };

  const logout = () => {
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    history("/");
  };

  return (
    <Menu
      onClick={handleClick}
      selectedKeys={[current]}
      mode="horizontal"
      theme="dark"
    >
      <Menu.Item key="mail" icon={<HomeOutlined />}>
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="app" icon={<AppstoreOutlined />}>
        Person
      </Menu.Item>
      {!user && (
        <Menu.Item
          className="flex-end"
          key="register"
          icon={<UserAddOutlined />}
        >
          <Link to="/register">Register</Link>
        </Menu.Item>
      )}
      {!user && (
        <Menu.Item className="float-right" key="login" icon={<LoginOutlined />}>
          <Link to="/login">Login</Link>
        </Menu.Item>
      )}
      {user && (
        <SubMenu
          className="float-right"
          key="SubMenu"
          icon={<DownOutlined />}
          title={user.name}
        >
          <Menu.Item key="logout" icon={<LoginOutlined />} onClick={logout}>
            Logout
          </Menu.Item>
        </SubMenu>
      )}
    </Menu>
  );
};

export default Navbar;
