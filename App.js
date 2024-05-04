import { Alert, StatusBar } from "react-native";
import { useEffect } from "react";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ForeCastDataContextProvider } from "./app/store/forecastData-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { getForecast } from "./app/utils/weather";
const Stack = createNativeStackNavigator();

import * as Notifications from "expo-notifications";
import NetInfo from "@react-native-community/netinfo";
import HomeScreen from "./app/screens/HomeScreen";
import Next7DaysScreen from "./app/screens/Next7DaysForeCastScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldSetBadge: false,
      shouldPlaySound: true,
      shouldShowAlert: true,
    };
  },
});

const Root = () => {
  const scheduleNotificationOfForecastAt7AM = async () => {
    try {
      const res = await AsyncStorage.getItem("currentCity");
      if (!res) {
        return;
      }
      const currentCity = JSON.parse(res);
      const weather = await getForecast(currentCity.name);

      if (weather) {
        await Notifications.cancelAllScheduledNotificationsAsync();

        await Notifications.scheduleNotificationAsync({
          content: {
            title: `${weather.current.temp_c}° in ${weather.location.name}`,
            body: `${weather.current.condition.text} . See full forecast`,
          },
          trigger: {
            hour: 7, // 7 am
            minute: 0,
            repeats: true,
          },
        });
      }
    } catch (error) {
      console.log("Error scheduling notification");
    }
  };

  useEffect(() => {
    scheduleNotificationOfForecastAt7AM();
  }, []);

  const [fontLoaded] = useFonts({
    openSans: require("./app/config/fonts/OpenSans-Regular.ttf"),
    openSansBold: require("./app/config/fonts/OpenSans-Bold.ttf"),
    openSansSemiBold: require("./app/config/fonts/OpenSans-SemiBold.ttf"),
  });

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (!state.isConnected) {
        Alert.alert(
          "No Internet Connection",
          "Please check your internet connection and try again.",
          [{ text: "OK" }]
        );
      }
    });

    return () => unsubscribe();
  }, []);

  if (!fontLoaded) {
    return;
  }

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, animation: "slide_from_right" }}
    >
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="next7Days" component={Next7DaysScreen} />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <ForeCastDataContextProvider>
      <NavigationContainer>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <StatusBar
            barStyle={"light-content"}
            backgroundColor={"transparent"}
            translucent={true}
          />
          <Root />
        </GestureHandlerRootView>
      </NavigationContainer>
    </ForeCastDataContextProvider>
  );
}
