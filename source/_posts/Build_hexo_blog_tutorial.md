---
title: 从零开始，使用Hexo搭建个人博客~
date: 2025-11-07 17:10:16
tags: 
	- hexo
	- blog
	- tutorial
categories: 教程
description: 使用hexo搭建个人博客的详细教程~~~
cover: 
---



# 从零开始，使用Hexo搭建个人博客~

> 参考文章：https://blog.fiveth.cc/p/bb32/

## 准备环境及工具

1、node.js 环境

>node.js下载链接：https://nodejs.org/en/

2、git环境

>git下载链接：https://git-scm.com/install/



验证是否下载成功，打开cmd终端，依次输入以下命令

```bash
node -v
npm -v（这个是node附带的）
git -v
```

显示版本号证明安装成功



3、Github 账号

需要新建一个Github仓库

**仓库名严格按照以下格式创建**

```bash
用户名.github.io
```

将仓库设置为可公开访问 Public

添加README

最后创建



在Github中添加SSH Key 以方便部署博客

进入任意文件夹，右键空白处然后点Git bash here,输入

```bash
ssh-keygen -t rsa -C "邮件地址"
```

然后敲4次Enter

然后进入C:\Users\用户名，在里面进入.ssh文件

用记事本打开里面的id_rsa.pub,全选复制里面的代码

**然后打开github**

进入用户设置，找到SSH keys

新建SSH keys，名称随意，在下面粘贴代码，

然后创建

**测试是否成功**

在git bash中输入

```bash
ssh -T git@github.com
```

回车，然后再输入yes



4、Typora

>Typora下载链接：https://typoraio.cn/
>
>可以在网上下载破解版或者在官网中下载beta版本



## 本地使用

使用npm工具下载hexo

```bash
npm install hexo-cli -g
```

在本地新建一个文件夹blog，放置相关博客文件

在blog中右键进入git bash，准备初始化hexo

依次执行下面的命令

```bash
# hexo初始化
hexo init

# hexo包下载
hexo install

# 生成浏览器静态文件内容
hexo g

# 本地启动hexo服务器
hexo s
```

浏览器输入localhost:4000 进入生成的hexo本地服务器（在命令行使用ctrl + c 关闭）



## 将本地博客内容部署到Github

在本地下载并安装hexo之后会生成的目录结构如下图

![hexo文件夹内容](Build_hexo_blog_tutorial/01.png)



编辑博客配置文件_config.yml，将博客内容链接到Github中

使用文本编辑器打开_config.yml，拉到最下面将deploy后面的全删掉，复制粘贴以下内容

repository后面为你的Github仓库链接，ssh或者https都行

```yml
  type: git
  repository: git@github.com:<your Github name>/<your Github name>.github.io.git
  branch: main
```

>注意缩进格式：每行前面都有两个空格不要删，每个冒号后面都有个空格也不要删！

保存退出



回到blog文件夹，进入git bash 安装自动部署发布工具

```bash
npm install hexo-deployer-git --save
```

在git bash中依次输入以下命令

```bash
# hexo静态文件生成
hexo g

# hexo本地文件部署到Github
hexo d
```



>如果是第一次使用git的话会需要配置
>
>```bash
>git config --global user.email "你的邮箱"
>git config --global user.name "你的名字"
>```
>
>配置完后再`hexo d`上传
>
>在跳出来的窗口内进行登录



到此，已经成功将hexo本地内容部署到Github中，并且可以在任意电脑进行访问

访问链接：<your Github name>.github.io



## 网站基础配置

上面的步骤执行完成之后，整个hexo博客都是初始默认的

现在进行一些基础配置

打开_config.yml文件

将#Site下面按自己的需求填上

```yml
## Site
title: 标题
subtitle: 副标题
description: 描述
keywords: 关键词
author: 站主
language: 语言（可以填写zh-CN）
timezone: 时区（可以填写Asia/Shanghai）
```



保存退出

> 注意：每次修改完配置或者添加文章等，要使其生效，都要执行以下命令

>```bash
># 将source文件夹下的文件生成静态html文件
>hexo g
>
># 启动本地hexo服务器，已修改的文件在本地生效
>hexo s
>
># 将hexo本地内容部署到Github中（将修改的内容进行同步）
>hexo d
>```



## 上传文章

在blog文件夹中打开git bash, 输入下方代码就可以生成新的文章md文件

```bash
hexo new 文章标题
```

可简写

```bash
hexo n 文章标题
```

文章是.md格式，自动生成在我们的blog文件夹中的source/_posts中

推荐用Typora软件来编辑.md格式的文件

写好以后仍需打开git bash进行生成、上传



关于写文章时插入图片的问题

>参考文章链接：https://blog.csdn.net/2301_77285173/article/details/130189857

建议为每个文章建立单独的资源文件夹，然后将图片资源放到该文件夹中

