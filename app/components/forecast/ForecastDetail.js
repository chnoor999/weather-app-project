import { StyleSheet, View } from "react-native";
import React, { memo } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import ForecastDetailItem from "./ForecastDetailItem";

const Forecastdetail = ({ data }) => {
  return (
    <View style={styles.container}>
      <ForecastDetailItem
        imagePath={require("../../assets/images/wind.png")}
        text={data?.current?.wind_kph + "km"}
      />
      <ForecastDetailItem
        imagePath={require("../../assets/images/drop.png")}
        text={data?.current?.humidity + "%"}
      />
      <ForecastDetailItem
        imagePath={require("../../assets/images/rain.png")}
        text={data?.forecast?.forecastday[0]?.day.daily_chance_of_rain + "%"}
      />
    </View>
  );
};

export default memo(Forecastdetail);

const styles = StyleSheet.create({
  container: {
    padding: hp("1%"),
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
