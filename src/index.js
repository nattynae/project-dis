import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import ChatPage from "./features/chat/ChatPage";
import LoginPage from "./features/login/LoginPage";
import registerServiceWorker from "./registerServiceWorker";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes.js";
import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import chatReducers from "./features/chat/reducer";
import loginReducer from "./features/login/reducer";
import promiseMiddleware from "redux-promise-middleware";
import "antd/dist/antd.css";

const rootReducer = combineReducers({
  login: loginReducer,
  chat: chatReducers
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(promiseMiddleware()))
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
