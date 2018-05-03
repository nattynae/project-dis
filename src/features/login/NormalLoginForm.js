import React from "react";
import { Redirect } from "react-router-dom";
import { Form, Icon, Input, Button, Checkbox, message } from "antd";
import { login } from "./reducer";
const FormItem = Form.Item;

const error = () => {
  message.error("Username or Password is incorrect!");
};

class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };
  render() {
    const { setField, login, clearField } = this.props;
    console.log(this.props);
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <h1 style={{ marginTop: -25 }}> Login </h1>
        <FormItem>
          {getFieldDecorator("userName", {
            rules: [{ required: true, message: "Please input your username!" }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Username"
              onChange={e => setField("username", e.target.value)}
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "Please input your Password!" }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
              onChange={e => setField("password", e.target.value)}
            />
          )}
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            onClick={() => login()}
            style={{ marginRight: 20 }}
          >
            Log in
          </Button>
          Or{" "}
          <a
            href="#"
            onClick={() => {
              clearField();
              setField("loginPage", false);
            }}
          >
            register now!{" "}
          </a>
        </FormItem>
      </Form>
    );
  }
}

export const WrappedNormalLoginForm = Form.create()(NormalLoginForm);
