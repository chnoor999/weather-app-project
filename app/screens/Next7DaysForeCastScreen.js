import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Screen from "../screens/Screen";
import Days7ForecastList from "../components/next7days/Days7ForecastList";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import BackButton from "../components/ui/BackButton";

const Next7DaysForeCastScreen = () => {
  return (
    <Screen>
      <BackButton />
      <View style={styles.container}>
        <Days7ForecastList />
      </View>
    </Screen>
  );
};

export default Next7DaysForeCastScreen;

const styles = StyleSheet.create({
  container: {
    padding: hp("2.5%"),
  },
});
