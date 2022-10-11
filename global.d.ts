/**
 * call函数的
 */
interface Function {
  myCall: CallableFunction['call']
}

/**
 * apply函数
 */
interface Function {
  myApply: CallableFunction['apply']
}
/**
 * apply函数
 */
interface Function {
  myBind: CallableFunction['bind']
}
/**
 * 单纯表示函数类型
 */
type Fn = (...args: unknown[]) => unknown

/**
 * 返回Promise的函数类型
 */
type FnP = (...args: unknown[]) => Promise<unknown>
