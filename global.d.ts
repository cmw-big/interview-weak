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

type Fn = (...args: any[]) => any
