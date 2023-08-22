export const moneyFormat = (locale, countryCurrency, money) => {
  return new Intl.NumberFormat(locale, { style: 'currency', currency: countryCurrency }).format(
    money
  );
};
