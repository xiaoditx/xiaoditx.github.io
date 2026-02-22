---
title: "Abstract...."
comments: true
authors:
  - name: xiaoditx
    link: https://github.com/xiaoditx
    image: https://github.com/xiaoditx.png
weight: 1
---

Have you ever seen how long the longest error output takes? Anyway, when I was compiling yesterday, I saw the longest error output in my life - it took a full minute to finish outputting.

The reason was that `#include<commctrl.h>` was before `windows.h`....