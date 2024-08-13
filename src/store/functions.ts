import type { StyleKeys } from "../../types/main";
import store from "./../store/main";

/**
 * Return custom style given target
 * @param {string} targetName
 * @returns string
 */
const getStyle = (targetName: string) => {
  const { styles } = store.value;
  if (!Object.keys(styles).length) {
    return "";
  }

  // Type guard function to check if a key is valid
  function isStyleKey(key: string): key is StyleKeys {
    return [
      "container",
      "header",
      "body",
      "footer",
      "row",
      "cell",
      "pageselector",
      "pagebtns",
    ].includes(key);
  }

  if (isStyleKey(targetName)) {
    return styles[targetName] || "";
  }
  return "";
};

const isValidDate = (dateString: string) => {
  // Try creating a new Date object
  const date = new Date(dateString);

  // Check if the created date is valid and matches the original string
  if (
    !isNaN(date.getTime()) &&
    dateString === date.toISOString().split("T")[0]
  ) {
    return date.getTime();
  }

  return false;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const castToType = (value: any) => {
  // Cast to number if number
  if (!isNaN(Number(value))) {
    return Number(value);
  }

  if (isValidDate(value)) {
    return isValidDate(value);
  }
  return value;
};

export default {
  getStyle,
  castToType,
};
