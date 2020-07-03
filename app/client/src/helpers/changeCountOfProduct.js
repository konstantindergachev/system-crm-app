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

// export function changeCountOfProduct(payload, flag) {
//   const { id, cart } = payload;
//   const selectedProduct = cart.find((item) => item._id === id);
//   if (flag === 'increment') {
//     selectedProduct.count = selectedProduct.count + 1;
//     selectedProduct.total = selectedProduct.price * selectedProduct.count;
//   } else if (flag === 'decrement') {
//     selectedProduct.count = selectedProduct.count - 1;
//     if(selectedProduct.count === 0){
//       return cart;
//     }else{
//       selectedProduct.total = selectedProduct.price * selectedProduct.count;
//       return cart;
//     }
//   }
//   return cart;
// }
