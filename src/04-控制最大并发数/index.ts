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
export const promiseLimit = <T extends fn>(
  tasks: T[],
  limit: number,
  iteratorFn?: <R>(
    item: ReturnType<T> extends Promise<infer P> ? P : ReturnType<T>
  ) => R
) => {
  type ResultType = ReturnType<T> extends Promise<infer P> ? P : ReturnType<T>
  const len = tasks.length
  const min = Math.min(len, limit)
  let i = 0
  const result: ResultType[] = []
  let finishedNum = 0
  return new Promise(resolve => {
    const handleTask = async (index: number) => {
      if (index >= len) {
        return
      }
      let taskResult = tasks[index](index)
      if (taskResult instanceof Promise) {
        taskResult = await taskResult.catch(e => e)
      }
      finishedNum++
      iteratorFn?.(taskResult as ResultType)
      result[index] = taskResult as ResultType
      // 完成
      if (finishedNum === len) {
        resolve(result)
        return
      }
      /**
       * 这里要注意：i一开始的值就是下一位
       */
      handleTask(i)
      i++
    }
    for (; i <= min - 1; i++) {
      handleTask(i)
    }
  })
}

const taskList = generatePromiseList(10)
promiseLimit(taskList, 3).then(console.log)

/**
 * 控制并发数的基本思路：
 * 1. 首先肯定是将limit的那几个执行完成。
 * 2. 然后就是完成一个，就执行下一个。
 */
