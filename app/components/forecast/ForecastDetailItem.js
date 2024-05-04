import { Image, StyleSheet, Text } from "react-native";
import { memo } from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Animated, { FadeInDown } from "react-native-reanimated";

const ForecastDetailItem = ({ imagePath, text, isForNext7Days }) => {
  return (
    <Animated.View
      entering={!isForNext7Days && FadeInDown.delay(400)}
      style={styles.detialContainer}
    >
      <Image style={styles.image} source={imagePath} />
      <Text style={styles.text}>{text}</Text>
    </Animated.View>
  );
};

export default memo(ForecastDetailItem);

const styles = StyleSheet.create({
  detialContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: hp("0.5%"),
  },
  image: {
    width: hp("3%"),
    height: hp("3%"),
  },
  text: {
    fontSize: hp("1.8%"),
    color: "#fff",
    fontFamily: "openSans",
  },
});
