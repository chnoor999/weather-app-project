import { StyleSheet, View } from "react-native";
import { memo } from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

import Screen from "../screens/Screen";
import Days7ForecastList from "../components/next7days/Days7ForecastList";
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

export default memo(Next7DaysForeCastScreen);

const styles = StyleSheet.create({
  container: {
    padding: hp("2.5%"),
  },
});
