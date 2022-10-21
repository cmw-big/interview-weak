interface Department {
  id: number
  name: string
  parentId?: number
}

interface TreeDepartment extends Department {
  children?: TreeDepartment[]
}

/**
 * 整体思路就是：将当前是root下的内容给直接放在结果里面
 * 当不是根节点的内容，就找到对应的idMaps里面找，如果找到了父节点，就把当前结点放到父节点下面。
 * 如果没有找到父节点，说明子节点先被遍历，那么创造一个父节点，把当前结点作为第一个子节点。
 */
function convert(list: Department[]): TreeDepartment[] {
  const result: TreeDepartment[] = []
  const idMap = new Map<Department['id'], Partial<TreeDepartment>>()

  list.forEach(item => {
    const nodeChild = idMap.get(item.id)?.children
    const params: TreeDepartment = { ...item }
    if (nodeChild) {
      params.children = nodeChild
    }
    // 重新把带有属性的params给分配给result，后序的如果是子元素也是以params来定的。
    idMap.set(item.id, params)
    if (!item.parentId) {
      result.push(params)
      return
    }
    const parentNode = idMap.get(item.parentId)
    if (parentNode) {
      parentNode.children
        ? parentNode.children.push(params)
        : (parentNode.children = [params])
    } else {
      idMap.set(item.parentId, {
        children: [params]
      })
    }
  })
  return result
}

/**
 * 递归的思路就是：先找到root根节点的加入到结果中。然后根节点的子节点满足的条件就是：子节点的parentId==item.id再找出来就可以了
 */
function convert1(list: Department[], id: Department['id']): TreeDepartment[] {
  const result: TreeDepartment[] = []
  list.forEach((item: TreeDepartment) => {
    // 把当前子元素的所有
    if (item.parentId === id) {
      result.push(item)
      const children = convert1(list, item.id)
      if (children.length) {
        item.children = children
      }
    }
  })
  return result
}

const list = [
  { id: 1, name: '部门A', parentId: 0 },
  { id: 2, name: '部门B', parentId: 0 },
  { id: 3, name: '部门C', parentId: 1 },
  { id: 4, name: '部门D', parentId: 1 },
  { id: 5, name: '部门E', parentId: 2 },
  { id: 6, name: '部门F', parentId: 3 },
  { id: 7, name: '部门G', parentId: 2 },
  { id: 8, name: '部门H', parentId: 4 }
]
const result = convert1(list, 0)
console.dir(result, { depth: null })
export {}
