import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { userQuery } from "../hook/userQuery";

const Header = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const router = useRouter();
  const { query, pathname } = router;
  const { users, isError, isLoading } = userQuery(page + 1, limit, search);
  useEffect(() => {
    if (query.page) {
      let p = Number(query.page) >= 1 ? Number(query.page) : 1;
      setPage(p);
    }
    if (query.limit) {
      let l = Number(query.limit) >= 10 ? Number(query.limit) : 10;
      setLimit(l);
    }
  }, [query.page, query.limit]);
  const handlePagination = (pageIndex) => {
    if (pathname != "/") return;
    let p = pageIndex > 1 ? pageIndex : 1;
    router.replace(`?page=${p}&limit=${limit}`);
  };
  const handlePerPage = (limit) => {
    if (pathname != "/") return;
    let p = limit > 1 ? limit : 1;
    router.replace(`?page=1&limit=${limit}`);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    if (pathname != "/") return;
    router.replace(`?search=${search}`);
  };

  return (
    <header>
      <nav className="nav">
        <div className="header-logo">
          {pathname !== "/" ? (
            <div onClick={() => router.back()}>SWR</div>
          ) : (
            <Link href={`/?page=1&limit=${limit}`} replace shallow={true}>
              <a>SWR</a>
            </Link>
          )}
        </div>
        <div className="header-search">
          <form onSubmit={handleSearch}>
            <input
              required
              placeholder="enter your search"
              value={search}
              disabled={pathname !== "/" || isLoading}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button disabled={pathname !== "/" || isLoading}>Search</button>
          </form>
        </div>
        <div className="header-cta">
          <div className="header-pageNumber">
            <button
              disabled={pathname !== "/" || isLoading || page == 1}
              onClick={() => handlePagination(page - 1)}
            >
              -
            </button>
            <span>{page}</span>
            <button
              disabled={pathname !== "/" || isLoading || !users.length}
              onClick={() => handlePagination(page + 1)}
            >
              +
            </button>
          </div>
          <div className="header-pageSize">
            <select
              name="size"
              id="pagesize"
              onChange={(e) => handlePerPage(e.target.value)}
              value={limit}
              disabled={pathname !== "/" || isLoading}
            >
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