注意，设置的文章封面图片不能放在该文件夹中，因为在front-matter中引用该文件夹下的资源无效



对每篇文章建立一个资源文件夹，需要修改_config.yml配置文件如下：

```yml
post_asset_folder: true
marked:
  prependRoot: true
  postAsset: true
```



修改完成后，在终端新建文章时，会自动生成一个和文章同名的资源文件夹，如下图所示

![文章及其资源文件夹](Build_hexo_blog_tutorial/02.png)

>注意：如果文章名称有空格，需要使用双引号引起来



对于在Typora中插入图片不显示的问题

安装以下插件，可以使typora在预览时正常显示图片

```bash
npm install hexo-asset-img --save
```



## 配置个性化主题

>参考文章：https://butterfly.js.org/posts/21cfbf15/

执行完以上步骤，我们还可以下载个性化的主题对整体博客进行美化~

我主要使用的是butterfly主题，主要是简洁明了~



butterfly主题的安装方式有两种：使用git安装或者使用npm安装

从你的blog根目录进入终端

git安装命令

```bash
git clone -b master https://github.com/jerryc127/hexo-theme-butterfly.git themes/butterfly
```

npm安装命令

```bash
npm install hexo-theme-butterfly
```

>建议使用git方式进行安装，因为博主在使用npm方式安装后，主题好像有点小bug，部分配置没有生效



应用主题

修改blog目录下的_config.yml文件，把主题修改问butterfly

```yml
theme: butterfly
```



安装插件

如果沒有 pug 以及 stylus 的渲染器，需要执行以下命令安装

```bash
npm install hexo-renderer-pug hexo-renderer-stylus --save
```



建议：

在 hexo 的根目录创建一个文件 _config.butterfly.yml，并把主题目录的 _config.yml 內容复制到 _config.butterfly.yml 去。




![](Build_hexo_blog_tutorial/03.png)

> 使用git命令安装的主题保存在themes文件夹中，使用npm命令安装的主题保存在node_modules文件夹中



注意:

复制的是主题的 _config.yml ，而不是 hexo 的 _config.yml

不要把主题目录的 _config.yml 删掉

以后只需要在 _config.butterfly.yml 进行配置就行。如果使用了 _config.butterfly.yml， 配置主题的 _config.yml 将不会有效果。

Hexo 会自动合并主题中的 _config.yml 和 _config.butterfly.yml 里的配置，如果存在同名配置，会使用 _config.butterfly.yml 的配置，其优先度较高。



设置导航菜单

 打开_config.butterfly.yml文件，在对应位置添加以下内容

```yml
menu:
  Home: / || fas fa-home
  Archives: /archives/ || fas fa-archive
  Tags: /tags/ || fas fa-tags
  Categories: /categories/ || fas fa-folder-open
  List||fas fa-list||hide:
   Music: /music/ || fas fa-music
   Movie: /movies/ || fas fa-video
  Link: /link/ || fas fa-link
  About: /about/ || fas fa-heart
```

每一个菜单项都需要在资源文件夹中进行创建才能使用，除了Home、Archives

下面以标签页和分类页为例

标签页：

在blog文件夹中打开git bash，输入以下命令

```bash
hexo new page tags
```

在source文件夹中找到 source/tags/index.md 此文件，进行修改：

```md
---
title: 标签
date: 2018-01-05 00:00:00
type: 'tags'
orderby: random
order: 1
---
```

分类页

```bash
hexo new page categories
```

在source文件夹中找到 source/categories/index.md 此文件，进行修改：

```md
---
title: 分类
date: 2018-01-05 00:00:00
type: 'categories'
---
```

创建友链：

```bash
hexo new page link
```

在source文件夹中找到 source/link/index.md 此文件，进行修改：

```md
---
title: 友情链接
date: 2018-06-07 22:17:49
type: 'link'
---
```

友链数据来源：

在 blog 根目录中的 source/_data（如果没有 _data 文件夹，请自行创建），创建一个文件 link.yml

本地生成

```yml
- class_name: 友情链接
  class_desc: 那些人，那些事
  link_list:
    - name: Hexo
      link: https://hexo.io/zh-tw/
      avatar: https://d33wubrfki0l68.cloudfront.net/6657ba50e702d84afb32fe846bed54fba1a77add/827ae/logo.svg
      descr: 快速、简单且强大的网志框架

- class_name: 网站
  class_desc: 值得推荐的网站
  link_list:
    - name: Youtube
      link: https://www.youtube.com/
      avatar: https://i.loli.net/2020/05/14/9ZkGg8v3azHJfM1.png
      descr: 视频网站
    - name: Weibo
      link: https://www.weibo.com/
      avatar: https://i.loli.net/2020/05/14/TLJBum386vcnI1P.png
      descr: 中国最大社交分享平台
```

