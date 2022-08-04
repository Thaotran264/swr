import React from "react";
import { userQuery } from "../hook/userQuery";
import Card from "./Card";
import Loading from "./Loading";

const Page = ({ page, limit, search }) => {
  const { users, isError, isLoading } = userQuery(page, limit, search);
  if (isError) return <h2 style={{ textAlign: "center" }}>isError</h2>;
  if (isLoading) return <Loading />;
  return (
    <div className="page-content">
      {users && users?.map((user) => <Card key={user.id} user={user} />)}
    </div>
  );
};

export default Page;
