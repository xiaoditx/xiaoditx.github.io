---
title: "makefile ヘルプ"
---

```
[makefile ヘルプ]
デフォルトモード: 64ビットデバッグモード

利用可能なターゲット:
all clean help run release release64 release32 installer installer64 installer32

ターゲットの機能:
	- all: デフォルトモードでプロジェクトをビルド
	- clean: すべてのビルドファイルを削除
	- help: このヘルプメッセージを表示
	- run: ビルドされた実行可能ファイルを実行
	- release: 64ビットと32ビットのリリースバージョンをビルド
	- release64: 64ビットのリリースバージョンをビルド
	- release32: 32ビットのリリースバージョンをビルド
	- installer: 64ビットと32ビットのインストーラーをビルド
	- installer64: 64ビットリリースバージョンのインストーラーをビルド
	- installer32: 32ビットリリースバージョンのインストーラーをビルド

制御可能な変数:
DEBUG ARCH
注:
	- DEBUG: cppファイルのコンパイルにデバッグパラメータを設定します。デフォルトは -DKB_DEBUG です
	- ARCH: 現在のコンパイルアーキテクチャ（32/64ビット）

ヘルプ作成日時: 2026/2/9 17:02

```