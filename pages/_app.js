import Head from "next/head";
import Header from "../components/Header";
import "../styles/globals.css";
import axios from "axios";
import Layout from "../components/Layout";
import { SWRConfig } from "swr";
axios.defaults.baseURL = "http://localhost:5000";
function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        fetcher: (url) => axios(url).then((res) => res.data),
        dedupingInterval: 10000,
      }}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SWRConfig>
  );
}

export default MyApp;
