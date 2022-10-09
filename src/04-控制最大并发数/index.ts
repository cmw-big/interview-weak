type fn = (...args: any[]) => any

/**
 * 控制任务的最大并发数
 */
export const control = (tasks: fn[], num: number) => {
  if (num <= 0) {
    throw new Error(`最大并发次数num必须大于0`)
  }
  let canExec = num
  const taskFn = (begin = 0) => {
    if (!tasks.length || !canExec) {
      return
    }
    const min = Math.min(num, tasks.length)
    for (let i = begin; i < begin + min + 1 && i < tasks.length; i++) {
      const task = tasks[i]
      const result = task()
      canExec--
      if (result instanceof Promise) {
        result.finally(() => {
          canExec++
          taskFn(begin + min + 1)
        })
      } else {
        canExec++
        taskFn(begin + min + 1)
      }
    }
  }
  taskFn()
}
const sync1 = (data: any) => {
  console.log('sync1')
  return data
}
const sync2 = async (data: any) => {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log('sync2')
      resolve(data + 1)
    }, 2000)
  })
}
const sync3 = (data: any) => {
  console.log('sync3')
  return data + 2
}
control([sync1, sync2, sync3], 2)
