import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { memo } from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Swipeable } from "react-native-gesture-handler";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

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
          <View style={[styles.listContainer]}>
            <Ionicons
              style={styles.icon}
              name="location-sharp"
              size={hp("2.5%")}
              color="grey"
            />
            <View style={styles.textContainer}>
              <Text numberOfLines={1} style={styles.listText}>
                {item.name}
                {item.type !== "currentLocation" &&
                  item.id != "searchError" &&
                  ", "}
                {item.country}
              </Text>
            </View>
            {item.type == "recent" && (
              <Entypo name="back-in-time" size={hp("2.2%")} color="grey" />
            )}
            {item.type == "currentLocation" && (
              <Entypo name="location" size={hp("2.2%")} color="grey" />
            )}
          </View>
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
    paddingHorizontal: hp("1.5%"),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e1e1e1ff",
    height: hp(5.5),
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
