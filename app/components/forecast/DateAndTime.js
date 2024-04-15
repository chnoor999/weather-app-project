import { StyleSheet, Text, View } from "react-native";
import React, { memo, useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { getCurrentRegionTimeDate } from "../../utils/date";

const DateAndTime = ({ data }) => {
  const [formatedTime, setFormatedTime] = useState("");

  useEffect(() => {
    if (!formatedTime) {
      setFormatedTime(getCurrentRegionTimeDate(data?.location?.tz_id));
      return;
    }

    setFormatedTime(getCurrentRegionTimeDate(data?.location?.tz_id));
  }, [data]);

  useEffect(() => {
    const time = setTimeout(() => {
      setFormatedTime(getCurrentRegionTimeDate(data?.location?.tz_id));
    }, 60000);

    return () => clearTimeout(time);
  }, [formatedTime]);

  return (
    <View>
      <Text style={styles.timeAndDate}>{formatedTime}</Text>
    </View>
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
