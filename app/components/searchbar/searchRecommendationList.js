import { Alert, StyleSheet } from "react-native";
import { memo, useCallback, useEffect, useMemo } from "react";
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
  onPress,
  setInitialSearchRecommendation,
  showInitialSearchRecommendation,
}) => {
  const dataLength = useMemo(() => data.length, [data]);
  const height = useSharedValue(0);

  const searchRecommendationListHandler = useCallback(async (item) => {
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
    onPress();
    setInitialSearchRecommendation((pre) => {
      if (pre.some((mapItem) => mapItem.id === item.id)) {
        return pre;
      } else {
        return [{ ...item, type: "recent" }, ...pre];
      }
    });
  }, []);

  const deleteSearchHistory = (id) => {
    setInitialSearchRecommendation((pre) => {
      return pre.filter((filterItem) => filterItem.id != id);
    });
  };

  useEffect(() => {
    height.value = withTiming(0, {
      duration: 250,
    });

    if (!showInitialSearchRecommendation) return;

    height.value = withTiming(hp("5.6%") * dataLength, {
      duration: 250,
    });
  }, [dataLength, showInitialSearchRecommendation]);

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
    width: wp("90%"),
    marginHorizontal: wp("5%"),
    backgroundColor: "#e1e1e1ff",
    borderRadius: 15,
    overflow: "hidden",
  },
});

export default memo(SearchRecommendationList);
