import { Image, StyleSheet, Text, View } from "react-native";
import React, { memo, useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { FadeInDown } from "react-native-reanimated";

import ForecastDetail from "./ForecastDetail";
import ForecastList from "./ForecastList";
import DateAndTime from "./DateAndTime";

const ForeCast = ({ data }) => {
  const [lineNoWeatherText, setLineNoWeatherText] = useState(1);

  return (
    <View style={styles.container}>
      <Animated.Text entering={FadeInDown.delay(100)} style={styles.location}>
        {data?.location?.name},
        <Text style={styles.locationCountry}>
          {" " + data?.location?.country}
        </Text>
      </Animated.Text>
      <DateAndTime data={data} />
      <View style={styles.imageContainer}>
        <Animated.Image
          entering={FadeInDown.delay(150)}
          style={styles.image}
          source={{ uri: `https://${data?.current?.condition?.icon}` }}
        />
      </View>
      <View style={styles.WeatherInfoContainer}>
        <Animated.Text entering={FadeInDown.delay(200)} style={styles.degree}>
          {data?.current?.temp_c}&#176;
        </Animated.Text>
        <Animated.Text
          entering={FadeInDown.delay(200)}
          style={styles.condition}
          numberOfLines={lineNoWeatherText}
          onPress={() => setLineNoWeatherText((pre) => (pre === 1 ? 0 : 1))}
        >
          {data?.current?.condition?.text}
        </Animated.Text>
      </View>
      <ForecastDetail data={data} />
      <ForecastList data={data} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  location: {
    textAlign: "center",
    fontSize: hp("2.5%"),
    color: "#fff",
    fontFamily: "openSansSemiBold",
    paddingVertical: hp("1%"),
  },
  locationCountry: {
    color: "#fff",
    fontFamily: "openSans",
  },
  imageContainer: {
    marginVertical: hp("2%"),
  },
  image: {
    width: hp("25%"),
    height: hp("30%"),
    alignSelf: "center",
  },
  WeatherInfoContainer: {
    paddingHorizontal: hp("2.5%"),
  },
  degree: {
    fontSize: hp("5%"),
    color: "#fff",
    textAlign: "center",
    fontFamily: "openSansBold",
  },
  condition: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "openSans",
    fontSize: hp("2.5%"),
    marginBottom: hp("3%"),
  },
});

export default memo(ForeCast);
