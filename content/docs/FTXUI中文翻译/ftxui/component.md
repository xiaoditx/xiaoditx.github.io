---
title: "component（组件模块）"
---

![title-img](https://nsm09.casimages.com/img/2025/05/31//2505310207423242518595349.png)

`ftxui::component` 模块定义了产生交互式组件的逻辑，这些组件能够响应用户事件（键盘、鼠标等）。

[examples](../../examples) 章节提供了一系列示例。

`ftxui::ScreenInteractive` 定义了渲染组件的主循环。

`ftxui::Component` 是指向 `ftxui::ComponentBase` 的共享指针。后者定义了：
- `ftxui::ComponentBase::Render()`：如何渲染界面。
- `ftxui::ComponentBase::OnEvent()`：如何响应事件。
- `ftxui::ComponentBase::Add()`：在两个组件之间构建父子关系。组件树用于定义如何使用键盘进行导航。

`ftxui::Element` 用于渲染单个帧。

`ftxui::Component` 用于渲染动态用户界面，生成多个帧，并在事件发生时更新其状态。

多个组件的[图库](https://arthursonzogni.github.io/FTXUI/examples_2component_2gallery_8cpp-example.html)。（[演示](https://arthursonzogni.github.io/FTXUI/examples/?file=component/gallery)）

![image](https://user-images.githubusercontent.com/4759106/147247330-b60beb9f-e665-48b4-81c0-4b01ee95bc66.png)

所有预定义的组件可在 ["ftxui/dom/component.hpp"](./component_8hpp.html) 中找到。

\include ftxui/component/component.hpp

## 输入框（component::input）

[示例](https://arthursonzogni.github.io/FTXUI/examples_2component_2input_8cpp-example.html)：

![image](https://user-images.githubusercontent.com/4759106/147247671-f1d6f606-1845-4e94-a4a0-d4273e9ae6bd.png)

由 "ftxui/component/component.hpp" 中的 `ftxui::Input()` 生成。

@htmlonly
<script id="asciicast-223719" src="https://asciinema.org/a/223719.js" async></script>
@endhtmlonly

### 过滤输入

可以使用 `ftxui::CatchEvent` 过滤输入组件接收的字符。

```cpp
std::string phone_number;
Component input = Input(&phone_number, "电话号码");

// 过滤非数字字符。
input |= CatchEvent([&](Event event) {
  return event.is_character() && !std::isdigit(event.character()[0]);
});

// 过滤超过10个字符后的输入。
input |= CatchEvent([&](Event event) {
  return event.is_character() && phone_number.size() >= 10;
});
```

## 菜单 （component-menu）

定义一个菜单对象。它包含一个条目列表，其中一项被选中。

[示例](https://arthursonzogni.github.io/FTXUI/examples_2component_2menu_8cpp-example.html)：

![image](https://user-images.githubusercontent.com/4759106/147247822-0035fd6f-bb13-4b3a-b057-77eb9291582f.png)

由 "ftxui/component/component.hpp" 中的 `ftxui::Menu()` 生成。

@htmlonly
<script id="asciicast-223720" src="https://asciinema.org/a/223720.js" async></script>
@endhtmlonly

## 切换按钮 {#component-toggle}

一种特殊类型的菜单。条目水平显示。

[示例](https://arthursonzogni.github.io/FTXUI/examples_2component_2toggle_8cpp-example.html)：

![image](https://user-images.githubusercontent.com/4759106/147249383-e2201cf1-b7b8-4a5a-916f-d761e3e7ae40.png)

由 "ftxui/component/component.hpp" 中的 `ftxui::Toggle()` 生成。

@htmlonly
<script id="asciicast-223722" src="https://asciinema.org/a/223722.js" async></script>
@endhtmlonly

## 复选框 {#component-checkbox}

此组件定义一个复选框。它是一个可以打开/关闭的单个条目。

[示例](https://arthursonzogni.github.io/FTXUI/examples_2component_2checkbox_8cpp-example.html)：

![image](https://user-images.githubusercontent.com/4759106/147246646-b86926a9-1ef9-4efb-af98-48a9b62acd81.png)

由 "ftxui/component/component.hpp" 中的 `ftxui::Checkbox()` 生成。

@htmlonly
<script id="asciicast-223724" src="https://asciinema.org/a/223724.js" async></script>
@endhtmlonly

## 单选按钮 {#component-radiobox}

单选框组件。这是一个条目列表，其中一项可以被选中。

[示例](https://arthursonzogni.github.io/FTXUI/examples_2component_2radiobox_8cpp-example.html)：
  
![image](https://user-images.githubusercontent.com/4759106/147246401-809d14a5-6621-4e36-8dd9-a2d75ef2a94e.png)

由 "ftxui/component/component.hpp" 中的 `ftxui::Radiobox()` 生成。

@htmlonly
<script id="asciicast-223725" src="https://asciinema.org/a/223725.js" async></script>
@endhtmlonly

## 下拉菜单 {#component-dropdown}

下拉菜单是一个组件，打开时显示一个元素列表供用户选择。

[示例](https://arthursonzogni.github.io/FTXUI/examples_2component_2dropdown_8cpp-example.html)：

![youtube-video-gif (3)](https://user-images.githubusercontent.com/4759106/147246982-1e821751-531c-4e1f-bc37-2fa290e143cd.gif)

由 "ftxui/component/component.hpp" 中的 `ftxui::Dropdown()` 生成。

## 滑块 {#component-slider}

表示一个滑块对象，它由一个带有分箱中间间隔的范围组成。可以通过 `ftxui::Slider()` 创建。

[示例](https://arthursonzogni.github.io/FTXUI/examples_2component_2slider_8cpp-example.html)：

![image](https://user-images.githubusercontent.com/4759106/147249265-7e2cad75-082c-436e-affe-44a550c480ab.png)

由 "ftxui/component/component.hpp" 中的 `ftxui::Slider()` 生成。

## 渲染器 {#component-renderer}

由 \ref ftxui/component/component.hpp 中的 `ftxui::Renderer()` 生成。此组件通过使用不同的函数来渲染界面，从而装饰另一个组件。

示例：
```cpp
auto inner = [...]

auto renderer = Renderer(inner, [&] {
  return inner->Render() | border
});
```

`ftxui::Renderer` 也支持组件装饰器模式：
```cpp
auto component = [...]
component = component
  | Renderer([](Element e) { return e | border))
  | Renderer(bold)
```

作为简写形式，您还可以将组件与元素装饰器组合：
```cpp
auto component = [...]
component = component | border | bold;
```

## 事件捕获 {#component-catchevent}

由 \ref ftxui/component/component.hpp 中的 `ftxui::CatchEvent()` 生成。此组件装饰其他组件，在底层组件之前捕获事件。

示例：
```cpp
auto screen = ScreenInteractive::TerminalOutput();
auto renderer = Renderer([] {
  return text("我的界面");
});
auto component = CatchEvent(renderer, [&](Event event) {
  if (event == Event::Character('q')) {
    screen.ExitLoopClosure()();
    return true;
  }
  return false;
});
screen.Loop(component);
```

`ftxui::CatchEvent` 也可以用作装饰器：
```cpp
component = component
  | CatchEvent(handler_1)
  | CatchEvent(handler_2)
  | CatchEvent(handler_3)
  ;
```

## 可折叠组件 {#component-collapsible}

对于用户可切换显示/隐藏的视觉元素非常有用。本质上是 `ftxui::Checkbox()` 和 `ftxui::Maybe()` 组件的组合。

```cpp
auto collapsible = Collapsible("显示更多", inner_element);
```

## 条件显示组件 {#component-maybe}

由 \ref ftxui/component/component.hpp 中的 `ftxui::Maybe()` 生成。此组件可用于通过布尔值或谓词显示/隐藏任何其他组件。

使用布尔值的示例：
```cpp
bool show = true;
auto component = Renderer([]{ return "Hello World!"; });
auto maybe_component = Maybe(component, &show)
```

使用谓词的示例：
```cpp
auto component = Renderer([]{ return "Hello World!"; });
auto maybe_component = Maybe(component, [&] { return time > 10; })
```

通常，`ftxui::Maybe` 也可以用作装饰器：
```cpp
component = component
  | Maybe(&a_boolean)
  | Maybe([&] { return time > 10; })
  ;
```

## 容器 {#component-container}

### 水平容器 {#component-horizontal}

由 "ftxui/component/component.hpp" 中的 `ftxui::Container::Horizontal()` 生成。它水平显示组件列表并处理键盘/鼠标导航。

### 垂直容器 {#component-vertical}

由 "ftxui/component/component.hpp" 中的 `ftxui::Container::Vertical()` 生成。它垂直显示组件列表并处理键盘/鼠标导航。

### 标签页容器 {#component-tab}

由 "ftxui/component/component.hpp" 中的 `ftxui::Container::Tab()` 生成。它接收一个组件列表并只显示其中一个。这对于实现标签栏非常有用。

[垂直](https://arthursonzogni.github.io/FTXUI/examples_2component_2tab_vertical_8cpp-example.html)：
  
![ezgif com-gif-maker (1)](https://user-images.githubusercontent.com/4759106/147250144-22ff044a-4773-4ff7-a49c-12ba4034acb4.gif)

[水平](https://arthursonzogni.github.io/FTXUI/examples_2component_2tab_horizontal_8cpp-example.html)：
  
  ![ezgif com-gif-maker (2)](https://user-images.githubusercontent.com/4759106/147250217-fe447e0f-7a99-4e08-948a-995087d9b40e.gif)

## 可调整分割 {#component-resizable-split}

定义两个子组件之间的水平或垂直分隔。分隔线的位置可通过鼠标调整和控制。有四种可能的分隔方式：
- `ftxui::ResizableSplitLeft()`
- `ftxui::ResizableSplitRight()`
- `ftxui::ResizableSplitTop()`
- `ftxui::ResizableSplitBottom()`
来自 "ftxui/component/component.hpp"

[示例](https://arthursonzogni.github.io/FTXUI/examples_2component_2resizable_split_8cpp-example.html)：

![ezgif com-gif-maker](https://user-images.githubusercontent.com/4759106/147248372-c55512fe-9b96-4b08-a1df-d05cf2cae431.gif)  

@htmlonly
<script id="asciicast-tprMH2EdkUoMb7D2YxgMGgpzx" src="https://asciinema.org/a/tprMH2EdkUoMb7D2YxgMGgpzx.js" async></script>
@endhtmlonly

## 强制帧重绘 {#component-force-redraw}

通常，`ftxui::ScreenInteractive::Loop()` 负责在处理完新的事件组（例如键盘、鼠标、窗口调整大小等）后绘制新帧。但是，您可能希望响应FTXUI未知的任意事件。为此，您必须通过线程使用 `ftxui::ScreenInteractive::PostEvent`（**这是线程安全的**）发布事件。您需要发布 `ftxui::Event::Custom` 事件。

示例：
```cpp
screen->PostEvent(Event::Custom);
```

如果不需要处理新事件，可以使用：
```cpp
screen->RequestAnimationFrame();
```