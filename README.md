# xudu 的个人博客

基于现有 Jekyll 4 项目定制，参考 https://ysymyth.github.io/blog/ 的极简文字布局。没有复制参考站的文章或个人资料。使用项目内的布局、样式与分页插件，不依赖外部主题。

## 本地预览

```sh
bundle exec jekyll serve --host 127.0.0.1
```

打开 http://127.0.0.1:4000 。修改 `_config.yml` 后重启服务。构建命令为 `bundle exec jekyll build`。

## 个性化

在 `_config.yml` 修改 `title`、`author`、`subtitle`、`description`。`email` 和 `github_username` 留空时不显示链接。个人介绍在 `about.markdown`，导航在 `_data/navigation.yml`，样式在 `assets/css/style.css`。

发布前将 `url` 设置为实际域名，例如 `https://YOURNAME.github.io`。仓库项目站点将 `baseurl` 设置为 `/blog`；根域名站点保留空字符串。站内链接均使用 `relative_url`，支持两种路径。当前部署仓库为 `xuduyinuo/xuduyinuo.github.io`，通过 GitHub Actions 自动发布到 https://xuduyinuo.github.io/。

## 写文章

在 `_posts` 下添加 `YYYY-MM-DD-slug.md`：

```yaml
---
layout: post
title: 文章标题
date: 2026-10-13 12:00:00 +0800
categories: [技术]
math: false
---
```

正文使用 Markdown。用 `<!-- more -->` 分开首页摘要与正文。分类直接填写任意名称，如 `categories: [Database]` 或 `categories: [Linux, Web]`。分类页从文章自动生成所有分组和篇数，不需要创建分类页面或修改导航；归档按年份自动分组，并与分类页共用同一套列表样式。不要使用未来日期，Jekyll 默认不发布未来文章。

数学公式按文章开启 `math: true`，行内用 `$...$`，独立公式用 `$$...$$`；MathJax 3.2.2 通过 jsDelivr 加载，需要网络。代码块、表格和图片不依赖外部脚本。图片放在 `assets/images/`，通过 `{{ '/assets/images/example.png' | relative_url }}` 引用。

默认欢迎文章已改成中文写作示例；发布自己的文章后可以删除或替换它。当前目录已连接部署仓库，向 `main` 推送提交会自动更新网站。

## 样式来源与示例内容

字体、字号、行高、容器宽度、首页文章间距及颜色直接参照 [ysymyth/ysymyth.github.io 的 style.scss](https://github.com/ysymyth/ysymyth.github.io/blob/master/style.scss) 和 `_sass/_variables.scss`：Helvetica 正文 18px / 1.4，Helvetica Neue 标题 30px / 1.7，容器最大宽度 1000px（左右各 20px 内边距），站名 28px / 300，链接 #4183C4。640px 以下标题行高 1.4。保留本站中文导航、文章元信息、归档与 RSS。

新增四篇示例覆盖技术、影评与杂记（含中英文标题），正文均明确标注示例。可直接修改或删除 `_posts` 中对应文件。上游 MIT 许可证见 `THIRD_PARTY_NOTICES.md`。

文章详情页同样按上游 `_layouts/post.html` 与正文规则对齐：正文 18px/1.4、段落上下 15px；h1/h2/h3/h4 为 30/24/20/18px，标题行高 1.7；列表缩进 30px 且列表项不额外留白；引用 22px 斜体、灰色 2px 左边框；代码采用上游 `_highlights.scss`。日期和分类放在正文末尾。

导航固定为首页、分类、归档、关于。分类分组按名称排序，组内文章按日期倒序；文章末尾的分类链接直达分类页相应分组。分组模板为 `_includes/index-group.html`。

## 首页分页

首页每页显示 10 篇，超过 10 篇时自动生成 `/page/2/` 等静态页面，并显示上一页、页码和下一页。在 `_config.yml` 修改 `posts_per_page` 调整数量，修改后重启预览服务。分类和归档显示完整列表。分页由 `_plugins/home_pagination.rb` 在构建时生成，部署需要运行完整的 Jekyll 构建（如 GitHub Actions）；`--safe` 模式不加载本地插件。

导航使用内嵌 SVG 图标，悬停可见名称，屏幕阅读器可读取中文标签。底部不再显示 RSS 订阅入口。

## Logo 与网站图标

Logo 为黑色飞鹿剪影，位于 `assets/images/xudu-flying-deer.png`，以透明背景用于页头。`favicon.ico` 使用同一只飞鹿，包含 16、24、32、48、64、128、256px 七种尺寸；同时提供 PNG 网站图标与 180px Apple Touch Icon。图标采用白色底板，使深浅两种浏览器标签栏均能辨认。

飞鹿素材使用内置 imagegen 生成。设计提示：一只腾跃的飞鹿，清楚的鹿角、简化翅膀、纯黑剪影、透明背景；不包含文字、字母、边框或渐变。

## 生成文件与缓存

`_site/` 为编译输出，`.jekyll-cache/` 为缓存，二者均可随时重新生成，且已加入忽略规则。项目中仅保留当前使用的飞鹿与网站图标。预览服务如需避免在源码目录生成文件，可使用：

```sh
bundle exec jekyll serve --host 127.0.0.1 --port 4001 --destination /tmp/xudu-blog-preview --disable-disk-cache
```

## 发布到 GitHub Pages

部署步骤见 [DEPLOY.md](DEPLOY.md)。已提供 `.github/workflows/deploy.yml`，通过 GitHub Actions 构建与发布，支持本地分页插件；工作流自动读取实际网站域名和仓库子路径。
