import axios from "axios";
import Head from "next/head";
import InputForm from "../components/InputForm";
import Page from "../components/Page";
import { getQueryUrl } from "../utils/getQueryUrl";

export default function Home({ initUser }) {
  const { page, limit, search } = getQueryUrl();
  return (
    <div>
      <Head>
        <title>Home</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div style={{ width: 1080, margin: "0 auto" }}>
          <InputForm />
        </div>
        <div style={{ display: "none" }}>
          <Page
            initUser={initUser}
            page={page - 1}
            limit={limit}
            search={search}
          />
        </div>
        <Page initUser={initUser} page={page} limit={limit} search={search} />
        <div style={{ display: "none" }}>
          <Page
            initUser={initUser}
            page={page + 1}
            limit={limit}
            search={search}
          />
        </div>
      </main>
    </div>
  );
}
export async function getStaticProps() {
  let url = "/users?_sort=createdAt&_order=asc";
  const res = await axios.get(url);
  return {
    props: {
      initUser: res.data,
    },
    revalidate: 60,
  };
}
