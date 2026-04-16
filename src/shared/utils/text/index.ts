export const truncateText = (
  text: string,
  maxLength: number,
) => {
  if (text.length > maxLength) {
    const truncated = text
      .slice(0, maxLength - 3)
      .concat("...");

    return truncated;
  } else {
    return text;
  }
};
