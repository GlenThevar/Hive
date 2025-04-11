import { format } from "timeago.js";

export const FormatDateNow = (date) => {
  return format(Number(date));
};
