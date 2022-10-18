import { sleep } from './../utils/sleep'
/**
 * 控制任务的最大并发数
 */
import { generatePromiseList } from '../utils'

/**
 *
 * @param tasks 任务集合
 * @param limit 同时最大任务限制
 * @param iteratorFn 对每个任务的处理函数
 */
export const promiseLimit = (
  tasks: Fn[],
  limit: number,
  iteratorFn?: (
    item: ReturnType<Fn> extends Promise<infer P> ? P : ReturnType<Fn>
  ) => any
) => {
  const len = tasks.length
  const min = Math.min(len, limit)
  let i = 0
  const result: (ReturnType<Fn> extends Promise<infer P>
    ? P
    : ReturnType<Fn>)[] = []

  let finishedNum = 0
  return new Promise(resolve => {
    const handleTask = async (index: number) => {
      if (index >= len) {
        return
      }
      const taskResult = await Promise.resolve(tasks[index](index))
      finishedNum++
      iteratorFn?.(taskResult)
      result[index] = taskResult
      // 完成
      if (finishedNum === len) {
        resolve(result)
        return
      }
      /**
       * 这里要注意：i一开始的值就是我们下一位要处理的值。
       */
      handleTask(i)
      i++
    }
    for (; i <= min - 1; i++) {
      handleTask(i)
    }
  })
}
const taskList = generatePromiseList(5)
// promiseLimit(taskList, 3, (index?: number) => {
//   return index
// }).then(console.log)

/**
 * 上面是已存在的函数的并发限制
 * 下面这种是新函数调用的并发限制。
 */

/**
 *
 * @param limit 并发限制的数量
 */
const newFuncLimit = (limit: number) => {
  const queue: [Fn, unknown[]][] = []
  let canExec = limit
  function handleTask(fn: Fn, ...args: unknown[]) {
    canExec--
    Promise.resolve(fn(...args)).finally(() => {
      console.log(args)
      canExec++
      const topTemp = queue.pop()
      topTemp && handleTask(topTemp?.[0], topTemp?.[1])
    })
  }
  return function limitFunc(fn: FnP, ...args: unknown[]) {
    if (canExec <= 0) {
      queue.push([fn, args])
    } else {
      handleTask(fn, args)
    }
  }
}

/**
 * newFuncLimit 执行返回一个函数：可以传入一个Promise是自定义的并发的promise
 */
const limitFunc = newFuncLimit(3)

limitFunc(() => sleep(2000), 'first')
limitFunc(() => sleep(1000), 'second')
limitFunc(() => sleep(3000), 'third')
limitFunc(() => sleep(1000), 'fourth')
