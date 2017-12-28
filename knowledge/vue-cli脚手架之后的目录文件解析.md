### 安装vue-cli脚手架之后的目录文件解析


1、node_modules是我们通过npm install安装的依赖代码库，包括ES6语法解析、webpack构建工具、CSS代码编译等等。

2、src目录存放我们开发应用的源码，编写此应用，大多数代码都会写在这个目录下。

3、static目录用来存放第三方静态文件，默认包含一个【.gitkeep】文件，主要作用是：即使static目录为空，也可以将它提交到git仓库中，因为一般情况下，如果某个目录是空目录，是提交不了git的，git会自动忽略这个目录。

4、【.babelrc】文件是babel的一些配置，我们的代码是用ES6来写，但是很多浏览器不支持ES6的部分新特性，所以需要将ES6代码编译成ES5，才能正常执行：

（1）presets属性表示预设，属性值是一个数组['es2015', 'stage-2']说明安装这两个插件才能完成编译。

（2）除了预设插件，还有一些插件是需要plugins去配置的，包括['transform-runtime']，它可以把ES6的一些方法做转换，比如在node_modules下的【babel-plugin-transform-runtime】目录，它里边的definitions.js就是一些转换配置项；

（3）comments属性默认值是false，表示ES6语法转换后不会生成注释。

5【.editorconfig】是编辑器的一些配置，具体如下：

```
charset = utf-8 // 编码格式

indent_style = space // 缩进风格，基于空格

indent_size = 2 // 缩进大小是2格

end_of_line = lf // 换行符的风格

insert_final_newline = true // 创建一个文件，自动在文件末尾插入新行

trim_trailing_whitespace = true // 自动移除行尾多余空格
```

6、【.eslintignore】忽略语法检查的目录文件，一般是忽略build和config目录。

7、【.eslintrc.js】是eslint的配置文件，extands表示继承一个标准的规则，规则为：
```
https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style，

也可以通过rules表示对部分规则的改写，比如我们的代码不符合eslint格式规范，就会报错，但是自己的代码也没有明显的格式错误，

就可以不用按照它规定的格式来写，这时候就可以在rules中来修改配置项。

no-debugger默认是要判断：如果是开发环境，则允许出现debugger，如果是线上环境，则不出现debugger。

```

8、【.gitignore】表示本文件配置项中的目录不会提交到git仓库。。

9、package.json是我们项目的配置项及说明；

（1）name、version、description等都是项目说明；

（2）scripts表示我们可以表示命令行中的命令，例如npm run dev 、npm run build等；

（3）dependencies表示项目生产环境下的依赖；

（4）devDependencies表示项目编译过程中需要的依赖，这里对应的文件在我们项目上线之后是不存在的。
