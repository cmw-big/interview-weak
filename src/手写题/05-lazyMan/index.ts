export class LazyMan {
  private tasks: Fn[] = []
  private name = ''
  constructor(name: string) {
    this.name = name
    function fn(this: LazyMan) {
      console.log('hi' + this.name)
      this.next()
    }
    this.tasks.push(fn)
    // 重点：使用setTimeout宏任务，确保所有的任务都注册到task列表中,再去执行.
    // 主要的原因是因为：有sleepFirst方法的存在，这个方法一旦存在的话。肯定是首次进行执行。
    setTimeout(() => {
      this.next()
    })
  }
  //   执行下一个任务
  private next(this: LazyMan) {
    const fn = this.tasks.shift()
    fn?.call(this)
  }
  /**
   * sleepFirst表示这是首要的任务
   */
  sleepFirst(duration: number) {
    function fn(this: LazyMan) {
      console.log('sleepFrist:' + duration)
      setTimeout(() => {
        this.next()
      }, duration)
    }
    this.tasks.unshift(fn)
    return this
  }
  eat(food: string) {
    function fn(this: LazyMan) {
      console.log('eat:' + food)
      this.next()
    }
    this.tasks.push(fn)
    return this
  }
  sleep(time: number) {
    function fn(this: LazyMan) {
      console.log('sleep:' + time)
      setTimeout(() => {
        this.next()
      }, time)
    }
    this.tasks.push(fn)
    return this
  }
}

new LazyMan('王')
  .sleepFirst(3000)
  .eat('breakfast')
  .sleep(3000)
  .sleepFirst(1000)
  .eat('dinner')
