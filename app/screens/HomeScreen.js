import { Alert } from "react-native";
import { memo, useEffect, useState } from "react";
import { getForecast, getSearchRecommendation } from "../utils/weather";
import { useForecastData } from "../store/forecastData-context";
import { getCurrentCity } from "../utils/location";

import AsyncStorage from "@react-native-async-storage/async-storage";
import SearchBar from "../components/searchbar/SearchBar";
import ForeCast from "../components/forecast/ForeCast";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import Screen from "./Screen";

const HomeScreen = () => {
  const { setData } = useForecastData();

  const [seacrhQuery, setSearchQuery] = useState("");
  const [searchRecommendation, setSearchRecommendation] = useState([]);
  const [intialsearchRecommendation, setIntialSearchRecommendation] = useState([
    {
      type: "currentLocation",
      id: "useCurrentCity",
      name: "Use Current Location",
    },
  ]);
  const [forecastCity, setForecastCity] = useState("");
  const [showIntialSearchRecommendation, setShowIntialSearchRecommendation] =
    useState(false);
  const [searchError, setSearchError] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const forecastHandler = async (cityName) => {
    try {
      setIsLoading(true);
      const res = await getForecast(cityName);
      setData(res);
      setIsLoading(false);
    } catch (err) {
      Alert.alert("Fail", "Fail to fetch Weather Forecast, Try Again Later!");
    }
  };

  const fetchCurrentCity = async () => {
    try {
      let res = await AsyncStorage.getItem("currentCity");
      if (res) {
        res = JSON.parse(res);
        setForecastCity(`${res.name}, ${res.country}`);
      } else {
        const currentCoords = await getCurrentCity();
        if (!currentCoords) {
          return;
        }
        setForecastCity(`${currentCoords.name}, ${currentCoords.country}`);
      }
    } catch (err) {
      Alert.alert("Error", "Error occured, Try Agian Later!");
    }
  };

  useEffect(() => {
    if (forecastCity) {
      forecastHandler(forecastCity);
    } else {
      fetchCurrentCity();
    }
  }, [forecastCity]);

  const searchAutocomplete = async (seacrhText) => {
    try {
      const res = await getSearchRecommendation(seacrhText);
      if (res) {
        setSearchRecommendation(res);
      }
    } catch (err) {
      setSearchError([{ id: "searchError", name: "no results found" }]);
    }
  };

  useEffect(() => {
    if (seacrhQuery) {
      searchAutocomplete(seacrhQuery);
    } else {
      setSearchRecommendation([]);
    }
  }, [seacrhQuery]);

  useEffect(() => {
    (async () => {
      try {
        const res = await AsyncStorage.getItem("searchHistory");
        if (res) {
          setIntialSearchRecommendation(JSON.parse(res));
        }
      } catch (err) {
        Alert.alert("Error", "Error occured, Try Agian Later!");
      }
    })();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(
      "searchHistory",
      JSON.stringify(intialsearchRecommendation)
    );
  }, [intialsearchRecommendation]);

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <Screen>
      <SearchBar
        seacrhQuery={seacrhQuery}
        setSearchQuery={setSearchQuery}
        setSearchRecommendation={setSearchRecommendation}
        searchRecommendation={
          seacrhQuery.length >= 1 &&
          searchRecommendation.length == 0 &&
          searchError.length
            ? searchError
            : seacrhQuery
            ? searchRecommendation
            : showIntialSearchRecommendation && intialsearchRecommendation
        }
        setForecastCity={setForecastCity}
        searchAutocomplete={searchAutocomplete}
        setShowIntialSearchRecommendation={setShowIntialSearchRecommendation}
        setIntialSearchRecommendation={setIntialSearchRecommendation}
      />
      <ForeCast />
    </Screen>
  );
};

export default memo(HomeScreen);
