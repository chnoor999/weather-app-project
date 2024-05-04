import { Image, StyleSheet, Text, View } from "react-native";
import { memo } from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Animated, { FadeInRight } from "react-native-reanimated";

const ForecastListItem = ({ time, temp, imageUrl, index }) => {
  return (
    <Animated.View
      entering={FadeInRight.delay(100 * index).springify()}
      style={styles.container}
    >
      <Text style={styles.time}>{time}</Text>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: "https://" + imageUrl }} />
      </View>
      <Text style={styles.temp}>{temp}&#176;</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff14",
    borderRadius: 25,
    width: hp("14%"),
    alignItems: "center",
    justifyContent: "center",
    marginVertical: hp("2%"),
    marginHorizontal: hp("1%"),
    padding: hp("1%"),
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: hp("1%"),
  },
  image: {
    width: hp("8%"),
    height: hp("8%"),
  },
  time: {
    fontSize: hp("1.8%"),
    color: "#ffffffe3",
    fontFamily: "openSans",
  },
  temp: {
    fontSize: hp("2.2%"),
    color: "#ffffffe3",
    fontFamily: "openSansSemiBold",
  },
});

export default memo(ForecastListItem);
