import React from "react";
import { Layout, Menu, Icon, Input, Button, List, Avatar } from "antd";
const { Content, Sider } = Layout;

const data = [
  {
    title: "Ant Design Title 1"
  },
  {
    title: "Ant Design Title 2"
  },
  {
    title: "Ant Design Title 3"
  },
  {
    title: "Ant Design Title 4"
  }
];

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
          {props.groupName}
        </h3>
      </div>

      <div
        style={{
          position: "fixed",
          bottom: 0,
          marginLeft: 200
        }}
      >
        <List
          style={{
            marginLeft: 50,
            marginRight: 50
          }}
          itemLayout="horizontal"
          dataSource={data}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar
                    style={{
                      backgroundColor: "#f56a00",
                      verticalAlign: "middle"
                    }}
                    size="large"
                  >
                    Name
                  </Avatar>
                }
                title={<h4>{item.title}</h4>}
                description="Message here"
              />
            </List.Item>
          )}
        />
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
