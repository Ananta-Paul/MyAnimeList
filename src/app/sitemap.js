import {
  getMostPopularAPI,
  getTopAiringAPI,
  getTopUpcomingAPI,
  getSeasonAPI,
} from "@/config/index";
export default async function sitemap() {
  const a = await getMostPopularAPI();
  const b = await getTopAiringAPI();
  const c = await getTopUpcomingAPI();
  const d = await getSeasonAPI();

  const animes = [
    ...a?.data,
    ...b?.data,
    ...c?.data,
    ...d?.data,
    ...b?.data,
    ...c?.data,
    ...d?.data,
  ].map(({ mal_id, aired }) => ({
    url: `${process.env.NEXTAUTH_URL}/info/${mal_id}`,
    lastModified: aired?.to || new Date().toISOString(),
  }));

  return [
    {
      url: `${process.env.NEXTAUTH_URL}`,
      lastModified: new Date().toISOString(),
    },
    ...animes,
  ];
}
