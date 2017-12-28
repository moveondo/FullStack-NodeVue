### vuex中关于mapState，mapGetters,mapMutations,mapActions的作用

在开始接触vuex框架的时候对那些state,action,mutation,getter等理解的还挺顺利的，然后突然出来一种加了一个前缀的mapState等，这样的就有点蒙圈了。。。特别是官方的文档并没有给除详细的说明跟例子。。。然后就自己慢慢理解了一下。其实也就是一个重命名而已。。。以下就是例子，希望能帮助理解：

在store中代码


```
import Vuex from 'vuex'  
import Vue from 'vue'  
Vue.use(Vuex);  
const store = new Vuex.Store({  
  state: {  
    count: 10,  
    numb: 10086  
  },  
  getters: {  
    add: (state, getter) => {  
      state.count = getter.add;  
      return state.count;  
    },  
  },  
  mutations: {  
    increment(state,){  
        state.count += 2;  
    },  
  },  
  actions: {  
    actionA({ dispatch, commit }) {  
      return commit('add');  
    },  
  }  
});  
  
export default store;  
```

在调用的模块里面的代码如下：

```
<template>  
  <div class="hello">  
    <button @click="increment">加{{count}}</button>  
  </div>  
</template>  
  
<script>  
  import {mapState,mapActions} from 'vuex'  
  
  export default {  
    name: 'hello',  
    data () {  
      return {  
        msg: 'Welcome to Your Vue.js App'  
      }  
    },  
    methods:{  
      increment(){  
        this.$store.dispatch('incrementsync').then(() => {  
          console.log('then');  
        });  
      }  
    },  
    computed: mapState({ // mapState相当于映射  
        count: 'numb',  //这个时候count应该等于多少？！！
        //是等于store文件里面的count呢还是等于numb？答案是等于numb！这边的意思是mapState把'numb'的值映射给了count，所以count等于10086  
    })  
  }  
</script>
```
这个时候按钮应该显示加10还是显示加10086？答案是加10086，所以map其实就是一个在store文件中的映射而已，就是不用让你要调用一个值需要敲这么多代码：this.$state.count;而只需要用count。。。
界面效果：

 * 加10086


好了，其他的mapAction，mapMutations的原理是一样样的
