import React from "react";
import { Form, Icon, Input, Button, Checkbox, message } from "antd";
import { setFeild } from "./reducer";
const FormItem = Form.Item;

const success = () => {
  message.success("Register Success !");
};

const error = () => {
  message.error("Register Failed !");
};

class NormalRegisterForm extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <h1 style={{ marginBottom: 30 }}> Sign up </h1>
        <FormItem>
          {getFieldDecorator("userName", {
            rules: [{ required: true, message: "Please input your username!" }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Username"
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
            />
          )}
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            onClick={success}
            style={{ marginRight: 20 }}
          >
            Register
          </Button>
          Or <a href="#"> Back to Login! </a>
        </FormItem>
      </Form>
    );
  }
}

export const WrappedNormalRegisterForm = Form.create()(NormalRegisterForm);
