import { Modal, StyleSheet, Text, View } from "react-native";
import * as Progress from "react-native-progress";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const LoadingOverlay = ({ overlay, visible }) => {
  return (
    <Modal visible={visible} transparent={true}>
      <View
        style={[
          styles.container,
          overlay && {
            backgroundColor: "#0000006c",
          },
        ]}
      >
        <Progress.Circle
          size={hp("8%")}
          borderWidth={4}
          color="#fff"
          indeterminate={true}
          endAngle={0.8}
        />
      </View>
    </Modal>
  );
};

export default LoadingOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
