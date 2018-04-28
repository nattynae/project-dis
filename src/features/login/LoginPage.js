import React from "react";
import { connect } from "react-redux";
import { searchType, searchReq } from "./reducer";
import { Layout, Menu, Icon, Button } from "antd";
import { WrappedNormalLoginForm } from "./NormalLoginForm";
import Background from "./stars.jpg";
import logochat from "./logochat.png";
const { Header, Sider } = Layout;

const enhance = connect(
  state => ({
    text: state.text,
    result: state.result
  }),
  { searchType, searchReq }
);

const LoginPage = props => (
  <div
    style={{
      backgroundImage: `url(${Background})`,
      backgroundSize: "cover",
      overflow: "hidden",
      textAlign: "center"
    }}
  >
    <img
      src={logochat}
      style={{
        marginLeft: "-20px",
        marginTop: "10%"
      }}
    />
    <div
      style={{
        backgroundColor: "white",
        padding: 50,
        width: "400px",
        height: "270px",
        marginLeft: "35%"
      }}
    >
      <WrappedNormalLoginForm />
    </div>
    <div
      style={{
        height: 220,
        bottom: 0
      }}
    />
  </div>
);

export default enhance(LoginPage);
