import { StyleSheet, Text } from "react-native";
import { memo, useEffect, useState } from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { getCurrentRegionTimeDate } from "../../utils/date";
import { useForecastData } from "../../store/forecastData-context";
import Animated, { FadeInDown } from "react-native-reanimated";

const DateAndTime = () => {
  const { data } = useForecastData();
  const [formatedTime, setFormatedTime] = useState("");

  useEffect(() => {
    setFormatedTime(getCurrentRegionTimeDate(data?.location?.tz_id));
  }, [data]);

  useEffect(() => {
    const time = setTimeout(() => {
      setFormatedTime(getCurrentRegionTimeDate(data?.location?.tz_id));
    }, 60000);

    return () => clearTimeout(time);
  }, [formatedTime]);

  return (
    <Animated.View entering={FadeInDown.delay(200)}>
      <Text style={styles.timeAndDate}>{formatedTime}</Text>
    </Animated.View>
  );
};

export default memo(DateAndTime);

const styles = StyleSheet.create({
  timeAndDate: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "openSans",
    fontSize: hp("1.8%"),
  },
});
