import useSWR from "swr";

export const userQuery = (page, limit, search) => {
  let url = "/users?_sort=createdAt&_order=desc";
  if (search) {
    url = `${url}&q=${search}`;
  } else {
    url = `${url}&_page=${page}&_limit=${limit}`;
  }
  const { data, error } = useSWR(url);

  return {
    users: data,
    isLoading: !error && !data,
    isError: error,
  };
};
export const userDetailQuery = (id) => {
  const { data, error } = useSWR(id ? `/users/${id}` : null);

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  };
};
