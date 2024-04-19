import { StyleSheet } from "react-native";
import React, { memo, useEffect } from "react";
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
  setCurrentCity,
  setIntialSearchRecommendation,
}) => {
  const dataLength = data.length;
  const height = useSharedValue(0);

  const searchRecommendationListHandler = async (item) => {
    if (item?.id === "useCurrentCity") {
      const currentCoords = await getCurrentCity();
      AsyncStorage.setItem("currentCity", JSON.stringify(currentCoords));
      setCurrentCity(currentCoords);
      item = currentCoords;
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

  const recommentdationLength = data.length;

  useEffect(() => {
    height.value = withTiming(hp("5.5%") * recommentdationLength, {
      duration: 250,
    });
  }, [recommentdationLength]);

  return (
    <Animated.View style={[styles.container, { height }]}>
      {data &&
        data?.map((item, index) => {
          return (
            <SearchRecommendationItem
              item={item}
              index={index}
              dataLength={dataLength}
              onPress={() => searchRecommendationListHandler(item)}
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
