import { StyleSheet, View } from "react-native";
import { memo } from "react";
import { AntDesign } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const DeleteListButton = () => {
  return (
    <View style={styles.container}>
      <AntDesign name="delete" size={hp("2.5%")} color="#fff" />
    </View>
  );
};

export default memo(DeleteListButton);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "tomato",
    alignItems: "flex-end",
    justifyContent: "center",
    paddingRight: wp("3.2%"),
  },
});
