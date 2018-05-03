import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import LoginPage from "./features/login/LoginPage";
import ChatPage from "./features/chat/ChatPage";
import ChatItem from "./features/chat/ChatItem";

class Routes extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={LoginPage} />
        <Route path="/chat" component={ChatPage} />
        <Route path="/chat/:id" component={ChatItem} />
      </div>
    );
  }
}

export default Routes;
