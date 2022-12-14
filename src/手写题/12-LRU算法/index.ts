/**
 * LRU算法的特点：
 * 1. 存储空间是有限的
 * 2. 我们这块存储空间里面存储的数据是有序的：因为我们要顺序来删除数据
 * 3. 我们能够删除或者添加以及获取到这块内存空间的指定数据
 * 4. 存储空间存满后，在添加数据时，会自动删除时间最久远的那条数据
 */

class LRUCache {
  private cache: Map<number, number> = new Map()
  constructor(private capacity: number) {}

  get(key: number): number {
    const temp = this.cache.get(key)
    if (temp !== undefined) {
      this.cache.delete(key)
      this.cache.set(key, temp)
      return temp
    }
    return -1
  }

  put(key: number, value: number): void {
    const temp = this.cache.get(key)
    if (temp !== undefined) {
      this.cache.delete(key)
    } else if (this.cache.size >= this.capacity) {
      // new Map().keys() 返回一个Iterator对象。迭代的顺序是按照插入map的顺序来的
      this.cache.delete(this.cache.keys().next().value)
    }
    this.cache.set(key, value)
  }
}

//  Your LRUCache object will be instantiated and called as such:
