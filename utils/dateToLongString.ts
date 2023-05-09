export const dateToLongString = (date: Date, lng?: string): string => {
  const formatedDate = date.toLocaleString(lng, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  return formatedDate.charAt(0).toUpperCase() + formatedDate.slice(1);
};
