import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import React, { memo, useState } from "react";
import Animated, {
  FadeInDown,
  FadeInLeft,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { AntDesign } from "@expo/vector-icons";

import SearchRecommendationList from "./searchRecommendationList";

const SearchBar = ({
  seacrhQuery,
  setSearchQuery,
  setSearchRecommendation,
  searchRecommendation,
  searchAutocomplete,
  setForecastCity,
}) => {
  const width = useSharedValue(hp("6.5%"));

  const [inputVisible, setInputVisible] = useState(false);

  const toggleInput = () => {
    setSearchQuery("");
    setSearchRecommendation([]);
    width.value =
      width.value === hp("6.5%")
        ? withTiming(wp("90%"), {
            duration: 300,
          })
        : withTiming(hp("6.5%"), {
            duration: 200,
          });
    setInputVisible((pre) => !pre);
  };

  return (
    <>
      <Animated.View
        entering={FadeInDown.delay(100)}
        style={[styles.firstContainer]}
      >
        <Animated.View
          style={[
            styles.container,
            {
              width,
            },
          ]}
        >
          {inputVisible && (
            <Animated.View style={{ flex: 1 }} entering={FadeInLeft.delay(200)}>
              <TextInput
                style={styles.input}
                placeholder="Search city"
                placeholderTextColor={"#ffffffad"}
                value={seacrhQuery}
                onChangeText={(text) => setSearchQuery(text)}
              />
            </Animated.View>
          )}
          <TouchableOpacity
            style={styles.btn}
            activeOpacity={0.5}
            onPress={toggleInput}
          >
            <AntDesign name="search1" size={hp("2.5%")} color={"#fff"} />
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
      {searchAutocomplete.length && (
        <SearchRecommendationList
          data={searchRecommendation}
          setForecastCity={setForecastCity}
          setSearchQuery={setSearchQuery}
          setSearchRecommendation={setSearchRecommendation}
          onPress={toggleInput}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  firstContainer: {
    borderRadius: 50,
    alignItems: "flex-end",
    justifyContent: "center",
    height: hp("8%"),
    paddingHorizontal: wp("5%"),
  },
  container: {
    borderRadius: 50,
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: hp("0.5%"),
    backgroundColor: "#ffffff1d",
  },
  input: {
    flex: 1,
    fontSize: hp("2%"),
    marginHorizontal: hp("2.4%"),
    fontFamily: "openSans",
    color: "#fff",
  },
  btn: {
    borderRadius: 50,
    backgroundColor: "#ffffff56",
    padding: hp("1.5%"),
  },
});

export default memo(SearchBar);
