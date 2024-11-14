export const GetLocalTime = () => {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Adjust month to 1-based index
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// export const GetIntergerLocalTime =  () => {
//     GetLocalTime()

//   return DateStringToInteger(formattedDate.replace(",", ""))

// };

export const FormatTime = (date: string) => {
  const dateObject = new Date(date);

  const options = { weekday: "long", day: "numeric", month: "short" };
  const formattedDate = new Intl.DateTimeFormat("en-Us", options).format(
    dateObject
  );

  return formattedDate.replace(",", "");
};

export const DateStringToInteger = (dateString: string) => {
  const date = new Date(dateString);
  return date.getTime();
};
