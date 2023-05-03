export const dateSort = (a: string, b: string) => {
  const dateA = new Date(a).getTime();
  const dateB = new Date(b).getTime();
  return dateB - dateA;
};
