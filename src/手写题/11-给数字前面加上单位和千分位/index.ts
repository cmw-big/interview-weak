function covertToPrice(num: number): string {
  const formatNum = num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
  if (formatNum[0] === '-') {
    return '-' + '$' + formatNum.slice(1)
  }
  return '$' + formatNum
}
console.log(covertToPrice(-15216311))
