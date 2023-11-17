import React from "react";
import Print from "@/components/miniComponents/print";
import { getAllListItems } from "@/actions/serveractions";
import OptimisticList from "@/components/lists/optimisticList";

export const my_list = async () => {
  const res = JSON.parse(await getAllListItems())?.animes;
  const data = await res?.map((item) => {
    const {
      id: { mal_id, title, rank, episodes, score, image, type, genres },
      ...rest
    } = item;
    return {
      mal_id,
      title,
      rank,
      episodes,
      score,
      type,
      image,
      genres,
      ...rest,
    };
  });

  return (
    <>
      {/* <Print data={data} /> */}
      <div className=" relative mx-1 my-2 flex flex-wrap justify-center gap-3">
        <OptimisticList animelist={data} />
      </div>{" "}
    </>
  );
};
export default my_list;
export const revalidate = 0;
