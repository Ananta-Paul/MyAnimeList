import { queueRequest } from "./apiQueue";
import { unstable_cache as cache } from "next/cache";
// import "server-only";
export const getMostPopularAPI = cache(async () => {
  // console.log("modtpop");
  return await queueRequest(
    `https://api.jikan.moe/v4/top/anime?filter=bypopularity&order_by=popularity&limit=25`,
  ).then((res) => res?.json().then((results) => Promise.resolve(results)));
});
export const getTopUpcomingAPI = cache(async () => {
  return await queueRequest(
    `https://api.jikan.moe/v4/top/anime?filter=upcoming&limit=24`,
  ).then((res) => res?.json().then((results) => Promise.resolve(results)));
});
export const getTopAiringAPI = cache(async () => {
  return await queueRequest(
    `https://api.jikan.moe/v4/top/anime?filter=airing&order_by=popularity&limit=24`,
  ).then((res) => res?.json().then((results) => Promise.resolve(results)));
});
export const getRandomCharacterAPI = async () => {
  return await queueRequest(`https://api.jikan.moe/v4/random/characters`).then(
    (res) =>
      res
        .json()
        .then((results) => Promise.resolve(results.data.images.jpg.image_url)),
  );
};
export const getSeason = async () => {
  const date = new Date();
  const currentMonth = date.getMonth() + 1;
  const year = date.getFullYear();
  let season = "";
  if (currentMonth >= 3 && currentMonth <= 5) {
    season = "spring";
  } else if (currentMonth >= 6 && currentMonth <= 8) {
    season = "Summer";
  } else if (currentMonth >= 9 && currentMonth <= 11) {
    season = "Fall";
  } else {
    season = "Winter";
  }
  return { season, year };
};
export const getSeasonAPI = cache(async () => {
  const { season, year } = await getSeason();

  return await queueRequest(
    `https://api.jikan.moe/v4/seasons/${year}/${season}?order_by=popularity&limit=24`,
    {
      // next: { revalidate: 1000 },
    },
  ).then((res) => res?.json().then((results) => Promise.resolve(results)));
});

export const getSearchAPI = async ({
  keyword,
  num,
  order_by,
  sort,
  type,
  status,
  rating,
}) => {
  // "use server";
  //console.log("searching...");
  return queueRequest(
    `https://api.jikan.moe/v4/anime?${keyword ? `q=${keyword}` : ""}${
      num ? `&page=${num}` : ""
    }&sfw${order_by ? `&order_by=${order_by}` : ""}${
      sort ? `&sort=${sort}` : ""
    }${type ? `&type=${sort}` : ""}${status ? `&status=${status}` : ""}${
      rating ? `&rating=${rating}` : ""
    }`,
    { cache: "no-cahce" },
  )
    .then((res) => {
      if (res.ok) {
        return res?.json();
      } else {
        console.log(`Error: ${res.status} ${res.statusText}`);
        throw new Error("Something went wrong!");
      }
    })
    .then((results) => Promise.resolve(results));
};

export const getTodayAPI = async () => {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const d = new Date();
  let day = weekday[d.getDay()];
  return queueRequest(`https://api.jikan.moe/v4/schedules?filter=${day}`).then(
    (res) => res?.json().then((results) => Promise.resolve(results)),
  );
};
export const getRecommendationsAPI = async (id) => {
  return queueRequest(
    `https://api.jikan.moe/v4/anime/${id}/recommendations?order_by=popularity&limit=24`,
  ).then((res) => res?.json().then((results) => Promise.resolve(results)));
};

export const getDetailsAPI = async (id) => {
  return queueRequest(`https://api.jikan.moe/v4/anime/${id}`).then((res) =>
    res?.json().then((results) => Promise.resolve(results)),
  );
};

export const getVideosAPI = async (id) => {
  return queueRequest(`https://api.jikan.moe/v4/anime/${id}/videos`).then(
    (res) => res?.json().then((results) => Promise.resolve(results)),
  );
};

export const getEpisodesAPI = async (id) => {
  return queueRequest(`https://api.jikan.moe/v4/anime/${id}/episodes`).then(
    (res) => res?.json().then((results) => Promise.resolve(results)),
  );
};

export const getReviewsAPI = async (id) => {
  return queueRequest(`https://api.jikan.moe/v4/anime/${id}/reviews`).then(
    (res) => res?.json().then((results) => Promise.resolve(results)),
  );
};

export const getStatAPI = async (id) => {
  return queueRequest(`https://api.jikan.moe/v4/anime/${id}/statistics`).then(
    (res) => res?.json().then((results) => Promise.resolve(results)),
  );
};

export const getCharactersAPI = async (id) => {
  return queueRequest(`https://api.jikan.moe/v4/anime/${id}/characters`).then(
    (res) => res?.json().then((results) => Promise.resolve(results)),
  );
};
export const getStaffAPI = async (id) => {
  return queueRequest(`https://api.jikan.moe/v4/anime/${id}/staff`).then(
    (res) => res?.json().then((results) => Promise.resolve(results)),
  );
};

export const getMoreInfoAPI = cache(async (id) => {
  //console.log("info");
  return queueRequest(`https://api.jikan.moe/v4/anime/${id}/full`).then((res) =>
    res?.json().then((results) => Promise.resolve(results)),
  );
});
export async function formatCompactNumber(number) {
  if (number < 1000) {
    return number;
  } else if (number >= 1000 && number < 1000000) {
    return (number / 1000).toFixed(1) + "K";
  } else if (number >= 1000000 && number < 1000000000) {
    return (number / 1000000).toFixed(1) + "M";
  } else if (number >= 1000000000 && number < 1000000000000) {
    return (number / 1000000000).toFixed(1) + "B";
  } else if (number >= 1000000000000 && number < 1000000000000000) {
    return (number / 1000000000000).toFixed(1) + "T";
  }
}
