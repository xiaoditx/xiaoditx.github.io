---
next: docs/KeyBonk/makefilehelper
---

<!-- markdownlint-disable -->

<div align="center">

<img alt="LOGO" src="https://raw.githubusercontent.com/xiaoditx/KeyBonk/refs/heads/master/resource/icon.png" width="256" height="256" />

# Sound Keyboard - KeyBonk

V 1.3.0.1 Basic Version

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
    <a href="#development-information">Contributor Help Information</a>
</div>
<br>

<!-- markdownlint-restore -->

A C++ version reconstructed from the 4.0 version of the only decent software I've ever made, "Kunyin Keyboard". The original version's source code was made public but not uploaded to GitHub because it was an Easy Language project, and the source code was just one file, so it seemed unnecessary to put it on GitHub (plus GitHub doesn't recognize Easy Language by default, although we could set it manually, but I don't like that).

### Reconstruction Changes

The reconstruction switched the language to C++, which improved runtime efficiency. It also abandoned the extremely stupid method of using registered hotkeys and instead used keyboard hooks as the monitoring method.

This is my first project with Win32 development, so it's just for practice. I hope everyone likes it.

### Installation

Software installation packages are available on the [Release](https://github.com/xiaoditx/KeyBonk/releases) page. Please choose the version you want; the recommended version is the one before the latest version.

The software only supports Windows and provides both 64-bit and 32-bit versions.

### Usage Instructions

Open the software, and it will monitor keystrokes. By default, it detects the four keys `j`, `n`, `t`, `m`, and plays corresponding audio when pressed.

Audio files are located under `./bin/default/audios`, and the file names are the virtual key values of the keys you want to monitor plus ".wav" (only wav is supported). For virtual key values, you can use the tool I used in BeepMusic: [Key Value Query Tool](https://github.com/xiaoditx/BeepMusic/tree/main/tools/XD%E5%BC%80%E5%8F%91%E5%B7%A5%E5%85%B7-T1). You can also refer to the [Microsoft documentation](https://learn.microsoft.com/en-us/windows/win32/inputdev/virtual-key-codes).

Background files can be changed. The simple way is to replace `./bin/default/background.png` with your own image. Currently, only png has been tested to work. The current version does not support automatic image size detection and does not support custom color filtering (the current version sets the color with decimal color code 13217535 as transparent).

You can create your own folder (recommended as a subfolder of `./bin/`), build an audios folder inside it, and place background.png there. To make the software recognize this folder, the only effective method in the current version is to modify config.ini and add the following at the end of the file:

```text
[settings]
lib=(the path to your own created folder, such as .\bin\default)
```

### Development Information

Project documentation: [docs](./docs)

Software technology stack

- win32
- C++17
- GDI+
- ~~COM library~~ (planned to be introduced)

Development environment

- Windows10-x64
- MSYS2 (MingGW64)
- VScode
- GNU Make (4.4.1)

## Contributors

Thanks to the community contributors (actually, there are none yet)

<a href="https://github.com/xiaoditx/keybonk/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=xiaoditx/keybonk" />
</a>

## Project Statistics

<a href="https://www.star-history.com/#xiaoditx/keybonk&type=date&legend=top-left">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=xiaoditx/keybonk&type=date&theme=dark&legend=top-left" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=xiaoditx/keybonk&type=date&legend=top-left" />
   <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=xiaoditx/keybonk&type=date&legend=top-left" />
 </picture>
</a>

![Alt](https://repobeats.axiom.co/api/embed/148eacdfa3e1268ce951923b74ab7f6ed8d8a9e7.svg "Repobeats analytics image")