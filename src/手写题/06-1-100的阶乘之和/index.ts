export function dSum(n: number) {
  let result = 0
  let preClass = 1
  for (let i = 0; i < n; i++) {
    preClass = preClass * (i + 1)
    result += preClass
  }
  return result
}
