import { StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { getForecast } from "../utils/weather";

import SearchBar from "../components/SearchBar";
import ForeCast from "../components/ForeCast";

export default function HomeScreen() {
  const [seacrhQuery, setSearchQuery] = useState("");
  const [forecastData, setForecastData] = useState("");

  const forecastHandler = async () => {
    const res = await getForecast("china");
    setForecastData(res);
  };

  useEffect(() => {
    forecastHandler();
  }, []);

  return (
    <>
      <SearchBar />
      <ForeCast data={forecastData} />
    </>
  );
}

const styles = StyleSheet.create({});
