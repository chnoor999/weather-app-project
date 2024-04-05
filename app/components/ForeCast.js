import { Image, StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import ForecastDetail from "./forecast/ForecastDetail";
import ForecastList from "./forecast/ForecastList";

const ForeCast = ({ data }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.location}>
        {data?.location?.name},
        <Text style={styles.locationCountry}>
          {" " + data?.location?.country}
        </Text>
      </Text>
      <Image
        style={styles.image}
        source={{ uri: `https://${data?.current?.condition?.icon}` }}
      />
      <Text style={styles.degree}>{data?.current?.temp_c}&#176;</Text>
      <Text style={styles.condition}>{data?.current?.condition?.text}</Text>
      <ForecastDetail data={data} />
      <ForecastList data={data} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  location: {
    textAlign: "center",
    fontSize: hp("2.5%"),
    color: "#fff",
    fontFamily: "openSansSemiBold",
    paddingVertical: hp("1%"),
  },
  locationCountry: {
    color: "#ffffffd5",
    fontFamily: "openSans",
  },
  image: {
    width: hp("25%"),
    height: hp("30%"),
    alignSelf: "center",
    marginVertical: hp("3%"),
  },
  degree: {
    fontSize: hp("5%"),
    color: "#fff",
    textAlign: "center",
    fontFamily: "openSansBold",
  },
  condition: {
    color: "#ffffffd5",
    textAlign: "center",
    fontFamily: "openSans",
    fontSize: hp("2.5%"),
    marginBottom: hp("3%"),
  },
});

export default memo(ForeCast);
