import { randomInt } from './randomInt'

/**
 *
 * @param time 等待的时间
 * @param value 等待完成后传递的value
 * @returns 返回一个等待的Promise
 */
export const sleep = <T>(time: number, value?: T): Promise<T | undefined> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(value)
    }, time)
  })
}
/**
 * 生成随机的等待任务
 */
export function generatePromiseList(num: number) {
  const taskList: (<T extends number>(
    ...args: T[]
  ) => Promise<number | undefined>)[] = []
  for (let i = 0; i < num; i++) {
    taskList.push((index: number) => {
      console.log(index)
      return sleep(randomInt(0, 10000), randomInt(0, 100))
    })
  }
  return taskList
}
