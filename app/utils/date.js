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

export const ConvertDateToDay = (timezone, date) => {
  const listDate = new Date(date);
  const day = listDate.toLocaleString("en-US", {
    timeZone: timezone,
    weekday: "short",
  });

  return day;
};

export const formatTime = (time) => {
  let timestamp = time;

  let milliseconds = timestamp * 1000;

  let date = new Date(milliseconds);

  let hours = date.getHours();

  let meridiem = hours >= 12 ? "pm" : "am";
  hours = hours % 12 || 12;

  let timeString = hours + " " + meridiem;

  return timeString;
};

// const a = new Date().toLocaleString("en-US", { timeZone: "America/Toronto" });
// const [datePart, timePart] = a.split(", ");
// const [month, day, year] = datePart.split("/");
// const [time, meridiem] = timePart.split(" ");
// const [hours, minutes, seconds] = time.split(":");
// const adjustedHours = meridiem === "PM" ? parseInt(hours, 10) + 12 : hours;
// const parsedDate = new Date(year, month - 1, day, adjustedHours, minutes, seconds);

// console.log("Parsed Date:", parsedDate.getTime());
export const matchRegionDateToCurrentDate = (timeZone) => {
  const a = new Date().toLocaleString("en-US", { timeZone });
  const [datePart, timePart] = a.split(", ");
  const [month, day, year] = datePart.split("/");
  const [time, meridiem] = timePart.split(" ");
  const [hours, minutes, seconds] = time.split(":");
  const adjustedHours = meridiem === "PM" ? parseInt(hours, 10) + 12 : hours;
  const parsedDate = new Date(
    year,
    month - 1,
    day,
    adjustedHours,
    minutes,
    seconds
  );

  const currentDate = new Date();

  const match = parsedDate >= currentDate;
};
