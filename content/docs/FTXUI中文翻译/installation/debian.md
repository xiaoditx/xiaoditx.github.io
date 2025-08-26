---
title: "Debian/Ubuntu"
weight: 7
---

## Debian 和 Ubuntu 软件包（非官方）

这些发行版提供了预构建的软件包。通过以下命令安装：

```bash
sudo apt install libftxui-dev
```

可用的软件包包括：
- `ftxui-doc`（文档）
- `ftxui-examples`（示例）
- `libftxui-component<版本号>`
- `libftxui-dev`（开发文件）
- `libftxui-dom<版本号>`
- `libftxui-screen<版本号>`

安装完成后，您可以在 CMake 项目中使用它，只需在 `CMakeLists.txt` 中添加以下内容：

```cmake
find_package(ftxui REQUIRED)
add_executable(main main.cpp)
target_link_libraries(main
  PRIVATE ftxui::screen
  PRIVATE ftxui::dom
  PRIVATE ftxui::component
)
```

> [!note]
> 这是一个**非官方**软件包。这意味着它不是由 FTXUI
> 团队维护，而是由社区维护。

<div class="section_buttons">

</div>
