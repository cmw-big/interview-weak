/**
 * 手写call
 */

/**
 * 基本原理就是利用在对象中的非箭头函数的this指向对应的对象
 */
Function.prototype.myCall = function (this, context, ...args) {
  if (typeof this !== 'function') {
    throw new Error(`${context}.myCall is not a function`)
  }
  if (!context || context === null) {
    context = Object(globalThis)
  }
  //   使用Symbol防止外界获取
  const fnKey = Symbol('fn')
  const objContext = Object(context)
  objContext[fnKey] = this
  const result = objContext[fnKey](...args)
  //   执行完成后删除这个属性。
  delete objContext[fnKey]
  return result
}

/**
 * 手写apply方法
 */
Function.prototype.myApply = function (this, context, args) {
  if (typeof this !== 'function') {
    throw new Error(`${context}.myCall is not a function`)
  }
  if (!context || context === null) {
    context = Object(globalThis)
  }
  // 这里直接利用了call方法，如果不使用call方法的话，也可以自己实现类似的call方法。
  return this.call(context, ...args)
}

/**
 * 手写实现bind，主要要考虑的点就是如果返回的函数是通过new产生的。例如：原函数是一个构造函数，这样的话，this的指向是不会变的。还是原来的。
 * 且原型也是原来的原型
 */
Function.prototype.myBind = function (this, context: any, ...args: any[]) {
  if (typeof this !== 'function') {
    throw new Error(`${context}.myCall is not a function`)
  }
  const fn = this
  const fKey = Symbol('fn')
  if (!context || context === null) {
    context = Object(globalThis)
  }
  const resultFn = function (
    this: typeof context | typeof fn,
    ...restArgs: any[]
  ) {
    // 这是作为构造函数调用,那么fn的this还是原来的this，不会改变
    if (this instanceof fn) {
      ;(fn as any)[fKey] = fn
      const result = (fn as any)[fKey](...args, restArgs)
      delete (fn as any)[fKey]
      return result
    } else {
      context[fKey] = fn
      const result = context[fKey](...args, restArgs)
      delete context[fKey]
      return result
    }
  }
  resultFn.prototype = Object.create(fn.prototype)
  return resultFn
}

const thisObj = {
  name: 'cmw'
}
/**
 * test
 */
function test1(this: typeof thisObj, ...args: any[]) {
  console.log(this, args)
  return 'test1'
}

test1.call
const result = test1.myCall(thisObj, '123', 123)
console.log(result)
const applyResult = test1.myApply(thisObj, [1, 2, 3])
console.log(applyResult)
// 因为bind是返回一个函数，所以，无法操作this，这样的话。类型书写就没什么意义。
const test2 = test1.myBind(thisObj, 1, '2')
console.log(test2(3, false))
