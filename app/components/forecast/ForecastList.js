import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { memo } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { FadeInDown } from "react-native-reanimated";

import ForecastListItem from "./ForecastListItem";
import { formateTime } from "../../utils/date";

const ForecastList = ({ data }) => {
  const filteringListWithHours = data?.forecast?.forecastday[0].hour.filter(
    (item) => {
      const nowTime = new Date().getHours()
      const listTime = new Date(item?.time).getHours()
      
      return listTime >= nowTime;
    }
  );
  
  return (
    <View style={styles.container}>
      <Animated.View
        entering={FadeInDown.delay(300)}
        style={styles.labelContainer}
      >
        <Text style={styles.label}>Today</Text>
        <TouchableOpacity style={styles.next7DaysContainer}>
          <Text style={styles.next7Day}>Next 7 day</Text>
          <MaterialIcons
            style={styles.nextIcon}
            name="navigate-next"
            size={hp("2.5%")}
            color="#fff"
          />
        </TouchableOpacity>
      </Animated.View>
      <View>
        <FlatList
          data={filteringListWithHours}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
            const listTime = new Date(item?.time).getHours();
            const nowTime = new Date().getHours();

            const isNow = listTime == nowTime;
            return (
              <ForecastListItem
                time={isNow ? "NOW" : formateTime(item?.time_epoch)}
                imageUrl={item?.condition?.icon}
                temp={item?.temp_c}
              />
            );
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  labelContainer: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: hp("2%"),
    marginTop: hp("2%"),
  },
  label: {
    fontSize: hp("2%"),
    color: "#fff",
    fontFamily: "openSansBold",
  },
  next7DaysContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: hp("0.5%"),
  },
  next7Day: {
    fontSize: hp("1.5%"),
    color: "#fff",
    fontFamily: "openSans",
  },
  nextIcon: {
    marginTop: hp("0.3%"),
  },
});

export default memo(ForecastList);
