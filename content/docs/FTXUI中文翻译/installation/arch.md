---
title: "Arch Linux"
weight: 8
---

FTXUI 已在 AUR（Arch 用户仓库）中打包。使用 AUR helper安装：

```bash
yay -S ftxui
```

您也可以手动从 <https://aur.archlinux.org/packages/ftxui> 下载 PKGBUILD。

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
> 这是一个非官方软件包。这意味着它不是由 FTXUI
> 团队维护，而是由社区维护。软件包维护者似乎会积极更新
> 至最新版本。感谢维护者的工作！

<div class="section_buttons">


</div>