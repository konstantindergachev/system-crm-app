module.exports = {
  dateFormat: (date) => {
    if (date) {
      return new Intl.DateTimeFormat('uk-UA', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
      }).format(new Date(date));
    }
    return null;
  },
  timeFormat: (date) => {
    if (date) {
      return new Intl.DateTimeFormat('uk-UA', {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      }).format(new Date(date));
    }
    return null;
  },
};
