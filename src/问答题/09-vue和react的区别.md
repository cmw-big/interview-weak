# Vue和React的区别

- Vue的作为一个框架，React是作为一个库。使用成本低，Vue官方自带了很多一套的解决方案。
- Vue是被动式更新，React则作为作为主动式更新。
- 渲染方式上的不同。Vue是以模板为形式作为基地渲染，本质还是html扩展的形式。React则是使用JSX语法，all in js。
- 渲染过程的不同：Vue2的Diff使用双向链表，边对比，边更新DOM。React主要是用flber和队列队列保存需要更新哪些DOM，在批量更新。
- 对于事件处理不同。vue绑定到每个元素上，react通过冒泡代理到document或者组件根实例上。
