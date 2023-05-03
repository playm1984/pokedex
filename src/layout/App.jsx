import React from "react";
import { Layout, Space } from "antd";
import Header from "../components/Header/Header";
import Main from "./Main";
import style from "./style.module.css";

const App = () => {
  return (
    <Layout className={style.section}>
      <Header />
      <Space direction="vertical" className={style.section_main}>
        <Main />
      </Space>
    </Layout>
  );
};

export default App;
