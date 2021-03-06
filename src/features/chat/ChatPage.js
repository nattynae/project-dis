import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getUserGroup, resetState } from "./reducer";
import { Layout, Menu, Icon, Button, Popover, Table, Input } from "antd";
import { bindActionCreators } from "redux";

import "./ChatPage.css";

import Background from "../login/stars.jpg";

const { Header, Sider } = Layout;

const mapStateToProps = state => {
  return {
    userInformation: state.login.userInformation,
    queryGroup: state.chat.queryGroup,
    userGroup: state.chat.userGroup
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    getUserGroup: bindActionCreators(getUserGroup, dispatch),
    resetState: bindActionCreators(resetState, dispatch)
  };
};

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
  constructor(props) {
    super(props);
    this.props = props;
  }

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
    if (this.props.queryGroup) {
      this.props.getUserGroup(this.props.userInformation.username);
    }
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
              {this.props.userInformation.username}
              <Link to="/">
                <Button
                  onClick={() => this.props.resetState()}
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
                      <Input
                        placeholder="Create New Group"
                        addonAfter={
                          <Button
                            type="primary"
                            icon="usergroup-add"
                            style={{
                              marginTop: -25,
                              marginBottom: -25,
                              marginLeft: -11,
                              marginRight: -11
                            }}
                          />
                        }
                      />
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
                    icon="setting"
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
              {this.props.userGroup.map(e => (
                <Menu.Item className="menu-item" key={e.key}>
                  <Link to={"/chat/" + e.key} />
                  {e.groupName}
                </Menu.Item>
              ))}
            </Menu>
          </Sider>
        </Layout>
      </Layout>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage);
