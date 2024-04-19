import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { memo } from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Swipeable } from "react-native-gesture-handler";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import Animated from "react-native-reanimated";

const SearchRecommendationItem = ({
  item,
  index,
  dataLength,
  onPress,
  onSwipeableWillOpen,
  renderRightActions,
}) => {
  return (
    <>
      <Swipeable
        onSwipeableWillOpen={onSwipeableWillOpen}
        renderRightActions={renderRightActions}
        overshootRight={false}
      >
        <TouchableOpacity onPress={onPress}>
          <Animated.View style={[styles.listContainer]}>
            <Ionicons
              style={styles.icon}
              name="location-sharp"
              size={24}
              color="grey"
            />
            <View style={styles.textContainer}>
              <Text numberOfLines={1} style={styles.listText}>
                {item.name}
                {item.type !== "currentLocation" && ","}
              </Text>
              <Text numberOfLines={1} style={styles.listText}>
                {" "}
                {item.country}
              </Text>
            </View>
            {item.type == "recent" && (
              <Entypo name="back-in-time" size={hp("2.2%")} color="grey" />
            )}
            {item.type == "currentLocation" && (
              <Entypo name="location" size={hp("2.2%")} color="grey" />
            )}
          </Animated.View>
        </TouchableOpacity>
      </Swipeable>
      {dataLength - 1 != index && (
        <View style={styles.ItemSeparatorComponent} />
      )}
    </>
  );
};

export default memo(SearchRecommendationItem);

const styles = StyleSheet.create({
  listContainer: {
    flexDirection: "row",
    paddingVertical: hp("1.2%"),
    paddingHorizontal: hp("1.5%"),
    alignItems: "center",
    backgroundColor: "#e1e1e1ff",
  },
  icon: {
    marginRight: hp("1.5%"),
  },
  textContainer: {
    flexDirection: "row",
    flex: 1,
    marginRight: hp("1.5%"),
    overflow: "hidden",
  },
  listText: {
    fontSize: hp("2%"),
    fontFamily: "openSans",
  },
  ItemSeparatorComponent: {
    borderBottomWidth: 1,
    borderColor: "#00000052",
  },
});
