---
title: "Nix"
weight: 6
---

> [!note]
> FTXUI 作者对 Nix 了解有限。本页面内容主要由
> AI 生成。如果您有任何改进建议，请提交 PR。

## Nix Flake

FTXUI 提供了 `flake.nix`，包含软件包和开发环境。

### 构建库

```bash
nix build github:ArthurSonzogni/FTXUI
```

构建结果可通过 `result` 链接访问。

### 作为依赖使用

将 FTXUI 添加到您的 flake 输入中：

```nix
{
  inputs.ftxui.url = "github:ArthurSonzogni/FTXUI";
}
```

然后在输出中引用 `ftxui.packages.<system>.ftxui`。

<div class="section_buttons">

</div>

