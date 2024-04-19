import axios from "axios";

const API_KEY = "85899c9542b84eb1bea115110241804";

export const getForecast = async (city) => {
  const res =
    await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=8&aqi=no&alerts=no
    `);
    
  return res.data;
};

export const getSearchRecommendation = async (searchQuery) => {
  const res =
    await axios.get(`https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${searchQuery}
  `);

  return res.data;
};
