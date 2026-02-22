---
next: docs/KeyBonk/makefilehelper
---

<!-- markdownlint-disable -->

<div align="center">

<img alt="LOGO" src="https://raw.githubusercontent.com/xiaoditx/KeyBonk/refs/heads/master/resource/icon.png" width="256" height="256" />

# 発音キーボード - KeyBonk

V 1.3.0.1 ベーシックバージョン

<br>
<div>
    <img alt="C++" src="https://img.shields.io/badge/C++-17-%2300599C?logo=cplusplus">
</div>
<div>
    <img alt="platform" src="https://img.shields.io/badge/platform-Windows-blueviolet">
</div>
<div>
    <img alt="license" src="https://img.shields.io/github/license/xiaoditx/KeyBonk">
    <img alt="commit" src="https://img.shields.io/github/commit-activity/m/xiaoditx/KeyBonk">
</div>
<div>
    <img alt="stars" src="https://img.shields.io/github/stars/xiaoditx/KeyBonk?style=social">
    <img alt="GitHub all releases" src="https://img.shields.io/github/downloads/xiaoditx/KeyBonk/total?style=social">
</div>
</div>
<br>
<div>
    <a href="#development-information">コントリビューターヘルプ情報</a>
</div>
<br>

<!-- markdownlint-restore -->

私が作った唯一のまともなソフトウェア「坤音キーボード」の4.0バージョンから再構築されたC++バージョンです。オリジナルバージョンのソースコードは公開されていましたが、GitHubにアップロードされていませんでした。なぜなら、それはイージーランゲージのプロジェクトであり、ソースコードはたった1つのファイルであり、GitHubに置く必要性がないように見えたからです（さらに、GitHubはデフォルトでイージーランゲージを認識しません。手動で設定することもできますが、私は好きではありません）。

### 再構築の変更点

再構築では言語をC++に変更し、実行効率を向上させました。また、登録されたホットキーを使用する非常に愚かな方法を放棄し、監視方法としてキーボードフックを使用するようになりました。

これは私の最初のWin32開発プロジェクトであり、練習用としてのものです。皆さんに気に入っていただければ幸いです。

### インストール

ソフトウェアのインストールパッケージは[Release](https://github.com/xiaoditx/KeyBonk/releases)ページにあります。お好みのバージョンを選択してください。推奨バージョンは最新バージョンの前のバージョンです。

このソフトウェアはWindowsのみをサポートしており、64ビットと32ビットの両方のバージョンを提供しています。

### 使用説明

ソフトウェアを開くと、キーストロークを監視します。デフォルトでは、`j`、`n`、`t`、`m`の4つのキーを検出し、押すと対応する音声を再生します。

音声ファイルは`./bin/default/audios`の下にあり、ファイル名は監視したいキーの仮想キー値に".wav"を追加したものです（wavのみサポート）。仮想キー値については、BeepMusicで使用したツールを使用できます：[キー値クエリツール](https://github.com/xiaoditx/BeepMusic/tree/main/tools/XD%E5%BC%80%E5%8F%91%E5%B7%A5%E5%85%B7-T1)。[Microsoftのドキュメント](https://learn.microsoft.com/ja-jp/windows/win32/inputdev/virtual-key-codes)も参照できます。

背景ファイルは変更可能です。簡単な方法は、`./bin/default/background.png`を自分の画像に置き換えることです。現在、pngのみが動作することが確認されています。現在のバージョンでは、画像サイズの自動検出はサポートされておらず、色フィルタリングのカスタマイズもサポートされていません（現在のバージョンでは、10進数の色コード13217535の色が透明に設定されています）。

独自のフォルダを作成することができます（`./bin/`のサブフォルダとして推奨）。内部にaudiosフォルダを作成し、background.pngを配置します。ソフトウェアにこのフォルダを認識させるには、現在のバージョンで唯一有効な方法は、config.iniを編集してファイルの末尾に以下を追加することです：

```text
[settings]
lib=（作成したフォルダのパス、例：.\bin\default）
```

### 開発情報

プロジェクトドキュメント：[docs](./docs)

ソフトウェア技術スタック

- win32
- C++17
- GDI+
- ~~COMライブラリ~~（導入予定）

開発環境

- Windows10-x64
- MSYS2（MingGW64）
- VScode
- GNU Make（4.4.1）

## コントリビューター

コミュニティのコントリビューターに感謝します（実際にはまだいません）

<a href="https://github.com/xiaoditx/keybonk/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=xiaoditx/keybonk" />
</a>

## プロジェクト統計

<a href="https://www.star-history.com/#xiaoditx/keybonk&type=date&legend=top-left">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=xiaoditx/keybonk&type=date&theme=dark&legend=top-left" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=xiaoditx/keybonk&type=date&legend=top-left" />
   <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=xiaoditx/keybonk&type=date&legend=top-left" />
 </picture>
</a>

![Alt](https://repobeats.axiom.co/api/embed/148eacdfa3e1268ce951923b74ab7f6ed8d8a9e7.svg "Repobeats analytics image")