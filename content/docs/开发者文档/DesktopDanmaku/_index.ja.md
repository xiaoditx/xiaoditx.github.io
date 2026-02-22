<!-- markdownlint-disable -->

<div align="center">

<img alt="LOGO" src="./resource/icon.png" width="256" height="256" />

# 発音キーボード - DesktopDanmaku

V 0.0.0.0 開発中

<br>
<div>
    <img alt="C++" src="https://img.shields.io/badge/C++-17-%2300599C?logo=cplusplus">
</div>
<div>
    <img alt="platform" src="https://img.shields.io/badge/platform-Windows-blueviolet">
</div>
<div>
    <img alt="license" src="https://img.shields.io/github/license/xiaoditx/DesktopDanmaku">
    <img alt="commit" src="https://img.shields.io/github/commit-activity/m/xiaoditx/DesktopDanmaku">
</div>
<div>
    <img alt="stars" src="https://img.shields.io/github/stars/xiaoditx/DesktopDanmaku?style=social">
    <img alt="GitHub all releases" src="https://img.shields.io/github/downloads/xiaoditx/DesktopDanmaku/total?style=social">
</div>
</div>
<br>
<div>
    <a href="#development-information">コントリビューターヘルプ情報</a>
</div>
<br>

<!-- markdownlint-restore -->

インスピレーション源：[Visual Basic で書かれたデスクトップ弾幕プログラム](https://github.com/wsrj/desk-danmaku-vb)

### （計画された）機能

- [x] デスクトップに弾幕を表示
- [ ] jsonファイルから弾幕コンテンツをインポートする機能
- [ ] 弾幕の透明度をカスタマイズする機能

### ビルド方法

以下のコマンドを使用してDEBUGバージョンのソフトウェアをコンパイルします

```batch
make
```

以下のコマンドを使用してDEBUGバージョンの32ビットソフトウェアをコンパイルします

```batch
make ARCH=32
```

その他の操作については、プロジェクトのルートディレクトリで`make help`を使用してください

makefileは[keybonkプロジェクト](https://github.com/xiaoditx/keybonk)から移植されたもので、未使用のターゲットがある可能性があるため、テストされていないため使用しないことをお勧めします

### 開発情報

プロジェクトドキュメント：[docs](./docs)

ソフトウェアテクノロジースタック

- win32
- C++17
- GDI+

開発環境

- Windows10-x64
- MSYS2（MingGW64）
- VScode
- GNU Make（4.4.1）

## コントリビューター

コミュニティのコントリビューターに感謝します

<a href="https://github.com/xiaoditx/desktopdanmaku/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=xiaoditx/desktopdanmaku" />
</a>

## プロジェクト統計

<a href="https://www.star-history.com/#xiaoditx/DesktopDanmaku&type=date&legend=top-left">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=xiaoditx/DesktopDanmaku&type=date&theme=dark&legend=top-left" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=xiaoditx/DesktopDanmaku&type=date&legend=top-left" />
   <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=xiaoditx/DesktopDanmaku&type=date&legend=top-left" />
 </picture>
</a>

![Alt](https://repobeats.axiom.co/api/embed/c1379970865ed874223601ece505247dc8d6fe9b.svg "Repobeats analytics image")