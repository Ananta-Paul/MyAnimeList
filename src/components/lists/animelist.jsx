import { AiTwotoneStar } from "react-icons/ai";
import Image from "next/image";
import { BsFillPlayFill } from "react-icons/bs";
import PlayButton from "../miniComponents/playButton";
import AddButton from "../miniComponents/addButton";
import EditItem from "../editItem";
import {
  AnimelistImageWraper,
  AnimelistContainerWraper,
  AnimelistDetailsWraper,
} from "./animelistwrapers";
export const AnimeList = ({ animelist, heading, modlist }) => {
  return (
    <>
      {animelist &&
        animelist.map((anime, index) => {
          return (
            <AnimelistContainerWraper
              key={index}
              heading={heading}
              Id={anime?.mal_id}
            >
              <AnimelistImageWraper>
                <Image
                  className="object-cover group-hover/hs1:rounded-lg"
                  src={
                    anime?.image
                      ? anime.image
                      : anime?.images?.jpg?.large_image_url
                  }
                  fill
                  priority={true}
                  sizes="100%"
                  alt="animeImage"
                />
              </AnimelistImageWraper>
              <h4 className="text-md max-h-[18px] w-[150px] flex-nowrap overflow-hidden text-center font-medium leading-[1.1] text-gray-500 md:max-h-[36px] md:w-[220px]">
                {anime.title_english ? anime.title_english : anime.title}
              </h4>
              {heading !== "Recommended for you" && (
                <AnimelistDetailsWraper>
                  <div
                    className={`relative overflow-hidden ${
                      modlist === undefined ? "md:h-3/5" : ""
                    }`}
                  >
                    <h4 className=" text-md flex-nowrap font-bold leading-tight ">
                      {anime.title}
                    </h4>
                    <div className="flex items-center justify-between py-2 text-sm">
                      <div className="flex items-center">
                        <AiTwotoneStar className="text-base text-yellow-400" />
                        <span className="px-1 text-base">{anime.score}</span>
                      </div>
                      <div>
                        <span className="rounded-l border-gray-300 bg-slate-300 p-[3px] px-1  dark:bg-gray-900">
                          #{anime.rank}
                        </span>
                        <span className="rounded-r bg-gray-700 p-[3px] px-1 text-white dark:bg-gray-700 dark:text-white ">
                          ep:{anime.episodes}
                        </span>
                      </div>
                      <div className=" rounded bg-yellow-400 px-1">
                        {anime.type}
                      </div>
                    </div>
                    <p className="ttext-gray-900 ddark:text-gray-300 hidden bg-gray-900 bg-clip-text pt-1 text-[13px] text-transparent dark:bg-gray-300 md:block">
                      {anime?.synopsis}
                    </p>
                    {/* <p className="pt-1 text-[13px] text-gray-900 dark:text-gray-300">{`${anime?.synopsis?.slice(
                  0,
                  150,
                )}${anime?.synopsis?.length > 150 ? "..." : ""}`}</p> */}
                  </div>
                  <div className="pt-1 text-[13px] text-gray-900 dark:text-gray-300">
                    {anime?.title_english && (
                      <p>
                        <span className="font-medium text-black dark:text-gray-100">
                          {"English: "}
                        </span>
                        {anime.title_english}
                      </p>
                    )}

                    {anime?.year && (
                      <p>
                        <span className="font-medium text-black dark:text-gray-100">
                          {"Year: "}
                        </span>
                        {anime.year}
                      </p>
                    )}
                    {anime?.genres && (
                      <p>
                        <span className="font-medium text-black dark:text-gray-100">
                          {modlist === undefined && "Genres: "}
                        </span>
                        {anime?.genres.map((object) => object.name).join(", ")}
                      </p>
                    )}
                    {modlist !== undefined && <EditItem anime={anime} />}
                    <div className=" absolute bottom-0 left-0 right-0 flex justify-center gap-3 p-2 px-3 md:bottom-3">
                      {anime?.trailer?.embed_url && (
                        <PlayButton video={anime?.trailer?.embed_url}>
                          <span className="pl-3 text-lg">Play</span>
                          <BsFillPlayFill size={30} color="black" />
                        </PlayButton>
                      )}
                      <AddButton anime={anime} modlist={modlist} />
                    </div>
                  </div>
                </AnimelistDetailsWraper>
              )}
            </AnimelistContainerWraper>
          );
        })}
    </>
  );
};
