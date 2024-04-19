import * as Location from "expo-location";
import { Alert } from "react-native";

export const getCurrentCity = async () => {
  const permission = await Location.requestForegroundPermissionsAsync();
  if (!permission.granted) {
    Alert.alert();
    return;
  }
  const response = await Location.getCurrentPositionAsync();
  const reverseGeocodeResponse = await Location.reverseGeocodeAsync({
    latitude: response.coords.latitude,
    longitude: response.coords.longitude,
  });
  const currentCity = {
    id:"useCurrentCity",
    name: reverseGeocodeResponse[0].city,
    country: reverseGeocodeResponse[0].country,
  };
  // reverseGeocodeResponse[0].city + ", " + reverseGeocodeResponse[0].country;

  return currentCity;
};
