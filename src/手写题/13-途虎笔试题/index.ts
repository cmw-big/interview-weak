/**
 * 将target插入到升序对应的位置
 */
function targetGoods(nums: number[], target: number) {
  let left = 0
  let right = nums.length - 1
  while (left <= right) {
    const midIndex = Math.floor((left + right) / 2)
    if (nums[midIndex] > target) {
      right = midIndex - 1
    } else if (nums[midIndex] < target) {
      left = midIndex + 1
    } else {
      return midIndex
    }
  }
  return left
}
// const index = targetGoods([1, 2, 4, 5], 3)
// console.log(index)

function getMaxGold(nums: number[]) {
  if (nums.length < 3) {
    return 0
  }
  //   找到最大的两个数字
  let sortNums = nums.sort((a, b) => a - b)
  if (sortNums[0] === 0 && sortNums[1] === 0) {
    return 0
  }
  let score = 0
  while (sortNums[0] !== 0 || sortNums[1] !== 0) {
    score++
    sortNums[1] = sortNums[1] - 1
    sortNums[2] = sortNums[2] - 1
    sortNums = sortNums.sort((a, b) => a - b)
  }
  return score
}
const score = getMaxGold([2, 4, 6])
console.log(score)

/**
 * 排列最大
 */

function getMax(nums: number[]) {
  const sortNums = nums.sort((a, b) => +`${b}`[0] - +`${a}`[0])
  return sortNums.reduce((pre, next) => `${pre}` + `${next}`, '')
}
// const max = getMax([1, 30, 4, 9])
// console.log(max)
