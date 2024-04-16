import { createContext, useContext, useState } from "react";

const ForeCastDataContext = createContext({
  data: [],
  setData: () => {},
});

export const ForeCastDataContextProvider = ({ children }) => {
  const [data, setData] = useState([]);

  const value = {
    data,
    setData,
  };

  return (
    <ForeCastDataContext.Provider value={value}>{children}</ForeCastDataContext.Provider>
  );
};

export const useForecastData = () => {
  return useContext(ForeCastDataContext);
};
