export {}

// 如果是模块内部的，需要使用declare global
// 如果是全局的，则不需要declare global包一层
declare global {
  interface Object {
    // 一个函数的返回值是一个带有next方法的对象
    [Symbol.iterator]<T>(): Iterator<T>
  }
}

Object.prototype[Symbol.iterator] = function (this: Record<any, any>) {
  const keys = Object.keys(this)
  let index = 0
  return {
    next: () => {
      const value = this[keys[index++]]
      return {
        value,
        done: index > keys.length
      }
    }
  }
}

const testObj = {
  a: 1,
  b: 2,
  c: Symbol('c'),
  d: () => {
    console.log('d')
  }
}

for (const value of testObj) {
  console.log(value)
}
