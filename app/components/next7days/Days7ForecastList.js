import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";
import { useForecastData } from "../../store/forecastData-context";
import Days7ForecastItem from "./Days7ForecastItem";
import { ConvertDateToDay } from "../../utils/date";
import TommorowList from "./TommorowList";

const Days7ForecastList = () => {
  const { data } = useForecastData();

  const filterNext7DaysForecast = data.forecast.forecastday.filter((item) => {
    const currentDate = new Date().getDate();
    const RemoveCurrentDateList = currentDate != new Date(item.date).getDate();

    return RemoveCurrentDateList;
  });

  return (
    <FlatList
      data={filterNext7DaysForecast}
      renderItem={({ item, index }) => {
        const tomorrowDate = new Date().getDate() + 1;
        const checkTommorowList =
          tomorrowDate == new Date(item?.date).getDate();

        return checkTommorowList ? (
          <TommorowList
            conditionText={item?.day?.condition?.text}
            conditionIcon={item?.day?.condition?.icon}
            day={
              checkTommorowList
                ? "Tommorrow"
                : ConvertDateToDay(data.location?.tx_id, item?.date)
            }
            temp={item?.day?.avgtemp_c}
            data={item}
            index={index}
          />
        ) : (
          <Days7ForecastItem
            index={index}
            conditionText={item?.day?.condition?.text}
            conditionIcon={item?.day?.condition?.icon}
            day={
              checkTommorowList
                ? "Tommorrow"
                : ConvertDateToDay(data.location?.tx_id, item?.date)
            }
            temp={item?.day?.avgtemp_c}
          />
        );
      }}
    />
  );
};

export default memo(Days7ForecastList);

const styles = StyleSheet.create({});
