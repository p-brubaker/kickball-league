export function getByKey({ key, value, arr }) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][key] === value) return arr[i]
  }
}
