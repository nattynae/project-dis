import React, { Component } from "react";

import { connect } from "react-redux";
import { setFeild } from "./reducer";
import { Layout, Menu, Icon, Button } from "antd";
import { WrappedNormalLoginForm } from "./NormalLoginForm";
import { WrappedNormalRegisterForm } from "./RegisterForm";

import Background from "./stars.jpg";
import logochat from "./logochat.png";

const { Header, Sider } = Layout;

const enhance = connect(
  state => ({
    loginPage: state.login
  }),
  { setFeild }
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
        marginTop: "5%"
      }}
    />
    <div
      style={{
        backgroundColor: "white",
        padding: 50,
        width: "400px",
        height: "300px",
        marginLeft: "35%"
      }}
    >
      {props.loginPage && (
        <WrappedNormalLoginForm
          loginPage={props.loginPage}
          setFeild={e => this.props.setFeild(e.key, e.value)}
        />
      )}
      {!props.loginPage && (
        <WrappedNormalRegisterForm
          loginPage={props.loginPage}
          setFeild={e => this.props.setFeild(e.key, e.value)}
        />
      )}
    </div>
    <div
      style={{
        height: 260,
        bottom: 0
      }}
    />
  </div>
);

export default enhance(LoginPage);
