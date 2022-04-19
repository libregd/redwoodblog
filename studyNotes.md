redwoodblog

## 准备
yarn 的```yarn.lock```文件，需要在项目内运行yarn install 来自动生成。没有这个文件就没办法开搞。

网络问题，vpn 全局不行就局部，这个没办法，天朝代价

## 放到github

这一步没有花太多心思，但是让我惊奇的是，上一次我练习这个项目，生成的都是js文件，前后也就差了个把星期。

这次全是tsx格式，也不知道咋了。一查发现是typescript ，默认ts，有x是说用了 JSX syntax 来写的缘故。

这就很淦了，js都没摸清楚就开始看ts

[Learn TypeScript in 5 minutes - A tutorial for beginners
](https://www.freecodecamp.org/news/learn-typescript-in-5-minutes-13eda868daeb/)

看完发现其实是js的升级版，主要体现在OOP上，因为fcc学OOP的时候强调，这不是真正的OOP，只是有点像，OOP在java里面有，我们Javascript无，但是可以写函数装的很像。class也是函数，概念上并不是java里面的class。

- 数据的类型管理更严格，也不算啥，因为干活的时候传的是个啥心里还不是要有数。写出来也挺好。
- class关键字 用来轻松声明
- Interface ，感觉很像继承和公用一个什么的感觉，确实比学fcc时候的oop清晰，那个我学完就脑子很昏。


感觉变化不大，试试能不能拿redwood的js教程接着对付….

## 创建页面

先写了全局样式，保证至少能维持基本的可看度，然后开始创建页面。

``` js
yarn rw g page home /
yarn rw g page about
```
前一条创建一个home相关的文件，/ 意思直接指向根目录

后一条创建的一般的。

rw 是 redwood，g 是 generate

这个命令作用很多，我简要写一下：
- 你用的单词会自动给你拼pages这样单词搞成文件目录，太香了。
- 路由跳转这种自动生成，自动添加到关键页面（比如about自动被加入到home）。
- ```Routers.tsx``` 文件的生成的关键字要搞清楚都是啥意思。

## 公用部分
layouts，是提出来的概念，就是那种导航，底部，首页用了内页用的部分。就是layouts来解决的！
```
yarn rw g layout blog
```
blog就是你想搞的layouts名字，因为这个项目是搞个博客，还是很朴素那种，其实没有那么多花头，主要公用的就是header nav这种。













