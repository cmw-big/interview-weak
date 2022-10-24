/**
 * 暴力求解
 */
function longestValidParentheses(s: string): number {
  if (s.length < 2) {
    return 0
  }
  const n = s.length % 2 === 0 ? s.length : s.length - 1
  for (let i = n; i >= 2; i -= 2) {
    // 第一轮循环，确定遍历的字符串的长度
    let j = 0
    // 第二轮循环，找到这个长度下对应的索引。
    while (j < s.length && j + i - 1 < s.length) {
      // 第二轮循环，获取范围内的字符串
      if (j + i - 1 < s.length && isValid(s.slice(j, j + i))) {
        return i
      }
      j++
    }
  }
  return 0
}

function isValid(s: string) {
  const stack: string[] = []

  for (let i = 0; i < s.length; i++) {
    if (s[i] === ')' && stack[stack.length - 1] === '(') {
      stack.pop()
    } else if (s[i] === '(') {
      stack.push(s[i])
    } else {
      return false
    }
  }
  return !stack.length
}

function longestValidParentheses1(s: string): number {
  if (s.length < 2) {
    return 0
  }
  let max = 0
  const dp: number[] = []
  for (let i = 0; i < s.length; i++) {
    const dpLeftIndex = i - dp[i - 1] - 1
    const dpPreIndex = dpLeftIndex - 1
    if (s[i] === ')' && dpLeftIndex >= 0 && s[dpLeftIndex] === '(') {
      dp[i] = 2 + dp[i - 1] + (dpPreIndex >= 0 ? dp[dpPreIndex] : 0)
      max = Math.max(max, dp[i])
    } else {
      dp[i] = 0
    }
  }
  return max
}

console.log(longestValidParentheses1('()(())'))
