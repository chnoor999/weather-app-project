import { Image, StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const ForecastDetailItem = ({ imagePath, text }) => {
  return (
    <View style={styles.detialContainer}>
      <Image style={styles.image} source={imagePath} />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default memo(ForecastDetailItem);

const styles = StyleSheet.create({
  detialContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: hp("3.8%"),
    height: hp("3.8%"),
  },
  text: {
    fontSize: hp("1.8%"),
    color: "#fff",
    fontFamily: "openSans",
  },
});
