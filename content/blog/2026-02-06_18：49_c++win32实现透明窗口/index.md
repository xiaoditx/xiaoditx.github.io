---
title: "C++ WIN32实现以带透明信息的图片为背景的异形窗口"  # 文章标题
draft: falte  # 是否为草稿。设为 false 才会发布
description: "采用分层窗口开发，实现异形窗口，背景图片支持多种格式，允许携带alpha信息"  # 文章摘要
tags: ["C++", "WIN32","GUI"]  # 文章标签，用于分类和关联
comments: true
date: 2026-02-06
authors:
  - name: xiaoditx
    link: https://github.com/xiaoditx
    image: https://github.com/xiaoditx.png
---

> [!important]
> 本文默认读者具备基础的WIN32开发知识并基本掌握C++语法，会略过一些基础内容，如果在这两方面有一个是几乎完全没有涉及的，后期会有专门的版本来讲解

> [!Warning]
> 本文所以编译均采取g++，MSVC等其他编译器用户请自行调整
> 
> 本文（可能）会使用一些（较C++11而言）较新的语法特性，如果无法适用请自行更改

> [!tip]
> 可以通过[总体梳理](#总体梳理)快捷了解本文讲解的技术、使用的工具链等，以便快速确定本文是否符合阅读需求

我们今天来写一个异形窗口，使用带透明色的图片作为背景

这是我们想要实现的效果：

![效果图](/imgs/blogs/WIN32分层窗口实现透明背景异形窗体/keybonk.png)

窗口可以自由移动

这是我们要用到的背景图片，你也可以用自己的，不过需要注意我的长宽信息之类的都是写死在代码里的，更改背景图片的话**需要根据实际尺寸进行调整**（后期注：似乎文章里的版本可以自由调控窗口尺寸，不过我没实验）

![图像资源](/imgs/blogs/WIN32分层窗口实现透明背景异形窗体/background.png)

## 0. 开始之前

本文受博文[Win32窗口设置为透明 - 百足coder - 博客园](https://www.cnblogs.com/bzbk/p/17197596.html) 启发，但原文似乎有一些错误的地方，所以我对应的进行了研究并做了修改

我们先来了解一些基本的术语

- alpha值：透明度，透明像素会采用alpha值描述其透明度。
- alpha混合：叠加的两个带透明信息的像素经过公式计算算出最后呈现的颜色的过程
- 位图：一个像素一个像素排列起来的图片，不会有任何压缩的表示，每个像素都会拥有自己独立的RGB或ARGB表示

## 1. 创建一个无边框窗口

我们写这样一个程序，首先需要一个无边框窗口，所有第一步工作就是创建并显示一个无边框窗口

### 1.1. 基本代码

我们首先新建一个文件，起名`dev.cpp`（以后所有命令都以此为基础），写入下面的代码：

```cpp
// 注：其实这是我从MSDN偷的代码，历经实战修修补补再加上写文章时爆改变成了这样
#include <windows.h>

LRESULT CALLBACK WindowProc(HWND hwnd, UINT uMsg, WPARAM wParam, LPARAM lParam)
{
    switch (uMsg)
    {
    case WM_PAINT:
    {
        PAINTSTRUCT ps;
        HDC hdc = BeginPaint(hwnd, &ps);
        FillRect(hdc, &ps.rcPaint, (HBRUSH) (COLOR_WINDOW+1));
        EndPaint(hwnd, &ps);
        break;
    }
    case WM_DESTROY:
        PostQuitMessage(0);
        break;
    default:
        return DefWindowProcW(hwnd, uMsg, wParam, lParam);
    }
    return 0;
}

int WINAPI wWinMain(HINSTANCE hInstance, [[maybe_unused]] HINSTANCE hPrevInstance, [[maybe_unused]] PWSTR pCmdLine, int nCmdShow)
{
    const wchar_t CLASS_NAME[] = L"KeyBonk主窗口";
    WNDCLASSEX wc = {};             // 用0初始化整个WindowClass
    wc.cbSize = sizeof(WNDCLASSEX); // 设置结构体大小
    wc.lpfnWndProc = WindowProc;    // 指定WindowProc函数
    wc.hInstance = hInstance;
    wc.lpszClassName = CLASS_NAME; // 窗口类名称
    RegisterClassEx(&wc);
    HWND hwnd = CreateWindowExW(
        WS_EX_TOPMOST | WS_EX_TOOLWINDOW, // 设置置顶，隐藏软件图标
        CLASS_NAME,                                       // 窗口类
        L"KeyBonk主窗口",                                 // 窗口文本
        WS_POPUP | WS_VISIBLE | WS_CLIPCHILDREN,          // 窗口风格
                                                          // 大小+位置
        CW_USEDEFAULT, CW_USEDEFAULT, 160, 180,
        NULL,      // 父窗口
        NULL,      // 菜单
        hInstance, // 实例句柄
        NULL       // 附带的软件数据
    );

    ShowWindow(hwnd,nCmdShow);

    // 消息循环
    MSG msg = {};
    while (GetMessage(&msg, NULL, 0, 0) > 0)
    {
        TranslateMessage(&msg);
        DispatchMessage(&msg);
    }
    return 0;
}
```

保存好后，在命令行使用`g++ -o keybonk.exe dev.cpp -mwindows -municode`命令编译

运行效果大概是这样：

![运行效果](/imgs/blogs/WIN32分层窗口实现透明背景异形窗体/white.png)

这是一个纯白的窗口，没有边框，我们编写的内容成功了

由于我们的窗口没有预留任何关闭选项，我们只能在命令行使用命令`taskkill /im keybonk.exe`去关闭，我们后面也都用这种方式关闭（也可以Alt(+Fn)+F4），实际项目中，这里采取了在鼠标右键菜单中加入关闭选项的方法，但是这不是本文的重点所以不予讨论。

### 1.2. 有关窗口类的讨论

可以注意到我们这里使用了`WNDCLASSEX`而不是`WNDCLASS`，其实在我们这个实例中你完全可以不用EX，这只不过我是从我的[KeyBonk项目](https://github.com/xiaoditx/KeyBonk)中摘抄来的罢了（原项目需要使用EX的特有成员）

需要注意的是，使用`WNDCLASSEX`一定要写下面这行：

```cpp
    wc.cbSize = sizeof(WNDCLASSEX); // 设置结构体大小
```

否则Windows将无法判断你的窗口类是哪个版本

### 1.3. 窗口样式

实现这样一个窗口，我们需要这样几个窗口样式：`WS_POPUP | WS_VISIBLE | WS_CLIPCHILDREN`、`WS_EX_TOPMOST | WS_EX_TOOLWINDOW`，前三个是一般窗口样式，后两个是扩展窗口样式，意思分别是：弹出窗口，可见，裁剪子窗口（优化用）、置顶、工具窗口（隐藏任务栏图标）

弹出窗口就是没有标题栏、边框的弹出式窗口，与重叠窗口（`WS_OVERLAPPED`）相对

## 2. 细节优化

### 2.1. 让窗口可拖动

现在我们拥有了一个无边框的窗口，但是我们的鼠标无法移动这个窗口，因为在系统看来，只有从边框进行的拖动才是意图移动窗口的拖动，我们需要施加一些技巧。

在消息处理中，添加这样的代码：

```cpp
    case WM_NCHITTEST:
    {
        return HTCAPTION;
    }
```

这样一串内容处理了`WM_NCHITTEST`消息，这个消息的全称应该是“**W**indow **M**essage - **N**on-**C**lient **Hit Test**”（窗口消息_非客户区点击测试），当鼠标移动或点击时，Windows会将这个消息发送到窗口以询问鼠标点击到的是什么区域。

这个消息存在的目的是因为软件设计的多样性，许多软件可能并不使用或不只使用系统默认的边框，也不一定使用系统预制的按键，但系统并不知道程序想让哪些区域发挥什么样的作用，因此从设计上讲，系统应当询问，而不应当假设。

我们这里返回了`HTCAPTION`，告诉系统鼠标点击在标题栏上，系统便会将拖动理解为移动窗口。

需要注意的是如果你的程序不单纯显示图片而是包含了按钮等组件，这个代码就会导致按钮点击不起作用，我们还需要加入一些位置判断来辅助，这个就留给给位读者自行实现了。

另外，可以使用默认的消息处理先处理一遍这个消息，然后再进行判断，以此可以将一个部分的消息转化为另一个部分：

```cpp
// 将标题栏消息转化为客户区消息，其他不变
LRESULT hit = DefWindowProc(hwnd, uMsg, wParam, lParam);
if(hit==HTCAPTION)return HTCLIENT;
return hit;
```

### 2.2. 标准鼠标指针

当前窗口有个问题，鼠标悬停会呈现沙漏状（有的系统是旋转的圈圈），这个的成因尚且不知，但确定的是，拦截WM_CREATE消息并设置鼠标指针可行：

```cpp
    case WM_CREATE:
    {
        // 设置标准箭头鼠标指针
        SetCursor(LoadCursor(NULL, IDC_ARROW));
    }
	break;
```

> [!tip]
> 在后续文章中，随着分层窗口的逐步开发，这个问题似乎消失了，因此这个设置鼠标指针操作似乎并不需要了

## 3. 实现异形窗口

我们想要的并不是那种四四方方的窗口，而是有着平滑轮廓的异形窗口，我们需要窗口有些部分是透明度，所以接下来，我们要来实现一个这样的异形窗口

在Windows中创建异形窗口，最方便也是最完善的方案就是使用分层窗口，我们先来了解一下什么是分层窗口：

### 3.1. 分层窗口

传统的窗口是直接绘制屏幕，当别的窗口遮挡当前窗口时，当前窗口的像素会被顶掉，因此上层窗口挪开后，当前窗口需要重绘以保证显示正常，分层窗口则是窗口与屏幕分离的一种方案，所谓分层，就是将每一个窗口视为单独的“层”，窗口单独控制一片内存，显示时将其合成到屏幕。

虽然后期Windows引入了DWM（系统窗口管理器）实现了相似的效果，但却十分局限，DWM默认每个窗口都是一种不透明纹理的，即使窗口设置了 `WS_EX_TRANSPARENT` 或者某些背景透明，其处理模型依然是“矩形区域”，导致异形窗口无法正确的显示。

分层窗口则不同，分层窗口使用`UpdateLayeredWindow`来绘制窗口，实际上是在向DWM提供一张自带Alpha通道的完整位图。DWM会将其作为一个带有透明度信息的独立图层来处理，而不是一个不透明的矩形。

分层窗口广泛运用于各种非标准窗口的制作，在窗口动画制作方面应用甚广，我们这里使用分层窗口，就是为了能让DWM“将透明看作透明”而不是“将透明看作空白”，实现非矩形的异形窗口。

### 3.2. 创建分层窗口

想要创建分层窗口，得在窗口扩展风格中加入`WS_EX_LAYERED`：

```cpp
    HWND hwnd = CreateWindowExW(
        WS_EX_LAYERED | WS_EX_TOPMOST | WS_EX_TOOLWINDOW, // 分层窗口，设置置顶，隐藏软件图标
        // .......
    );
```

加入这个窗口风格后，系统就会以分层窗口的方式对待我们的窗口

## 4. 绘制图像

将窗口设置为分层窗口后，我们就要来设置它的背景了。前面讲过，分层窗口使用`UpdateLayeredWindow`绘制窗口，这个函数向系统提供了一张带Alpha通道（也就是带透明度信息）的位图，系统会将这个位图理解为我们绘制完毕的窗口

虽然看上去我们似乎需要知道怎么将png等文件读入内存并转换为位图，但我们目前还不需要想这么多，当务之急还是了解一下`UpdateLayeredWindow`的使用方式，等到掌握了用法之后再去思考位图的解决方案

> [!note]
> 我们下面将假设我们已经读到了位图并将句柄存进了一个HBITMAP中

`UpdateLayeredWindow`函数的原型如下：

```cpp
BOOL UpdateLayeredWindow(
  [in]           HWND          hWnd,
  [in, optional] HDC           hdcDst,
  [in, optional] POINT         *pptDst,
  [in, optional] SIZE          *psize,
  [in, optional] HDC           hdcSrc,
  [in, optional] POINT         *pptSrc,
  [in]           COLORREF      crKey,
  [in, optional] BLENDFUNCTION *pblend,
  [in]           DWORD         dwFlags
);
```

函数需要我们提供九个参数，分别是：窗口句柄、屏幕DC、重绘后的窗口位置、重绘后的窗口大小、源DC（内存DC）、颜色键、透明度、标志位

目前你可能根本看不懂这些东西都是什么，不过没关系，我们一步步来，将非基础的内容都讲一讲

### 4.1. 什么是屏幕DC/设备DC

在Windows中，应用程序通常不直接访问硬件。为了实现设备无关性、简化开发，Windows提供了分层的驱动模型和抽象的编程接口。在图形处理方面，一个关键设计是设备上下文（Device Context, DC）。应用程序通过DC进行绘制操作，由Windows图形子系统（如GDI）与相应的设备驱动程序协作，将这些通用命令转换为针对特定显示或打印设备的指令。

> [!tip]
> “**上下文**”这个属于似乎有些难以理解，有关上下文的详细内容可以参阅[知乎 | 计算机编程中的上下文（Context）到底是什么？从理解到实践](https://zhuanlan.zhihu.com/p/650629290)

DC可以粗略分为两类：**屏幕DC**和**内存DC**

屏幕DC是与显示设备关联的设备上下文。每个窗口在需要绘制时，会获取或使用一个屏幕DC，它直接控制实际显示内容。但如果每次绘制操作都立即更新到屏幕DC，会导致窗口频繁刷新，容易引起视觉闪烁。

内存DC是一种离屏的设备上下文，不直接用于显示。我们可先将所有绘制操作在内存DC中完成，生成完整的图像后，再一次性复制到屏幕DC。这样便将多次绘制结果集中显示，有效避免了闪烁问题。

然而，对于分层窗口这类支持高级视觉效果（如透明度、阴影、非矩形区域）的特殊窗口，使用DC的目的并不仅仅是为了防止闪烁。分层窗口的绘制往往涉及复杂的合成操作，由DWM统一管理其像素数据与Alpha通道。在此类场景下，采用DC机制更多地是基于以下几方面的系统性优势：

- 参数封装与状态统一：DC内部封装了当前绘图环境的所有状态（如画笔、画刷、字体、坐标映射等），避免了在每次绘制调用中重复传递大量参数，也确保了系列绘制操作在一致的上下文中执行。

- 资源集中管理与效率优化：DC可以关联和管理位图、区域、路径等图形资源，并在设备驱动层面进行优化。对于分层窗口，系统可通过DC更高效地缓存和合成位图，减少重复的渲染开销。

- 提升整体性能与响应能力：通过将多次离散的绘制指令在DC中整合为一批操作，减少与内核模式驱动之间的上下文切换次数，从而降低CPU占用、提升绘制的整体吞吐量与界面响应速度。

因此，DC在Windows图形体系中不仅是一个防闪烁的工具，更是一个承载设备抽象、状态管理与绘制优化的重要基础设施。尤其在分层窗口等高级界面技术中，DC的这些设计优势显得尤为关键。

实际代码上讲，我们使用`GetDC(hwnd);`来获取对应窗口的屏幕DC，再使用`CreateCompatibleDC(hdcScreen);`来基于屏幕DC创建一个内存DC，如下所示：

```cpp
    // 创建内存DC
    HDC hdcScreen = GetDC(hwnd);
    HDC memDC = CreateCompatibleDC(hdcScreen);
```

注意DC需要手动释放：

```cpp
    DeleteDC(memDC);
    ReleaseDC(hwnd, hdcScreen);
```

### 4.2. 颜色键与透明度

颜色键是一种较早实现的透明技术，它将窗口中指定的某种颜色设为透明，并通过绘制该颜色来创建透明区域。本文档中不采用该方法，仅作了解即可。使用时通常通过类似 `RGB(0, 255, 0)` 的形式来指定透明色。

使用 `UpdateLayeredWindow` 设置窗口整体透明度时，需要通过倒数第二个参数指定一个 `BLENDFUNCTION` 结构，该结构定义如下：

```cpp
typedef struct _BLENDFUNCTION {
    BYTE BlendOp;             // 必须设为 AC_SRC_OVER (0x00)
    BYTE BlendFlags;          // 必须设为 0
    BYTE SourceConstantAlpha; // 整体透明度，范围 0–255
    BYTE AlphaFormat;         // Alpha 格式标志
} BLENDFUNCTION;
```

其中前两个字段为固定值，后两个字段由用户指定：

`SourceConstantAlpha`指定一个用于整个源位图的Alpha常量值（0-255）。此值会与源位图的像素数据结合，具体行为取决于 AlphaFormat：

- 当`AlphaFormat`为0时，表明位图无Alpha通道，此值直接作为整个位图的统一透明度。
- 当`AlphaFormat`为`AC_SRC_ALPHA`时，说明位图有每像素Alpha，此值将作为缩放系数，与每个像素自身的Alpha值相乘，共同决定最终透明度。公式为：结果Alpha = 源像素Alpha × (SCA/255)
  
### 4.3. 标志位

`UpdateLayeredWindow`的最后一个参数是标志位，根据官网文档，可为下面值的其中一个

|宏名称|值|含义|
|---|---|---|
|ULW_ALPHA|0x00000002|使用`pblend`作为混合函数。 如果显示模式为256色或更少，则此值的效果与 ULW_OPAQUE的效果相同。|
|ULW_COLORKEY|0x00000001|使用`crKey`作为透明度颜色。|
|ULW_OPAQUE|0x00000004|绘制不透明的分层窗口。|
|ULW_EX_NORESIZE|0x00000008|如果当前窗口大小与`psize`中指定的大小不匹配，则强制 `UpdateLayeredWindowIndirect`函数失败。|

我们这里制作异形窗口，则使用`ULW_ALPHA`

### 4.4. 回看参数

了解完上面的内容，让我们回看上面的UpdateLayeredWindow函数原型，来掌握分层窗口的绘制方式：

```cpp
BOOL UpdateLayeredWindow(
  [in]           HWND          hWnd,
  [in, optional] HDC           hdcDst,
  [in, optional] POINT         *pptDst,
  [in, optional] SIZE          *psize,
  [in, optional] HDC           hdcSrc,
  [in, optional] POINT         *pptSrc,
  [in]           COLORREF      crKey,
  [in, optional] BLENDFUNCTION *pblend,
  [in]           DWORD         dwFlags
);
```

- `hWnd`指定要被绘制的分层窗口的窗口句柄
- `hdcDst`指定的屏幕DC（如果为NULL，内存DC也要为NULL）
- `pptDst`指定窗口位置，如果为NULL，窗口位置保持不变
- `psize`指定窗口大小，窗口大小未更新时，可用NULL，如果`hdcSrc`为NULL，则`psize`必须为NULL。
- `hdcSrc`指定内存DC
- `pptSrc`指定DC中的位置，意味着告诉系统从DC的哪个位置开始是真正的窗口显示范围
- `crKey`指定透明颜色键
- `pblend`指定整体透明度
- `dwFlags`标志透明模式

我们这样调用它：

```cpp
    // 使用UpdateLayeredWindow
    POINT ptSrc = {0, 0};
    BLENDFUNCTION bf = {AC_SRC_OVER, 0, 255, AC_SRC_ALPHA};
    UpdateLayeredWindow(hwnd, hdcScreen, NULL, &size, memDC, &ptSrc, 0, &bf, ULW_ALPHA);
```

`UpdateLayeredWindow`为分层窗口进行了更新显示，我们此时就不需要ShowWindow和UpdateWindows这样的函数来更新显示了，因此我们就可以直接删掉了

### 4.5. DC操作

我们上面讲了`UpdateLayeredWindow` 的使用，绘制窗口需要使用DC，但是我们刚刚并没有展开DC相关的内容，这里将详细展开

在Windows中，分层窗口的绘制基于位图。我们需要将位图与窗口关联起来，而DC正是实现这一关联的桥梁，通过"选入"操作，也就是诸如`SelectObject`之类的函数，将位图与DC联系到一起，然后调用UpdateLayeredWindow进行绘制。

那么，为什么需要设计一个函数去选入数据，而不是将DC作为一个结构体直接把位图存进去呢？这是因为早期Win32 API使用C语言开发，缺乏面向对象的封装特性。为此，Windows引入了HDC（设备上下文句柄）作为抽象层：我们无法直接操作DC内部，只能通过预定义的GDI函数间接操作：

```cpp
    HBITMAP hOldBmp = (HBITMAP)SelectObject(memDC, hBmp);
```

你可以通过面向对象的思想理解这样的操作，我们将DC理解为一个类，menDC是一个对象，`SelectObject`则是一个方法，我们可以通过这个方法，以受限制的方式修改类的私有成员

需要注意的是，每次选入新位图都会导致之前的位图被选出。选出的如果是自定义位图，你需决定后续是释放还是复用；如果是默认位图，必须在释放DC前恢复它，因为GDI只能正确处理包含默认位图的DC释放。若DC中仍选入自定义位图，会导致内存泄漏。

> [!note]
> 关于自定义位图，之所以DC将其选入后无法正确释放，是因为位图可能会被多个DC同时使用，GDI不能保证这个位图是可释放的，因此就不会去释放，我们又不能直接要求DC在不选入新位图的情况下选出当前位图，因为DC要求一定要包含一个位图，只能用默认位图恢复，默认位图作为GDI内部资源，可以被正确释放，因为GDI确知这个操作是安全的

假如我们的位图是`HBITMAP hBmp;`，内存DC是`HDC menDC;`，那么我们就这么将位图选入：

```cpp
	// 选入位图
    HBITMAP hOldBmp = (HBITMAP)SelectObject(memDC, hBmp);
```

刚刚也说了，GDI只能正确释放选入默认位图的DC，资源释放时，我们还要将DC恢复到默认位图：

```cpp
    SelectObject(memDC, hOldBmp);// 选出自定义位图
	// 此时位图状态是“选出”，可以删除
    DeleteDC(memDC);// 删除内存DC
    ReleaseDC(hwnd, hdcScreen);// 释放屏幕DC
    DeleteObject(hBmp);// 删除位图
```

### 4.6. 获取图片尺寸

前面提到过`UpdateLayeredWindow`需要一个尺寸信息作为窗口尺寸，我们的分层窗口既然只是展示我们的图片，那么大小自然就是位图尺寸，所有我们要获取图片尺寸作为窗口尺寸

HBITMAP是一个GDI对象句柄，也就是一串数字而已，只能在GDI函数中指定欲操作的位图，其本身并不包含任何信息，我们要将其转为BITMAP结构体，这样才可以读取其包含的数据：

```
    // 获取图片尺寸
    BITMAP bm;
    GetObject(hBmp, sizeof(BITMAP), &bm);
    SIZE size = {bm.bmWidth, bm.bmHeight};
```

GDI使用`GetObject`将句柄转换为实际对象，以便数据读取等操作

### 4.7. 合并的代码

```cpp
    // 创建内存DC
    HDC hdcScreen = GetDC(hwnd);
    HDC memDC = CreateCompatibleDC(hdcScreen);
	// 选入位图
    HBITMAP hOldBmp = (HBITMAP)SelectObject(memDC, hBmp);

    // 获取图片尺寸
    BITMAP bm;
    GetObject(hBmp, sizeof(BITMAP), &bm);
    SIZE size = {bm.bmWidth, bm.bmHeight};

    // 使用UpdateLayeredWindow
    POINT ptSrc = {0, 0};
    BLENDFUNCTION bf = {AC_SRC_OVER, 0, 255, AC_SRC_ALPHA};
    UpdateLayeredWindow(hwnd, hdcScreen, NULL, &size, memDC, &ptSrc, 0, &bf, ULW_ALPHA);
	
    // 清理
    SelectObject(memDC, hOldBmp);
    DeleteDC(memDC);
    ReleaseDC(hwnd, hdcScreen);
    DeleteObject(hBmp);
```

## 5. 读取图片

我们了解了怎么绘制分层窗口，但分层窗口的绘制需要位图，我们还没有对应的读入图片的代码，因此我们需要先写读入图片，之后再真正写窗口绘制。

考虑到方便性，我们这里采用GDI+进行图片读入，这个库在一般的Windows编译器上都是自带可链接的，假如你并不想使用GDI+，那么你也可以自己寻找其他方式

使用GDI+，首先需要初始化：

```cpp
int WINAPI wWinMain(HINSTANCE hInstance, [[maybe_unused]] HINSTANCE hPrevInstance, [[maybe_unused]] PWSTR pCmdLine, int nCmdShow)
{
    // 初始化GDI+
    Gdiplus::GdiplusStartupInput gdiplusStartupInput;
    ULONG_PTR gdiplusToken;
    Gdiplus::GdiplusStartup(&gdiplusToken, &gdiplusStartupInput, NULL);

    // 下面的内容略......
}
```

> [!note]
> GDI+开发需要引入对应的头文件：
> 
> ```cpp
> #include <gdiplus.h>
> ```
> 
> 同时，你需要在编译时链接GDI+库，对于g++，只需要加上`-lgdiplus`就可以了
> 
> ```batch
>  g++ -o keybonk.exe dev.cpp -lgdiplus -mwindows -municode
> ```

此时已经初始化了，不要忘记在程序的消息循环后、return语句前填上反初始化语句：

```cpp
    // 程序结束时关闭GDI库
    Gdiplus::GdiplusShutdown(gdiplusToken);
```

下面我们来读入图片，GDI支持从多种格式文件内读位图，采用`Gdiplus::Bitmap::FromFile`函数：

```cpp
    // 加载PNG（保留alpha值）
    Gdiplus::Bitmap *pBitmap = Gdiplus::Bitmap::FromFile(L"！！！文件路径！！！");
    if (!pBitmap || pBitmap->GetLastStatus() != Gdiplus::GpStatus::Ok)
    {
        // 图片加载失败，创建红色矩形作为替代
        pBitmap = new Gdiplus::Bitmap(160, 180);
        Gdiplus::Graphics g(pBitmap);
        Gdiplus::SolidBrush brush(Gdiplus::Color(255, 255, 0, 0));
        g.FillRectangle(&brush, 0, 0, 160, 180);
    }
```

> [!note]
> 代码内的文件路径需要自行更改，注意如果使用了`\`需要写`\\`转义

这里先是使用`Gdiplus::Bitmap::FromFile`读到了我们的文件，使用一个指针`pBitmap`指向了载入后的文件在内存中的位置，这里我们还需要安排错误处理，加入文件读取失败，就需要尝试手动绘制一个红色矩形界面来提醒用户读取失败。

我们载入图片到了`pBitmap`，但它的类型是`Gdiplus::Bitmap`，但屏幕DC需要的位图是`HBITMAP`，我们要找一个方式进行转化，`Gdiplus::Bitmap`作为一个类，提供了GetHBITMAP方法：

```cpp
    HBITMAP hBmp;
    pBitmap->GetHBITMAP(Gdiplus::Color(0, 0, 0, 0), &hBmp); // 透明背景
```

`GetHBITMAP`方法需要两个参数，前者是背景颜色，后者是结果的存储位置，我们使用`Gdiplus::Color(0, 0, 0, 0)`来获取一个颜色值，这个颜色是ARGB（alpha-RGB）格式的，第一位指定透明度，0为透明，因此这里保留了原图片的透明背景

当我们读入完毕后，pBitmap将不被再使用，我们需要将其释放：

```cpp
    delete pBitmap;
```

## 完整示例

下面是完整的C++代码，可以使用`g++ -o main.exe main.cpp -lgdiplus -lgdi32 -mwindows -municode`命令进行编译。

使用前需要把（应该是）第55行标有“!!!文件路径!!!”的位置改成自己的背景图片文件路径，否则会以纯红色的状态启动。 

> [!important]
> 如果使用自定义图片做背景，一定要注意尺寸不能太大，如果是在要用，请更换为[增加智能大小调控的版本](#更智能的版本)

```cpp
#include <windows.h>
#include <gdiplus.h>

LRESULT CALLBACK WindowProc(HWND hwnd, UINT uMsg, WPARAM wParam, LPARAM lParam)
{
    switch (uMsg)
    {
    case WM_NCHITTEST:
    {
        return HTCAPTION;
    }
    case WM_CREATE:
    {
        // 设置标准箭头鼠标指针
        SetCursor(LoadCursor(NULL, IDC_ARROW));
    }
    break;
    case WM_DESTROY:
        PostQuitMessage(0);
        break;
    default:
        return DefWindowProcW(hwnd, uMsg, wParam, lParam);
    }
    return 0;
}

int WINAPI wWinMain(HINSTANCE hInstance, [[maybe_unused]] HINSTANCE hPrevInstance, [[maybe_unused]] PWSTR pCmdLine, [[maybe_unused]] int nCmdShow)
{
    // 初始化GDI+
    Gdiplus::GdiplusStartupInput gdiplusStartupInput;
    ULONG_PTR gdiplusToken;
    Gdiplus::GdiplusStartup(&gdiplusToken, &gdiplusStartupInput, NULL);

    const wchar_t CLASS_NAME[] = L"KeyBonk主窗口";
    WNDCLASSEX wc = {};             // 用0初始化整个WindowClass
    wc.cbSize = sizeof(WNDCLASSEX); // 设置结构体大小
    wc.lpfnWndProc = WindowProc;    // 指定WindowProc函数
    wc.hInstance = hInstance;
    wc.lpszClassName = CLASS_NAME; // 窗口类名称
    RegisterClassEx(&wc);
    HWND hwnd = CreateWindowExW(
        WS_EX_LAYERED | WS_EX_TOPMOST | WS_EX_TOOLWINDOW, // 分层窗口，设置置顶，隐藏软件图标
        CLASS_NAME,                                       // 窗口类
        L"KeyBonk主窗口",                                 // 窗口文本
        WS_POPUP | WS_VISIBLE | WS_CLIPCHILDREN,          // 窗口风格
                                                          // 大小+位置
        CW_USEDEFAULT, CW_USEDEFAULT, 160, 180,
        NULL,      // 父窗口
        NULL,      // 菜单
        hInstance, // 示例句柄
        NULL       // 附带的软件数据
    );

    // 加载PNG（保留alpha值）
    Gdiplus::Bitmap *pBitmap = Gdiplus::Bitmap::FromFile(L"！！！文件路径！！！");
    if (!pBitmap || pBitmap->GetLastStatus() != Gdiplus::GpStatus::Ok)
    {
        // 图片加载失败，创建红色矩形作为替代
        pBitmap = new Gdiplus::Bitmap(160, 180);
        Gdiplus::Graphics g(pBitmap);
        Gdiplus::SolidBrush brush(Gdiplus::Color(255, 255, 0, 0));
        g.FillRectangle(&brush, 0, 0, 160, 180);
    }

    HBITMAP hBmp;
    pBitmap->Gdiplus::Bitmap::GetHBITMAP(Gdiplus::Color(0, 0, 0, 0), &hBmp); // 透明背景

    // 创建内存DC
    HDC hdcScreen = GetDC(hwnd);
    HDC memDC = CreateCompatibleDC(hdcScreen);
    HBITMAP hOldBmp = (HBITMAP)SelectObject(memDC, hBmp);

    // 获取图片尺寸
    BITMAP bm;
    GetObject(hBmp, sizeof(BITMAP), &bm);
    SIZE size = {bm.bmWidth, bm.bmHeight};

    // 使用UpdateLayeredWindow
    POINT ptSrc = {0, 0};
    BLENDFUNCTION bf = {AC_SRC_OVER, 0, 255, AC_SRC_ALPHA};
    UpdateLayeredWindow(hwnd, hdcScreen, NULL, &size, memDC, &ptSrc, 0, &bf, ULW_ALPHA);

    // 清理
    SelectObject(memDC, hOldBmp);
    DeleteDC(memDC);
    ReleaseDC(hwnd, hdcScreen);
    delete pBitmap;
    DeleteObject(hBmp);

    // 消息循环
    MSG msg = {};
    while (GetMessage(&msg, NULL, 0, 0) > 0)
    {
        TranslateMessage(&msg);
        DispatchMessage(&msg);
    }

    // 程序结束时关闭GDI库
    Gdiplus::GdiplusShutdown(gdiplusToken);

    return 0;
}
```

## 总体梳理

（暂无内容）

## 更智能的版本

这里有一个更智能的版本，该版本检查屏幕大小以缩放窗口

```cpp
#include <windows.h>
#include <gdiplus.h>
#include <algorithm>  // 添加这个头文件

LRESULT CALLBACK WindowProc(HWND hwnd, UINT uMsg, WPARAM wParam, LPARAM lParam)
{
    switch (uMsg)
    {
    case WM_NCHITTEST:
    {
        return HTCAPTION;
    }
    case WM_DESTROY:
        PostQuitMessage(0);
        break;
    default:
        return DefWindowProcW(hwnd, uMsg, wParam, lParam);
    }
    return 0;
}

int WINAPI wWinMain(HINSTANCE hInstance, [[maybe_unused]] HINSTANCE hPrevInstance, [[maybe_unused]] PWSTR pCmdLine, [[maybe_unused]]int nCmdShow)
{
    // 初始化GDI+
    Gdiplus::GdiplusStartupInput gdiplusStartupInput;
    ULONG_PTR gdiplusToken;
    Gdiplus::GdiplusStartup(&gdiplusToken, &gdiplusStartupInput, NULL);

    const wchar_t CLASS_NAME[] = L"KeyBonk主窗口";
    WNDCLASSEX wc = {};
    wc.cbSize = sizeof(WNDCLASSEX);
    wc.lpfnWndProc = WindowProc;
    wc.hInstance = hInstance;
    wc.lpszClassName = CLASS_NAME;
    RegisterClassEx(&wc);
    
    HWND hwnd = CreateWindowExW(
        WS_EX_LAYERED | WS_EX_TOPMOST | WS_EX_TOOLWINDOW,
        CLASS_NAME,
        L"KeyBonk主窗口",
        WS_POPUP | WS_VISIBLE | WS_CLIPCHILDREN,
        CW_USEDEFAULT, CW_USEDEFAULT, 160, 180,
        NULL, NULL, hInstance, NULL
    );

    // 加载PNG
    Gdiplus::Bitmap *pBitmap = Gdiplus::Bitmap::FromFile(L"C:\\Users\\Administrator\\Desktop\\透明窗口\\a.png");
    if (!pBitmap || pBitmap->GetLastStatus() != Gdiplus::GpStatus::Ok)
    {
        // 图片加载失败，创建红色矩形作为替代
        pBitmap = new Gdiplus::Bitmap(160, 180);
        Gdiplus::Graphics g(pBitmap);
        Gdiplus::SolidBrush brush(Gdiplus::Color(255, 255, 0, 0));
        g.FillRectangle(&brush, 0, 0, 160, 180);
    }

    // 获取原始位图尺寸
    int originalWidth = pBitmap->GetWidth();
    int originalHeight = pBitmap->GetHeight();

    // 获取屏幕尺寸
    int screenWidth = GetSystemMetrics(SM_CXSCREEN);
    int screenHeight = GetSystemMetrics(SM_CYSCREEN);

    // 计算最大允许尺寸
    int maxWidth = screenWidth / 4;    // 屏幕宽的四分之一
    int maxHeight = screenHeight / 2;  // 屏幕高的二分之一

    // 计算缩放比例
    float widthRatio = (float)originalWidth / maxWidth;
    float heightRatio = (float)originalHeight / maxHeight;
    float scaleRatio = std::max(widthRatio, heightRatio);
    
    // 计算缩放后的尺寸
    int scaledWidth, scaledHeight;
    if (scaleRatio > 1.0f)
    {
        // 需要缩放
        scaledWidth = (int)(originalWidth / scaleRatio);
        scaledHeight = (int)(originalHeight / scaleRatio);
    }
    else
    {
        // 不需要缩放
        scaledWidth = originalWidth;
        scaledHeight = originalHeight;
    }

    // 创建缩放后的位图
    Gdiplus::Bitmap* scaledBitmap = new Gdiplus::Bitmap(scaledWidth, scaledHeight);
    Gdiplus::Graphics graphics(scaledBitmap);
    
    // 设置高质量缩放
    graphics.SetInterpolationMode(Gdiplus::InterpolationModeHighQualityBicubic);
    graphics.SetSmoothingMode(Gdiplus::SmoothingModeAntiAlias);
    graphics.SetPixelOffsetMode(Gdiplus::PixelOffsetModeHalf);
    
    // 绘制缩放后的图像
    graphics.DrawImage(pBitmap, 0, 0, scaledWidth, scaledHeight);
    
    // 清理原始位图
    delete pBitmap;
    pBitmap = scaledBitmap;  // 使用缩放后的位图

    // 将GDI+位图转换为HBITMAP
    HBITMAP hBmp;
    pBitmap->GetHBITMAP(Gdiplus::Color(0, 0, 0, 0), &hBmp);

    // 创建内存DC
    HDC hdcScreen = GetDC(hwnd);
    HDC memDC = CreateCompatibleDC(hdcScreen);
    HBITMAP hOldBmp = (HBITMAP)SelectObject(memDC, hBmp);

    // 使用缩放后的尺寸
    SIZE size = {scaledWidth, scaledHeight};
    POINT ptSrc = {0, 0};
    BLENDFUNCTION bf = {AC_SRC_OVER, 0, 255, AC_SRC_ALPHA};
    
    // 设置窗口位置（可选：将窗口移动到屏幕中央）
    int xPos = (screenWidth - scaledWidth) / 2;
    int yPos = (screenHeight - scaledHeight) / 2;
    SetWindowPos(hwnd, NULL, xPos, yPos, scaledWidth, scaledHeight, SWP_NOZORDER | SWP_NOACTIVATE);
    
    // 更新分层窗口
    UpdateLayeredWindow(hwnd, hdcScreen, NULL, &size, memDC, &ptSrc, 0, &bf, ULW_ALPHA);

    // 清理
    SelectObject(memDC, hOldBmp);
    DeleteDC(memDC);
    ReleaseDC(hwnd, hdcScreen);
    delete pBitmap;
    DeleteObject(hBmp);

    // 消息循环
    MSG msg = {};
    while (GetMessage(&msg, NULL, 0, 0) > 0)
    {
        TranslateMessage(&msg);
        DispatchMessage(&msg);
    }

    // 程序结束时关闭GDI库
    Gdiplus::GdiplusShutdown(gdiplusToken);

    return 0;
}
```