import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ConfigProvider } from "antd";
import locale from "antd/locale/de_DE";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ConfigProvider locale={locale}>
      <App />
    </ConfigProvider>
  </React.StrictMode>
);