远程拉取：从 4.0.0 开始，支持从远程加载友情链接，远程拉取只支持 json。

注意： 选择远程加载后，本地生成的方法会无效。

在 source/link/index.md 这个文件的 front-matter 添加远程链接

```json
[
  {
    "class_name": "友情链接",
    "class_desc": "那些人，那些事",
    "link_list": [
      {
        "name": "Hexo",
        "link": "https://hexo.io/zh-tw/",
        "avatar": "https://d33wubrfki0l68.cloudfront.net/6657ba50e702d84afb32fe846bed54fba1a77add/827ae/logo.svg",
        "descr": "快速、简单且强大的网志框架"
      }
    ]
  },
  {
    "class_name": "网站",
    "class_desc": "值得推荐的网站",
    "link_list": [
      {
        "name": "Youtube",
        "link": "https://www.youtube.com/",
        "avatar": "https://i.loli.net/2020/05/14/9ZkGg8v3azHJfM1.png",
        "descr": "视频网站"
      },
      {
        "name": "Weibo",
        "link": "https://www.weibo.com/",
        "avatar": "https://i.loli.net/2020/05/14/TLJBum386vcnI1P.png",
        "descr": "中国最大社交分享平台"
      },
      {
        "name": "Twitter",
        "link": "https://twitter.com/",
        "avatar": "https://i.loli.net/2020/05/14/5VyHPQqR6LWF39a.png",
        "descr": "社交分享平台"
      }
    ]
  }
]

```



> 主题支持友情链接随机排序，只需要在顶部 front-matter 添加 random: true



其他图片相关的butterfly主题配置参考链接：https://butterfly.js.org/posts/4aa8abbe/



关于评论区、图库等相关的配置会在后续更新~~~ 

待续~~~



## 配置Front-matter

>参开文章链接：https://butterfly.js.org/posts/dc584b87/

Front-matter 是 markdown 文件最上方以 --- 分隔的区域，用于指定个别档案的变数。

Page Front-matter 用于 页面 配置
Post Front-matter 用于 文章页 配置



1、Page Front-matter

```md
---
title:
date:
updated:
type:
comments:
description:
keywords:
top_img:
mathjax:
katex:
aside:
aplayer:
highlight_shrink:
random:
limit:
  type:
  value:
---
```

![Page Front-matter参数详解](Build_hexo_blog_tutorial/04.png)



2、Post Front-matter

```md
---
title:
date:
updated:
tags:
categories:
keywords:
description:
top_img:
comments:
cover:
toc:
toc_number:
toc_style_simple:
copyright:
copyright_author:
copyright_author_href:
copyright_url:
copyright_info:
mathjax:
katex:
aplayer:
highlight_shrink:
aside:
abcjs:
noticeOutdate:
---
```

![Post Front-matter参数详解](Build_hexo_blog_tutorial/05.png)



## 配置自定义域名访问

首先需要有一个自定义域名，在阿里云或者腾讯云使用CNAME方式进行域名解析



登录Github，进入连接hexo博客内容的仓库（用户名.github.io）

Settings——>Pages——>Custom domain

在Custom domain下面的方框中填入自定义域名，点击Save保存

勾选Enforce HTTPS



# 遇到的问题

## Typora中打不出中文标点符号

快捷键ctrl + . 进行切换



## 页面渲染失败问题

hexo在本地生成的静态文件可以在本地正常加载及访问，但是使用hexo d 命令部署到Github之后，可以通过xxx.github.io进行访问，但是浏览器中css页面渲染失败。

>参考解决文章链接：https://blog.csdn.net/m0_60930579/article/details/126312041

在_config.yml中修改url链接

```yml
# URL
## Set your site url here. For example, if you use GitHub Page, set url as 'https://username.github.io/project'
url: http://xuduyinuo.github.io
root: /
```



## hexo文章添加多个标签

在文章的front-matter部分按照如下格式填写tags部分

```md
---
title: 如何在Hexo中添加多个标签
date: 2023-01-01
tags:
  - Hexo
  - 博客
---
```



## 文章结尾的中文标题乱码问题

当使用 hexo n title 命令新建文章时，如果title是中文标题，则在文章结尾的文章链接中会出现中文乱码问题，如下

![中文标题文章连接乱码](Build_hexo_blog_tutorial/07.png)

解决方案：

在使用hexo n title 命令新建文章时，title使用英文

![测试英文标题文章链接不乱码](Build_hexo_blog_tutorial/06.png)

然后进入生成的文章的md页面，修改post front-matter部分中title为中文标题

```md
---
title: 测试文章标题
date: 2025-01-01
tags:
  - Hexo
  - 博客
---
```

这样在封面中显示的标题为front-matter中的中文标题，文章结尾中的文章链接中的链接为使用 hexo n title 命令生成的英文标题链接了~

