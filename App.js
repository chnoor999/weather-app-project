import { useFonts } from "expo-font";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ForeCastDataContextProvider } from "./app/store/forecastData-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
const Stack = createNativeStackNavigator();

import HomeScreen from "./app/screens/HomeScreen";
import Next7DaysScreen from "./app/screens/Next7DaysForeCastScreen";

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
