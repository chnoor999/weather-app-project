import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";
import { AntDesign } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { FadeInDown } from "react-native-reanimated";

import ForecastListItem from "./ForecastListItem";

const ForecastList = ({ data }) => {
  return (
    <View style={styles.container}>
      <Animated.View
        entering={FadeInDown.delay(300)}
        style={styles.labelContainer}
      >
        <AntDesign name="calendar" size={hp("2.5%")} color="#fff" />
        <Text style={styles.label}>Daily forecast</Text>
      </Animated.View>
      <View>
        <FlatList
          data={data?.forecast?.forecastday}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
            const date = new Date(item?.date);
            const options = { weekday: "long" };
            const dayName = date.toLocaleDateString("en-US", options);

            return (
              <ForecastListItem
                day={dayName}
                imageUrl={item?.day?.condition?.icon}
                temp={item?.day?.avgtemp_c}
              />
            );
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  labelContainer: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
    paddingHorizontal: hp("2%"),
    marginTop: hp("2%"),
  },
  label: {
    fontSize: hp("2%"),
    color: "#ffffffd5",
    fontFamily: "openSans",
  },
});

export default memo(ForecastList);
