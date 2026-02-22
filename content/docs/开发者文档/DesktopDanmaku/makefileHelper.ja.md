---
title: "makefile ヘルパー"
---

```
DesktopDanmaku Makefile ヘルプ

基本的な使い方:
  make [ターゲット] [オプション]

ビルドターゲット:
  all (デフォルト)   - DEBUG バージョンをビルド（64ビット）
  debug        - DEBUG バージョンをビルド（64ビット）
  run          - プログラムをビルドして実行（デフォルト 64ビット）
  clean        - すべてのビルドファイルをクリーンアップ
  help         - このヘルプメッセージを表示

リリースバージョンターゲット:
  release      - すべてのリリースバージョンをクリーンアップしてビルド（64ビットと32ビット）
  release64    - 64ビットリリースバージョンをビルド
  release32    - 32ビットリリースバージョンをビルド

インストーラーターゲット:
  installer    - すべてのインストーラーをクリーンアップしてビルド（64ビットと32ビット）
  installer64  - 64ビットインストーラーをビルド
  installer32  - 32ビットインストーラーをビルド

ビルドオプション:
  ARCH=32      - 32ビットバージョンをビルド
  ARCH=64      - 64ビットバージョンをビルド（デフォルト）
  DEBUG=1      - DEBUG バージョンをビルド（デフォルト）
  DEBUG=0      - RELEASE バージョンをビルド

ビルド例:
  make            - 64ビット DEBUG バージョンをビルド
  make ARCH=32    - 32ビット DEBUG バージョンをビルド
  make DEBUG=0    - 64ビット RELEASE バージョンをビルド
  make run        - プログラムをビルドして実行

ビルドディレクトリ構造:
  build/64/debug/     - 64ビット DEBUG バージョン
  build/32/debug/     - 32ビット DEBUG バージョン
  build/64/release/   - 64ビット RELEASE バージョン
  build/32/release/   - 32ビット RELEASE バージョン

注意:
  - インストーラーのビルドには Inno Setup ツールが必要です
  - このプロジェクトは UTF-8 エンコーディングを使用しています
```