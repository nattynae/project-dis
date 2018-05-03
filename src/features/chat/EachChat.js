import React from "react";
import io from "socket.io-client";
import { getUserGroup, resetState } from "./reducer";
import { connect } from "react-redux";
import { Layout, Menu, Icon, Input, Button, List, Avatar } from "antd";
const { Content, Sider } = Layout;

const listData = [];

const mapStateToProps = state => {
  return {
    userInformation: state.login.userInformation,
    queryGroup: state.chat.queryGroup,
    userGroup: state.chat.userGroup
  };
};

const mapDispatchToProps = { getUserGroup, resetState };

class EachChat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: ""
    };

    this.socket = io("localhost:5000");

    this.socket.on("RECEIVE_MESSAGE", function(data) {
      addMessage(data);
    });

    const addMessage = res => {
      console.log(res);
      //  this.setState({ messages: [...this.state.messages, data] });
      listData.push({
        title: `${res.data.author}`,
        avatar: `${(
          <Avatar
            style={{
              backgroundColor: `${res.data.color}`,
              verticalAlign: "middle"
            }}
            size="large"
          >
            {res.data.author.substring(0, 1)}
          </Avatar>
        )}`,
        description: `${res.time}`,
        content: `${res.data.message}`
      });
      console.log(this.state.messages);
    };

    this.sendMessage = ev => {
      ev.preventDefault();
      this.socket.emit("SEND_MESSAGE", {
        author: this.props.userInformation.username,
        color: this.props.userInformation.color,
        message: this.state.message
      });
      this.setState({ message: "" });
    };
  }
  render() {
    const props = this.props;
    return (
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
            <Button
              icon="to-top"
              style={{
                marginLeft: -461,
                marginTop: 3,
                width: "72%",
                position: "fixed",
                marginRight: 200
              }}
            >
              Load more ..
            </Button>
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
              dataSource={listData}
              renderItem={item => (
                <List.Item key={item.title}>
                  <List.Item.Meta
                    avatar={<Avatar src={item.avatar} />}
                    title={item.title}
                    description={item.description}
                  />
                  {item.content}
                </List.Item>
              )}
            />
            <Input
              placeholder="Message"
              value={this.state.message}
              onChange={e => this.setState({ message: e.target.value })}
              style={{
                width: "1040px"
              }}
              addonAfter={
                <Button
                  type="primary"
                  onClick={e => this.sendMessage(e)}
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EachChat);
