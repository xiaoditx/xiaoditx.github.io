---
title: "makefile Helper"
---

```
DesktopDanmaku Makefile Help

Basic Usage:
  make [target] [options]

Build Targets:
  all (default)   - Build DEBUG version (64-bit)
  debug        - Build DEBUG version (64-bit)
  run          - Build and run the program (default 64-bit)
  clean        - Clean all build files
  help         - Display this help message

Release Version Targets:
  release      - Clean and build all release versions (64-bit and 32-bit)
  release64    - Build 64-bit release version
  release32    - Build 32-bit release version

Installer Targets:
  installer    - Clean and build all installers (64-bit and 32-bit)
  installer64  - Build 64-bit installer
  installer32  - Build 32-bit installer

Build Options:
  ARCH=32      - Build 32-bit version
  ARCH=64      - Build 64-bit version (default)
  DEBUG=1      - Build DEBUG version (default)
  DEBUG=0      - Build RELEASE version

Build Examples:
  make            - Build 64-bit DEBUG version
  make ARCH=32    - Build 32-bit DEBUG version
  make DEBUG=0    - Build 64-bit RELEASE version
  make run        - Build and run the program

Build Directory Structure:
  build/64/debug/     - 64-bit DEBUG version
  build/32/debug/     - 32-bit DEBUG version
  build/64/release/   - 64-bit RELEASE version
  build/32/release/   - 32-bit RELEASE version

Notes:
  - Installer building requires Inno Setup tool
  - This project uses UTF-8 encoding
```