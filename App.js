import { useFonts } from "expo-font";
import { StatusBar } from "react-native";

import HomeScreen from "./app/screens/HomeScreen";
import Screen from "./app/screens/Screen";

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
    <>
      <Screen>
        <HomeScreen />
      </Screen>
    </>
  );
};

export default function App() {
  return (
    <>
      <StatusBar
        barStyle={"light-content"}
        backgroundColor={"transparent"}
        translucent={true}
      />
      <Root />
    </>
  );
}
