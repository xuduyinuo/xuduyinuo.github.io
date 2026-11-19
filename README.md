# xudu 的个人博客

基于现有 Jekyll 4 项目适配 [Start Bootstrap Clean Blog](https://startbootstrap.github.io/startbootstrap-clean-blog/)。使用官方背景图、Open Sans / Lora 字体、大图页头和单栏文章布局，保留本站文章与中文导航。布局、样式、字体和背景图片都在项目内，不需要安装额外主题。

## 本地预览

```sh
bundle exec jekyll serve --host 127.0.0.1
```

打开 http://127.0.0.1:4000 。修改 `_config.yml` 后重启服务。构建命令为 `bundle exec jekyll build`。

## 个性化

在 `_config.yml` 修改 `title`、`author`、`subtitle`、`description`。`email` 和 `github_username` 留空时不显示链接。个人介绍在 `about.markdown`，导航在 `_data/navigation.yml`，样式在 `assets/css/style.css`。

首页、分类、归档、照片墙和关于页共用站点副标题 `subtitle` 与 `subtitle_alternate`。文字跟随光标逐字出现，整句停留后回删，再输入下一句。鼠标悬停或切到后台时暂停打字。清空 `subtitle_alternate`、关闭 JavaScript 或开启系统的「减少动态效果」时，静态显示第一句。修改 `_config.yml` 后需重启本地预览服务。

发布前将 `url` 设置为实际域名，例如 `https://YOURNAME.github.io`。仓库项目站点将 `baseurl` 设置为 `/blog`；根域名站点保留空字符串。站内链接均使用 `relative_url`，支持两种路径。当前部署仓库为 `xuduyinuo/xuduyinuo.github.io`，通过 GitHub Actions 自动发布到 https://xuduyinuo.github.io/。

## 维护照片墙

编辑根目录的 `photos.md`，在列表中每行添加一张图片。方括号里填写照片描述，圆括号里填写图片地址，例如：

```markdown
- ![傍晚的天空](../images/photos/01.webp)
- ![海边日落](https://example.com/sunset.jpg)
```

站内照片可以放在 `images/photos/`；外部照片使用能直接打开图片的链接。列表顺序就是照片墙的排列顺序。

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

文章地址使用 `https://xuduyinuo.github.io/slug/`，不包含日期。例如 `2026-10-13-small-tools.md` 对应 `/small-tools/`。需要指定路径或保留大小写时，在文章头部添加 `permalink: /The-Second-Half/`。

正文使用 Markdown。用 `<!-- more -->` 分开首页摘要与正文。分类直接填写任意名称，如 `categories: [Database]` 或 `categories: [Linux, Web]`。分类页从文章自动生成所有分组和篇数，不需要创建分类页面或修改导航；归档按年份自动分组，并与分类页共用同一套列表样式。不要使用未来日期，Jekyll 默认不发布未来文章。

数学公式按文章开启 `math: true`，行内用 `$...$`，独立公式用 `$$...$$`；MathJax 3.2.2 通过 jsDelivr 加载，需要网络。代码块、表格和图片不依赖外部脚本。图片放在 `assets/images/`，通过 `{{ '/assets/images/example.png' | relative_url }}` 引用。

默认欢迎文章已改成中文写作示例；发布自己的文章后可以删除或替换它。当前目录已连接部署仓库，向 `main` 推送提交会自动更新网站。

## Clean Blog 主题

主题参考 [Start Bootstrap Clean Blog](https://startbootstrap.github.io/startbootstrap-clean-blog/)，首页背景使用项目根目录的 `william.webp`，文章页背景使用 `funingna.webp`，分类、归档与关于页共用首页背景。页头、导航和首页标题使用 Open Sans，文章页日期使用 Lora，首页摘要与文章正文使用 Helvetica Neue / 系统中文无衬线字体；字体文件保存在 `assets/fonts/`，预览无需连接 Google Fonts。上游及字体许可证见 `THIRD_PARTY_NOTICES.md`。

首页采用单栏图文卡片，封面左右交错，只显示原有标题、原文摘要与日期，不添加作者、分类提示或阅读全文入口。桌面端图文宽度为 40% / 60%，列表容器最大宽度 960px（含左右各 24px 留白）。标题 26px / 36.4px、600 字重，最多两行；摘要 14px / 23.8px、轻斜体，最多三行；标题和摘要的非尾行两端对齐，末行左对齐。超出行数时显示省略号，原文保留，鼠标悬停标题可查看完整文字。日期 12px / 19.2px。卡片高度由两行标题、三行摘要、一行日期、段间距和上下留白计算，桌面端约 220px，所有卡片等高。

小于 768px 时改为上图下文，封面高 140px，标题 21px / 29.4px、摘要 13px / 22.1px；小于 375px 时标题为 19px / 26.6px。手机端也按最多行数计算等高卡片，总高约 323–328px。样式变量集中在 `.post-list`，调整字号、行高或文字区域上下留白时，卡片高度会同步变化。

首页继续使用原来的文章标题和摘要来源（副标题或正文摘要），不改写内容，沿用最多输出 140 字的规则；卡片内摘要最多显示三行，超出部分以省略号收起。`cover` 指定封面路径，未设置时使用桌面背景照片；所有封面统一以 `object-fit: cover` 等比例铺满图片区域，不加内边距，必要时裁剪边缘。Redis 与 Tmux 使用项目内的 SVG 技术插画，保存在 `assets/images/covers/`，可直接编辑并无损缩放。

文章正文保持 16px / 1.7、段落间距 30px。正文容器最大宽度为 860px（含左右各 24px 留白，可用宽度 812px），文章页头与正文共用相同宽度和左右留白，使标题与正文左对齐，页头作者链接显示为白色。手机端正文 16px / 1.75，左右各留白 20px。

首页、分类、归档和关于页共用相同的页头样式与 `clean_blog.home_background` 配置（当前为 `william.webp`），裁剪位置、饱和度与遮罩一致；更换首页背景后四个页面同步更新。桌面端页头约 430px 高，站名 72px，下方以短分隔线连接 20px 的交替副标题。使用用户指定的背景图片，通过轻微降低饱和度与分区遮罩，使文字与背景层次更清晰；文章页背景与正文排版不受此设置影响。

文章页顶部背景区域约占半屏高度（50svh），图片等比例铺满并从上方裁剪，底部人物优先完整保留，不修改原图片。标题、分类和日期垂直居中，仍与正文左对齐；小屏与长标题按内容自然增高，避免文字被截断。

在 `_config.yml` 的 `clean_blog.home_background` 中修改首页、分类、归档和关于页共用的背景，在 `post_background` 中修改文章页背景。其他单个页面或文章也可在 front matter 中设置 `background: /assets/images/example.jpg` 覆盖默认背景，以及 `subtitle` 设置页头副标题。首页保留站名 Xudu，并使用站点 `subtitle` 或 `description` 作为副标题。网站图标和飞鹿标识保留。

首页文章显示原有标题、原文摘要与日期，点击卡片任意区域进入正文。详情页保留 Markdown、数学公式、图片、代码高亮、复制与折叠、评论。导航固定为首页、分类、归档、关于，手机端通过“菜单”按钮展开；不启用 JavaScript 时导航仍可访问。

顶部导航采用 Clean Blog 的响应式居中容器，站名与导航项垂直居中，左右留白对称。导航栏高度约 63px，站名字号 22px，菜单字号 14px。桌面端在页头顶部显示透明底白字；向下滚动后收起，向上滚动时显示半透明浅色底、柔和灰色文字的固定导航，返回页首后恢复透明状态。键盘聚焦导航时保持可见。手机端保留白底折叠菜单。

分类按名称排序，组内文章按日期倒序；文章分类以无边框文字链接显示在页头标题下方，固定左对齐，点击直达分类页相应分组。标题仍与正文左对齐。归档按年份分组，与分类页共用 `_includes/index-group.html`。

## 文章目录

文章右下角提供“显示目录”按钮，目录默认隐藏，每次打开或刷新文章均从隐藏状态开始。点击后，宽屏在正文右侧显示目录栏，不改变正文宽度，目录初始位置与正文起点对齐，向下滚动后以 CSS sticky 吸附，顶部为固定导航预留高度并增加 24px 留白；窄屏以右侧浮层显示。长目录在内部滚动，顶部标题与收起按钮始终可见，不通过滚动脚本反复计算目录位置或高度。可以再次点击按钮、点击目录中的“收起”或按 Escape 关闭。

目录自动读取正文中的 h1–h6 标题并保留层级，不需要逐篇维护。默认只显示一级目录（以文章实际标题层级为准，正文从 h2 开始时，h2 即为一级目录）；点击章节名称会跳转并展开其子目录，点击右侧箭头可独立展开或收起子目录。页面滚动不会自动展开子目录，当前章节隐藏时会标记它可见的上级目录。缺失或重复的标题锚点会自动补齐。没有标题的文章不显示目录入口。不启用 JavaScript 时文章照常阅读，打印时不显示目录与切换按钮。

## 首页分页

首页每页显示 10 篇，超过 10 篇时自动生成 `/page/2/` 等静态页面。分页采用白底、浅灰细边框、深灰文字的矩形按钮，悬停时变为青蓝底白字：左侧“← 更新的文章”，右侧“更早的文章 →”；只有存在对应页面时才显示按钮，不显示数字页码。

在 `_config.yml` 修改 `posts_per_page` 调整数量，修改后重启预览服务。分类和归档显示完整列表。分页由 `_plugins/home_pagination.rb` 在构建时生成，部署需要运行完整的 Jekyll 构建（如 GitHub Actions）；`--safe` 模式不加载本地插件。

## Logo 与网站图标

Logo 为黑色飞鹿剪影，位于 `assets/images/xudu-flying-deer.png`，以透明背景用于顶部导航。`favicon.ico` 使用同一只飞鹿，包含 16、24、32、48、64、128、256px 七种尺寸；同时提供 PNG 网站图标与 180px Apple Touch Icon。图标采用白色底板，使深浅两种浏览器标签栏均能辨认。

飞鹿素材使用内置 imagegen 生成。设计提示：一只腾跃的飞鹿，清楚的鹿角、简化翅膀、纯黑剪影、透明背景；不包含文字、字母、边框或渐变。

## 生成文件与缓存

`_site/` 为编译输出，`.jekyll-cache/` 为缓存，二者均可随时重新生成，且已加入忽略规则。项目中仅保留当前使用的飞鹿与网站图标。预览服务如需避免在源码目录生成文件，可使用：

```sh
bundle exec jekyll serve --host 127.0.0.1 --port 4001 --destination /tmp/xudu-blog-preview --disable-disk-cache
```

## 发布到 GitHub Pages

部署步骤见 [DEPLOY.md](DEPLOY.md)。已提供 `.github/workflows/deploy.yml`，通过 GitHub Actions 构建与发布，支持本地分页插件；工作流自动读取实际网站域名和仓库子路径。

## Google 搜索收录

每次发布自动生成 `/sitemap.xml`，包含公开文章、首页、分页、分类、归档和关于页面；`/robots.txt` 允许抓取并声明 sitemap 地址。页面已有 canonical 和摘要。404 页面设为 `noindex`，不会进入 sitemap。无需逐篇手动维护 URL 或安装额外依赖。

首次上线后，在 [Google Search Console](https://search.google.com/search-console) 完成一次设置：

1. 确认 GitHub Pages 的自定义域名为 `xuduyinuo.cn`，并启用 HTTPS；部署工作流以 Pages 设置中的实际域名生成 sitemap 和 canonical。
2. 添加网址前缀资源 `https://xuduyinuo.cn/`，选择「HTML 标记」验证，将 Google 给出的 `content` 值填入 `_config.yml` 的 `google_site_verification`，发布后点击验证。也可以选择网域资源并使用 DNS TXT 验证，无须填写该配置。
3. 在「站点地图」提交 `https://xuduyinuo.cn/sitemap.xml`。以后发布文章时，地图自动更新，Google 自行安排重新抓取。
4. 可用「网址检查」检查首页或新文章，必要时请求编入索引；在「网页索引编制」中查看未收录原因。

文章实质更新后，可在 front matter 添加或修改 `last_modified_at: 2026-10-22 12:00:00 +0800`。只在有真实更新日期时输出 `lastmod`，不要把每次构建时间当成内容更新时间。需要隐藏索引的页面设置 `noindex: true`，同时会从 sitemap 排除；仅排除地图可设置 `sitemap: false`（这不禁止搜索收录，也不限制访问）。

Google 不保证抓取时间或收录结果；sitemap 帮助发现内容。旧的 sitemap ping 接口已停用，本项目不使用该接口。参见 [Google sitemap 文档](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap) 和 [ping 接口停用说明](https://developers.google.com/search/blog/2023/06/sitemaps-lastmod-ping)。

## 从 Hexo 迁入的文章

已迁入 Hexo 的 9 篇文章，并为现有 KG-R1 补充原分类和标签。原发布日期保留，文件名符合 `YYYY-MM-DD-slug.md`，使用显式 `permalink` 保留文章名称和大小写。

文章图片统一保存在 `images/文章名称/`，包括 MySQL 文章原先使用的 4 张外链图片。Markdown 图片和 HTML `<img>` 均使用 `../images/` 相对路径引用，例如：

```markdown
![示意图](../images/GCR/build_KG_trie.webp)
```

含空格或中文的图片路径采用 URL 编码。新增图片时沿用相同目录结构；文章含公式时在头部设置 `math: true`。

## 代码框

代码框显示语言和行数，右上角提供一键复制，复制内容包含折叠隐藏的完整代码。超过 `code_fold_lines`（默认 20）行时默认折叠，保留 `code_preview_lines`（默认 12）行预览，点击按钮可展开和收起。两项设置在 `_config.yml`。禁用 JavaScript 或打印时显示完整代码。

## giscus 评论

文章底部嵌入 giscus 官方评论组件，中文、浅色主题，按文章路径（`pathname`）严格匹配讨论，滚动到评论区附近再加载。评论与回复保存在博客仓库的 GitHub Discussions，读者需登录 GitHub 后评论。

博客仓库已开启 Discussions，giscus GitHub App 已获此仓库的 Discussions 读写权限，使用 `Announcements` 分类。若以后更换评论仓库，需为新仓库启用 Discussions 并单独授权。在 https://giscus.app/zh-CN 填入 `xuduyinuo/xuduyinuo.github.io`，选择 `Announcements` 分类，将官方生成的 `data-category-id` 填入 `_config.yml` 的 `giscus.category_id`。配置不完整时不加载评论组件。

全站关闭：设置 `giscus.enabled: false`。单篇关闭：在文章头部添加 `comments: false`。不要修改既有文章路径，否则评论关联会改变。
