const AddQuantity = (item, oldCart) => {
  return oldCart.reduce((accum, elem) => {
    if (elem.id === item.id) {
      item.quantity = item.quantity + elem.quantity
      accum.push(item)
      return accum
    }
    accum.push(elem)
    return accum
  }, [])
}

export const uniqueItems = (item, newCart) => {
  if (
    newCart.reduce((accum, elem) => {
      if (item.id === elem.id) {
        accum.push(item)
        return accum
      }
      return accum
    }, []).length === 0
  ) {
    newCart.push(item)
    return newCart
  } else {
    return newCart
  }
}

export default AddQuantity
