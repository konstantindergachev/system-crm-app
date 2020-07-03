export const validate = (start, end) => {
  if (start.date < end.date) {
    return false;
  } else if (start.date > end.date) {
    return true;
  } else if (!start.date && !end.date) {
    return false;
  } else {
    return true;
  }
};
