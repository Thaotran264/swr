import Link from "next/link";
import React, { useContext } from "react";
import { DataContext } from "../store/globalState";
import { getQueryUrl } from "../utils/getQueryUrl";
import { userQuery } from "../hook/userQuery";
import axios from "axios";
const Card = ({ user }) => {
  const { setUserState } = useContext(DataContext);
  const { router, page, limit, search } = getQueryUrl();
  // const {} = userQuery();
  const { users, mutate } = userQuery(page, limit, search);
  const handleDelete = async (id) => {
    if (window.confirm("are you sure delete")) {
      const newUser = users.filter((item) => item.id != id);
      mutate(newUser, false);
      await axios.delete(`/users/${id}`);
      mutate();
    }
  };
  return (
    <div className="card">
      <Link href={`/users/${user?.id}`}>
        <a style={{ display: "block" }}>
          <h2>{user.name}</h2>
          <img src={user?.avatar} alt={user?.avatar} />
        </a>
      </Link>
      {router.pathname === "/" && (
        <div className="">
          <div className="groupBtn">
            <button className="btn btn-edit" onClick={() => setUserState(user)}>
              edit
            </button>
            <button
              className="btn btn-delete"
              onClick={() => handleDelete(user.id)}
            >
              delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
