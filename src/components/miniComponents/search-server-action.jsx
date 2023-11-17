"use client";

import { useEffect, useContext } from "react";
import { GlobalContext } from "@/context";
const SearchServerActions = ({ searchHandler }) => {
  const { searchKeyword, setSearchKeyword, startTransition } =
    useContext(GlobalContext);

  useEffect(() => {
    if (searchKeyword.prev === searchKeyword.pres) return;
    console.log(searchKeyword);
    setSearchKeyword((pre) => ({ ...pre, prev: pre.pres }));
    startTransition(() => {
      searchHandler(searchKeyword.pres);
    });
  }, [searchKeyword]);

  return;
};

export default SearchServerActions;
