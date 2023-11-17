"use client";
import React, { useState } from "react";
import { TiTick } from "react-icons/ti";
import { MdEdit } from "react-icons/md";
import { editItem } from "@/actions/serveractions";
const EditItem = ({ anime }) => {
  //console.log(anime);
  const [editable, setEditable] = useState(false);
  const [status, setStatus] = useState({
    status: anime?.ustatus,
    score: anime?.uscore,
    episodes: anime?.uepisodes,
  });
  const handleClick = async (e) => {
    e.stopPropagation();
    if (!editable) {
      setEditable(true);
      return;
    }
    setEditable(false);
    if (
      status.status != anime?.ustatus ||
      status.episodes !== anime?.uepisodes ||
      status.score !== anime?.uscore
    ) {
      const res = await editItem({ updateDetails: status, id: anime._id });
      if (res !== true)
        setStatus({
          status: anime?.ustatus,
          score: anime?.uscore,
          episodes: anime?.uepisodes,
        });
    }
  };
  return (
    <div
      className=" relative"
      onClick={(e) => {
        if (editable) e.stopPropagation();
      }}
    >
      {editable ? (
        <>
          <p className="flex flex-nowrap items-center">
            <span className="font-medium text-black dark:text-gray-100">
              {"Status: "}
            </span>
            <select
              defaultValue={status.status}
              onChange={(e) =>
                setStatus((prev) => ({ ...prev, status: e.target.value }))
              }
              id="small"
              className="block w-min max-w-[80%] rounded-lg border-0 border-transparent bg-transparent px-[3px] text-sm text-gray-900 focus:border-transparent focus:outline-none focus:ring-transparent dark:text-white dark:focus:bg-gray-700 md:p-[3px]"
            >
              <option value="Plan to Watch">Plan to Watch</option>
              <option value="Completed">Completed</option>
              <option value="Watching">Watching</option>
            </select>
          </p>
          <p className="flex flex-nowrap items-center">
            <span className="font-medium text-black dark:text-gray-100">
              {"Your Score: "}
            </span>
            <select
              defaultValue={status.score}
              onChange={(e) =>
                setStatus((prev) => ({ ...prev, score: e.target.value }))
              }
              className=" block  w-min max-w-[80%] rounded-lg border-0 border-transparent bg-transparent px-[3px] text-sm text-gray-900 focus:border-transparent focus:outline-none focus:ring-transparent dark:text-white dark:focus:bg-gray-700 md:p-[3px]"
            >
              <option value={-1}>_</option>
              {[...Array(10)].map((_, index) => (
                <option key={index + 1} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
          </p>
          <p className="relative flex max-w-min flex-nowrap items-center">
            <span className=" whitespace-nowrap font-medium text-black dark:text-gray-100">
              {"Episodes Watched: "}
            </span>
            <input
              className=" max-w-[70px] rounded-lg border-0 border-transparent bg-transparent px-[3px] text-sm text-gray-900 focus:border-transparent focus:outline-none focus:ring-transparent dark:text-white md:p-[3px]"
              type="number"
              value={status.episodes}
              onChange={(e) =>
                setStatus((prev) => ({
                  ...prev,
                  episodes: Math.min(
                    anime?.episodes,
                    Math.max(e.target.value, 0),
                  ),
                }))
              }
            />
            <span className="absolute right-3 md:right-5">
              {"/" + anime?.episodes}
            </span>
          </p>
        </>
      ) : (
        <>
          <p>
            <span className="font-medium text-black dark:text-gray-100">
              {"Status: "}
            </span>
            {status.status}
          </p>
          <p>
            <span className="font-medium text-black dark:text-gray-100">
              {"Your Score: "}
            </span>
            {status.score !== -1 && status.score}
          </p>
          <p>
            <span className="font-medium text-black dark:text-gray-100">
              {"Episodes Watched: "}
            </span>
            {status.episodes + "/" + anime?.episodes}
          </p>
        </>
      )}
      <button
        onClick={(e) => handleClick(e)}
        className="flex-end absolute  -right-2 bottom-5 min-w-fit rounded-full bg-gray-300 p-[2px] text-5xl hover:bg-gray-500 dark:bg-gray-400 dark:hover:bg-gray-700 md:right-1 md:p-[6px]  "
      >
        {editable ? <TiTick size={20} /> : <MdEdit size={20} />}
      </button>
    </div>
  );
};

export default EditItem;
