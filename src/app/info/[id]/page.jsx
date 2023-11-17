import Image from "next/image";
import AddButton from "@/components/miniComponents/addButton";
import PlayButton from "@/components/miniComponents/playButton";
import { AiTwotoneStar } from "react-icons/ai";
import { BsFillPlayFill } from "react-icons/bs";
import { getMoreInfoAPI, formatCompactNumber } from "@/config";
import { GiClapperboard } from "react-icons/gi";
import { BiSolidUser } from "react-icons/bi";
import { GetRecommendations } from "@/components/lists/horizontallist";

const Page = async ({ params }) => {
  // const session = await getServerSession(authOptions);
  // console.log("ss" + session);
  const details = await getMoreInfoAPI(params.id);
  //const characters = await getCharactersAPI(params.Id);
  // const rec = await getRecommendationsAPI(params.id);
  // const recomendations = await rec?.data.slice(0, 25).map((it) => {
  //   return it.entry;
  // });
  //console.log(recomendations);
  //const videos = getVideosAPI(params.Id);
  //console.log(videos?.data);
  let rating = details?.data?.rating;
  const renum = ["G", "PG-13", "PG", "R - 17+", "R+", "Rx"];
  if (rating) {
    let i;
    for (i = 0; i < 6; i++) if (rating.startsWith(renum[i])) break;
    rating = renum[i].replace(" ", "");
  }
  return (
    <>
      {/* <Print data={session} /> */}
      <div className="flex flex-col flex-wrap items-center  justify-center gap-8 p-4 md:flex-row md:items-start md:justify-normal lg:flex-nowrap">
        <Image
          className="object-cover "
          src={details?.data?.images.jpg.large_image_url}
          height={300}
          width={220}
          priority={true}
          alt="animeImage"
        />
        <div className=" relative flex flex-col items-center gap-3 md:max-w-[calc(100vw-301px)] md:items-start">
          <h4 className=" text-2xl font-bold ">
            {details?.data?.title_english
              ? details?.data?.title_english
              : details?.data?.title}
          </h4>
          <div className="flex flex-nowrap items-center gap-[2px] py-2 text-sm ">
            <AiTwotoneStar className="text-base text-yellow-400" />
            <span className="pr-2 text-base">{details?.data?.score}</span>
            {rating && (
              <span className=" whitespace-nowrap rounded-l border-gray-300 bg-amber-200 p-[3px] px-1  dark:bg-amber-400">
                {rating}
              </span>
            )}

            <span className="  border-gray-300 bg-teal-200 p-[3px] px-1  dark:bg-teal-400">
              #{details?.data?.rank}
            </span>
            <span className="flex items-center border-gray-300 bg-slate-300 p-[3px] px-1  dark:bg-slate-500">
              <BiSolidUser className="text-sm" />
              {formatCompactNumber(details?.data?.members)}
            </span>
            <span className=" flex items-center gap-[2px] rounded-r bg-gray-400 p-[3px] px-1 text-white dark:bg-gray-700 dark:text-white ">
              <GiClapperboard className=" text-sm " />
              {details?.data?.episodes}
            </span>
            <span className="mx-2 ">
              {details?.data?.duration.slice(0, 6).replace(" ", "")}
            </span>
            <div className=" rounded bg-yellow-400 px-1">
              {details?.data?.type}
            </div>
          </div>
          <div className="my-2 flex justify-center gap-3 p-2 px-3 text-base md:justify-start">
            {details?.data?.trailer?.embed_url && (
              <PlayButton video={details?.data?.trailer?.embed_url}>
                <BsFillPlayFill size={24} className="ml-2" />
                <span className="py-[2px] pr-3">Watch now</span>
              </PlayButton>
            )}
            <AddButton anime={details?.data} />
          </div>
          <p className="scrollbar-hide max-h-52 overflow-scroll pt-1 text-sm text-gray-900 dark:text-gray-300 md:max-h-32">
            {details?.data?.synopsis}
          </p>
        </div>
        <div className="Aalign-middle my-auto mr-auto flex min-w-[250px] flex-col gap-2 pt-1 text-[13px] text-gray-900 dark:text-gray-300 lg:ml-auto lg:mr-0">
          <p>
            <span className="font-semibold text-black dark:text-gray-100">
              {"Japanese: "}
            </span>
            {details?.data?.title_japanese}
          </p>
          {details?.data?.title_synonyms.length !== 0 && (
            <p>
              <span className="font-semibold text-black dark:text-gray-100">
                {"Synonyms: "}
              </span>
              {details?.data?.title_synonyms.join(", ")}
            </p>
          )}

          <p>
            <span className="font-semibold text-black dark:text-gray-100">
              {"Popularity: "}
            </span>
            {"#" + details?.data?.popularity}
          </p>
          <p>
            <span className="font-semibold text-black dark:text-gray-100">
              {"Status: "}
            </span>
            {details?.data?.status}
          </p>
          <p>
            <span className="font-semibold text-black dark:text-gray-100">
              {"Aired: "}
            </span>
            {details?.data?.aired.string}
          </p>
          <p>
            <span className="font-semibold text-black dark:text-gray-100">
              {"Premiered: "}
            </span>
            {details?.data?.season + " " + details?.data?.year}
          </p>
          <p>
            <span className="font-semibold text-black dark:text-gray-100">
              {"Genres: "}
            </span>
            {details?.data?.genres.map((object) => object.name).join(", ")}
          </p>
          <p>
            <span className="font-semibold text-black dark:text-gray-100">
              {"Studios: "}
            </span>
            {details?.data?.studios.map((object) => object.name).join(", ")}
          </p>
          <p>
            <span className="font-semibold text-black dark:text-gray-100">
              {"Producers: "}
            </span>
            {details?.data?.producers.map((object) => object.name).join(", ")}
          </p>
        </div>
      </div>
      <GetRecommendations Id={params.id} />
    </>
  );
};

export default Page;
