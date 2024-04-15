import {
  FlatList,
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
import Animated, {
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const searchRecommendationList = ({
  data,
  setForecastCity,
  setSearchQuery,
  setSearchRecommendation,
  onPress,
}) => {
  const height = useSharedValue(0);

  const searchRecommendationListHandler = (item) => {
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

  return (
    <Animated.View style={[styles.container, { height }]}>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={searchRecommendationListHandler.bind(this, item)}
            >
              <Animated.View style={[styles.listContainer]}>
                <Ionicons
                  style={styles.icon}
                  name="location-sharp"
                  size={24}
                  color="grey"
                />
                <Text style={styles.listText}>{item.name},</Text>
                <Text style={styles.listText}> {item.country}</Text>
              </Animated.View>
            </TouchableOpacity>
          );
        }}
        ItemSeparatorComponent={<View style={styles.ItemSeparatorComponent} />}
      />
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