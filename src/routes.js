import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import LoginPage from "./features/login/LoginPage";
import ChatPage from "./features/chat/ChatPage";

class Routes extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={LoginPage} />
        <Route path="/chat" component={ChatPage} />
      </div>
    );
  }
}

export default Routes;
