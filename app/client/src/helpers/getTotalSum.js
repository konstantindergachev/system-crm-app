export function getTotalSum(positions) {
  if (positions) {
    const totalSum = positions
      .map((position) => !position.hasOwnProperty('order') && position.cost)
      .reduce((acc, cur) => acc + cur, 0);
    return totalSum;
  }
  return null;
}
