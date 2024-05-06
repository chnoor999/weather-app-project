import { FlatList, StyleSheet } from "react-native";
import { memo, useMemo } from "react";
import { useForecastData } from "../../store/forecastData-context";
import { ConvertDateToDay } from "../../utils/date";

import Days7ForecastItem from "./Days7ForecastItem";
import TommorowList from "./TommorowList";

const Days7ForecastList = () => {
  const { data } = useForecastData();

  const filterNext7DaysForecast = useMemo(
    () =>
      data.forecast.forecastday.filter((item) => {
        const currentDate = new Date(data.location.localtime).getDate();
        const RemoveCurrentDateList =
          currentDate != new Date(item.date).getDate();

        return RemoveCurrentDateList;
      }),
    [data]
  );

  return (
    <FlatList
      data={filterNext7DaysForecast}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item, index }) => {
        const tomorrowDate = new Date(data.location.localtime).getDate() + 1;
        const checkTommorowList =
          tomorrowDate == new Date(item?.date).getDate();

        return checkTommorowList ? (
          <TommorowList
            conditionText={item?.day?.condition?.text}
            conditionIcon={item?.day?.condition?.icon}
            day={"Tommorrow"}
            temp={item?.day?.avgtemp_c}
            data={item}
            index={index}
          />
        ) : (
          <Days7ForecastItem
            index={index}
            conditionText={item?.day?.condition?.text}
            conditionIcon={item?.day?.condition?.icon}
            day={checkTommorowList ? "Tommorrow" : ConvertDateToDay(item?.date)}
            temp={item?.day?.avgtemp_c}
          />
        );
      }}
    />
  );
};

export default memo(Days7ForecastList);

const styles = StyleSheet.create({});
