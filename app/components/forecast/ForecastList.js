import { memo, useMemo } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { FadeInDown } from "react-native-reanimated";
import { formatTime } from "../../utils/date";
import { useNavigation } from "@react-navigation/native";
import { useForecastData } from "../../store/forecastData-context";

import Animated from "react-native-reanimated";
import ForecastListItem from "./ForecastListItem";

const ForecastList = () => {
  const { data } = useForecastData();
  const navigation = useNavigation();

  const filteringListWithHours = useMemo(
    () =>
      data?.forecast?.forecastday[0]?.hour?.filter((item) => {
        const now = new Date(data.location.localtime).getHours();
        const listTime = new Date(item.time).getHours();
        return now <= listTime;
      }),
    [data]
  );

  return (
    <View style={styles.container}>
      <Animated.View
        entering={FadeInDown.delay(450)}
        style={styles.labelContainer}
      >
        <Text style={styles.label}>Today</Text>
        <TouchableOpacity
          style={styles.next7DaysContainer}
          onPress={() => navigation.navigate("next7Days")}
        >
          <Text style={styles.next7Day}>Next 7 days</Text>
          <MaterialIcons
            name="navigate-next"
            style={styles.nextIcon}
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
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => {
            const nowTime = new Date(data.location.localtime).getHours();
            const listTime = new Date(item.time).getHours();
            const isNow = nowTime == listTime;

            return (
              <ForecastListItem
                time={isNow ? "NOW" : formatTime(item?.time)}
                imageUrl={item?.condition?.icon}
                temp={item?.temp_c}
                index={index}
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
  },
  next7Day: {
    fontSize: hp("1.5%"),
    color: "#fff",
    fontFamily: "openSans",
    marginRight: hp("0.5%"),
  },
  nextIcon: {
    marginTop: hp("0.3%"),
  },
});

export default memo(ForecastList);
