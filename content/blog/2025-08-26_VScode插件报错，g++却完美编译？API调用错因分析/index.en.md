---
title: "VScode Plugin Reports Error, but g++ Compiles Perfectly? Analyzing the Cause of API Call Errors"  # Article Title
draft: false  # Is it a draft? Set to false to publish.
description: "Using WritePrivateProfileString, VScode immediately reports an error, but g++ compiles it directly? We must analyze this."  # Article summary
tags: ["Development Tools", "C++", "Error Analysis"]  # Article tags, for categorization and association
categories: ["Code: Pitfall Diaries"]  # Article category
date: 2025-08-26
authors:
  - name: xiaoditx
    link: https://github.com/xiaoditx
    image: https://github.com/xiaoditx.png
---

> [!note]
> This page uses AI technology for translation. The content is for reference only.

A while ago, I wrote a [small application](https://github.com/xiaoditx/BeepMusic) and wanted to add a read/write configuration function. Having only learned C++ for a few days, I searched online for a long time and found two Windows APIs: `GetPrivateProfileString` for reading INI files and `WritePrivateProfileString` for writing them. Following online tutorials, I wrote these three lines:

```cpp
    LPTSTR lpPath = new char[MAX_PATH];
    strcpy(lpPath, ".\\config.ini");
    ::WritePrivateProfileString("config", "t", "120", lpPath);
```

Right after writing, the plugin in VScode instantly flagged it in red and gave the following error:
![VScode plugin error](/imgs/blogs/VScode报错，g++通过，GetPrivateProfileString/184a967e89d542c3be6e63b16667e2a3.png)
But I was sure I followed the tutorial exactly. So where was the problem?

I tried to compile it, and the result was surprising: g++ compiled successfully without any errors and created `config.ini` in the current directory, writing the specified content.

![g++ compilation result](/imgs/blogs/VScode报错，g++通过，GetPrivateProfileString/83ab9c632d1e463596644c4afcc60d14.png)

This was strange. Time to check the official documentation.

I went to MSDN and searched for `WritePrivateProfileString` but couldn't find it. I only found `WritePrivateProfileStringA` and `WritePrivateProfileStringW` (both have an extra letter at the end).

![MSDN related content](/imgs/blogs/VScode报错，g++通过，GetPrivateProfileString/9e5fe8e0a5074f0ba5d570c9a3ef2023.png)

No choice, I clicked on one to check. I chose `WritePrivateProfileStringA`. Hmm, the parameter types seemed wrong. The tutorial used `LPTSTR`, but here it specified `LPCSTR`.

Scrolling down, below the `Example` section, I saw a note:

> The winbase.h header defines WritePrivateProfileString as an alias which automatically selects the ANSI or Unicode version of this function based on the definition of the UNICODE preprocessor constant. Mixing usage of the encoding-neutral alias with code that is not encoding-neutral can lead to mismatches that result in compilation or runtime errors. For more information, see Conventions for Function Prototypes.

This means `WritePrivateProfileString` is not the API's real name; it's selected conditionally.

Back in VScode, I held Ctrl and clicked on `WritePrivateProfileString` to see the content in `Windows.h`:

```cpp
#ifdef UNICODE
#define WritePrivateProfileString  WritePrivateProfileStringW
#else
#define WritePrivateProfileString  WritePrivateProfileStringA
#endif
```

VScode showed that the upper condition was active, proving that the `UNICODE` macro was defined in VScode's environment.

![Conditional compilation](/imgs/blogs/VScode报错，g++通过，GetPrivateProfileString/389e5b23cc314530822b326a0f848859.png)

Mystery solved! Because VScode had the `UNICODE` macro defined while g++ did not, the plugin checked the code against `WritePrivateProfileStringW`, expecting Unicode and a path stored in `wchar_t` (wide characters). When g++ compiled, it used `WritePrivateProfileStringA`, expecting ANSI and a path stored in `char` (regular characters). Thus, our code using `char` worked fine under g++ but failed the VScode plugin's check.

Therefore, our code was correct, but the plugin flagged it as an error due to the different environment. The solution is to explicitly specify that we want to use the `WritePrivateProfileStringA` function:

```cpp
    char* lpPath = new char[MAX_PATH];
    strcpy(lpPath, ".\\config.ini");
    ::WritePrivateProfileStringA("LiMing", "Sex", "Man", lpPath);
    delete[] lpPath;
```

And that's it. The annoying warning finally disappeared.

-----

**Appendix:** Specific meanings of LPxxxSTR data types

1.  **Core Base Types:**
    *   `CHAR`: Represents an **ANSI** (8-bit) character (`char`).
    *   `WCHAR`: Represents a **wide character** (Unicode, typically 16-bit UTF-16) (`wchar_t`).
    *   `TCHAR`: An **adaptive character type**. Compiles to `CHAR` or `WCHAR` based on project settings (whether the `_UNICODE` macro is defined). Used for writing code that can be compiled for either ANSI or Unicode.

2.  **String Pointer Types:**
    *   `LPSTR`: **Long Pointer to STRing**. Points to a null-terminated **ANSI** string (`CHAR*`).
        *   `typedef CHAR* LPSTR;`
    *   `LPWSTR`: **Long Pointer to Wide STRing**. Points to a null-terminated **Unicode** (UTF-16) string (`WCHAR*`).
        *   `typedef WCHAR* LPWSTR;`
    *   `LPTSTR`: **Long Pointer to TCHAR STRing**. Points to a null-terminated **adaptive character** (`TCHAR*`) string. Depending on the `_UNICODE` macro definition, it compiles to either `LPSTR` (ANSI) or `LPWSTR` (Unicode).
        *   `typedef TCHAR* LPTSTR;`

3.  **Constant String Pointer Types:**
    *   `LPCSTR`: **Long Pointer to Constant STRing**. Points to a null-terminated **constant ANSI** string (`const CHAR*`).
        *   `typedef const CHAR* LPCSTR;`
    *   `LPCWSTR`: **Long Pointer to Constant Wide STRing**. Points to a null-terminated **constant Unicode** (UTF-16) string (`const WCHAR*`).
        *   `typedef const WCHAR* LPCWSTR;`
    *   `LPCTSTR`: **Long Pointer to Constant TCHAR STRing**. Points to a null-terminated **constant adaptive character** (`const TCHAR*`) string. Depending on the `_UNICODE` macro definition, it compiles to either `LPCSTR` (ANSI) or `LPCWSTR` (Unicode).
        *   `typedef const TCHAR* LPCTSTR;`

**Key Differences Summary Table:**

| Type        | Character Width | Const-ness | Base Type Equiv (ANSI Build) | Base Type Equiv (Unicode Build) | Description                                          |
| :---------- | :-------------- | :--------- | :--------------------------- | :------------------------------ | :--------------------------------------------------- |
| **LPSTR**   | ANSI (8-bit)    | Non-const  | `char*`                      | `char*`                         | Pointer to ANSI string                               |
| **LPCSTR**  | ANSI (8-bit)    | **const**  | `const char*`                | `const char*`                   | Pointer to **read-only** ANSI string                 |
| **LPWSTR**  | Unicode (16-bit)| Non-const  | `wchar_t*`                   | `wchar_t*`                      | Pointer to Unicode (UTF-16) string                   |
| **LPCWSTR** | Unicode (16-bit)| **const**  | `const wchar_t*`             | `const wchar_t*`                | Pointer to **read-only** Unicode (UTF-16) string     |
| **LPTSTR**  | **Adaptive**    | Non-const  | `char*` (LPSTR)              | `wchar_t*` (LPWSTR)             | Pointer to adaptive string (TCHAR*)                  |
| **LPCTSTR** | **Adaptive**    | **const**  | `const char*` (LPCSTR)       | `const wchar_t*` (LPCWSTR)      | Pointer to **read-only** adaptive string (const TCHAR*) |

**Important Notes:**

1.  **`LP` Prefix:** "Long Pointer" is a historical artifact. In modern 32/64-bit systems, all pointers are "long." You can simply think of `LP` as "Pointer to."
2.  **`C` Suffix:** Means `const`. The content pointed to is read-only; the string cannot be modified through this pointer.
3.  **`T` Infix:** Means the type is `TCHAR`, which adapts based on the project's character set settings. This is for writing code that supports both ANSI and Unicode builds.
4.  **`W` Suffix:** Means "Wide," i.e., Unicode (UTF-16).
5.  **`STR` Suffix:** Means "String" (a NULL-terminated character array).
6.  **Modern Windows Development Practice:**
    *   **It is highly recommended to always use Unicode builds** (set "Character Set" to "Use Unicode Character Set" in Visual Studio project properties). This defines the `_UNICODE` macro.
    *   In Unicode builds:
        *   `TCHAR` = `WCHAR`
        *   `LPTSTR` = `LPWSTR`
        *   `LPCTSTR` = `LPCWSTR`
    *   Directly using `LPCWSTR`/`LPWSTR` or their aliases like `std::wstring` (in C++) is often clearer and avoids the ambiguity of the `TCHAR` family, unless you explicitly need to maintain legacy codebases that support both ANSI/Unicode.
    *   ANSI (`LPSTR`/`LPCSTR`) API functions often internally convert the string to Unicode and call the corresponding Unicode version, incurring performance overhead and potential character set conversion issues. Prefer using the explicit Unicode (W) version APIs.
7.  **Compatibility:** The `TCHAR` family exists mainly for compatibility with old Windows 9x systems (which primarily used ANSI) and modern NT systems (native Unicode). Modern development (Windows 2000 and later) should prefer Unicode.

**Simple Mnemonic:**

*   See `W` -> Unicode.
*   See `C` -> `const` (cannot modify string content).
*   See `T` -> Adaptive, changes to ANSI or Unicode based on project settings.
*   No `W` and no `T` -> ANSI.
*   No `C` -> String content can be modified (non-constant).
*   Has `C` -> String content is read-only (constant).

**Usage Advice:**

*   New projects: **Always enable Unicode build (`_UNICODE` defined)**. Prefer using `LPCWSTR` (input parameters) and `LPWSTR` (output parameters), or in C++, use `const wchar_t*` and `std::wstring`.
*   Maintaining old projects/needing ANSI compatibility: Use `LPCTSTR` (input) and `LPTSTR` (output) or the corresponding `TCHAR` base types, and ensure correct handling of the `_UNICODE` macro definition.
*   When interacting with Windows API, note that API functions usually have A (ANSI) and W (Wide/Unicode) versions (e.g., `MessageBoxA` and `MessageBoxW`). Using the generic macro `MessageBox` automatically selects the correct version based on `_UNICODE`. The passed string pointer types must also match (`LPCSTR` for A version, `LPCWSTR` for W version, `LPCTSTR` for the generic macro).
