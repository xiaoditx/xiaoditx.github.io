---
title: "CMake"
weight: 1
---

本页面介绍如何使用 [CMake](https://cmake.org) 集成 FTXUI。

## 集成方法

### 使用 FetchContent

此方法在配置时下载 FTXUI，不需要系统级安装。

```cmake 
include(FetchContent)

FetchContent_Declare(ftxui
  GIT_REPOSITORY https://github.com/ArthurSonzogni/FTXUI
  GIT_TAG v6.1.9  # 替换为版本号、标签或提交哈希
)

FetchContent_MakeAvailable(ftxui)

add_executable(main main.cpp)
target_link_libraries(main
  PRIVATE ftxui::screen
  PRIVATE ftxui::dom
  PRIVATE ftxui::component
)
```

这种方法确保可重现的构建和便捷的依赖管理。

### 使用 find_package

如果 FTXUI 已通过系统级安装或包管理器（如 vcpkg 或 Conan）安装，可以使用：

```cmake 
find_package(ftxui REQUIRED)

add_executable(main main.cpp)
target_link_libraries(main
  PRIVATE ftxui::screen
  PRIVATE ftxui::dom
  PRIVATE ftxui::component
)
```

确保包在您的 `CMAKE_PREFIX_PATH` 中可见。

### 使用 Git 子模块

您也可以将 FTXUI 添加为 [Git 子模块](https://git-scm.com/book/en/v2/Git-Tools-Submodules)，将其保留在您的代码库中：

```cmake
git submodule add https://github.com/ArthurSonzogni/FTXUI external/ftxui
git submodule update --init --recursive
```

当克隆已包含 FTXUI 作为子模块的代码库时，请确保使用以下命令获取子模块：

```
git clone --recurse-submodules <your-repo>
# 或者，如果已经克隆：
git submodule update --init --recursive
```

然后在您的 `CMakeLists.txt` 中：

```cmake
add_subdirectory(external/ftxui)

add_executable(main main.cpp)
target_link_libraries(main
  PRIVATE ftxui::screen
  PRIVATE ftxui::dom
  PRIVATE ftxui::component
)
```

如果您希望将 FTXUI 打包到自己的代码库中，这种方法很适用。

## 可选的 CMake 标志

FTXUI 支持以下 CMake 选项：

| 选项                            | 描述                   | 默认值 |
| --------------------------------- | ----------------------------- | ------- |
| FTXUI_BUILD_EXAMPLES              | 构建捆绑的示例        | OFF     |
| FTXUI_BUILD_DOCS                  | 构建文档       | OFF     |
| FTXUI_BUILD_TESTS                 | 启用测试                  | OFF     |
| FTXUI_ENABLE_INSTALL              | 生成安装目标      | ON      |
| FTXUI_MICROSOFT_TERMINAL_FALLBACK | 改进 Windows 兼容性 | ON/OFF  |

启用选项的方法：

```
cmake -DFTXUI_BUILD_EXAMPLES=ON ..
```

## 验证集成

要确认设置正常工作，请构建并运行一个最小示例。
如果需要完整模板，请参阅：[ftxui-starter](https://github.com/ArthurSonzogni/ftxui-starter)

<div class="section_buttons">
 
 
</div>
