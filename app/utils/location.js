import { Alert, Linking } from "react-native";
import * as Location from "expo-location";

export const getCurrentCity = async () => {
  try {
    const permission = await Location.requestForegroundPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(
        "Permission not granted",
        "Please grant permission to access location.",
        [{ text: "Go to Setting", onPress: () => Linking.openSettings() }]
      );
      return null;
    }

    const response = await Location.getCurrentPositionAsync();
    const { latitude, longitude } = response.coords;

    const reverseGeocodeResponse = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });

    if (reverseGeocodeResponse.length === 0) {
      Alert.alert(
        "Location not found",
        "Unable to determine current location."
      );
      return null;
    }

    const currentCity = {
      id: "useCurrentCity",
      name: reverseGeocodeResponse[0].city,
      country: reverseGeocodeResponse[0].country,
    };

    return currentCity;
  } catch (error) {
    Alert.alert(
      "Error",
      "An error occurred while getting current Location. Please try again later."
    );
    return null;
  }
};
