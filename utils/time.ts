export const GetLocalTime = () => {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Adjust month to 1-based index
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const GetNumericalDate = (): number => {
  const timeNow = new Date();
  const bangkokStringTime = timeNow.toLocaleString("en-US", {
    timeZone: "Asia/Bangkok",
  });
  const bangkokTime = new Date(bangkokStringTime);

  const bangkokMidnight = new Date(
    bangkokTime.getFullYear(),
    bangkokTime.getMonth(),
    bangkokTime.getDate(),
    bangkokTime.getHours(),
  );

  return Math.floor(bangkokMidnight.getTime());
};

export const FormatTime = (date: string): string => {
  const dateObject = new Date(date);

  const options = { weekday: "long", day: "numeric", month: "short" };
  const formattedDate = new Intl.DateTimeFormat("en-Us", options).format(
    dateObject,
  );

  return formattedDate.replace(",", "");
};

export const convertBangkokTime = (
  dateString: string,
  time: string,
): number => {
  const [year, month, day] = dateString.split("-").map(Number);
  const [hoursPart, minutePart] = time.split(":").map(Number);

  const bkkNowDate = new Date(year, month - 1, day, hoursPart, minutePart);

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
