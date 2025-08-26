---
title: "Bazel"
weight: 2
---

FTXUI 可通过 [Bazel](https://bazel.build) 和 Bzlmod（Bazel 模块）集成到您的项目中。

该库已注册到 [Bazel 中央注册表](https://registry.bazel.build/modules/ftxui)

**MODULE.bazel**
```starlark
bazel_dep(name = "ftxui", version = "6.1.9")
```

**BUILD.bazel**
```starlark
cc_binary(
    name = "main",
    srcs = ["main.cpp"],
    deps = [
        "@ftxui//:component",
        "@ftxui//:dom",
        "@ftxui//:screen",
    ],
)
```

## 入门项目

您可以使用官方的 Bazel 入门项目来获得一个最小的可用设置：

- [ftxui-bazel (starter)](https://github.com/ArthurSonzogni/ftxui-bazel)
 
<div class="section_buttons">

</div>
