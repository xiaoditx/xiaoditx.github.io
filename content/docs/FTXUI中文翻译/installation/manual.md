---
title: "手动安装"
weight: 5
---

## 从源码构建（官方方式）

使用 CMake 克隆并构建项目：

```bash
git clone https://github.com/ArthurSonzogni/FTXUI.git
cd FTXUI
cmake -S . -B build -DFTXUI_ENABLE_INSTALL=ON -D
cmake --build build -j
sudo cmake --install build
```

> [!note]
> 注意：上述命令中的 `-D` 参数似乎为笔误，通常不需要单独使用 `-D` 参数。
> 正确的用法应为 `-D<变量>=<值>` 格式，如 `-DFTXUI_BUILD_EXAMPLES=ON`。

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

<div class="section_buttons">

</div>