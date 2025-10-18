---
title: "轻量化使用为目的的Git简单命令行操作教程"  # 文章标题
draft: false  # 是否为草稿。设为 false 才会发布
description: "有时Git的使用是基于轻量化的目的的，所以不需要劳烦VSc的可视化插件了，这时命令行的使用就尤为重要了，本文将介绍Git的基本使用方法，以便应用与简单项目中"  # 文章摘要
tags: ["Git", "软件", "项目实战"]  # 文章标签，用于分类和关联
categories: ["项目实战合集"]  # 文章分类
date: 2025-10-18
comments: true
authors:
  - name: xiaoditx
    link: https://github.com/xiaoditx
    image: https://github.com/xiaoditx.png
---

Git 是一个分布式版本控制系统，用于跟踪文件的更改，特别是源代码文件的更改。以下是一些 Git 的简单操作，适合初学者入门：

1. 初始化仓库
- git init：在当前目录创建一个新的 Git 仓库。

2. 克隆仓库
- git clone [url]：克隆一个远程仓库到本地。

3. 添加文件到暂存区
- git add [file]：将指定文件添加到暂存区。
- git add .：将当前目录下的所有更改添加到暂存区。

4. 提交更改
- git commit -m "[message]"：将暂存区的更改提交到仓库，并附带一条提交信息。

5. 查看状态
- git status：查看当前仓库的状态，包括未跟踪的文件、已修改的文件等。

6. 查看差异
- git diff：查看工作区与暂存区之间的差异。
- git diff --staged：查看暂存区与最后一次提交之间的差异。

7. 查看提交历史
- git log：查看提交历史。
- git log --oneline：以简洁格式查看提交历史。

8. 分支操作
- git branch：列出所有本地分支。
- git branch [branch-name]：创建一个新分支。
- git checkout [branch-name]：切换到指定分支。
- git checkout -b [branch-name]：创建并切换到新分支。

9. 合并分支
- git merge [branch-name]：将指定分支合并到当前分支。

10. 推送到远程仓库
- git push [remote] [branch]：将本地分支的更改推送到远程仓库。
- git push -u [remote] [branch]：将本地分支推送到远程仓库，并设置为默认上游分支。

11. 拉取远程仓库的更改
- git pull [remote] [branch]：从远程仓库拉取更改并合并到当前分支。

12. 撤销操作
- git checkout -- [file]：撤销工作区中文件的更改。
- git reset HEAD [file]：将文件从暂存区撤出。
- git revert [commit]：创建一个新的提交，撤销指定提交的更改。

13. 标签
- git tag [tag-name]：创建一个轻量级标签。
- git tag -a [tag-name] -m "[message]"：创建一个带注释的标签。
- git push [remote] [tag-name]：将标签推送到远程仓库。

14. 查看远程仓库
- git remote -v：查看远程仓库的详细信息。

15. 配置
- git config --global user.name "[name]"：设置全局用户名。
- git config --global user.email "[email]"：设置全局用户邮箱。

这些操作是 Git 的基础，适合日常使用。随着你对 Git 的熟悉，可以学习更高级的功能，如变基（rebase）、 stash、子模块等。
