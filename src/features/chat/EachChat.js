import React from "react";
import { Layout, Menu, Icon, Input, Button } from "antd";
import { height } from "window-size";
const { Content, Sider } = Layout;

export default props => (
  <Layout style={{ padding: "0" }}>
    <Layout style={{ padding: "0" }}>
      <div
        style={{
          textAlign: "left",
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
          Nav 1
        </h3>
      </div>
      <Content
        style={{
          overflow: "initial",
          background: "#fff",
          padding: 24,
          margin: 0,
          minHeight: 280
        }}
      >
        Content
      </Content>
      <div
        style={{
          position: "fixed",
          bottom: 0,
          marginLeft: 200
        }}
      >
        <Input
          style={{
            width: "1040px"
          }}
          addonAfter={
            <Button
              type="primary"
              style={{
                width: 100,
                padding: 0,
                margin: -11
              }}
            >
              Send
            </Button>
          }
        />
      </div>
    </Layout>
  </Layout>
);
