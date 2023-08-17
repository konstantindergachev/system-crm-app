export function changeCountOfProduct(id, number, positions) {
  const updPosition = positions.map((position) => {
    if (position._id === id) {
      position.quantity = Number(number);
      return position;
    }
    return position;
  });
  return updPosition;
}
