/**
 * call函数的
 */
interface Function {
  myCall: <T, A extends any[], R>(
    this: (this: T, ...args: A) => R,
    thisArg: T,
    ...args: A
  ) => R
}

interface Function {
  myApply: <T, A extends any[], R>(
    this: (this: T, ...args: A) => R,
    thisArg: T,
    args: A
  ) => R
  myApply: <T, R>(this: (this: T) => R, thisArg: T) => R
}

interface Function {
  myBind: CallableFunction['bind']
}
