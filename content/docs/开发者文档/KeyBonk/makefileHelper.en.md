---
title: "makefile Help"
---

```
[makefile Help]
Default mode: 64-bit debug mode

Available targets:
all clean help run release release64 release32 installer installer64 installer32

Target functions:
	- all: Build the project in default mode
	- clean: Delete all build files
	- help: Display this help message
	- run: Run the built executable
	- release: Build 64-bit and 32-bit release versions
	- release64: Build 64-bit release version
	- release32: Build 32-bit release version
	- installer: Build 64-bit and 32-bit installers
	- installer64: Build installer for 64-bit release version
	- installer32: Build installer for 32-bit release version

Controllable variables:
DEBUG ARCH
Notes:
	- DEBUG: Set debug parameter for cpp file compilation, default is -DKB_DEBUG
	- ARCH: Current compilation architecture (32/64-bit)

Help written on: 2026/2/9 17:02

```