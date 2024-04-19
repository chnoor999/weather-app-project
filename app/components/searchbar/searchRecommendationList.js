import {
  FlatList,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { memo, useEffect } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Ionicons } from "@expo/vector-icons";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";

const searchRecommendationList = ({
  data,
  setForecastCity,
  setSearchQuery,
  setSearchRecommendation,
  onPress,
}) => {
  const height = useSharedValue(0);

  const searchRecommendationListHandler = (item) => {
    if (item?.id === "useCurrentCity") {
      console.log("cureent city");
      return;
    }
    setForecastCity(item.name + " " + item.country);
    setSearchQuery("");
    setSearchRecommendation([]);
    onPress();
  };

  const recommentdationLength = data.length;

  useEffect(() => {
    height.value = withTiming(hp("5.5%") * recommentdationLength, {
      duration: 250,
    });
  }, [recommentdationLength]);

  // const a = new Date().toLocaleString("en-US", { timeZone: "America/Toronto" });
  // const [datePart, timePart] = a.split(", ");
  // const [month, day, year] = datePart.split("/");
  // const [time, meridiem] = timePart.split(" ");
  // const [hours, minutes, seconds] = time.split(":");
  // const adjustedHours = meridiem === "PM" ? parseInt(hours, 10) + 12 : hours;
  // const parsedDate = new Date(year, month - 1, day, adjustedHours, minutes, seconds);
  
  // console.log("Parsed Date:", parsedDate.getTime());

  return (
    <Animated.View style={[styles.container, { height }]}>
      {data &&
        data?.map((item) => {
          return (
            <TouchableOpacity
            key={item.id}
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
                  <Text style={styles.listText}>{item.name},</Text>
                  <Text style={styles.listText}> {item.country}</Text>
                </View>
              </Animated.View>
            </TouchableOpacity>
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
  textContainer:{
    flexDirection: "row",
    // borderWidth:1,
    flex:1,
    maxWidth:wp("72%"),
    overflow:"hidden",
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
