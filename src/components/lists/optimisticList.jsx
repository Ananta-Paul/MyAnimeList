"use client";
import { useEffect, useOptimistic } from "react";
import { AnimeList } from "./animelist";
import { useRouter } from "next/navigation";
import { refResh } from "@/actions/serveractions";
const OptimisticList = ({ animelist }) => {
  const [optimisticList, setOptimisticList] = useOptimistic(
    animelist,
    (state, rid) => state.filter((item) => item._id !== rid),
  );
  const removeFromList = async (id) => {
    await setOptimisticList(id);
  };
  const router = useRouter();
  useEffect(() => {
    //console.log("/my_list");
    //refResh("/my_list");
    router.refresh();
  }, []);

  return optimisticList && optimisticList.length ? (
    <AnimeList animelist={optimisticList} modlist={removeFromList} />
  ) : (
    <span className=" mt-12 ">Your list is empty!</span>
  );
};

export default OptimisticList;
