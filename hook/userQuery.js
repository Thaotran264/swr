import useSWR from "swr";

export const userQuery = (page, limit, search) => {
  let url = "/users?_sort=createdAt&_order=asc";
  if (search) {
    url = `${url}&q=${search}`;
  } else {
    url = `${url}&_page=${page}&_limit=${limit}`;
  }
  const { data, error, mutate } = useSWR(url);

  return {
    users: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
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
