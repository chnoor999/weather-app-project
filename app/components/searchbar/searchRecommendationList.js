import { Alert, StyleSheet } from "react-native";
import React, { memo, useEffect, useMemo } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";
import { getCurrentCity } from "../../utils/location";

import AsyncStorage from "@react-native-async-storage/async-storage";
import SearchRecommendationItem from "./SearchRecommendationItem";
import DeleteListButton from "./DeleteListButton";

const SearchRecommendationList = ({
  data,
  setForecastCity,
  setSearchQuery,
  setSearchRecommendation,
  onPress,
  setIntialSearchRecommendation,
}) => {
  const dataLength = useMemo(() => data.length, [data]);
  const height = useSharedValue(0);

  const searchRecommendationListHandler = async (item) => {
    if (item?.id === "useCurrentCity") {
      try {
        const currentCoords = await getCurrentCity();
        if (!currentCoords) {
          return;
        }
        AsyncStorage.setItem("currentCity", JSON.stringify(currentCoords));
        item = currentCoords;
      } catch (err) {
        Alert.alert(
          "Failed",
          "Fail to Fetch Current Location. Please try again later."
        );
        return;
      }
    }
    setForecastCity(item.name + " " + item.country);
    setSearchQuery("");
    setSearchRecommendation([]);
    onPress();
    setIntialSearchRecommendation((pre) => {
      if (pre.some((mapItem) => mapItem.id === item.id)) {
        return pre;
      } else {
        return [{ ...item, type: "recent" }, ...pre];
      }
    });
  };

  const deleteSearchHistory = (id) => {
    setIntialSearchRecommendation((pre) => {
      return pre.filter((filterItem) => filterItem.id != id);
    });
  };

  const recommendationLength = useMemo(() => data.length, [data]);

  useEffect(() => {
    height.value = withTiming(hp("5.5%") * recommendationLength, {
      duration: 250,
    });
  }, [recommendationLength]);

  return (
    <Animated.View style={[styles.container, { height }]}>
      {data &&
        data?.map((item, index) => {
          return (
            <SearchRecommendationItem
              item={item}
              index={index}
              dataLength={dataLength}
              onPress={() =>
                item.id != "searchError" &&
                searchRecommendationListHandler(item)
              }
              key={item?.id}
              onSwipeableWillOpen={() => deleteSearchHistory(item?.id)}
              renderRightActions={() =>
                item.type == "recent" && <DeleteListButton />
              }
            />
          );
        })}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: hp("11.5%"),
    width: wp("90%"),
    marginHorizontal: wp("5%"),
    backgroundColor: "#e1e1e1ff",
    borderRadius: 15,
    zIndex: 10,
    overflow: "hidden",
  },
});

export default memo(SearchRecommendationList);
