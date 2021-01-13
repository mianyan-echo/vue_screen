# VUE开发笔记
之前因为对前端框架的各种概念都不太清晰，现在有了一定的眉目，开始记录一些开发过程中遇到的问题
***
***
## 2021.1.12
* vue条件渲染似乎与dash.js的MediaPlayer并不兼容，在播放弹窗关闭后，通过浏览器Network监控发现player仍在get MPEG DASH的mpd与视频切片。

  最后的解决办法是在父组件中对dash_player组件的标签添加ref，然后通过$refs调用子组件的任意属性与方法，从而在弹窗关闭时可以同时重置dash播放器。
* small_window在被拖动时整体页面应该处于不可选中状态，这种状态是通过BOM实现的。
  
  即`window.onselectstart`与`window.onselect`进行选择时会触发不为`null`的它们，依据返回的bool值来判断是否可以选中，返回`false`为无法选中
* 再说说组件扩展，其实官方叫`extend`与`mixin`已经说明这个不像对象的继承，组件间也没有继承只有组合。想像python的类一样灵活重用是不可能的。

  好在vue组件间的通信方法有很多，通过组件的组合与布局还算可以比较清晰用代码的描述页面的逻辑，保证组合组件内部子组件的通信配合。
* 下一步准备用axios请求后端数据库中的MPEG DASH控制文件地址，加入echarts数据可视化

  用element ui美化一下界面，加入过渡动画
***
## 2021.1.13
* vue组件的unmount似乎改成了destroy，将player的重置操作放入beforeDestroy以后也可以达到停止继续加载的目的
* 想直接在vue组件中用axios请求后端的restful api，但在下手之前感觉这样一点也不灵活，所有的url都分散的放置在组件中的话既不纯粹也不好维护。
  
  所以在axios封装的基础上将rest api也模块化的封装起来，使其只对外提供现成的能表示操作含义的api接口函数。api版本与baseurl都可以模块化的更改
  
  详细的组织方法可以看rest_api的README