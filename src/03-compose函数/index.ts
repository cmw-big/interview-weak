/**
 * compose函数的基本原理
 * 将前面一个函数的范围结果作为参数给下一个函数作为参数。
 * 这在函数式编程中，是很常见的一种。
 * 效果： 将一系列函数，通过compose函数组合起来，像管道一样连接起来，比如函数结合[f, g, h ]，通过compose最终达到这样的效果： f(g(h()))
 */
type fn = (...args: any[]) => any
export const compose = (list: fn[]) => {
  if (list.length === 0) {
    return
  }
  const init = list[0]
  list.shift()

  // 返回一个函数
  return (...args: any[]) => {
    const result = init(...args)
    if (!list.length) {
      return result
    }
    return list.reduce((pre, next) => {
      if (pre instanceof Promise) {
        return pre.then(result => {
          return next(result)
        })
      } else {
        return next(pre)
      }
    }, result)
  }
}
const sync1 = (data: any) => {
  console.log('sync1')
  return data
}
const sync2 = async (data: any) => {
  console.log('sync2')
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(data + 1)
    }, 2000)
  })
}
const sync3 = (data: any) => {
  console.log('sync3')
  return data + 2
}
const syncFn = compose([sync1, sync2, sync3])
const result = syncFn?.(0)
// 如果是promise的话，就等待
