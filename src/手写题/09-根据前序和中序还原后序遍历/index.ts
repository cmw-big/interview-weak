/**
 * 根据前序遍历和中序遍历还原后序遍历
 */

/**
 * 原题
 */

// const preorder = [3, 9, 20, 15, 7]
// const inorder = [9, 3, 15, 20, 7]

/**
 * 前序遍历的特点：第一位肯定是根节点，剩下的子节点
 * 中序遍历的特点，跟结点的左边是左节点，右边是右子树
 */
// function reduction(preorder: number[], inorder: number[]) {
//   const inOrderMap = new Map<number, number>()
//   for (let i = 0; i < inorder.length; i++) {
//     inOrderMap.set(inorder[i], i)
//   }
//   // 一开始preStart和end都是长度
//   return builderTree(
//     preorder,
//     inorder,
//     inOrderMap,
//     0,
//     preorder.length,
//     0,
//     inorder.length
//   )
// }

// function builderTree(
//   preorder: number[],
//   inorder: number[],
//   inOrderMap: Map<number, number>,
//   preLeft: number,
//   preRight: number,
//   inLeft: number,
//   inRight: number
// ) {
//   if (preLeft > preRight || inLeft > inRight) {
//     return null
//   }
//   // 第一步：找到当前子树的根节点
//   const root = preorder[preLeft]
//   const node = new TreeNode(root, null, null)
//   //   第二步：找到以当前根节点作为分界的左子树和右子树。
//   //   中序遍历的左子树的结束作为左子树的
//   const pIndex = inOrderMap.get(preLeft)
//   if (!pIndex) {
//     return null
//   }
//   //  左子树的数量
//   const leftTreeNum = pIndex - inLeft
//   //   第四步：把当前左子树和右子树做同样的操作
//   //   左子树
//   node.left = builderTree(
//     preorder,
//     inorder,
//     inOrderMap,
//     preLeft + 1,
//     preLeft + leftTreeNum,
//     inLeft,
//     pIndex - 1
//   )
//   //   右子树
//   node.right = builderTree(
//     preorder,
//     inorder,
//     inOrderMap,
//     leftTreeNum + preLeft + 1,
//     preRight,
//     pIndex + 1,
//     inRight
//   )
//   return node
// }

function buArr<T extends string | number>(a: T[], b: T[]) {
  const result: T[] = []
  const map: any = {}
  a.forEach(item => {
    map[item] = true
  })
  b.forEach(item => {
    if (!map[item]) {
      result.push(item)
    }
  })
  return result
}

const sleep = <T>(
  time: number,
  times: number,
  value?: T
): Promise<T | undefined> => {
  let count = 0
  return new Promise(resolve => {
    const timer = setInterval(() => {
      console.log(value)
      count++
      if (count >= times) {
        resolve(value)
        clearInterval(timer)
      }
    }, time)
  })
}

async function task() {
  while (true) {
    await sleep(1000, 3, '红')
    await sleep(1000, 2, '绿')
    await sleep(1000, 1, '黄')
  }
}
task()
