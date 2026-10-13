# 上传 GitHub 与部署

本项目使用自定义分页插件，通过 `.github/workflows/deploy.yml` 在 GitHub Actions 中运行完整 Jekyll 构建，然后发布到 GitHub Pages。每次向 `main` 推送提交，网站都会自动更新。

## 1. 创建空仓库

在 GitHub 右上角 `+` → `New repository` 创建仓库。免费账户选择 `Public`。不要勾选创建 README、.gitignore 或 License，项目已有本地文件，使用空仓库可直接首次推送。

两种命名都支持：

- `你的用户名.github.io`：网站地址为 `https://你的用户名.github.io/`。
- `blog`：网站地址为 `https://你的用户名.github.io/blog/`。

前者适合将该博客作为个人主页；后者方便以后在根地址部署其他网站。

## 2. 启用 GitHub Pages

仓库 → `Settings` → `Pages` → `Build and deployment` → `Source`，选择 **GitHub Actions**。先启用，再推送项目，可避免首次工作流读取 Pages 配置时失败。若界面要求先有代码，可先推送，再设置并重新运行工作流。

不要再创建额外的 Jekyll 模板工作流；项目已提供部署文件。

## 3. 上传整个源码项目

将下方 `YOUR_USERNAME` 替换为真实 GitHub 用户名。示例使用仓库 `blog`；使用个人主页仓库时，将远程地址末尾的 `blog.git` 改为 `YOUR_USERNAME.github.io.git`。

```sh
cd /Users/xudu/blog
git init -b main
git add .
git commit -m "Initial blog"
git remote add origin https://github.com/YOUR_USERNAME/blog.git
git push -u origin main
```

如果提交时提示身份未配置，先执行（按实际信息替换，可用 GitHub 账户中的 noreply 邮箱），再重新提交：

```sh
git config user.name "YOUR_NAME"
git config user.email "YOUR_EMAIL"
```

HTTPS 推送需要 GitHub 支持的登录方式：GitHub CLI、Git Credential Manager 或个人访问令牌。提示输入密码时不能使用 GitHub 账户密码。若使用令牌推送工作流，令牌还需具备修改 Actions 工作流的权限。

已配置 SSH 的用户可以改用：

```sh
git remote set-url origin git@github.com:YOUR_USERNAME/blog.git
```

应上传 `.github/`、`_plugins/`、`_posts/`、布局、资源、Gemfile、Gemfile.lock 与配置文件。不要只上传 `_site/`，也不要删除锁文件；`.gitignore` 会自动排除生成目录、缓存和 `.DS_Store`。

## 4. 等待发布

仓库 → `Actions` → `Deploy blog to GitHub Pages`，查看 `build` 和 `deploy` 两个任务。全部变为绿色后，在 `Settings → Pages` 打开网站链接。

构建时会自动为现有锁文件补充 Linux 平台，然后安装依赖。安装依赖可能需要几分钟。

工作流读取 GitHub Pages 的实际 `origin` 和 `base_path`，构建时自动覆盖 `url` 和 `baseurl`，因此根站点和 `/blog/` 项目站点都可正确生成图片、分页、分类和文章链接。本地 `_config.yml` 无须为了首次发布填写用户名，仍可继续本地预览。

## 5. 日常更新

新增或修改文章后：

```sh
cd /Users/xudu/blog
git add .
git commit -m "Update blog"
git push
```

文章分类会自动生成，首页超过 10 篇后自动分页。若文章日期晚于构建时间，Jekyll 默认不会发布它。

## 排查

- `Get Pages site failed`：确认 `Settings → Pages → Source` 已设为 GitHub Actions，然后在 Actions 中重新运行失败任务。
- HTTPS 认证失败：使用 GitHub 支持的凭据，不是账户密码；确认仓库 URL、令牌仓库权限及工作流权限。
- 上传被拒绝且提示远程已有提交：远程仓库不是空仓库，先合并已有历史再推送，不要用强制推送覆盖。
- 构建失败：打开 Actions 的 `build` 日志，找到失败步骤的第一条错误。工作流会自动补充 `x86_64-linux` 平台；完整工作流不使用 `--safe`，确保本地分页插件被执行。
- 网站路径不对：打开 `Settings → Pages` 给出的实际网址，工作流会自动处理仓库子路径。

说明依据：

- https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site
- https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
- https://github.com/ruby/setup-ruby
