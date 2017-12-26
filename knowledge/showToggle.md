```
<!DOCTYPE html>  
<html>  
<head>  
    <meta charset="utf-8">  
    <title>vue点击切换显示隐藏</title>  
    <script src="https://cdn.bootcss.com/vue/2.2.2/vue.min.js"></script>  
</head>  
<body>  
    <div id="example">  
        <button v-text="btnText" @click="showToggle"></button>  
        <p v-show="isShow">原本可以成为Google、Facebook的“爸爸”，或者微软的“儿子”，  
        最后却像“孙子”一样被贱卖，沦为互联网浪潮的“弃子”。</p>  
    </div>  
    <script type="text/javascript">  
    new Vue({  
        el:"#example",  
        data:{  
            btnText:"隐藏",  
            isShow:true  
        },  
        methods:{  
            showToggle:function(){  
                this.isShow = !this.isShow  
                if(this.isShow){  
                    this.btnText = "隐藏"  
                }else{  
                    this.btnText = "显示"  
                }  
            }  
        }  
    })  
    </script>  
</body>  
</html>  
```
 点击切换class
 
```
<template>
    <span class="static" v-bind:class="{ 'class-a' : isA, 'class-b': !isA}" @click="toggle">
<template>
<script>
    export default {
        data: function(){
            return {
                isA: false
            };
        },
        
        methods: {
            toggle: function(){
                this.isA = !this.isA;
            }
        }
    };
<script>
```

