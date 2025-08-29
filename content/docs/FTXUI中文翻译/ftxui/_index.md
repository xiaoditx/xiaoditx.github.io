---
title: "ftxui"
weight: 3
---

<br>

<img src="https://nsm09.casimages.com/img/2025/05/30//2505300816063242518595251.jpg" alt="标题图片" style="max-width: 260px; height: auto; float: display: block; margin: 0;">

FTXUI 分为三个模块，每个模块都构建在前一个模块之上：

1. [ftxui/screen](#module-screen) - 底层渲染
2. [ftxui/dom](#module-dom) - 布局与组合
3. [ftxui/component](#module-component) - 用户交互

---

# ftxui/screen

定义：

- **`ftxui::Screen`**：一个包含样式化字符的二维网格。
- **`ftxui::Pixel`**：渲染的基本单位。
- 辅助工具，如 `ftxui::Color` 和 `Dimension`。

用于直接终端绘制和样式设置。

<div class="section_buttons">
 
[-->跳转至文档](./screen)
 
</div>

---

# ftxui/dom

提供：

- **`ftxui::Element`**：用于布局和用户界面的树形结构。
- 可组合和响应式的元素。
- `Render()` 函数，用于绘制到 `Screen` 上。

适用于结构化和样式化的用户界面。

<div class="section_buttons">

[-->跳转至文档](./dom)

</div>

---

# ftxui/component

增加：

- **`ftxui::Component`**：有状态的交互式组件。
- 内置组件：`Checkbox`、`Input`、`Menu`、`Button`。
- 支持键盘/光标输入和组合。

适用于交互式应用程序。

<div class="section_buttons">

[-->跳转至文档](./component)

</div>

---

模块可以独立使用，也可以组合使用：`screen → dom → component`。