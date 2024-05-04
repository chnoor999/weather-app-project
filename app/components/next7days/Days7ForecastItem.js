import { Image, StyleSheet, Text, View } from "react-native";
import { memo } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { FadeInDown } from "react-native-reanimated";

import LineNumberedText from "../ui/LineNumberedText";

const Days7ForecastItem = ({
  day,
  conditionText,
  temp,
  index,
  conditionIcon,
}) => {
  return (
    <Animated.View
      entering={FadeInDown.delay(100 * (index + 1))}
      style={styles.listContainer}
    >
      <Text style={[styles.text, styles.day]}>{day}</Text>
      <View style={styles.contentContainer}>
        <View style={styles.conditionsContainer}>
          <Image
            style={styles.image}
            source={{ uri: "https://" + conditionIcon }}
          />
          <LineNumberedText style={[styles.text, styles.condition]}>
            {conditionText}
          </LineNumberedText>
        </View>
        <Text style={[styles.text, styles.temp]}>{temp}&#176;</Text>
      </View>
    </Animated.View>
  );
};

export default memo(Days7ForecastItem);

const styles = StyleSheet.create({
  listContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: hp("10%"),
  },
  contentContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  conditionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: hp("1.5%"),
  },
  image: {
    width: hp("5%"),
    height: hp("5%"),
  },
  text: {
    color: "#fff",
    fontSize: hp("1.8%"),
    fontFamily: "openSans",
  },
  day: {
    width: hp("6%"),
  },
  temp: {
    fontFamily: "openSansBold",
  },
  condition: {
    width: wp("50%"),
  },
});
