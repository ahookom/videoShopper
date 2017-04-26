export const removeElement = (array, element) => {
  const index = array.indexOf(element)
  if (index > -1) {
    return array.splice(index, 1)
  } else {
    return array
  }
}

export const removeObj = (array, obj) => {
  let spliceIndex
  array.forEach((element, index) => {
    console.log('element.product and obj.product in utility ', element.product, obj.product)
    if (element.product === obj.product) {
      console.log('spliceIndex ', spliceIndex)
      spliceIndex = index
    }
  })
  return spliceIndex ? array.splice(spliceIndex, 1) : array
}

export const findObjectByName = (arr, name) =>
  arr.find(obj => obj.name === name)

export const findObjectById = (arr, id) =>
  arr.find(obj => obj.id === +id)

export const addProductNames = (products, allProducts) => {
  products.forEach(purchase => {
    const obj = findObjectById(allProducts, +purchase.product)
    purchase.productName = obj.name
  })
  return products
}
