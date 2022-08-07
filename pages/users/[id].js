import axios from "axios";
import React, { useEffect, useState } from "react";
import { userDetailQuery } from "../../hook/userQuery";
const User = ({ initUser, id }) => {
  const [data, setData] = useState(initUser);
  const [isSwr, setIsSwr] = useState(false);
  const { user, isError, isLoading } = userDetailQuery(id);
  useEffect(() => {
    if (user) {
      setData(user);
      setIsSwr(true);
    }
  }, [user]);
  if (isSwr && isLoading)
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  if (isSwr && isError)
    return <h2 style={{ textAlign: "center" }}>{isError}</h2>;
  return (
    <div style={{ width: 1080, margin: "0 auto" }}>
      {data && (
        <div className="user">
          <div className="user-image">
            <img src={data?.avatar} alt={data?.avatar} />
          </div>
          <div className="user-info">
            <h2>{data.name}</h2>
            <p>This is paragraph</p>
          </div>
        </div>
      )}
    </div>
  );
};

export async function getStaticPaths() {
  let url = `/users?_sort=createdAt&_order=asc`;
  const res = await axios.get(url);
  const users = res.data;

  const paths = users.map((user) => ({
    params: { id: user.id },
  }));

  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  const url = `/users/${params.id}`;
  const res = await axios.get(url);
  return {
    props: {
      initUser: res.data,
      id: params.id,
    },
    revalidate: 10,
  };
}
export default User;
