import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import ChatPage from "./features/chat/ChatPage";
import LoginPage from "./features/login/LoginPage";
import registerServiceWorker from "./registerServiceWorker";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore, compose, applyMiddleware } from "redux";
import reducers from "./features/chat/reducer";
import promiseMiddleware from "redux-promise-middleware";
import "antd/dist/antd.css";

// 1 store มีหลาย reducer ได้ แต่ต้องไป รวมให้มาเป็น reducer อันใหญ่อันเดียวก่อนละค่อยใส่ลงไปใน createStore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(promiseMiddleware()))
);

ReactDOM.render(
  <Provider store={store}>
    <LoginPage />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
