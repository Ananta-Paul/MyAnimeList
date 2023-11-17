"use client";
import { GlobalContext } from "@/context";
import React, { useContext } from "react";

const PlayButton = ({ children, video }) => {
  const { setVideo } = useContext(GlobalContext);
  return (
    <button
      onClick={(event) => {
        event.stopPropagation();
        setVideo(video);
      }}
      className="flex min-w-fit items-center justify-center rounded-full bg-slate-400 px-[6px]   hover:bg-slate-500 dark:bg-gray-800 dark:hover:bg-gray-700  "
    >
      {children}
    </button>
  );
};

export default PlayButton;
