---
title: "C++ WIN32で透過情報付き画像を背景にした異形ウィンドウの実装"
# 記事のタイトル
draft: false
# 草稿かどうか。falseに設定すると公開されます
description: "レイヤードウィンドウを開発して異形ウィンドウを実現し、背景画像は複数の形式をサポートし、アルファ情報を持つことができます"
# 記事の要約
tags: ["C++", "WIN32","GUI"]
# 記事のタグ、分類と関連付けに使用
comments: true
date: 2026-02-06
authors:
  - name: xiaoditx
    link: https://github.com/xiaoditx
    image: https://github.com/xiaoditx.png
---

> [!important]
> この記事は読者が基本的なWIN32開発知識を持ち、C++構文を基本的に習得していることを前提としています。いくつかの基本的な内容は省略されます。もしこの2つの側面のいずれかにほとんど触れたことがない場合は、後で専門的なバージョンで説明する予定です

> [!Warning]
> この記事のすべてのコンパイルはg++を採用しています。MSVCなどの他のコンパイラのユーザーは適宜調整してください
> 
> この記事では、C++11と比較して新しい構文機能をいくつか使用する可能性があります。もし適用できない場合は、適宜変更してください

> [!tip]
> [全体の概要](#全体の概要)を通じて、この記事で説明されている技術、使用されているツールチェーンなどを簡単に理解し、この記事が読む必要性に合っているかどうかをすばやく判断することができます

今日は透過色のついた画像を背景として使った異形ウィンドウを作りましょう

これが実現したい効果です：

![効果図](/imgs/blogs/WIN32分层窗口实现透明背景异形窗体/keybonk.png)

ウィンドウは自由に移動できます

これは私たちが使用する背景画像です。あなたも自分の画像を使うことができますが、私の長さと幅の情報などはコードにハードコードされていることに注意してください。背景画像を変更する場合は、**実際のサイズに応じて調整する必要があります**（後で注記：記事のバージョンではウィンドウサイズを自由に調整できるようですが、私は実験していません）

![画像リソース](/imgs/blogs/WIN32分层窗口实现透明背景异形窗体/background.png)

## 0. 始める前に

この記事はブログ記事[Win32窗口设置为透明 - 百足coder - 博客园](https://www.cnblogs.com/bzbk/p/17197596.html)に触発されましたが、元の記事にはいくつかの誤りがあるようですので、それに応じて研究を行い、修正を加えました

まずいくつかの基本用語を理解しましょう

- アルファ値：透明度、透明なピクセルはその透明度を記述するためにアルファ値を使用します。
- アルファブレンディング：透明情報を持つ2つの重なったピクセルを公式計算によって最後の色を計算するプロセス
- ビットマップ：ピクセルごとに並べられた画像で、圧縮されておらず、各ピクセルには独自のRGBまたはARGB表現があります

## 1. ボーダーレスウィンドウの作成

このようなプログラムを作成するには、まずボーダーレスウィンドウが必要です。最初のステップは、ボーダーレスウィンドウを作成して表示することです

### 1.1. 基本コード

まず、`dev.cpp`という名前の新しいファイルを作成し（以降のすべてのコマンドはこれをベースとします）、次のコードを記述します：

```cpp
// 注：実際にはこれはMSDNから盗んだコードで、実戦を経て修正され、記事を書くときに大幅に変更されました
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
    WNDCLASSEX wc = {};             // 0で全体のWindowClassを初期化
    wc.cbSize = sizeof(WNDCLASSEX); // 構造体のサイズを設定
    wc.lpfnWndProc = WindowProc;    // WindowProc関数を指定
    wc.hInstance = hInstance;
    wc.lpszClassName = CLASS_NAME; // ウィンドウクラス名
    RegisterClassEx(&wc);
    HWND hwnd = CreateWindowExW(
        WS_EX_TOPMOST | WS_EX_TOOLWINDOW, // 最前面に設定し、ソフトウェアアイコンを非表示
        CLASS_NAME,                                       // ウィンドウクラス
        L"KeyBonk主窗口",                                 // ウィンドウテキスト
        WS_POPUP | WS_VISIBLE | WS_CLIPCHILDREN,          // ウィンドウスタイル
                                                          // サイズ+位置
        CW_USEDEFAULT, CW_USEDEFAULT, 160, 180,
        NULL,      // 親ウィンドウ
        NULL,      // メニュー
        hInstance, // インスタンスハンドル
        NULL       // 添付されたソフトウェアデータ
    );

    ShowWindow(hwnd,nCmdShow);

    // メッセージループ
    MSG msg = {};
    while (GetMessage(&msg, NULL, 0, 0) > 0)
    {
        TranslateMessage(&msg);
        DispatchMessage(&msg);
    }
    return 0;
}
```

保存後、コマンドラインで`g++ -o keybonk.exe dev.cpp -mwindows -municode`コマンドを使用してコンパイルします

実行効果はおおよそこのようになります：

![実行効果](/imgs/blogs/WIN32分层窗口实现透明背景异形窗体/white.png)

これはボーダーのない真っ白なウィンドウで、私たちのコードは成功しています

私たちのウィンドウには閉じるオプションが予約されていないため、コマンドラインで`taskkill /im keybonk.exe`コマンドを使用して閉じる必要があります。後でもこの方法で閉じます（Alt(+Fn)+F4も使用できます）。実際のプロジェクトでは、ここで右クリックメニューに閉じるオプションを追加する方法を採用していますが、これはこの記事の重点ではないため、説明しません。

### 1.2. ウィンドウクラスに関する議論

ここでは`WNDCLASS`ではなく`WNDCLASSEX`を使用していることに注意できます。実際、私たちの例ではEXを使用しなくても完全に可能です。これは単に私の[KeyBonkプロジェクト](https://github.com/xiaoditx/KeyBonk)から引用したものに過ぎません（元のプロジェクトではEX固有のメンバーを使用する必要がありました）

`WNDCLASSEX`を使用する場合は、必ず次の行を記述する必要があります：

```cpp
    wc.cbSize = sizeof(WNDCLASSEX); // 構造体のサイズを設定
```

そうしないと、Windowsはウィンドウクラスのバージョンを判断できません

### 1.3. ウィンドウスタイル

このようなウィンドウを実現するには、次のようなウィンドウスタイルが必要です：`WS_POPUP | WS_VISIBLE | WS_CLIPCHILDREN`、`WS_EX_TOPMOST | WS_EX_TOOLWINDOW`。最初の3つは一般的なウィンドウスタイルで、最後の2つは拡張ウィンドウスタイルで、それぞれ：ポップアップウィンドウ、表示、子ウィンドウのクリッピング（最適化用）、最前面、ツールウィンドウ（タスクバーアイコンを非表示）を意味します

ポップアップウィンドウは、タイトルバーやボーダーのないポップアップウィンドウであり、重なりウィンドウ（`WS_OVERLAPPED`）とは対照的です

## 2. 細部の最適化

### 2.1. ウィンドウをドラッグ可能にする

これでボーダーレスウィンドウができましたが、マウスで移動することができません。なぜなら、システムはボーダーからのドラッグのみをウィンドウ移動の意図として認識するためです。いくつかのテクニックを適用する必要があります。

メッセージ処理にこのコードを追加します：

```cpp
    case WM_NCHITTEST:
    {
        return HTCAPTION;
    }
```

このコードは`WM_NCHITTEST`メッセージを処理します。このメッセージのフルネームは「**W**indow **M**essage - **N**on-**C**lient **Hit Test**」（ウィンドウメッセージ_非クライアント領域クリックテスト）です。マウスが移動またはクリックされると、Windowsはこのメッセージをウィンドウに送信して、マウスがクリックされた領域が何であるかを尋ねます。

このメッセージが存在する目的は、ソフトウェア設計の多様性によるものです。多くのソフトウェアはシステムのデフォルトのボーダーを使用しないか、システムの事前に作成されたボタンのみを使用しない可能性がありますが、システムはプログラムがどの領域をどのような目的に使用したいかを知りません。したがって、設計上、システムは仮定するのではなく、尋ねるべきです。

ここでは`HTCAPTION`を返して、システムにマウスがタイトルバーをクリックしたことを伝えます。すると、システムはドラッグをウィンドウの移動として解釈します。

なお、プログラムが単に画像を表示するだけでなく、ボタンなどのコンポーネントを含む場合、このコードによってボタンのクリックが機能しなくなる可能性があります。いくつかの位置判断を追加して支援する必要がありますが、これは読者自身に実装するように残しておきます。

また、デフォルトのメッセージ処理を使用してこのメッセージを最初に処理し、次に判断を行うことで、ある部分のメッセージを別の部分に変換することもできます：

```cpp
// タイトルバーメッセージをクライアント領域メッセージに変換し、その他は変更しない
LRESULT hit = DefWindowProc(hwnd, uMsg, wParam, lParam);
if(hit==HTCAPTION)return HTCLIENT;
return hit;
```

### 2.2. 標準マウスポインタ

現在のウィンドウには問題があります：マウスをホバーすると砂時計（一部のシステムでは回転する輪）が表示されます。この原因はまだ不明ですが、WM_CREATEメッセージをインターセプトしてマウスポインタを設定すると効果的であることが確認されています：

```cpp
    case WM_CREATE:
    {
        // 標準矢印マウスポインタを設定
        SetCursor(LoadCursor(NULL, IDC_ARROW));
    }
	break;
```

> [!tip]
> 後の記事では、レイヤードウィンドウの開発が進むにつれて、この問題は解消されるようです。したがって、このマウスポインタの設定操作は必要ない場合があります

## 3. 異形ウィンドウの実装

私たちが望むのは、四角いウィンドウではなく、滑らかな輪郭を持つ異形ウィンドウです。ウィンドウの一部を透明にする必要があるため、次にこのような異形ウィンドウを実装します

Windowsで異形ウィンドウを作成する最も便利で完全なソリューションは、レイヤードウィンドウを使用することです。まず、レイヤードウィンドウとは何かを理解しましょう：

### 3.1. レイヤードウィンドウ

従来のウィンドウは直接画面に描画します。他のウィンドウが現在のウィンドウを覆うと、現在のウィンドウのピクセルが上書きされるため、上のウィンドウが移動した後、現在のウィンドウは正常に表示するために再描画する必要があります。レイヤードウィンドウは、ウィンドウと画面を分離するソリューションです。いわゆるレイヤリングとは、各ウィンドウを個別の「レイヤー」として扱い、ウィンドウが個別にメモリの一部を制御し、表示時にそれを画面に合成することを意味します。

後のWindowsではDWM（デスクトップウィンドウマネージャ）が導入され、同様の効果が実現されましたが、非常に制限されています。DWMはデフォルトで各ウィンドウを不透明なテクスチャとして扱います。たとえウィンドウに`WS_EX_TRANSPARENT`または一部の背景透明が設定されていても、その処理モデルは依然として「矩形領域」であるため、異形ウィンドウは正しく表示されません。

レイヤードウィンドウは異なります。レイヤードウィンドウは`UpdateLayeredWindow`を使用してウィンドウを描画します。これは実際には、アルファチャンネルを備えた完全なビットマップをDWMに提供します。DWMはそれを透明度情報を持つ独立したレイヤーとして扱い、不透明な矩形として扱いません。

レイヤードウィンドウは、様々な非標準ウィンドウの作成に広く使用され、ウィンドウアニメーション作成にも広く応用されています。ここでレイヤードウィンドウを使用するのは、DWMに「透明を透明として見る」ようにするためであり、「透明を空白として見る」のではなく、非矩形の異形ウィンドウを実現するためです。

### 3.2. レイヤードウィンドウの作成

レイヤードウィンドウを作成するには、ウィンドウの拡張スタイルに`WS_EX_LAYERED`を追加する必要があります：

```cpp
    HWND hwnd = CreateWindowExW(
        WS_EX_LAYERED | WS_EX_TOPMOST | WS_EX_TOOLWINDOW, // レイヤードウィンドウ、最前面に設定、ソフトウェアアイコンを非表示
        // .......
    );
```

このウィンドウスタイルを追加すると、システムは私たちのウィンドウをレイヤードウィンドウとして扱います

## 4. 画像の描画

ウィンドウをレイヤードウィンドウに設定した後、その背景を設定する必要があります。前に述べたように、レイヤードウィンドウは`UpdateLayeredWindow`を使用してウィンドウを描画します。この関数は、アルファチャンネル（つまり透明度情報）を備えたビットマップをシステムに提供し、システムはこのビットマップを完成したウィンドウとして理解します

ビットマップに変換するためにpngなどのファイルをメモリに読み込む方法を知る必要があるように見えますが、まだそこまで考える必要はありません。優先事項は`UpdateLayeredWindow`の使用方法を理解することです。使用方法をマスターした後、ビットマップのソリューションについて考えることができます

> [!note]
> 以下では、ビットマップを読み込み、ハンドルをHBITMAPに格納したと仮定します

`UpdateLayeredWindow`関数のプロトタイプは次のとおりです：

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

この関数は9つのパラメータを提供する必要があります：ウィンドウハンドル、画面DC、更新後のウィンドウ位置、更新後のウィンドウサイズ、メモリDC、DC内の位置、カラーキー、全体の透明度、透明モードフラグ

### 4.1. 画面DC/デバイスDCとは何か

Windowsでは、アプリケーションは通常ハードウェアに直接アクセスしません。デバイスの独立性を実現し、開発を簡素化するために、Windowsは階層化されたドライバモデルと抽象的なプログラミングインターフェースを提供します。グラフィックス処理における重要な設計は、デバイスコンテキスト（DC）です。アプリケーションはDCを介して描画操作を実行し、Windowsグラフィックスサブシステム（GDIなど）は対応するデバイスドライバと協力して、これらの一般的なコマンドを特定の表示または印刷デバイス用の命令に変換します。

> [!tip]
> 「**コンテキスト**」という用語は理解が少し難しいかもしれません。コンテキストに関する詳細な内容については、[知乎 | 计算机编程中的上下文（Context）到底是什么？从理解到实践](https://zhuanlan.zhihu.com/p/650629290)を参照してください

DCは大まかに2つのカテゴリに分けることができます：**画面DC**と**メモリDC**

画面DCは表示デバイスに関連付けられたデバイスコンテキストです。各ウィンドウは描画する必要があるときに画面DCを取得または使用し、実際の表示内容を直接制御します。ただし、毎回の描画操作がすぐに画面DCに更新されると、ウィンドウが頻繁にリフレッシュされ、視覚的なフリッカーが発生しやすくなります。

メモリDCはオフスクリーンのデバイスコンテキストであり、直接表示に使用されません。すべての描画操作を最初にメモリDCで完了させて完全な画像を生成し、一度に画面DCにコピーすることができます。これにより、複数の描画結果が集中して表示され、フリッカーの問題が効果的に回避されます。

ただし、レイヤードウィンドウのような高度な視覚効果（透明度、影、非矩形領域など）をサポートする特殊なウィンドウの場合、DCを使用する目的は単にフリッカーを防ぐことだけではありません。レイヤードウィンドウの描画は、多くの場合、複雑な合成操作を伴い、ピクセルデータとアルファチャンネルがDWMによって統一的に管理されます。

このようなシナリオでは、DCメカニズムを使用することは、主に以下のシステム上の利点に基づいています：

- パラメータのカプセル化と状態の統一：DCは、現在の描画環境のすべての状態（ブラシ、ペン、フォント、座標マッピングなど）を内部的にカプセル化し、各描画呼び出しで大量のパラメータを繰り返し渡すことを回避し、一連の描画操作が一貫したコンテキストで実行されることを保証します。

- リソースの集中管理と効率の最適化：DCは、ビットマップ、領域、パスなどのグラフィックスリソースを関連付けて管理し、デバイスドライバレベルで最適化することができます。レイヤードウィンドウの場合、システムはDCを介してビットマップをより効率的にキャッシュおよび合成し、繰り返しのレンダリングオーバーヘッドを減らすことができます。

- 全体的なパフォーマンスと応答性の向上：DCで複数の離散的な描画命令をバッチ操作に統合することで、ユーザーモードとカーネルモードドライバ間のコンテキストスイッチの回数が減少し、CPU使用率が低下し、描画の全体的なスループットとインターフェースの応答速度が向上します。

したがって、DCはWindowsグラフィックスシステムにおけるフリッカー防止ツールだけでなく、デバイス抽象化、状態管理、描画最適化を担う重要な基盤です。レイヤードウィンドウなどの高度なインターフェース技術では、DCのこれらの設計上の利点が特に重要になります。

実際のコードでは、`GetDC(hwnd);`を使用して対応するウィンドウの画面DCを取得し、`CreateCompatibleDC(hdcScreen);`を使用して画面DCに基づいてメモリDCを作成します。以下に示します：

```cpp
    // メモリDCを作成
    HDC hdcScreen = GetDC(hwnd);
    HDC memDC = CreateCompatibleDC(hdcScreen);
```

DCは手動で解放する必要があることに注意してください：

```cpp
    DeleteDC(memDC);
    ReleaseDC(hwnd, hdcScreen);
```

### 4.2. カラーキーと透明度

カラーキーは、ウィンドウ内の特定の色を透明に設定し、その色を描画することで透明領域を作成する、初期の透明技術です。このドキュメントではこの方法は採用されておらず、理解のみで十分です。使用する場合は、通常`RGB(0, 255, 0)`のような形式で透明色を指定します。

`UpdateLayeredWindow`を使用してウィンドウの全体的な透明度を設定するには、最後から2番目のパラメータを介して`BLENDFUNCTION`構造体を指定する必要があります。この構造体は次のように定義されています：

```cpp
typedef struct _BLENDFUNCTION {
    BYTE BlendOp;             // AC_SRC_OVER (0x00)に設定する必要があります
    BYTE BlendFlags;          // 0に設定する必要があります
    BYTE SourceConstantAlpha; // 全体の透明度、範囲0–255
    BYTE AlphaFormat;         // アルファ形式フラグ
} BLENDFUNCTION;
```

最初の2つのフィールドは固定値で、最後の2つのフィールドはユーザーが指定します：

`SourceConstantAlpha`は、ソースビットマップ全体に使用されるアルファ定数値（0-255）を指定します。この値は、アルファ形式に応じて、ソースビットマップのピクセルデータと組み合わされます：

- `AlphaFormat`が0の場合、ビットマップにアルファチャンネルがないことを示し、この値はビットマップ全体の均一な透明度として直接使用されます。
- `AlphaFormat`が`AC_SRC_ALPHA`の場合、ビットマップにピクセルごとのアルファがあることを意味し、この値はスケーリング係数として使用され、各ピクセルの独自のアルファ値と乗算されて、最終的な透明度が決定されます。式：結果のアルファ = ソースピクセルのアルファ × (SCA/255)
  
### 4.3. フラグビット

`UpdateLayeredWindow`の最後のパラメータはフラグビットで、公式ドキュメントによると、次の値のいずれかを指定できます：

| マクロ名 | 値 | 意味 |
|---|---|---|
| ULW_ALPHA | 0x00000002 | `pblend`をブレンド関数として使用します。表示モードが256色以下の場合、この値はULW_OPAQUEと同じ効果があります。 |
| ULW_COLORKEY | 0x00000001 | `crKey`を透明カラーキーとして使用します。 |
| ULW_OPAQUE | 0x00000004 | 不透明なレイヤードウィンドウを描画します。 |
| ULW_EX_NORESIZE | 0x00000008 | 現在のウィンドウサイズが`psize`で指定されたサイズと一致しない場合、`UpdateLayeredWindowIndirect`関数を強制的に失敗させます。 |

異形ウィンドウを作成するには、`ULW_ALPHA`を使用します

### 4.4. パラメータの確認

上記の内容を学んだ今、レイヤードウィンドウの描画方法をマスターするために、上記のUpdateLayeredWindow関数のプロトタイプを確認しましょう：

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

- `hWnd`は、描画されるレイヤードウィンドウのウィンドウハンドルを指定します
- `hdcDst`は、画面DCを指定します（NULLの場合、メモリDCもNULLでなければなりません）
- `pptDst`は、ウィンドウの位置を指定します。NULLの場合、ウィンドウの位置は変更されません
- `psize`は、ウィンドウのサイズを指定します。ウィンドウサイズが更新されていない場合はNULLを使用できます。`hdcSrc`がNULLの場合、`psize`はNULLでなければなりません。
- `hdcSrc`は、メモリDCを指定します
- `pptSrc`は、DC内の位置を指定します。これは、DCのどの位置からが実際のウィンドウ表示範囲であるかをシステムに伝えることを意味します
- `crKey`は、透明カラーキーを指定します
- `pblend`は、全体の透明度を指定します
- `dwFlags`は、透明モードをフラグします

このように呼び出します：

```cpp
    // UpdateLayeredWindowを使用
    POINT ptSrc = {0, 0};
    BLENDFUNCTION bf = {AC_SRC_OVER, 0, 255, AC_SRC_ALPHA};
    UpdateLayeredWindow(hwnd, hdcScreen, NULL, &size, memDC, &ptSrc, 0, &bf, ULW_ALPHA);
```

`UpdateLayeredWindow`はレイヤードウィンドウの表示を更新します。このとき、ShowWindowやUpdateWindowsなどの関数を使用して表示を更新する必要はないため、直接削除することができます

### 4.5. DC操作

上記では`UpdateLayeredWindow`の使用について説明しました。ウィンドウの描画にはDCが必要ですが、先ほどはDC関連の内容を展開しませんでした。ここで詳細に展開します

Windowsでは、レイヤードウィンドウの描画はビットマップに基づいています。ビットマップをウィンドウに関連付ける必要があります。DCは、この関連付けを実現するためのブリッジです。「選択」操作、たとえば`SelectObject`関数を通じて、ビットマップをDCにリンクし、次にUpdateLayeredWindowを呼び出して描画します。

なぜデータを選択するための関数を設計するのでしょうか？なぜDCを構造体として直接ビットマップを格納しないのでしょうか？これは、初期のWin32 APIがオブジェクト指向のカプセル化機能を欠くC言語で開発されたためです。このため、Windowsは抽象層としてHDC（デバイスコンテキストハンドル）を導入しました：DCの内部を直接操作することはできず、事前定義されたGDI関数を介して間接的に操作することのみが可能です：

```cpp
    HBITMAP hOldBmp = (HBITMAP)SelectObject(memDC, hBmp);
```

オブジェクト指向の考え方でこの操作を理解することができます。DCをクラスとして理解し、memDCをオブジェクトとして理解し、`SelectObject`をメソッドとして理解します。このメソッドを介して、制限された方法でクラスのプライベートメンバーを変更することができます

新しいビットマップを選択するたびに、以前のビットマップが選択解除されることに注意してください。選択解除されたのがカスタムビットマップの場合、後で解放するか再利用するかを決定する必要があります。デフォルトのビットマップの場合、DCを解放する前に必ず元に戻す必要があります。なぜなら、GDIはデフォルトのビットマップを含むDCの解放のみを正しく処理できるためです。DCにまだカスタムビットマップが選択されていると、メモリリークが発生します。

> [!note]
> カスタムビットマップについて、DCが選択後に正しく解放できない理由は、ビットマップが複数のDCによって同時に使用される可能性があるため、GDIはこのビットマップが解放可能であることを保証できず、したがって解放しないためです。新しいビットマップを選択しないでDCに現在のビットマップを選択解除するように直接要求することはできません。なぜなら、DCは必ずビットマップを含む必要があるため、デフォルトのビットマップでのみ復元することができます。デフォルトのビットマップはGDIの内部リソースとして、GDIはこの操作が安全であることを確実に知っているため、正しく解放することができます

ビットマップが`HBITMAP hBmp;`で、メモリDCが`HDC memDC;`である場合、ビットマップを次のように選択します：

```cpp
	// ビットマップを選択
    HBITMAP hOldBmp = (HBITMAP)SelectObject(memDC, hBmp);
```

前述のように、GDIはデフォルトのビットマップが選択されたDCのみを正しく解放できます。リソースを解放するときは、DCをデフォルトのビットマップに戻す必要もあります：

```cpp
    SelectObject(memDC, hOldBmp);// カスタムビットマップを選択解除
	// この時点で、ビットマップの状態は「選択解除」されており、削除することができます
    DeleteDC(memDC);// メモリDCを削除
    ReleaseDC(hwnd, hdcScreen);// 画面DCを解放
    DeleteObject(hBmp);// ビットマップを削除
```

### 4.6. 画像サイズの取得

前述のように、`UpdateLayeredWindow`にはウィンドウサイズとしてサイズ情報が必要です。レイヤードウィンドウは単に画像を表示するだけなので、サイズは当然ビットマップのサイズです。したがって、ウィンドウサイズとして画像サイズを取得する必要があります

HBITMAPはGDIオブジェクトハンドルであり、単なる数字の文字列です。GDI関数で操作するビットマップを指定するだけで、それ自体には情報は含まれていません。含まれているデータを読み取るには、BITMAP構造体に変換する必要があります：

```
    // 画像サイズを取得
    BITMAP bm;
    GetObject(hBmp, sizeof(BITMAP), &bm);
    SIZE size = {bm.bmWidth, bm.bmHeight};
```

GDIは、データの読み取りなどの操作のために、`GetObject`を使用してハンドルを実際のオブジェクトに変換します

### 4.7. コードの結合

```cpp
    // メモリDCを作成
    HDC hdcScreen = GetDC(hwnd);
    HDC memDC = CreateCompatibleDC(hdcScreen);
	// ビットマップを選択
    HBITMAP hOldBmp = (HBITMAP)SelectObject(memDC, hBmp);

    // 画像サイズを取得
    BITMAP bm;
    GetObject(hBmp, sizeof(BITMAP), &bm);
    SIZE size = {bm.bmWidth, bm.bmHeight};

    // UpdateLayeredWindowを使用
    POINT ptSrc = {0, 0};
    BLENDFUNCTION bf = {AC_SRC_OVER, 0, 255, AC_SRC_ALPHA};
    UpdateLayeredWindow(hwnd, hdcScreen, NULL, &size, memDC, &ptSrc, 0, &bf, ULW_ALPHA);
	
    // クリーンアップ
    SelectObject(memDC, hOldBmp);
    DeleteDC(memDC);
    ReleaseDC(hwnd, hdcScreen);
    DeleteObject(hBmp);
```

## 5. 画像の読み込み

レイヤードウィンドウの描画方法を学びましたが、レイヤードウィンドウの描画にはビットマップが必要で、まだ画像を読み込むコードがありません。したがって、最初に画像の読み込みコードを記述し、次に実際のウィンドウ描画コードを記述する必要があります。

利便性を考慮して、ここではGDI+を使用して画像を読み込みます。このライブラリは一般的なWindowsコンパイラでは自動的にリンク可能です。GDI+を使用したくない場合は、他の方法を見つけることもできます

GDI+を使用するには、最初に初期化する必要があります：

```cpp
int WINAPI wWinMain(HINSTANCE hInstance, [[maybe_unused]] HINSTANCE hPrevInstance, [[maybe_unused]] PWSTR pCmdLine, int nCmdShow)
{
    // GDI+を初期化
    Gdiplus::GdiplusStartupInput gdiplusStartupInput;
    ULONG_PTR gdiplusToken;
    Gdiplus::GdiplusStartup(&gdiplusToken, &gdiplusStartupInput, NULL);

	// 以下の内容は省略......
}
```

> [!note]
> GDI+開発には、対応するヘッダーファイルをインクルードする必要があります：
> 
> ```cpp
> #include <gdiplus.h>
> ```
> 
> 同時に、コンパイル時にGDI+ライブラリをリンクする必要があります。g++の場合、`-lgdiplus`を追加するだけです
> 
> ```batch
>  g++ -o keybonk.exe dev.cpp -lgdiplus -mwindows -municode
> ```

初期化されたら、プログラムのメッセージループの後、returnステートメントの前に逆初期化ステートメントを記述するのを忘れないでください：

```cpp
    // プログラム終了時にGDIライブラリを閉じる
    Gdiplus::GdiplusShutdown(gdiplusToken);
```

さて、画像を読み込みましょう。GDIは、`Gdiplus::Bitmap::FromFile`関数を使用してさまざまな形式のファイルからビットマップを読み込むことをサポートしています：

```cpp
    // PNGをロード（アルファ値を保持）
    Gdiplus::Bitmap *pBitmap = Gdiplus::Bitmap::FromFile(L"！！！ファイルパス！！！");
    if (!pBitmap || pBitmap->GetLastStatus() != Gdiplus::GpStatus::Ok)
    {
        // 画像のロードに失敗した場合、赤い長方形を代替として作成
        pBitmap = new Gdiplus::Bitmap(160, 180);
        Gdiplus::Graphics g(pBitmap);
        Gdiplus::SolidBrush brush(Gdiplus::Color(255, 255, 0, 0));
        g.FillRectangle(&brush, 0, 0, 160, 180);
    }
```

> [!note]
> コード内のファイルパスは自分で変更する必要があります。`\`を使用する場合は、エスケープするために`\\`と記述する必要があることに注意してください

ここでは、まず`Gdiplus::Bitmap::FromFile`を使用してファイルを読み込み、ポインタ`pBitmap`を使用してロードされたファイルのメモリ内の位置を指します。エラー処理も配置する必要があります。ファイルの読み込みに失敗した場合は、読み込みに失敗したことをユーザーに知らせるために、赤い長方形のインターフェースを手動で描画しようとする必要があります。

画像を`pBitmap`にロードしましたが、その型は`Gdiplus::Bitmap`ですが、画面DCに必要なビットマップは`HBITMAP`です。変換する方法を見つける必要があります。`Gdiplus::Bitmap`はクラスとして、GetHBITMAPメソッドを提供しています：

```cpp
    HBITMAP hBmp;
    pBitmap->GetHBITMAP(Gdiplus::Color(0, 0, 0, 0), &hBmp); // 透明背景
```

`GetHBITMAP`メソッドには2つのパラメータが必要です。前者は背景色、後者は結果の格納位置です。`Gdiplus::Color(0, 0, 0, 0)`を使用して色値を取得します。この色はARGB（アルファ-RGB）形式で、最初のビットは透明度を指定します。0は透明であるため、ここでは元の画像の透明背景が保持されます

読み込みが完了すると、pBitmapは使用されなくなるため、解放する必要があります：

```cpp
    delete pBitmap;
```

## 完全な例

以下は完全なC++コードで、`g++ -o main.exe main.cpp -lgdiplus -lgdi32 -mwindows -municode`コマンドを使用してコンパイルすることができます。

使用する前に、「!!!ファイルパス!!!」の位置（おそらく55行目）を自分の背景画像のファイルパスに変更する必要があります。そうしないと、真っ赤な状態で起動します。

> [!important]
> カスタム画像を背景として使用する場合は、サイズが大きすぎないように注意してください。必ず使用する必要がある場合は、[よりインテリジェントなバージョン](#よりインテリジェントなバージョン)に置き換えてください

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
        // 標準矢印マウスポインタを設定
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
    // GDI+を初期化
    Gdiplus::GdiplusStartupInput gdiplusStartupInput;
    ULONG_PTR gdiplusToken;
    Gdiplus::GdiplusStartup(&gdiplusToken, &gdiplusStartupInput, NULL);

    const wchar_t CLASS_NAME[] = L"KeyBonk主窗口";
    WNDCLASSEX wc = {};             // 0で全体のWindowClassを初期化
    wc.cbSize = sizeof(WNDCLASSEX); // 構造体のサイズを設定
    wc.lpfnWndProc = WindowProc;    // WindowProc関数を指定
    wc.hInstance = hInstance;
    wc.lpszClassName = CLASS_NAME; // ウィンドウクラス名
    RegisterClassEx(&wc);
    HWND hwnd = CreateWindowExW(
        WS_EX_LAYERED | WS_EX_TOPMOST | WS_EX_TOOLWINDOW, // レイヤードウィンドウ、最前面に設定、ソフトウェアアイコンを非表示
        CLASS_NAME,                                       // ウィンドウクラス
        L"KeyBonk主窗口",                                 // ウィンドウテキスト
        WS_POPUP | WS_VISIBLE | WS_CLIPCHILDREN,          // ウィンドウスタイル
                                                          // サイズ+位置
        CW_USEDEFAULT, CW_USEDEFAULT, 160, 180,
        NULL,      // 親ウィンドウ
        NULL,      // メニュー
        hInstance, // 例のハンドル
        NULL       // 添付されたソフトウェアデータ
    );

    // PNGをロード（アルファ値を保持）
    Gdiplus::Bitmap *pBitmap = Gdiplus::Bitmap::FromFile(L"！！！ファイルパス！！！");
    if (!pBitmap || pBitmap->GetLastStatus() != Gdiplus::GpStatus::Ok)
    {
        // 画像のロードに失敗した場合、赤い長方形を代替として作成
        pBitmap = new Gdiplus::Bitmap(160, 180);
        Gdiplus::Graphics g(pBitmap);
        Gdiplus::SolidBrush brush(Gdiplus::Color(255, 255, 0, 0));
        g.FillRectangle(&brush, 0, 0, 160, 180);
    }

    HBITMAP hBmp;
    pBitmap->Gdiplus::Bitmap::GetHBITMAP(Gdiplus::Color(0, 0, 0, 0), &hBmp); // 透明背景

    // メモリDCを作成
    HDC hdcScreen = GetDC(hwnd);
    HDC memDC = CreateCompatibleDC(hdcScreen);
    HBITMAP hOldBmp = (HBITMAP)SelectObject(memDC, hBmp);

    // 画像サイズを取得
    BITMAP bm;
    GetObject(hBmp, sizeof(BITMAP), &bm);
    SIZE size = {bm.bmWidth, bm.bmHeight};

    // UpdateLayeredWindowを使用
    POINT ptSrc = {0, 0};
    BLENDFUNCTION bf = {AC_SRC_OVER, 0, 255, AC_SRC_ALPHA};
    UpdateLayeredWindow(hwnd, hdcScreen, NULL, &size, memDC, &ptSrc, 0, &bf, ULW_ALPHA);

    // クリーンアップ
    SelectObject(memDC, hOldBmp);
    DeleteDC(memDC);
    ReleaseDC(hwnd, hdcScreen);
    delete pBitmap;
    DeleteObject(hBmp);

    // メッセージループ
    MSG msg = {};
    while (GetMessage(&msg, NULL, 0, 0) > 0)
    {
        TranslateMessage(&msg);
        DispatchMessage(&msg);
    }

    // プログラム終了時にGDIライブラリを閉じる
    Gdiplus::GdiplusShutdown(gdiplusToken);

    return 0;
}
```

## 全体の概要

（まだ内容なし）

## よりインテリジェントなバージョン

ここでは、画面サイズをチェックしてウィンドウをスケーリングする、よりインテリジェントなバージョンを紹介します

```cpp
#include <windows.h>
#include <gdiplus.h>
#include <algorithm>  // このヘッダーファイルを追加

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
    // GDI+を初期化
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

    // PNGをロード
    Gdiplus::Bitmap *pBitmap = Gdiplus::Bitmap::FromFile(L"C:\\Users\\Administrator\\Desktop\\透明窗口\\a.png");
    if (!pBitmap || pBitmap->GetLastStatus() != Gdiplus::GpStatus::Ok)
    {
        // 画像のロードに失敗した場合、赤い長方形を代替として作成
        pBitmap = new Gdiplus::Bitmap(160, 180);
        Gdiplus::Graphics g(pBitmap);
        Gdiplus::SolidBrush brush(Gdiplus::Color(255, 255, 0, 0));
        g.FillRectangle(&brush, 0, 0, 160, 180);
    }

    // 元のビットマップサイズを取得
    int originalWidth = pBitmap->GetWidth();
    int originalHeight = pBitmap->GetHeight();

    // 画面サイズを取得
    int screenWidth = GetSystemMetrics(SM_CXSCREEN);
    int screenHeight = GetSystemMetrics(SM_CYSCREEN);

    // 最大許容サイズを計算
    int maxWidth = screenWidth / 4;    // 画面幅の4分の1
    int maxHeight = screenHeight / 2;  // 画面高の2分の1

    // スケール比率を計算
    float widthRatio = (float)originalWidth / maxWidth;
    float heightRatio = (float)originalHeight / maxHeight;
    float scaleRatio = std::max(widthRatio, heightRatio);
    
    // スケーリング後のサイズを計算
    int scaledWidth, scaledHeight;
    if (scaleRatio > 1.0f)
    {
        // スケーリングが必要
        scaledWidth = (int)(originalWidth / scaleRatio);
        scaledHeight = (int)(originalHeight / scaleRatio);
    }
    else
    {
        // スケーリング不要
        scaledWidth = originalWidth;
        scaledHeight = originalHeight;
    }

    // スケーリングされたビットマップを作成
    Gdiplus::Bitmap* scaledBitmap = new Gdiplus::Bitmap(scaledWidth, scaledHeight);
    Gdiplus::Graphics graphics(scaledBitmap);
    
    // 高品質スケーリングを設定
    graphics.SetInterpolationMode(Gdiplus::InterpolationModeHighQualityBicubic);
    graphics.SetSmoothingMode(Gdiplus::SmoothingModeAntiAlias);
    graphics.SetPixelOffsetMode(Gdiplus::PixelOffsetModeHalf);
    
    // スケーリングされた画像を描画
    graphics.DrawImage(pBitmap, 0, 0, scaledWidth, scaledHeight);
    
    // 元のビットマップをクリーンアップ
    delete pBitmap;
    pBitmap = scaledBitmap;  // スケーリングされたビットマップを使用

    // GDI+ビットマップをHBITMAPに変換
    HBITMAP hBmp;
    pBitmap->GetHBITMAP(Gdiplus::Color(0, 0, 0, 0), &hBmp);

    // メモリDCを作成
    HDC hdcScreen = GetDC(hwnd);
    HDC memDC = CreateCompatibleDC(hdcScreen);
    HBITMAP hOldBmp = (HBITMAP)SelectObject(memDC, hBmp);

    // スケーリングされたサイズを使用
    SIZE size = {scaledWidth, scaledHeight};
    POINT ptSrc = {0, 0};
    BLENDFUNCTION bf = {AC_SRC_OVER, 0, 255, AC_SRC_ALPHA};
    
    // ウィンドウ位置を設定（オプション：ウィンドウを画面中央に移動）
    int xPos = (screenWidth - scaledWidth) / 2;
    int yPos = (screenHeight - scaledHeight) / 2;
    SetWindowPos(hwnd, NULL, xPos, yPos, scaledWidth, scaledHeight, SWP_NOZORDER | SWP_NOACTIVATE);
    
    // レイヤードウィンドウを更新
    UpdateLayeredWindow(hwnd, hdcScreen, NULL, &size, memDC, &ptSrc, 0, &bf, ULW_ALPHA);

    // クリーンアップ
    SelectObject(memDC, hOldBmp);
    DeleteDC(memDC);
    ReleaseDC(hwnd, hdcScreen);
    delete pBitmap;
    DeleteObject(hBmp);

    // メッセージループ
    MSG msg = {};
    while (GetMessage(&msg, NULL, 0, 0) > 0)
    {
        TranslateMessage(&msg);
        DispatchMessage(&msg);
    }

    // プログラム終了時にGDIライブラリを閉じる
    Gdiplus::GdiplusShutdown(gdiplusToken);

    return 0;
}
```
