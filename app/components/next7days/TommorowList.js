import { Image, StyleSheet, Text, View } from "react-native";
import { memo } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { FadeInDown } from "react-native-reanimated";

import ForecastDetail from "../forecast/ForecastDetail";
import LineNumberedText from "../ui/LineNumberedText";

const TommorowList = ({ conditionIcon, temp, conditionText, data, index }) => {
  return (
    <Animated.View
      entering={FadeInDown.delay(100 * (index + 1))}
      style={styles.container}
    >
      <View style={styles.firstContentContainer}>
        <Image
          style={styles.image}
          source={{ uri: "https://" + conditionIcon }}
        />
        <View style={styles.textContainer}>
          <Text style={styles.text}>Tommorow</Text>
          <Text style={[styles.text, styles.temp]}>{temp}&#176;</Text>
          <LineNumberedText style={styles.text}>
            {conditionText}
          </LineNumberedText>
        </View>
      </View>
      <ForecastDetail isForNext7Days data={data} />
    </Animated.View>
  );
};

export default memo(TommorowList);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff14",
    borderRadius: 25,
    padding: hp("2%"),
  },
  firstContentContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: wp("15%"),
  },
  image: {
    width: hp("15%"),
    height: hp("15%"),
  },
  textContainer: {
    gap: hp("1%"),
    width:wp(35)
  },
  text: {
    color: "#fff",
    fontSize: hp("2%"),
    fontFamily: "openSans",
  },
  temp: {
    fontFamily: "openSansBold",
  },
});
