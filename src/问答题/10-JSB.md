# JSB

> WebView 能够加载指定的 url，拦截页面发出的各种请求等各种页面控制功能，JSB 的实现就依赖于 WebView 暴露的各种接口。由于历史原因，安卓和 iOS 均有高低两套版本的 WebView 内核：

## JSB原理

> 要实现双向通信自然要依次实现 Native 向 Web 发送消息和 Web 向 Native 发送消息。

## Native向Web发送消息

Native 向 Web 发送消息基本原理上是在 WebView 容器中动态地执行一段 JS 脚本，通常情况下是调用一个挂载在全局上下文的方法。Android 和 iOS 均提供了不同的接口来实现这一过程。

Native 端可以直接调用挂载在 window 上的全局方法并传入相应的函数执行参数，并且在函数执行结束后 Native 端可以直接拿到执行成功的返回值。

## Web向Native发送消息

Web 向 Native 发送消息本质上就是某段 JS 代码的执行端上是可感知的，目前业界主流的实现方案有两种，分别是拦截式和注入式。

### 拦截式

和浏览器类似 WebView 中发出的所有请求都是可以被 Native 容器感知到的，因此拦截式具体指的是 Native 拦截 Web 发出的 URL 请求，双方在此之前约定一个 JSB 请求格式，如果该请求是 JSB 则进行相应的处理，若不是则直接转发。

1. 通过何种方式发出请求？

Web 端发出请求的方式非常多样，例如 <a/> 、iframe.src、location.href、ajax 等，但 <a/> 需要用户手动触发，location.href 可能会导致页面跳转，安卓端拦截 ajax 的能力有所欠缺，因此绝大多数拦截式实现方案均采用iframe 来发送请求。

一个标准的 URL 由 <scheme>://<host>:<port><path> 组成，相信大家都有过从微信或手机浏览器点击某个链接意外跳转到其他 App 的经历，如果有仔细留意过这些链接的 URL 你会发现目前主流 App 都有其专属的一个 scheme 来作为该应用的标识，例如微信的 URL scheme 就是 weixin://。JSB 的实现借鉴这一思路，定制业务自身专属的一个 URL scheme 来作为 JSB 请求的标识，例如字节内部实现拦截式 JSB 的 SDK 中就定义了 bytedance:// 这样一个 scheme。

拦截式在双端都具有非常好的向下兼容性，曾经是最主流的 JSB 实现方案，但目前在高版本的系统中已经逐渐被淘汰，理由是它有如下几个劣势：

连续发送时可能会造成消息丢失（可以使用消息队列解决该问题）
URL  字符串长度有限制

性能一般，URL request 创建请求有一定的耗时（Android 端 200-400ms）

### 注入式

注入式的原理是通过 WebView 提供的接口向 JS 全局上下文对象（window）中注入对象或者方法，当 JS 调用时，可直接执行相应的 Native 代码逻辑，从而达到 Web 调用 Native 的目的。

这种方法简单而直观，并且不存在参数长度限制和性能瓶颈等问题，目前主流的 JSB SDK 都将注入式方案作为优先使用的对象。注入式的实现非常简单，这里不做案例展示。

## 拦截式的Web发送消息给Native如何执行回调的

### JSONP

只要把相应的回调方法挂载在全局对象上，Native 即可把每次调用后的响应通过动态执行 JS 方法的形式传递到 Web 端，这样一来整个通信过程就实现了闭环。
