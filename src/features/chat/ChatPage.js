import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { searchType, searchReq } from "./reducer";
import { Layout, Menu, Icon, Button, Popover, Table } from "antd";

import "./ChatPage.css";

import Background from "../login/stars.jpg";

const { Header, Sider } = Layout;

const enhance = connect(
  state => ({
    text: state.text,
    result: state.result
  }),
  { searchType, searchReq }
);

const columns = [
  {
    title: "Group Name",
    dataIndex: "name"
  }
];

const allGroup = [];
for (let i = 0; i < 6; i++) {
  allGroup.push({
    key: i,
    name: `Group ${i}`,
    inGroup: true
  });
}

const content = <div />;

class ChatPage extends React.Component {
  state = {
    visible: false,
    selectedRows: [],
    currentGroup: allGroup,
    groupName: "Group Name"
  };
  onSelectChange = selectedRows => {
    console.log("selectedRowKeys changed: ", selectedRows);
    this.setState({ selectedRows });
  };

  handleCurrentGroup = visible => {
    //Do something else
    this.setState({ visible });
  };
  handleVisibleChange = visible => {
    this.setState({ visible });
  };
  render() {
    const { selectedRows, currentGroup, groupName } = this.state;

    const rowSelection = {
      selectedRows,
      onChange: this.onSelectChange,
      hideDefaultSelections: true,
      selections: [
        {
          key: "all-data",
          text: "Select All Data",
          onSelect: () => {
            this.setState({
              selectedRows: [...allGroup.keys()] // 0...45
            });
          }
        }
      ],
      onSelection: this.onSelection
    };

    return (
      <Layout>
        <Header
          style={{
            backgroundImage: `url(${Background})`,
            backgroundSize: "cover",
            overflow: "hidden",
            textAlign: "center"
          }}
          className="header"
        >
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
              User<Link to="/">
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
              </Link>
            </h2>
          </div>
        </Header>

        <Layout>
          <Sider
            style={{
              theme: "light",
              background: "#e9ebee",
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
                <Icon type="aliwangwang-o" /> Groups
                <Popover
                  content={
                    <div>
                      <Table
                        rowSelection={rowSelection}
                        columns={columns}
                        dataSource={allGroup}
                      />
                      <Button
                        type="primary"
                        style={{ width: "100%" }}
                        onClick={this.handleCurrentGroup}
                      >
                        Save
                      </Button>
                    </div>
                  }
                  placement="rightTop"
                  title="Group Management"
                  trigger="click"
                  visible={this.state.visible}
                  onVisibleChange={this.handleVisibleChange}
                >
                  <Button
                    type="inline"
                    shape="circle"
                    icon="edit"
                    size="small"
                    style={{ marginLeft: 60 }}
                  />
                </Popover>
              </h3>
            </div>

            <Menu
              theme="light"
              mode="inline"
              style={{
                height: "100%"
              }}
              onSelect={e => this.setState({ groupName: e.item })}
            >
              {currentGroup.map(e => (
                <Menu.Item className="menu-item" key={e.key}>
                  <Link to={"/chat/" + e.key} />
                  {e.name}
                </Menu.Item>
              ))}
            </Menu>
          </Sider>
        </Layout>
      </Layout>
    );
  }
}

export default enhance(ChatPage);
