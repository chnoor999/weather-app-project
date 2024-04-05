import { useFonts } from "expo-font";
import { StatusBar } from "react-native";

import HomeScreen from "./app/screens/HomeScreen";
import Screen from "./app/screens/Screen";

export default function App() {
  const [fontLoaded] = useFonts({
    openSans: require("./app/config/fonts/OpenSans-Regular.ttf"),
    openSansBold: require("./app/config/fonts/OpenSans-Bold.ttf"),
    openSansSemiBold: require("./app/config/fonts/OpenSans-SemiBold.ttf"),
  });

  if (!fontLoaded) {
    return;
  }

  return (
    <>
      <StatusBar
        barStyle={"light-content"}
        backgroundColor={"transparent"}
        translucent={true}
      />
      <Screen>
        <HomeScreen />
      </Screen>
    </>
  );
}
