# React和Vue

## 使用区别

1. react更偏向JS语法，vue更偏向原生html类似的编程方式。
2. react更新属性需要手动的更新，vue只要一开始变成响应式数据，后续触发更新操作不用手动操作。
3. vue有一些自定义的语法与场景，react除了渲染相关，其他的更偏向于一个库的形式。

## redux和vuex区别

redux和vuex都只要一个store，都是单项数据流，redux与react没有强绑定关系，因为react的更新是手动的，所以可以完全脱离渲染相关的代码。vuex只能在vue中使用，因为和vue中响应式的绑定的。

## ES6的import和require有什么区别

- 一般的import是静态的，无论写在文件什么位置，都会提升到文件顶部。除非使用import函数。require是动态的，是commonjs的语法。
- import导入的内容是值的引用。require是值的浅克隆。
- commonjs模块中顶层this指向这个模块，因为执行的时候，在node环境执行的时候，是将当前文件内容包裹在一层函数中，这个函数的this指向当前模块。
- commonjs在导入相同模块时，会有缓存。esm则直接指向前一次的引用。可能在esm中，循环依赖会出现问题。
- commonjs在运行时才确定依赖。esm是编译时就确定依赖。依赖更加清晰。
