import axios from "axios";
import React, { useContext, useState } from "react";
import { userQuery } from "../hook/userQuery";
import { DataContext } from "../store/globalState";
import { getQueryUrl } from "../utils/getQueryUrl";

const InputForm = () => {
  const { userState, setUserState } = useContext(DataContext);
  const { id, name, avatar, createAt } = userState;
  const { router, page, limit, search } = getQueryUrl();
  const { users, mutate } = userQuery(page, limit, search);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      name,
      avatar,
      createAt: id ? createAt : new Date(),
    };
    if (id) {
      const newUsers = users.map((user) =>
        user.id == id ? { ...newUser, id } : user
      );
      mutate(newUsers, false);
      await axios.put(`/users/${id}`, newUser);
    } else {
      router.replace(`/?page=1&limit=${limit}`);
      const res = await axios.post("/users/", newUser);
      mutate([res.data, ...users], false);
    }
    setUserState({
      id: "",
      name: "",
      avatar: "",
      createAt: "",
    });
    mutate();
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserState({ ...userState, [name]: value });
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name"></label>
      <input
        required
        type="text"
        name="name"
        value={name}
        onChange={handleInput}
      />
      <label htmlFor="avatar"></label>
      <input name="avatar" type="text" value={avatar} onChange={handleInput} />
      <button>{id ? "Update" : "Add"}</button>
    </form>
  );
};

export default InputForm;
