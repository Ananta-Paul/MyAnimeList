"use client";
import React, { useEffect, useState, useTransition } from "react";
import { IoMdAdd } from "react-icons/io";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { removeItem, isAlreadyExists } from "@/actions/serveractions";
const AddButton = ({ anime, modlist }) => {
  //console.log(modlist);
  const router = useRouter();
  const path = usePathname();
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState(anime?._id);
  const { data: session } = useSession();

  const addToList = async (event) => {
    event.stopPropagation();
    setStatus("adding");
    if (!session) {
      signIn(undefined, { callbackUrl: path });
      return;
    }
    //console.log("adding...");
    const formData = {
      mal_id: anime.mal_id,
      title: anime?.title_english ? anime.title_english : anime.title,
      rank: anime?.rank,
      episodes: anime?.episodes,
      score: anime?.score,
      genres: await anime?.genres.map((cur) => ({
        mal_id: cur.mal_id,
        name: cur.name,
      })),
      type: anime?.type,
      image: anime?.images?.jpg?.large_image_url,
    };
    try {
      const res = await fetch("/api/list/add-to-list", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ anime: formData }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus(data?.data?._id);
        //console.log(data?.data);
        // setList((pre) => [...pre, data.data]);
        //mutate("/my_list");
      } else setStatus(null);
      return data;
    } catch (e) {
      console.log(e);
    }
  };
  const removeFromList = async (event) => {
    event.stopPropagation();
    if (!session) {
      signIn(undefined, { callbackUrl: path });
      return;
    }
    //console.log(anime?.title);
    if (status && modlist) await modlist(status);
    if (status) await removeItem({ id: status, samePath: path === "/my_list" });
    //mutate("/my_list");
    setStatus(null);
  };
  const isAlreadyAdded = async () => {
    if (status !== undefined) {
      // console.log("ret: ", status);
      return;
    }
    let data = null;
    const res = await isAlreadyExists(anime.mal_id + anime.type);
    if (res) {
      data = JSON.parse(res);
      // setStatus(data);
      console.log(data);
      if (data === undefined) console.log("data");
    }
    setStatus(data);
  };
  useEffect(() => {
    // console.log(path, anime?._id);
    if (anime?._id) {
      setStatus(anime?._id);
      return;
    }
    if (!session) setStatus(null);
    else if (status === undefined) isAlreadyAdded();
  }, [status]);
  return (
    <button
      disabled={isPending || status === undefined}
      onClick={(event) =>
        startTransition(
          status ? () => removeFromList(event) : () => addToList(event),
        )
      }
      className="flex min-w-fit items-center rounded-full bg-gray-400 p-[6px] text-5xl hover:bg-gray-500  dark:hover:bg-gray-700  "
    >
      <IoMdAdd
        className={`${status ? "rotate-45" : ""} ${
          isPending || status === undefined ? "animate-spin" : ""
        }`}
        size={25}
      />
      {path.startsWith("/info") && (
        <span className="py-1 pr-2 text-base">
          {status ? "Remove" : "Add to List"}
        </span>
      )}
    </button>
  );
};

export default AddButton;
