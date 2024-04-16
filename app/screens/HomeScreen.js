import { StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { getForecast, getSearchRecommendation } from "../utils/weather";

import SearchBar from "../components/searchbar/SearchBar";
import ForeCast from "../components/forecast/ForeCast";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import Screen from "./Screen";
import { useForecastData } from "../store/forecastData-context";

export default function HomeScreen() {
  const { setData } = useForecastData();

  const [seacrhQuery, setSearchQuery] = useState("");
  const [searchRecommendation, setSearchRecommendation] = useState([]);
  const [forecastCity, setForecastCity] = useState("lahore");
  const [isLoading, setIsLoading] = useState(false);
  const [appIsReady, setAppIsready] = useState(false);

  const forecastHandler = async (cityName) => {
    setIsLoading(true);
    const res = await getForecast(cityName);
    setData(res);
    setAppIsready(true);
    setIsLoading(false);
  };

  useEffect(() => {
    forecastHandler(forecastCity);
  }, [forecastCity]);

  const searchAutocomplete = async (seacrhText) => {
    const res = await getSearchRecommendation(seacrhText);
    setSearchRecommendation(res);
  };

  useEffect(() => {
    if (seacrhQuery.length > 2) {
      searchAutocomplete(seacrhQuery);
    } else {
      setSearchRecommendation([]);
    }
  }, [seacrhQuery]);

  if (isLoading || !appIsReady) {
    return <LoadingOverlay />;
  }

  return (
    <Screen>
      <SearchBar
        seacrhQuery={seacrhQuery}
        setSearchQuery={setSearchQuery}
        setSearchRecommendation={setSearchRecommendation}
        searchRecommendation={searchRecommendation}
        setForecastCity={setForecastCity}
        searchAutocomplete={searchAutocomplete}
      />
      <ForeCast/>
    </Screen>
  );
}

const styles = StyleSheet.create({});
