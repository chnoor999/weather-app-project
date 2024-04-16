import { StyleSheet, View } from "react-native";
import * as Progress from "react-native-progress";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Screen from "../../screens/Screen";

const LoadingOverlay = () => {
  return (
    <Screen>
      <View style={styles.container}>
        <Progress.Circle
          size={hp("8%")}
          borderWidth={4}
          color="#fff"
          indeterminate={true}
          endAngle={0.8}
        />
      </View>
    </Screen>
  );
};

export default LoadingOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
});
