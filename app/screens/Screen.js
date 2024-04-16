import { ImageBackground, SafeAreaView, StyleSheet } from "react-native";
import { memo } from "react";

import Constants from "expo-constants";

const Screen = ({ children,style }) => {
  return (
    <ImageBackground
      blurRadius={100}
      style={styles.bg}
      source={require("../assets/images/bg.jpg")}
    >
      <SafeAreaView style={[styles.screen,style]}>{children}</SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    position:"relative",
    zIndex:100
  },
  screen: {
    flex:1,
    paddingTop: Constants.statusBarHeight,
    borderWidth:1
  },
});

export default memo(Screen);
