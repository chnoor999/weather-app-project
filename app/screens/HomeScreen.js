import { ScrollView, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { getForecast, getSearchRecommendation } from "../utils/weather";
import { useForecastData } from "../store/forecastData-context";

import SearchBar from "../components/searchbar/SearchBar";
import ForeCast from "../components/forecast/ForeCast";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import Screen from "./Screen";
import SearchRecommendationList from "../components/searchbar/searchRecommendationList";

export default function HomeScreen() {
  const { setData } = useForecastData();

  const [seacrhQuery, setSearchQuery] = useState("");
  const [searchRecommendation, setSearchRecommendation] = useState([]);
  const [intialsearchRecommendation, setIntialSearchRecommendation] = useState([
    { id: "useCurrentCity", name: "Use Current City" },
  ]);
  const [forecastCity, setForecastCity] = useState("lahore");
  const [isLoading, setIsLoading] = useState(false);
  const [appIsReady, setAppIsready] = useState(false);
  const [showIntialSearchRecommendation, setShowIntialSearchRecommendation] =
    useState(false);

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
    if (seacrhQuery) {
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
        searchRecommendation={
          seacrhQuery
            ? searchRecommendation
            : showIntialSearchRecommendation && intialsearchRecommendation
        }
        setForecastCity={setForecastCity}
        searchAutocomplete={searchAutocomplete}
        setShowIntialSearchRecommendation={setShowIntialSearchRecommendation}
      />
      <ForeCast />
    </Screen>
  );
}

const styles = StyleSheet.create({});
