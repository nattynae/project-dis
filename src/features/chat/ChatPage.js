import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { searchType, searchReq } from "./reducer";
import { Layout, Menu, Icon, Button } from "antd";
import EachChat from "./EachChat";
import "./ChatPage.css";
import GroupMember from "./GroupMember";
const { Header, Sider } = Layout;

const enhance = connect(
  state => ({
    text: state.text,
    result: state.result
  }),
  { searchType, searchReq }
);

const ChatPage = props => (
  <Layout>
    <Header className="header">
      <div
        style={{
          position: "fixed",
          right: 20,
          color: "white"
        }}
      >
        <h2
          style={{
            color: "white"
          }}
        >
          User
          <Button
            style={{
              marginLeft: 20,
              height: 25
            }}
            ghost={true}
            icon="poweroff"
          >
            Log Out
          </Button>
        </h2>
      </div>
    </Header>

    <Layout>
      <Sider
        style={{
          theme: "light",
          background: "#D3D3D3",
          width: 200,
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0
        }}
      >
        <div
          style={{
            textAlign: "left",
            background: "#D3D3D3",
            color: "gray",
            borderColor: "#D3D3D3",
            height: "50px",
            margin: "auto"
          }}
        >
          <h3
            style={{
              padding: "15px 0px 0px 15px"
            }}
          >
            <Icon type="aliwangwang-o" /> Chats
          </h3>
        </div>

        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["1"]}
          style={{
            height: "100%"
          }}
        >
          <Menu.Item className="menu-item" key="1">
            nav 1
          </Menu.Item>
          <Menu.Item className="menu-item" key="2">
            nav 2
          </Menu.Item>
          <Menu.Item className="menu-item" key="3">
            nav 3
          </Menu.Item>
        </Menu>
      </Sider>
      <EachChat />

      <GroupMember />
    </Layout>
  </Layout>
);

export default enhance(ChatPage);
