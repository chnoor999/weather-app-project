import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { memo, useEffect } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Ionicons } from "@expo/vector-icons";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";
import { getCurrentCity } from "../../utils/location";
import { Entypo } from "@expo/vector-icons";

import Swipeable from "react-native-gesture-handler/Swipeable";
import AsyncStorage from "@react-native-async-storage/async-storage";

const searchRecommendationList = ({
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
            <Swipeable renderRightActions={() => {}} key={item.id}>
              <TouchableOpacity
                onPress={() => searchRecommendationListHandler(item)}
              >
                <Animated.View style={[styles.listContainer]}>
                  <Ionicons
                    style={styles.icon}
                    name="location-sharp"
                    size={24}
                    color="grey"
                  />
                  <View style={styles.textContainer}>
                    <Text numberOfLines={1} style={styles.listText}>
                      {item.name}
                      {item.type !== "currentLocation" && ","}
                    </Text>
                    <Text numberOfLines={1} style={styles.listText}>
                      {" "}
                      {item.country}
                    </Text>
                  </View>
                  {item.type == "recent" && (
                    <Entypo
                      name="back-in-time"
                      size={hp("2.2%")}
                      color="grey"
                    />
                  )}
                  {item.type == "currentLocation" && (
                    <Entypo name="location" size={hp("2.2%")} color="grey" />
                  )}
                </Animated.View>
              </TouchableOpacity>
              {dataLength - 1 != index && (
                <View style={styles.ItemSeparatorComponent} />
              )}
            </Swipeable>
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
  listContainer: {
    flexDirection: "row",
    paddingVertical: hp("1.2%"),
    paddingHorizontal: hp("1.5%"),
    alignItems: "center",
  },
  icon: {
    marginRight: hp("1.5%"),
  },
  textContainer: {
    flexDirection: "row",
    flex: 1,
    maxWidth: wp("72%"),
    overflow: "hidden",
  },
  listText: {
    fontSize: hp("2%"),
    fontFamily: "openSans",
  },
  ItemSeparatorComponent: {
    borderBottomWidth: 1,
    borderColor: "#00000052",
  },
});

export default memo(searchRecommendationList);
