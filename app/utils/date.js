export const getCurrentRegionTimeDate = (timezone) => {
  const localTimeDate = new Date();

  const currentTime = localTimeDate.toLocaleString("en-US", {
    timeZone: timezone,
    timeStyle: "short",
  });
  const currentDate = localTimeDate.toLocaleString("en-US", {
    timeZone: timezone,
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  return currentDate + " | " + currentTime;
};

export const formateTime = (time) => {
  let timestamp = time;

  let milliseconds = timestamp * 1000;

  let date = new Date(milliseconds);

  let hours = date.getHours();

  let meridiem = hours >= 12 ? "pm" : "am";
  hours = hours % 12 || 12;

  let timeString = hours + " " + meridiem;

  return timeString;
};
