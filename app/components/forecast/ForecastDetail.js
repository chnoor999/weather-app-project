import { StyleSheet, View } from "react-native";
import { memo } from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

import ForecastDetailItem from "./ForecastDetailItem";

const Forecastdetail = ({ data, isForNext7Days }) => {
  return (
    <View style={styles.container}>
      <ForecastDetailItem
        imagePath={require("../../assets/images/wind.png")}
        text={
          (isForNext7Days ? data.day.maxwind_kph : data?.current?.wind_kph) +
          "km"
        }
        isForNext7Days={isForNext7Days}
      />
      <ForecastDetailItem
        imagePath={require("../../assets/images/drop.png")}
        text={
          (isForNext7Days ? data.day.avghumidity : data?.current?.humidity) +
          "%"
        }
        isForNext7Days={isForNext7Days}
      />
      <ForecastDetailItem
        imagePath={require("../../assets/images/rain.png")}
        text={
          (isForNext7Days
            ? data?.day?.daily_chance_of_rain
            : data?.forecast?.forecastday[0]?.day.daily_chance_of_rain) + "%"
        }
        isForNext7Days={isForNext7Days}
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
