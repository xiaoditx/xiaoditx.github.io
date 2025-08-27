---
title: "C++20 模块"
weight: 4
---

> [!WARNING]  
> 此功能仍处于开发阶段，API 可能在未来的版本中发生变更。  
> 我们需要您的贡献来帮助改进 FTXUI 中 C++20 模块的兼容性和可用性。  
> 如果您遇到任何问题或有建议，请提交 Issue。

FTXUI 实验性地支持 [C++20 模块](https://en.cppreference.com/w/cpp/language/modules)，以减少编译时间并改善代码组织。每个头文件都有一个对应的模块。

使用 `FTXUI_BUILD_MODULES` 选项来构建 FTXUI 项目本身以提供 C++20 模块，例如使用 CMake 和 Ninja：

```sh
cmake \
    -DCMAKE_GENERATOR=Ninja \
    -DFTXUI_BUILD_MODULES=ON \
    ..

ninja
```

> [!NOTE]  
> 要使用模块，您需要兼容 C++20 的编译器、CMake 3.20 或更高版本，并使用兼容的生成器（如 Ninja）。  
> 注意，Makefile 生成器**不支持模块**。

然后，在您自己的代码中，您可以正常使用这些模块：

```cpp
import ftxui;

int main() {
  auto screen = ftxui::ScreenInteractive::TerminalOutput();
  auto button = ftxui::Button("点我", screen.QuitClosure());
  screen.Loop(button);
  return 0;
}
```

注意，`ftxui` 是一个便捷模块，它简单地聚合了所有模块：

```cpp
export import ftxui.component;
export import ftxui.dom;
export import ftxui.screen;
export import ftxui.util;
```

您也可以根据需要仅导入特定的模块。

要使用 CMake 正确查找和链接模块，请使用 `target_link_libraries` 来获取正确的编译器、链接器等标志。

```cmake
target_link_libraries(my_executable
    #...其他依赖...
    PRIVATE ftxui::modules
)
```

### 模块列表

这些模块直接对应于相应的头文件，或是一组相关的头文件以提供更便捷的接口。以下是可用的模块：

- `ftxui`
    - `ftxui.component`
      - `ftxui.component.Animation`
      - `ftxui.component.CapturedMouse`
      - `ftxui.component.Component`
      - `ftxui.component.ComponentBase`
      - `ftxui.component.ComponentOptions`
      - `ftxui.component.Event`
      - `ftxui.component.Loop`
      - `ftxui.component.Mouse`
      - `ftxui.component.Receiver`
      - `ftxui.component.ScreenInteractive`
      - `ftxui.component.Task`
- `ftxui.dom`
    - `ftxui.dom.Canvas`
    - `ftxui.dom.Deprecated`
    - `ftxui.dom.Direction`
    - `ftxui.dom.Elements`
    - `ftxui.dom.FlexboxConfig`
      - `ftxui.dom.LinearGradient`
      - `ftxui.dom.Node`
      - `ftxui.dom.Requirement`
      - `ftxui.dom.Selection`
      - `ftxui.dom.Table`
- `ftxui.screen`
    - `ftxui.screen.Box`
    - `ftxui.screen.Color`
    - `ftxui.screen.ColorInfo`
    - `ftxui.screen.Deprecated`
    - `ftxui.screen.Image`
    - `ftxui.screen.Pixel`
    - `ftxui.screen.Screen`
    - `ftxui.screen.String`
    - `ftxui.screen.Terminal`
- [`ftxui.util`](https://arthursonzogni.github.io/FTXUI/namespaceftxui_1_1util.html)
    - `ftxui.util.AutoReset`
    - `ftxui.util.Ref`