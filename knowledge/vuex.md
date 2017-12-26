Vue的项目中，如果项目简单， 父子组件之间的数据传递可以使用  props 或者 $emit 等方式 进行传递

但是如果是大中型项目中，很多时候都需要在不相关的平行组件之间传递数据，并且很多数据需要多个组件循环使用。这时候再使用上面的方法会让项目代码变得冗长，并且不利于组件的复用，提高了耦合度。

Vue 的状态管理工具 Vuex 完美的解决了这个问题。

看了下vuex的官网，觉得不是很好理解，有的时候我们只是需要动态的从一个组件中获取数据（官网称为“组件层级”：是个独立的控件，作用范围只在组件之内）然后想放到一个被官网称作“应用层级”（在项目的任意地方都可以随时获取和动态的修改，在修改之后，vue会为你的整个项目做更新）的地方。这是我最初来学习vue的原因，我并不想做一个前端数据结构库。。。

下面看看我一步一步的小例子

首先安装vuex     目前公司项目已经被我从vue1.0迁移到vue2.0，下载并安装vue  

npm install vuex --save

然后在index.html同级新建文件夹store，在文件夹内新建index.js文件，这个文件我们用来组装模块并导出 store 的文件

 

【一、获取store中的数据】

>import Vue from 'vue'
>import Vuex from 'vuex'

// 告诉 vue “使用” vuex
>Vue.use(Vuex)

```
// 创建一个对象来保存应用启动时的初始状态
// 需要维护的状态
const store = new Vuex.Store({
  state: {
    // 放置初始状态 app启动的时候的全局的初始值
    bankInf: {"name":"我是vuex的第一个数据","id":100,"bankName":"中国银行"}
  }
})
```
// 整合初始状态和变更函数，我们就得到了我们所需的 store
// 至此，这个 store 就可以连接到我们的应用中

>export default store

在vue根文件中注册store，这样所有的组件都可以使用store中的数据了

我的项目文件结构：


![](https://github.com/moveondo/FullStack-NodeVue/blob/master/knowledge/image/vuex.png)


 

在main.js文件中注册store

```
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './../store/index'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
```

这样简单的第一步就完成了，你可以再任意组件中使用store中的数据，使用方法也很简单，就是使用计算属性返回store中的数据到一个新属性上，然后在你模板中则可以使用这个属性值了：

任意组件中：


```
export default {
  ...
  computed: {
    bankName() {
      return this.$store.state.bankInf.bankName;
    }
  },
  ...
}
```

在模板中可以直接使用bankName这个属性了，也就是store中的中国银行

 

【二、在组件中修改store中的状态 】

在任意组件中添加html模板
```
<div class="bank">
    <list-header :headerData="bankName"></list-header>
    04银行详情页面
    <input  name="" v-model="textValue">
    <button type="button" name="获取数据" @click="newBankName"></button>
</div>
```
然后组件中提交mutation


```
export default {
  ...
  computed: {
    bankName() {
      return this.$store.state.bankInf.bankName;
    }
  },
  methods: {
    newBankName: function() {
      this.$store.commit('newBankName', this.textValue)
    }
  }
 ...   
}
```

在store中的index.js中添加mutations：


```
const store = new Vuex.Store({
  state: {
    // 放置初始状态 app启动的时候的全局的初始值
    bankInf: {"name":"我是vuex的第一个数据","id":100,"bankName":"中国银行"},
    count:0
  },
  mutations: {
    newBankName(state,msg) {
      state.bankInf.bankName = msg;
    }
  }
})
```

这样你发现，在点击提交按钮的时候，页面已经显示你修改的数据了，并且所有复用这个组件的地方的数据全都被vue更新了；

 

如果在使用中发现报错this.$store.commit is not a function ，请打开你项目的配置文件package.json，查看你正在使用的vuex的版本，我正在使用的是vuex2.0,

如果想删除旧版本的vuex并安装新版本的vuex请使用

>npm rm vuex --save

然后安装最新的vuex

>npm install vuex --save

即可解决这个错误，或者是查看vuex官网api修改提交mutation的语句
