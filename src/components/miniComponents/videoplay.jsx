"use client";
import { GlobalContext } from "@/context";
import React, { useContext } from "react";
import ReactPlayer from "react-player";
import { RxCross2 } from "react-icons/rx";
const VideoPlay = () => {
  const { theme, video, setVideo } = useContext(GlobalContext);
  if (!video) return <></>;
  return (
    <div className="fixed z-20 left-0 top-0 flex h-full w-full  items-center justify-center bg-black bg-opacity-50 py-10">
      <div className="  w-full  relative max-w-full h-[calc(100vw*9/16)] sm:w-[70vw] sm:h-[39.4vw] overflow-y-auto group/vd sm:rounded-2xl  bg-white">
        <ReactPlayer
          url={video}
          controls
          playing={true}
          height="100%"
          width="100%"
          onEnded={() => setTimeout(() => setVideo(null), 3000)}
          light={theme === "light"}
        />

        <RxCross2
          size={40}
          onClick={() => setVideo()}
          color="white"
          className="absolute sm:hidden top-0 right-0 group-hover/vd:block bg-gray-300/50 dark:bg-gray-900/60 hover:br-gray-900/80"
        />
      </div>
    </div>
  );
};

export default VideoPlay;
