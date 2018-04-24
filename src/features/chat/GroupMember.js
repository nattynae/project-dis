import React from "react";
import { Layout, Menu, Icon, Input, Button } from "antd";
import { List, Avatar } from "antd";

const { Sider } = Layout;

const data = [
  {
    title: "Member 1"
  },
  {
    title: "Member 2"
  },
  {
    title: "Member 3"
  },
  {
    title: "Member 4"
  }
];

export default props => (
  <Sider
    style={{
      theme: "light",
      background: "#f2f3f5",
      width: 200,
      overflow: "auto",
      height: "100vh",
      position: "fixed",
      borderColor: "#D3D3D3",
      right: 0
    }}
  >
    <div
      style={{
        textAlign: "left",
        background: "#e9ebee",
        color: "gray",
        height: "50px",
        margin: "auto"
      }}
    >
      <h3
        style={{
          padding: "15px 0px 0px 15px"
        }}
      >
        Group Members
      </h3>
    </div>

    <List
      itemLayout="horizontal"
      dataSource={data}
      style={{ marginLeft: 20 }}
      renderItem={item => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar size="small" icon="user" />}
            title={item.title}
          />
        </List.Item>
      )}
    />
  </Sider>
);
