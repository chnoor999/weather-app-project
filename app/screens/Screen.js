import { ImageBackground, SafeAreaView, StyleSheet } from "react-native";
import { memo } from "react";

import Constants from "expo-constants";

const Screen = ({ children }) => {
  return (
    <ImageBackground
      blurRadius={100}
      style={styles.bg}
      source={require("../assets/images/bg.jpg")}
    >
      <SafeAreaView style={styles.screen}>{children}</SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
  screen: {
    flex:1,
    paddingTop: Constants.statusBarHeight,
    position:"relative",
    zIndex:-10
  },
});

export default memo(Screen);
