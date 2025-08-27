---
title: "Vcpkg"
weight: 3
---

## Vcpkg 软件包

FTXUI 可在 [Vcpkg 注册表](https://vcpkg.link/ports/ftxui) 中获取。

要使用它，您可以在 `vcpkg.json` 中添加以下内容：

```json
{
  "name": "your-project",
  "version-string": "0.1.0",
  "dependencies": [
    {
        "name": "ftxui",
        "version>=": "6.1.9"
    }
  ]
}
```

## 使用 Vcpkg 安装 FTXUI
```bash
vcpkg install --triplet x64-linux  # 或 x64-windows / arm64-osx 等
```

## 配置构建系统
如果您使用 CMake，可以在 `CMakeLists.txt` 中使用以下配置：

**CMakeLists.txt**
```cmake
cmake_minimum_required(VERSION 3.15)
project(my_project)

# 确保在配置时传递 vcpkg 工具链文件
find_package(ftxui CONFIG REQUIRED)

add_executable(main main.cpp)
target_link_libraries(main
    PRIVATE ftxui::screen
    PRIVATE ftxui::dom
    PRIVATE ftxui::component
)
```

**main.cpp**
```cpp
#include <ftxui/component/screen_interactive.hpp>
#include <ftxui/component/component.hpp>
#include <ftxui/component/component_options.hpp>

int main() {
  using namespace ftxui;

  auto screen = ScreenInteractive::TerminalOutput();
  auto button = Button("点击我", [] { std::cout << "已点击！\n"; });

  screen.Loop(button);
}
```

**配置和构建项目**
```bash
cmake -B build -S . -DCMAKE_TOOLCHAIN_FILE=/path/to/vcpkg/scripts/buildsystems/vcpkg.cmake
cmake --build build
./build/main
```

<div class="section_buttons">
 
 
</div>
