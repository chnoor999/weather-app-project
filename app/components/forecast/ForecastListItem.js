import { Image, StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { FadeInDown } from 'react-native-reanimated';

const ForecastListItem = ({ day, temp, imageUrl }) => {
  return (
    <Animated.View entering={FadeInDown.delay(350).springify()} style={styles.container}>
      <Image style={styles.image} source={{ uri: "https://" + imageUrl }} />
      <Text style={styles.day}>{day}</Text>
      <Text style={styles.temp}>{temp}&#176;</Text>
    </Animated.View>
  );
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff14",
    borderRadius: 25,
    width: hp("15%"),
    alignItems: "center",
    justifyContent: "center",
    marginVertical: hp("2%"),
    marginHorizontal: hp("1%"),
  },
  image: {
    width: hp("8%"),
    height: hp("8%"),
    marginVertical: hp("1%"),
  },
  day: {
    fontSize: hp("1.8%"),
    color: "#fff",
    fontFamily: "openSans",
  },
  temp: {
    fontSize: hp("2.4%"),
    color: "#fff",
    fontFamily: "openSansSemiBold",
    marginVertical: hp("1%"),
  },
});

export default memo(ForecastListItem);