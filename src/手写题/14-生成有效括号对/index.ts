function generateParenthesis(n: number): string[] {
  const result: string[] = []
  return helper('', n, n, result)
}

function helper(
  current: string,
  left: number,
  right: number,
  result: string[]
) {
  // 如果左右括号都没有可以添加的剩余的话，就返回结果
  if (left === 0 && right === 0) {
    result.push(current)
    return result
  }
  //   这个也是回溯的方法。当满足条件就添加
  //   然后再去掉
  //   每次添加一个，然后递归判断是否满足结果，如果不满足结果的话，也就删除掉最新添加的
  if (left > 0) {
    current += '('
    helper(current, left - 1, right, result)
    // 除去刚才加的值
    current = current.slice(0, current.length - 1)
  }
  if (right > left) {
    current += ')'
    helper(current, left, right - 1, result)
    current = current.slice(0, current.length - 1)
  }
  return result
}
console.log(generateParenthesis(3))
