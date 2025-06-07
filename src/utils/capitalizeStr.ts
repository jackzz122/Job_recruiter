export const capitalizeStr = (str: string | undefined) => {
  if (!str) return "......";
  const words = str.split(" ").map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });
  return words.join(" ");
};
