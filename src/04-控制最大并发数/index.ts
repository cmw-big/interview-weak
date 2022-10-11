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
promiseLimit(taskList, 3, (index?: number) => {
  return index
}).then(console.log)

/**
 * 控制并发数的基本思路：
 * 1. 首先肯定是将limit的那几个执行完成。
 * 2. 然后就是完成一个，就执行下一个。
 */
