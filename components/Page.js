import React, { useEffect, useState } from "react";
import { userQuery } from "../hook/userQuery";
import Card from "./Card";
import Loading from "./Loading";

const Page = ({ page, limit, search, initUser }) => {
  const [data, setData] = useState(initUser);
  const [isSwr, setIsSwr] = useState(false);
  const { users, isError, isLoading } = userQuery(page, limit, search);
  useEffect(() => {
    if (users) {
      setData(users);
      setIsSwr(true);
    }
  }, [users]);
  if (isSwr && isError) return <h2 style={{ textAlign: "center" }}>isError</h2>;
  if (isSwr && isLoading) return <Loading />;
  return (
    <div className="page-content">
      {data && data?.map((user) => <Card key={user.id} user={user} />)}
    </div>
  );
};

export default Page;
