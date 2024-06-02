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

  const [searchQuery, setSearchQuery] = useState("");
  const [searchRecommendation, setSearchRecommendation] = useState([]);
  const [forecastCity, setForecastCity] = useState("");
  const [searchError, setSearchError] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showInitialSearchRecommendation, setShowInitialSearchRecommendation] =
    useState(false);
  const [initialSearchRecommendation, setInitialSearchRecommendation] = useState([
    {
      type: "currentLocation",
      id: "useCurrentCity",
      name: "Use Current Location",
    },
  ]);

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
        AsyncStorage.setItem("currentCity", JSON.stringify(currentCoords));
        setForecastCity(`${currentCoords.name}, ${currentCoords.country}`);
      }
    } catch (err) {
      Alert.alert("Error", "Error occurred, Try Again Later!");
    }
  };

  useEffect(() => {
    if (forecastCity) {
      forecastHandler(forecastCity);
    } else {
      fetchCurrentCity();
    }
  }, [forecastCity]);

  const searchAutocomplete = async (searchText) => {
    try {
      const res = await getSearchRecommendation(searchText);
      if (res) {
        setSearchRecommendation(res);
      }
    } catch (err) {
      setSearchError([{ id: "searchError", name: "no results found" }]);
    }
  };

  useEffect(() => {
    if (searchQuery) {
      searchAutocomplete(searchQuery);
    } else {
      setSearchRecommendation([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    (async () => {
      try {
        const res = await AsyncStorage.getItem("searchHistory");
        if (res) {
          setInitialSearchRecommendation(JSON.parse(res));
        }
      } catch (err) {
        Alert.alert("Error", "Error occurred, Try Again Later!");
      }
    })();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(
      "searchHistory",
      JSON.stringify(initialSearchRecommendation)
    );
  }, [initialSearchRecommendation]);

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <Screen>
      <SearchBar
        setSearchQuery={setSearchQuery}
        setSearchRecommendation={setSearchRecommendation}
        setForecastCity={setForecastCity}
        setShowInitialSearchRecommendation={setShowInitialSearchRecommendation}
        setInitialSearchRecommendation={setInitialSearchRecommendation}
        searchRecommendation={
          searchQuery.length >= 1 &&
          searchRecommendation.length == 0 &&
          searchError.length
            ? searchError
            : searchQuery
            ? searchRecommendation
            : showInitialSearchRecommendation && initialSearchRecommendation
        }
        showInitialSearchRecommendation={showInitialSearchRecommendation}
      />
      <ForeCast />
    </Screen>
  );
};

export default memo(HomeScreen);
