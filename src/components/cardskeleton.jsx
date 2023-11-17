import React from "react";
import Layout from "./layout";
const CardSkeleton = () => {
  return (
    <div className="flex h-[300px] w-[220px] animate-pulse ">
      <div className="flex h-[300px]  w-full items-center justify-center rounded bg-gray-400 dark:bg-gray-700 sm:w-96 ">
        <svg
          className="h-10 w-10 text-gray-200 dark:text-gray-600"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 18"
        >
          <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
        </svg>
      </div>
    </div>
  );
};

export const InfoSkeleton = () => {
  return (
    <div className="flex animate-pulse flex-col flex-wrap items-center  justify-center gap-8 p-4 md:flex-row md:items-start md:justify-normal lg:flex-nowrap">
      <CardSkeleton />
      <div className=" relative flex w-[calc(100vw-301px)] flex-col items-center gap-3 ">
        <div className="my-4 h-7 w-[300px] rounded-lg bg-gray-400 dark:bg-gray-700"></div>
        <div className="my-5 h-4 w-[400px] rounded-lg bg-gray-400 dark:bg-gray-700"></div>
        <div className=" my-5 h-7 w-32 rounded-lg bg-gray-400 dark:bg-gray-700"></div>

        <div className="mt-8 h-2 rounded-lg bg-gray-400 dark:bg-gray-700"></div>
        <div className="my-2.5 h-2 max-w-[330px] rounded-lg bg-gray-400 dark:bg-gray-700"></div>
        <div className="mb-2.5 h-2 max-w-[300px] rounded-lg bg-gray-400 dark:bg-gray-700"></div>
        <div className="h-2 max-w-[360px] rounded-lg bg-gray-400 dark:bg-gray-700"></div>
      </div>
    </div>
  );
  {
    /* <div role="status" className="max-w-sm animate-pulse">
    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
    <span className="sr-only">Loading...</span>
</div> */
  }
};

export default CardSkeleton;
