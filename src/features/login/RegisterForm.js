import React from "react";
import { Form, Icon, Input, Button, Checkbox, message, Alert } from "antd";
const FormItem = Form.Item;

const success = () => {
  message.success("Register Success !");
};

const error = () => {
  message.error("Register Failed ! Username is existed");
};

class NormalRegisterForm extends React.Component {


  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  render() {
    
    const { setField,regist,registSuccess,clearField } = this.props;
    const { getFieldDecorator } = this.props.form;
    if(registSuccess === "1"){
      setField('registSuccess','0')
      success()
    }else if(registSuccess === "-1"){
      error()
    }
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
                onChange = {(e) => setField('usernameReg',e.target.value)}
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
                onChange = {(e) => setField('passwordReg',e.target.value)}
              />
            )}
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              onClick={() => regist()}
              style={{ marginRight: 20 }}
            >
              Register
            </Button>
            Or <a href="#" onClick = {() => {clearField();setField('loginPage',true)}} > Back to Login! </a>
          </FormItem>
        </Form>
    );
  }
}

export const WrappedNormalRegisterForm = Form.create()(NormalRegisterForm);
