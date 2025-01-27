export const GetLocalTime = () => {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Adjust month to 1-based index
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const GetNumericalDate = (getHours?: boolean): number => {
  const timeNow = new Date();
  const bangkokStringTime = timeNow.toLocaleString("en-US", {
    timeZone: "Asia/Bangkok",
  });
  const bangkokTime = new Date(bangkokStringTime);

  const bangkokMidnight = new Date(
    bangkokTime.getFullYear(),
    bangkokTime.getMonth(),
    bangkokTime.getDate(),
    getHours ? bangkokTime.getHours() : 0,
    // bangkokTime.getHours(),
  );

  return Math.floor(bangkokMidnight.getTime());
};

export const FormatTime = (date: string): string => {
  const dateObject = new Date(date);

  const options: Intl.DateTimeFormatOptions = {
    // weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Bangkok", // Specify the Bangkok timezone
  };

  const parts = new Intl.DateTimeFormat("en-US", options).format(dateObject);

  const [month, day, year] = parts.replaceAll(",", "").split(" ");

  return `${day} ${month} ${year}`;
};
export const ConvertBangkokTime = (
  dateString: string,
  time: string,
): number => {
  const [year, month, day] = dateString.split("-").map(Number);
  const [hoursPart, minutePart] = time.split(":").map(Number);

  const bkkNowDate = new Date(year, month - 1, day, hoursPart, minutePart);

  // console.log("bkkNowDate is", bkkNowDate);

  return bkkNowDate.getTime();
};

export const DateStringToInteger = (dateString: string): number => {
  const date = new Date(dateString);
  const bangkokStringTime = date.toLocaleString("en-US", {
    timeZone: "Asia/Bangkok",
  });
  const bangkokTime = new Date(bangkokStringTime);

  const bangkokMidnight = new Date(
    bangkokTime.getFullYear(),
    bangkokTime.getMonth(),
    bangkokTime.getDate(),
  );

  return bangkokMidnight.getTime();
};

const getBangkokTime = (): string => {
  const bangkokTime = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Bangkok",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date());

  return bangkokTime;
};
