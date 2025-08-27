---
title: "开始使用"
weight: 1
---

<br>

<img src="https://nsm09.casimages.com/img/2025/05/30//2505300816063242518595256.jpg" alt="标题图片" style="max-width: 260px; height: auto; display: block; margin: 0;">

## 安装 FTXUI

要在您的项目中配置FTXUI，请遵循[安装指南](installation.html)，该指南提供了针对多种构建系统和包管理器的说明。

## 最小示例

将以下代码保存为 `main.cpp`：

```cpp
#include <ftxui/dom/elements.hpp>
#include <ftxui/screen/screen.hpp>
#include <iostream>

int main() {
  using namespace ftxui;

  Element document = hbox({
    text("左侧")   | border,
    text("中间") | border | flex,
    text("右侧")  | border,
  });

  auto screen = Screen::Create(Dimension::Full(), Dimension::Fit(document));
  Render(screen, document);
  screen.Print();
}
```

使用您喜欢的构建系统进行构建和运行。  
如果不确定如何操作，请从[安装页面](installation.html)描述的其中一种方法开始。

预期输出：

```
┌────┐┌────────────────────────────────────┐┌─────┐
│左侧││中间                                ││右侧 │
└────┘└────────────────────────────────────┘└─────┘
```

## 入门模板

要获取完整可运行的项目，请克隆官方入门仓库：

```bash
git clone https://github.com/ArthurSonzogni/ftxui-starter
```

按照该仓库 `README.md` 中的构建说明进行操作。

<div class="section_buttons">

 
</div>
