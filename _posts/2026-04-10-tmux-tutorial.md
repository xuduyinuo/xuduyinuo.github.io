---
layout: "post"
title: "Tmux 使用教程"
date: "2026-04-10 22:52:48 +0800"
permalink: "/tmux-tutorial/"
tags: ["tmux", "tutorial"]
categories: ["教程"]
description: "Tmux 一个终端复用工具~"
---

tmux（Terminal Multiplexer）是一个终端复用工具，它允许你在单个终端窗口中创建多个虚拟终端会话，并能保持这些会话在后台运行。与直接使用终端相比，tmux 提供了更强大的会话管理功能。

## 安装Tmux

```shell
# Ubuntu/Debian
sudo apt-get install tmux

# CentOS/RHEL
sudo yum install tmux

# macOS (使用 Homebrew)
brew install tmux
```

## 理解 Tmux 的三层关系

1. **会话**：一个独立的后台工作区。你关掉终端窗口，里面的程序**继续运行**。
2. **窗口**：会话里的不同标签页，相当于浏览器里打开了多个网页。
3. **窗格**：一个窗口内分割出来的小屏幕，方便你同时看日志、写代码、跑命令。

示例：

```text
会话: 我的项目A
  ├── 窗口1: 代码编辑器
  │     ├── 窗格1: Vim 写代码
  │     └── 窗格2: 运行测试脚本
  └── 窗口2: 系统监控
        └── 窗格1: htop 看性能
```



## Tmux 快捷键

Tmux 的所有命令都需要先按一个**前缀键**来唤醒，系统才知道你在命令 Tmux，而不是在打字。

默认前缀键：Ctrl + b

### 1. 会话管理

| 操作         | 快捷键 / 命令         | 说明                         |
| :----------- | :-------------------- | :--------------------------- |
| 新建会话     | `tmux new -s 名字`    | 给会话起个名，方便找回       |
| **脱离会话** | `Ctrl + b + d`        | **程序后台运行，窗口随便关** |
| 查看会话列表 | `tmux ls`             | 终端里直接敲，不用进 Tmux    |
| **重新接入** | `tmux attach -t 名字` | **回到刚才的工作现场**       |

```shell
# 杀死会话
# 使用会话编号
$ tmux kill-session -t 0

# 使用会话名称
$ tmux kill-session -t <session-name>
```

### 2. 窗口管理

| 操作           | 快捷键               | 记忆技巧                  |
| :------------- | :------------------- | :------------------------ |
| **新建窗口**   | `Ctrl + b + c`       | **C**reate                |
| 切换下一个窗口 | `Ctrl + b + n`       | **N**ext                  |
| 切换上一个窗口 | `Ctrl + b + p`       | **P**revious              |
| 显示窗口列表   | `Ctrl + b + w`       | **W**indows（可视化选择） |
| 关闭当前窗口   | `exit` 或 `Ctrl + d` | 窗格/窗口内没有程序就关了 |

### 3. 窗格管理

| 操作            | 快捷键               | 记忆技巧                 |
| :-------------- | :------------------- | :----------------------- |
| **左右分屏**    | `Ctrl + b + %`       | 像一个**百分比**竖线 `|` |
| **上下分屏**    | `Ctrl + b + "`       | 像一个**双引号**横线 `—` |
| **切换光标**    | `Ctrl + b + 方向键`  | 上下左右移动焦点         |
| 关闭当前窗格    | `exit` 或 `Ctrl + d` |                          |
| 最大化/还原窗格 | `Ctrl + b + z`       | **Z**oom，再按一次还原   |



## Tmux 配置文件

```shell
# 编辑配置文件，设置 Tmux 一直支持鼠标操作
vim ~/.tmux.conf

# 在配置文件中添加以下配置
set -g mouse on
```

在已经打开的Tmux会话中需要输入以下命令才会生效，之后打开的Tmux会话自动生效

```shell
1. 按 Ctrl+b :
2. 在底部出现的命令栏中输入source-file ~/.tmux.conf，然后按回车即可
```



怎么配置mac使用终端连接远程服务器，在终端中使用tmux怎么复制tmux中的信息到本机的剪切板中

因为mac自带的终端不支持OSC 52协议，所以在该教程中使用Clipper工具进行复制tmux会话中的内容至本机剪切板

原理：

Clipper在本机 Mac 上作为后台服务运行，把**本机剪切板**通过 socket 暴露出来；在远程服务器里的 tmux/vim 把内容写到这个 socket，经 SSH 的 `RemoteForward` 转回本机，最后进入 Mac 剪切板。

安装并启动Clipper

```shell
brew install clipper

brew services start clipper
```

配置本机ssh转发 （配置文件~/.ssh/config）

```shell
Host myserver(取一个唯一的名字，后续通过ssh连接时只需要输入该名字即可，不用输入ip地址)
  HostName 你的服务器IP或域名
  User 你的用户名
  RemoteForward 8377 localhost:8377（clipper默认监听端口是8377）
```

配置远程服务器的tmux配置文件（~/.tmux.conf）

```shell
set -g mouse on
setw -g mode-keys vi

bind -T copy-mode-vi v send -X begin-selection
bind -T copy-mode-vi y send -X copy-pipe-and-cancel "nc -N localhost 8377"
bind -T copy-mode-vi Enter send -X copy-pipe-and-cancel "nc -N localhost 8377"
```

