import { StyleSheet, TouchableOpacity } from "react-native";
import { memo } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import Animated, { FadeInDown } from "react-native-reanimated";

const BackButton = () => {
  const navigation = useNavigation();

  return (
    <Animated.View entering={FadeInDown.delay(100)}>
      <TouchableOpacity
        style={styles.container}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={hp("2.8%")} color="#fff" />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default memo(BackButton);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff4f",
    borderRadius: 50,
    width: hp("6%"),
    height: hp("6%"),
    alignItems: "center",
    justifyContent: "center",
    marginLeft: wp("5%"),
    marginTop: hp("0.8%"),
  },
});
