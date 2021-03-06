redwoodblog

## 准备
yarn 的```yarn.lock```文件，需要在项目内运行yarn install 来自动生成。没有这个文件就没办法开搞。

网络问题，vpn 全局不行就局部，这个没办法，天朝代价

解决了，将xxxx替换成vpn的端口号。
```
git config --global http.proxy 127.0.0.1:xxxx
git config --global https.proxy 127.0.0.1:xxxx
```
如果使用了不大行，那就把命令擦除：
```
git config --global --unset http.proxy
git config --global --unset https.proxy
```

# chapter 1
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
blog就是你想搞的layouts名字，因为这个项目是搞个博客，还是很朴素那种，其实没有那么多花头，主要公用的就是header nav这种。所以也想看看复杂的应用会怎么规划（俺实在需要实战课）


# chapter 2
每个章节就提交一次，免得痛苦。
## 数据模型生成和数据库管理

- rw使用了prisma这个来搞数据库，有个schema文件专门填数据的模型，就是啥数据有啥字段，字段啥要求。感觉是产品画完产品以后，后端就要画画数据模型。

这句会根据schema生成一个migrate，类似给schema照相，拿来不知道咋用。
```
yarn rw prisma migrate dev
```
这句会打开prisma的管理界面，看着有点数据库。也就是说不知道啥情况就用这句看看数据库？只能看不能有别的操作（增删改）。端口在http://localhost:5555/
```
yarn rw prisma studio
```
- rw还是很骚，说，数据库肯定要让大家用得舒舒服服啊！

然后这句就可以搞出一个可以直接增删改的页面，直接给你搞出了网页后台了，又是可视化数据库又是admin，再也不用对着终端敲各种sql语句，也不用再自己又搞个后台（也许需要后期美化css或者还是要搞）
```
yarn rw g scaffold post
```
- 所以这个一搞内容就很多，页面（pages）给你搞了，页面是还给你尽量模块化了的，所以layouts 和 components 都新增。那自然路由（追加）也给你搞了。

所以这个基本是根据schema搞出一整个后台（有些时候也是前中台）.....

敢这么搞估计是因为数据库操作是刚需，但有就是那些增删改，所以就可以集成这么搞。端口在http://localhost:8910/posts

post这个名字还有些讲究，因为从生成的东西来看不少内容会自动加s再加一些单词，养成好习惯是值得的。

## 分割user 和admin的不同权限

上面一步的posts页面其实已经不错了，但是普通用户不需要编辑和删除，他们能有的选项也就是看，光看。

所以需要把数据传到homepage等你希望用户查看的地方。

在上一步中，有因为一条scaffold命令就生成很多文件，其中一个类别是components、里面不少文件也带cell这个后缀。

而用户获取数据，也显然是一条一条的，因此在rw的逻辑里，cell是作为一种动态获取数据的方式，它不是单纯的往上一级去找数据，而是通过参数传递（上一级应该还是个载体），直接从数据库里拉，这样，每一个cell的可维护性，独立性就大大增强。也更动态。
```
yarn rw g cell Articles
```
这条命令很讲究，生成的是articles 带s的，因为教程的逻辑是这会想搞用户页面了 -> 就先搞用户看到的文章列表，列表那肯定不是一个，那就是带s，

所以做事逻辑决定取名。

但是说是article其实是跟人家post有什么差别，所以数据不可能复制一份，就是页面不同，而数据一样。

所以需要改一下文件，```articles: posts``` 强调自己主要是个代称,而你要展示什么，因为是自动生成的，就自带个id唯一标示，别的字段需要自己加。

有一点要注意，cell文件是直接和动态数据关联，那么数据就有好几种状态。loading/empty/failure/success/ 每种咋应对，就是设计师要考虑的，也是程序员要实现的。

### 有了内功还需心法

上一步（或者说上面好几步）可以说是redwood就像一个老师傅，传了好多功力给你，但是咋用，咋来的，我手指头发出去的神剑能源在哪里？

所以还是得搞清楚哪些批量生成的函数，参数，关键字。是啥对应关系。
side quest:how redwood works with data 这个小节就是在扯这个，举例用了post，毕竟```yarn rw g scaffold post```真的好像作弊命令啊喂！

但是具体好烦，我看两眼就想滚蛋。

### 完善用户流程体验

articles 搞来就是给看article的，cell搞出来了，但还要搞搞page：
post 相关命令提供了数据 -> cell 相关命令提供了数据抽取展示 -> page生成，让体验完善且独立。

就比较麻烦，搞好几个，生成好多。


总结来说，如果说post是超级命令，那么article的教程部分内容，强调的就是走完了cell数据部分+page展示部分+component构建部分 三部分整个实际开发中遛一遍的过程。

全是是套娃里面套娃，import 来 import去的。老麻烦了.....

我感觉初次正式项目就拿这个做我9.9成不太可能掌握这种啥时候该干啥的技能。

除非要制作的东西首先精心设计过，不停复用这个教程给的内容，不然的很难。（也很怕都是教程那点东西......照猫画虎

## chapter 3

rw觉得得考虑展示一下表单，以及他们的表单特别好的那种感觉。所以决定搞一个那种联系页。
```
yarn rw g page contact
```
页面 > 调整layout > 调整routes > 狂改页面

总结：表单很烦

表单数据的存储，比ch2的cell应用更全面，是ch1中post scaffold 命令全貌的一个更多一层开搞。

比如需要在此用到schema 生成migration, 也需要自行使用sdl，```yarn rw g sdl Contact```  命令来生成sdl和sever来搞定数据传输。post都是自动生成，article是直接从post那里转接。contact就是从页面，数据，一点点填充起来。

天啊，一个可以交互的网站可真麻烦。

表单一些要点：
- 校验输入
- 没有输入的当前鼠标要聚焦（视觉角度最好这个框还会左右摇动，以及边框变色）
- 提交成功要提示
- 提示完了还得清零
- 数据提交要搞到数据库去
总之就是全靠手写就很累，我已经怀念上scaffold了，运气好俺的穷穷指南应该就是从post的角度搞。
还是正规一点的流程，产品，设计，不要试图直接上手，数据库至少schema得写出来，不然写起来肯定慢，还老会报错。

## chapter 4

article和post已经在展示上做到了隔离，但是在页面权限上并没有，所以这个章节主要解决的就是1权限管理，2 数据库放云，3 托管到云上。

- 注册登陆是一条龙搞出来的，超级省事
- 数据库是挪到云上的，这样不用自己干活
- 网站要托管也是放到云上

就是基本照着做，原理上就是很简单，适合懒狗如我。

##intermisson

中场休息说是喊搞个tailwindcss ui库把样式弄了，
结果这个不起作用，我一看，都倒入了，路径也生成了。

你说没起作用，原本的垃圾样式不见了。
你说起作用了，又.....没啥变化。

## chapter 5

stroybook感觉就是很方便写样式，写假数据。
具体用起来有点绕....

testing 不是很搞得懂

## chapter6

重新搞了个railway数据库，更换了env变量，更换了netlify上的sql key，

因为本地没安装postgresql，所以本地服务起来以后直接去抓的railway的。

这在这章受挫了，因为新加了一个schema字段，又要重新生成一遍，但是估计railway就是为了让你在他平台上添加的，所以不会允许我本地这么搞。

因此又重复了一次chapter 4 的 inital schema操作。
























