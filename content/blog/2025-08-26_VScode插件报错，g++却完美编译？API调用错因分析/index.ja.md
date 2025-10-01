---
title: "VScodeプラグインはエラーを報告するのに、g++は完璧にコンパイル？API呼び出しの誤り原因分析"  # 記事タイトル
draft: false  # 下書きか？ falseに設定で公開
description: "WritePrivateProfileStringを使うと、VScodeは即座にエラーを報告するのに、g++は直接コンパイルを通す？これは分析必須だ"  # 記事要約
tags: ["開発ツール", "C++", "エラー分析"]  # 記事タグ、分類と関連付け用
categories: ["コード：トラブル日記"]  # 記事カテゴリ
date: 2025-08-26
authors:
  - name: xiaoditx
    link: https://github.com/xiaoditx
    image: https://github.com/xiaoditx.png
---

> [!note]
> 本ページはAI技術による翻訳を使用しています。内容は参考までにご覧ください。

少し前にある[小さなソフトウェア](https://github.com/xiaoditx/BeepMusic)を書き、それに設定読み書き機能を追加したくなりました。C++を学び始めて数日の私は、ネットでかなり調べ、INI読み込みの`GetPrivateProfileString`とINI書き込みの`WritePrivateProfileString`という2つのWindows APIを見つけました。ネットのチュートリアルに従い、以下の3行を書きました：

```cpp
    LPTSTR lpPath = new char[MAX_PATH];
    strcpy(lpPath, ".\\config.ini");
    ::WritePrivateProfileString("config", "t", "120", lpPath);
```

書き終えた直後、VScodeのプラグインが即座に赤く警告を出し、次のようなエラーを表示しました：
![VScodeプラグインエラー](/imgs/blogs/VScode报错，g++通过，GetPrivateProfileString/184a967e89d542c3be6e63b16667e2a3.png)
しかし、私はチュートリアル通りに正確に書いたと確信していました。どこが問題なのでしょうか？

コンパイルを試みると、結果は驚くべきものでした：g++は一切エラーなくコンパイルに成功し、カレントディレクトリに`config.ini`を作成して指定内容を書き込みました。

![g++コンパイル結果](/imgs/blogs/VScode报错，g++通过，GetPrivateProfileString/83ab9c632d1e463596644c4afcc60d14.png)

これは奇妙です。公式ドキュメントを調べてみましょう。

MSDNに行き、`WritePrivateProfileString`を検索しましたが、見つかりませんでした。見つかったのは`WritePrivateProfileStringA`と`WritePrivateProfileStringW`（どちらも末尾に文字が一つ追加）だけでした。

![MSDN関連内容](/imgs/blogs/VScode报错，g++通过，GetPrivateProfileString/9e5fe8e0a5074f0ba5d570c9a3ef2023.png)

仕方ないので、一つクリックして確認しました。`WritePrivateProfileStringA`を選びました。ん？パラメータの型が違うようです。チュートリアルでは`LPTSTR`を使っていましたが、ここでは`LPCSTR`と書かれています。

下にスクロールすると、`Example`セクションの下に注記がありました：

> winbase.h ヘッダーは、UNICODE プリプロセッサ定数の定義に基づいて、この関数の ANSI バージョンと Unicode バージョンを自動的に選択するエイリアスとして WritePrivateProfileString を定義します。エンコード中立エイリアスとエンコード中立ではないコードを混在させると、コンパイル エラーまたはランタイム エラーの不一致が発生する可能性があります。詳細については、「関数プロトタイプの規約」を参照してください。

つまり、`WritePrivateProfileString`はAPIの本来の名前ではなく、条件に応じて選択されるものなのです。

VScodeに戻り、Ctrlを押しながら`WritePrivateProfileString`をクリックして、`Windows.h`の内容を確認しました：

```cpp
#ifdef UNICODE
#define WritePrivateProfileString  WritePrivateProfileStringW
#else
#define WritePrivateProfileString  WritePrivateProfileStringA
#endif
```

VScodeでは上の条件が有効（強調表示）になっており、VScodeの環境では`UNICODE`マクロが定義されていることを証明していました。

![条件付きコンパイル](/imgs/blogs/VScode报错，g++通过，GetPrivateProfileString/389e5b23cc314530822b326a0f848859.png)

これで真相がわかりました！VScodeには`UNICODE`マクロが定義されている一方、g++には定義されていなかったため、プラグインはコードを`WritePrivateProfileStringW`に対してチェックし、Unicodeと`wchar_t`（ワイド文字）で格納されたパスを要求しました。g++でコンパイルするときは、`WritePrivateProfileStringA`を使い、ANSIと`char`（通常の文字）で格納されたパスを要求しました。その結果、私たちが`char`を使ったコードはg++では正常に動作しましたが、VScodeプラグインのチェックには通りませんでした。

したがって、私たちのコードは正しかったのですが、環境の違いによりプラグインがエラーと判断したのです。この場合の解決策は、明示的に`WritePrivateProfileStringA`関数を使用することを指定することです：

```cpp
    char* lpPath = new char[MAX_PATH];
    strcpy(lpPath, ".\\config.ini");
    ::WritePrivateProfileStringA("LiMing", "Sex", "Man", lpPath);
    delete[] lpPath;
```

これで完了です。煩わしい警告はついに消えました。

-----

**付録：** LPxxxSTRデータ型の具体的な意味

1.  **核心的基本型:**
    *   `CHAR`: **ANSI** (8ビット) 文字を表す (`char`)。
    *   `WCHAR`: **ワイド文字** (Unicode, 通常は16ビット UTF-16) を表す (`wchar_t`)。
    *   `TCHAR`: **適応型文字タイプ**。プロジェクト設定（`_UNICODE`マクロが定義されているかどうか）に基づいて、`CHAR` または `WCHAR` にコンパイルされる。ANSIとUnicodeのどちらにもコンパイル可能なコードを書くために使用される。

2.  **文字列ポインタ型:**
    *   `LPSTR`: **Long Pointer to STRing**。NULL終端された **ANSI** 文字列を指す (`CHAR*`)。
        *   `typedef CHAR* LPSTR;`
    *   `LPWSTR`: **Long Pointer to Wide STRing**。NULL終端された **Unicode** (UTF-16) 文字列を指す (`WCHAR*`)。
        *   `typedef WCHAR* LPWSTR;`
    *   `LPTSTR`: **Long Pointer to TCHAR STRing**。NULL終端された **適応型文字** (`TCHAR*`) 文字列を指す。`_UNICODE`マクロ定義に依存し、コンパイル時に`LPSTR` (ANSI) または `LPWSTR` (Unicode) と等しくなる。
        *   `typedef TCHAR* LPTSTR;`

3.  **定数文字列ポインタ型:**
    *   `LPCSTR`: **Long Pointer to Constant STRing**。NULL終端された **定数ANSI** 文字列を指す (`const CHAR*`)。
        *   `typedef const CHAR* LPCSTR;`
    *   `LPCWSTR`: **Long Pointer to Constant Wide STRing**。NULL終端された **定数Unicode** (UTF-16) 文字列を指す (`const WCHAR*`)。
        *   `typedef const WCHAR* LPCWSTR;`
    *   `LPCTSTR`: **Long Pointer to Constant TCHAR STRing**。NULL終端された **定数適応型文字** (`const TCHAR*`) 文字列を指す。`_UNICODE`マクロ定義に依存し、コンパイル時に`LPCSTR` (ANSI) または `LPCWSTR` (Unicode) と等しくなる。
        *   `typedef const TCHAR* LPCTSTR;`

**主な違いのまとめ表：**

| 型          | 文字幅          | Const性   | 基本型相当 (ANSIビルド) | 基本型相当 (Unicodeビルド) | 説明                                           |
| :---------- | :-------------- | :-------- | :---------------------- | :------------------------- | :--------------------------------------------- |
| **LPSTR**   | ANSI (8-bit)    | 非 const  | `char*`                 | `char*`                    | ANSI文字列へのポインタ                         |
| **LPCSTR**  | ANSI (8-bit)    | **const** | `const char*`           | `const char*`              | **読み取り専用** ANSI文字列へのポインタ        |
| **LPWSTR**  | Unicode (16-bit)| 非 const  | `wchar_t*`              | `wchar_t*`                 | Unicode (UTF-16) 文字列へのポインタ            |
| **LPCWSTR** | Unicode (16-bit)| **const** | `const wchar_t*`        | `const wchar_t*`           | **読み取り専用** Unicode (UTF-16) 文字列へのポインタ |
| **LPTSTR**  | **適応型**      | 非 const  | `char*` (LPSTR)         | `wchar_t*` (LPWSTR)        | 適応型文字列 (TCHAR*) へのポインタ             |
| **LPCTSTR** | **適応型**      | **const** | `const char*` (LPCSTR)  | `const wchar_t*` (LPCWSTR) | **読み取り専用** 適応型文字列 (const TCHAR*) へのポインタ |

**重要な注意点:**

1.  **`LP` 接頭辞:** "Long Pointer" は歴史的な名残。現代の32/64ビットシステムでは、全てのポインタが "long" です。`LP`は単に "Pointer to" と考えて差し支えありません。
2.  **`C` 接尾辞:** `const` を意味する。指し示す内容は読み取り専用。このポインタを通して文字列を変更することはできない。
3.  **`T` 接中辞:** 型が `TCHAR` であることを意味し、プロジェクトの文字セット設定に基づいて適応する。ANSIとUnicodeの両方のビルドをサポートするコードを書くためのもの。
4.  **`W` 接尾辞:** "Wide"、つまりUnicode (UTF-16) を意味する。
5.  **`STR` 接尾辞:** "String" (NULL終端文字配列) を意味する。
6.  **現代のWindows開発における実践:**
    *   **常にUnicodeビルドを使用することを強く推奨** (Visual Studio のプロジェクトプロパティで「文字セット」を「Unicode 文字セットを使用する」に設定)。これは `_UNICODE` マクロを定義する。
    *   Unicodeビルドでは:
        *   `TCHAR` = `WCHAR`
        *   `LPTSTR` = `LPWSTR`
        *   `LPCTSTR` = `LPCWSTR`
    *   `TCHAR`ファミリーの曖昧さを避けるため、`LPCWSTR`/`LPWSTR` またはそのエイリアスである `std::wstring` (C++) を直接使用する方が、多くの場合明確である (ANSI/Unicodeの両方をサポートするレガシーコードベースを維持する明示的な必要性がない限り)。
    *   ANSI (`LPSTR`/`LPCSTR`) API関数は、内部的には多くの場合、文字列をUnicodeに変換して対応するUnicode版関数を呼び出しており、パフォーマンスオーバーヘッドと潜在的な文字セット変換問題が存在する。明示的なUnicode (W) 版APIの使用を優先する。
7.  **互換性:** `TCHAR`ファミリーは、主に古いWindows 9xシステム (主にANSIを使用) と現代のNTシステム (ネイティブUnicode) との互換性のために存在する。現代の開発 (Windows 2000以降) ではUnicodeを優先すべき。

**簡単な覚え方:**

*   `W` があれば -> Unicode。
*   `C` があれば -> `const` (文字列内容は変更不可)。
*   `T` があれば -> 適応型。プロジェクト設定に応じてANSIまたはUnicodeに変化。
*   `W` も `T` もなければ -> ANSI。
*   `C` がなければ -> 文字列内容は変更可能 (非定数)。
*   `C` があれば -> 文字列内容は読み取り専用 (定数)。

**使用上のアドバイス:**

*   新しいプロジェクト: **常にUnicodeビルドを有効にする (`_UNICODE` 定義)**。`LPCWSTR` (入力パラメータ) と `LPWSTR` (出力パラメータ)、またはC++では `const wchar_t*` と `std::wstring` の使用を優先する。
*   旧プロジェクトの維持/ANSI互換性が必要: `LPCTSTR` (入力) と `LPTSTR` (出力)、または対応する `TCHAR` 基本型を使用し、`_UNICODE` マクロ定義の取り扱いを確実に行う。
*   Windows APIと相互作用する場合、API関数には通常A (ANSI) とW (Wide/Unicode) の2つのバージョンがあることに注意 (例: `MessageBoxA` と `MessageBoxW`)。汎用マクロ `MessageBox` は `_UNICODE` に基づいて自動的に正しいバージョンを選択する。渡される文字列ポインタ型もそれと一致しなければならない (`LPCSTR` はA版に、`LPCWSTR` はW版に、`LPCTSTR` は汎用マクロにそれぞれ対応)。