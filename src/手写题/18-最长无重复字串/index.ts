function maxSubStr(str: string): string {
  if (str.length <= 1) {
    return str
  }
  let left = 0
  let right = 1
  let curStr = str[0]
  let maxStr = ''
  for (; right < str.length; right++) {
    const index = curStr.indexOf(str[right])
    if (index >= 0) {
      left = index + 1
      continue
    } else {
      curStr = str.slice(left, right + 1)
    }
    if (curStr.length > maxStr.length) {
      maxStr = curStr
    }
  }
  return maxStr
}
const res = maxSubStr('abcdabcde')
console.log(res)
