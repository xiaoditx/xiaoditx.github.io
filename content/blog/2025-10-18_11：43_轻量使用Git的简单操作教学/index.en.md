---
title: "Lightweight Git Command Line Operation Tutorial"  # Article title
draft: false  # Whether it's a draft. Set to false to publish
description: "Sometimes Git is used for lightweight purposes, so there's no need to bother with VS Code's visualization plugins. At this time, command line usage becomes particularly important. This article will introduce the basic usage of Git for simple projects"
  # Article summary
tags: ["Git", "Software", "Project Practice"]  # Article tags for categorization and association
categories: ["Project Practice Collection"]  # Article categories
date: 2025-10-18
comments: true
authors:
  - name: xiaoditx
    link: https://github.com/xiaoditx
    image: https://github.com/xiaoditx.png
---

Git is a distributed version control system used to track changes to files, especially source code files. Here are some simple Git operations suitable for beginners:

1. Initialize a repository
- git init: Create a new Git repository in the current directory.

2. Clone a repository
- git clone [url]: Clone a remote repository to local.

3. Add files to the staging area
- git add [file]: Add the specified file to the staging area.
- git add .: Add all changes in the current directory to the staging area.

4. Commit changes
- git commit -m "[message]": Commit the changes in the staging area to the repository with a commit message.

5. Check status
- git status: Check the current status of the repository, including untracked files, modified files, etc.

6. Check differences
- git diff: View differences between the working directory and the staging area.
- git diff --staged: View differences between the staging area and the last commit.

7. View commit history
- git log: View commit history.
- git log --oneline: View commit history in a concise format.

8. Branch operations
- git branch: List all local branches.
- git branch [branch-name]: Create a new branch.
- git checkout [branch-name]: Switch to the specified branch.
- git checkout -b [branch-name]: Create and switch to a new branch.

9. Merge branches
- git merge [branch-name]: Merge the specified branch into the current branch.

10. Push to remote repository
- git push [remote] [branch]: Push changes from the local branch to the remote repository.
- git push -u [remote] [branch]: Push the local branch to the remote repository and set it as the default upstream branch.

11. Pull changes from remote repository
- git pull [remote] [branch]: Pull changes from the remote repository and merge them into the current branch.

12. Undo operations
- git checkout -- [file]: Undo changes to a file in the working directory.
- git reset HEAD [file]: Remove a file from the staging area.
- git revert [commit]: Create a new commit that undoes the changes from the specified commit.

13. Tags
- git tag [tag-name]: Create a lightweight tag.
- git tag -a [tag-name] -m "[message]": Create an annotated tag with a message.
- git push [remote] [tag-name]: Push a tag to the remote repository.

14. View remote repositories
- git remote -v: View detailed information about remote repositories.

15. Configuration
- git config --global user.name "[name]": Set the global username.
- git config --global user.email "[email]": Set the global user email.

These operations are the basics of Git and are suitable for daily use. As you become more familiar with Git, you can learn more advanced features such as rebase, stash, submodules, etc.