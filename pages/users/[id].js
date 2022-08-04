import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Card from "../../components/Card";
import Layout from "../../components/Layout";
import { userDetailQuery } from "../../hook/userQuery";
const User = () => {
  const router = useRouter();
  const { id } = router.query;
  const { user, isError, isLoading } = userDetailQuery(id);

  if (isLoading) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  if (isError) return <h2 style={{ textAlign: "center" }}>{isError}</h2>;
  return (
    <div style={{ width: 1080, margin: "0 auto" }}>
      {user && (
        <div className="user">
          <div className="user-image">
            <img src={user.avatar} alt={user.avatar} />
          </div>
          <div className="user-info">
            <h2>{user.name}</h2>
            <p>This is paragraph</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
