---
title: "Conan"
weight: 4
---

FTXUI 可以通过 Conan 包管理器方便地获取和集成到您的项目中。

## 前置条件

### Conan

首先，确保您的系统已安装 Conan。如果尚未安装，可以使用 pip 安装：

```powershell
pip install conan
```

### CMake

Conan 通常与 CMake 协同工作，因此您也需要安装 CMake：

{{< tabs items="Windows,Windows (Chocolatey),Linux (Ubuntu/Debian),MacOS" >}}

    {{< tab >}}
    1.  访问 [CMake 官网](https://cmake.org/download/) 下载 Windows 安装程序
    2.  运行安装程序，确保勾选 "Add CMake to the system PATH" 选项
    {{< /tab >}}
    {{< tab >}}
    ```powershell
    choco install cmake --installargs 'ADD_CMAKE_TO_PATH=System'
    ```
    {{< /tab >}}
    {{< tab >}}
    ```bash
    sudo apt-get update
    sudo apt-get install cmake
    ```
    {{< /tab >}}
    {{< tab >}}
    这里推荐Homebrew安装，如果没有，请先安装它：
    ```
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    ```
    获取CMake
    ```
    brew install cmake
    ```
    {{< /tab >}}

{{< /tabs >}}

## 准备目录

当你确保拥有了Conan和CMake后，创建一个项目目录，例如`ftxui-demo`：

```powershell
mkdir C:\ftxui-demo
cd C:\ftxui-demo
```

## 配置

确保环境无误后，获取`conanfile.py`并放置在项目目录下，你可以考虑[从GitHub下载](https://github.com/conan-io/conan-center-index/blob/master/recipes/ftxui/all/conanfile.py) 或是[从本站复制](./conanfile)

FTXUI 的社区维护包可在[Conan Center](https://conan.io/center/recipes/ftxui) 找到。

> [!note]
> 这是一个非官方构建脚本。这意味着它不是由 FTXUI
> 团队维护，而是由社区维护。软件包维护者似乎会积极更新
> 至最新版本。感谢维护者的工作！

{{< callout type="warning" title="待办事项" >}}
如果您了解相关流程，请考虑向 Conan Center 添加一个"官方构建脚本。
这可以是一个 GitHub Action，在发布新版本时自动更新 Conan Center。
{{< /callout >}}


## 安装依赖并构建

完成后，我们运行以下命令安装 FTXUI 及其依赖项：

```powershell
conan install . --output-folder=build --build=missing
```

这将从 Conan 的远程仓库下载并安装 `ftxui/6.0.2` 及其所有依赖项。

当安装结束后，可以尝试在项目目录下创建一个 `demo.cpp` 文件进行测试：

```cpp
#include <ftxui/screen/screen.hpp>
#include <ftxui/dom/elements.hpp>
#include <iostream>

int main() {
    using namespace ftxui;
    auto document = hbox({
        text(" Hello "),
        text("FTXUI ") | bold | color(Color::Red),
        text(" world! ")
    });
    auto screen = Screen::Create(Dimension::Full(), Dimension::Fit(document));
    Render(screen, document);
    std::cout << screen.ToString() << std::endl;
    return 0;
}
```

如果测试顺利，我们就可以在项目目录下创建一个 `CMakeLists.txt` 文件了：

```cmake
cmake_minimum_required(VERSION 3.20)
project(ftxui-demo)

# 设置C++标准
set(CMAKE_CXX_STANDARD 20)

# 查找通过Conan安装的FTXUI包
find_package(ftxui CONFIG REQUIRED)

# 创建可执行文件
add_executable(demo demo.cpp)

# 将可执行文件链接到FTXUI库
target_link_libraries(demo PRIVATE ftxui::component)
```

<div class="section_buttons">
 
</div>
