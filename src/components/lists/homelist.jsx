import { getSeason } from "@/config";
import Horizontallist, {
  GetMostPopular,
  GetSeasonData,
  GetTopAiring,
  GetTopUpcoming,
} from "./horizontallist";

const HomeList = async ({ handleList }) => {
  // const [mostPopularData, setMostPopularData] = useState();
  // const [topAiringData, setTopAiringData] = useState();
  // const [topSeasonData, setTopSeasonData] = useState();
  // const [topUpcomingData, setTopUpcomingData] = useState();
  // const getData = async () => {
  // const mostPopularData = await getMostPopularAPI();
  // // setMostPopularData(mostPopularData);
  // const topSeasonData = await getSeasonAPI();
  // //setTopSeasonData(topSeasonData);
  // const topAiringData = await getTopAiringAPI();
  // //setTopAiringData(topAiringData);
  // const topUpcomingData = await getTopUpcomingAPI();
  // setTopUpcomingData(topUpcomingData);
  // console.log({
  //   mostPopularData,
  //   topAiringData,
  //   topUpcomingData,
  //   topSeasonData,
  // });
  //};
  // useEffect(() => {
  //   getData();
  // }, []);
  const { season, year } = await getSeason();
  return (
    <>
      <Horizontallist heading={"Most Popular"}>
        <GetMostPopular />
      </Horizontallist>
      <Horizontallist heading={"Top Airing"}>
        <GetTopAiring />
      </Horizontallist>
      <Horizontallist heading={season + " " + year}>
        <GetSeasonData />
      </Horizontallist>
      <Horizontallist heading={"Top Upcoming"}>
        <GetTopUpcoming />
      </Horizontallist>
    </>
  );
};

export default HomeList;
