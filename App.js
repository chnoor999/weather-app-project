import { useFonts } from "expo-font";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

import HomeScreen from "./app/screens/HomeScreen";
import Screen from "./app/screens/Screen";
import Next7DaysScreen from "./app/screens/Next7DaysForeCastScreen";
import { ForeCastDataContextProvider } from "./app/store/forecastData-context";

const Root = () => {
  const [fontLoaded] = useFonts({
    openSans: require("./app/config/fonts/OpenSans-Regular.ttf"),
    openSansBold: require("./app/config/fonts/OpenSans-Bold.ttf"),
    openSansSemiBold: require("./app/config/fonts/OpenSans-SemiBold.ttf"),
  });

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
        <StatusBar
          barStyle={"light-content"}
          backgroundColor={"transparent"}
          translucent={true}
        />
        <Root />
      </NavigationContainer>
    </ForeCastDataContextProvider>
  );
}
