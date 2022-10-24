import { generatePromiseList } from '../../utils'

const taskList = generatePromiseList(3)

// 需求是这样的：三个Promise，然后按照数组的顺序进行执行一个回调。

async function handleTaskList(list: Promise<any>[]) {
  const handleResult: Promise<any>[] = []
  for (let i = 0; i < list.length; i++) {
    if (i === 0) {
      handleResult.push(list[i])
    } else {
      await Promise.all(handleResult)
    }
  }
}
