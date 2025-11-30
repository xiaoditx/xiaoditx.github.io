---
title: "如何从一无所有配置一台编程+日常环境完善的电脑（软件环境）"  # 文章标题
draft: falte  # 是否为草稿。设为 false 才会发布
data: 2025-11-01
description: "电脑开荒不知道安什么软件？学习编程不会配环境？一篇文章介绍大量常用软件的配置"  # 文章摘要
tags: ["软件", "环境配置"]  # 文章标签，用于分类和关联
categories: ["计算机技术零基础到精通"]  # 文章分类
comments: true
date: 2025-11-01
authors:
  - name: xiaoditx
    link: https://github.com/xiaoditx
    image: https://github.com/xiaoditx.png
---

## 开始之前

这篇文章的主要目的是为了让我自己能够在切换到新的设备时能够更快的配置好编程环境，颇有备忘录之感，文章内容有时也会因此省略一些说明，我将会尽量避免一些意义不明的操作，如果还有，请各位在评论区提醒

由于我个人没有真正用过Linux系统，也没钱买Mac，当前的文章版本是仅限Windows的，后期可能会有Linux的内容，但更有可能会先有Android尤其是HamonyOS早期版本的配置内容，到时候会以文章链接的形式呈现

- 对于含有流氓软件的电脑，参阅[删除广告软件的实用建议](#删除广告软件的实用建议)

- 对于不知道怎么在专业性强的软件官网或者GitHub开源页面选择安装包的，参阅[版本选择的相关问题](#版本选择的相关问题)

- 对于虚拟机等使用场景，可能并不值得购买微软一些产品的密钥，此时需要激活工具，请参阅[微软的激活相关话题](#微软的激活相关话题)

- 对于SOURCEFORG下载速度慢的，请参阅[sourceforg的提速策略](#sourceforg的提速策略)

## 一.社交软件

新电脑一定要有社交软件，在国内，QQ、微信尤为重要

使用下面的链接跳转到官网，点击对应下载按钮下载安装包，打开后使用

- [QQ Windows端](https://im.qq.com/pcqq/index.shtml)
- [微信Windows端](https://pc.weixin.qq.com/)
- [其他平台下载QQ请从首页进入](https://im.qq.com/index/)
- [其它平台下载微信请从首页进入](https://weixin.qq.com/)

## 二.浏览器

有些电脑可能默认携带360等浏览器，或者有些只是带了IE，这都是很影响使用体验的，建议卸载360等用户体验异常糟糕的浏览器，停用IE等老式的浏览器

请参照个人电脑内已有的浏览器，选择安装如下的浏览器，按照推荐顺序由高到低排列

- [Edge](https://www.microsoft.com/zh-cn/edge/download?form=MA13FJ)浏览器，最推荐的也是与Widnows最契合的浏览器
- [Chrome](https://support.google.cn/chrome/answer/95346?hl=zh-Hans&co=GENIE.Platform%3DDesktop)浏览器，注意这个链接貌似不怎么管用，国内连不上Google因此只能和Bing不是很完美的契合在一起
- [夸克](https://b.quark.cn/apps/qkhomepage_twofoufeb/routes/model?entry=sem_inmobibingsempckk_brand_53&ch=sem_inmobibingsempckk_brand_53&image=brand&dp=&planid=485943778&unitid=1240250186836110&a_keywordid=77515979068562&a_creative=77515770040312&a_matchtype=e&a_keyword=%E5%A4%B8%E5%85%8B%20%E6%B5%8F%E8%A7%88%E5%99%A8&query=%E5%A4%B8%E5%85%8B%E6%B5%8F%E8%A7%88%E5%99%A8&from=bingsem&aid=151708281&msclkid=d1880d59dd4b1240743065b2b56d2bf0)浏览器，考虑到有时可能会用到夸克网盘进行文件下载，预先安装夸克是明智的
- [360极速浏览器](https://browser.360.cn/ee/)，不同于360安全浏览器，采用了相对简洁的风格，由于我很久没用了，不确定安装会不会引入广告，因此不建议新人尝试，官网右上角有一个极简版下载链接，貌似是一个很好的版本

## 三.网盘

有些网盘十分烦人的要求必须使用客户端，所以我们有时也需要妥协，毕竟有时做资源分享的会使用各种不同网盘（我曾经有一段时间不想下载任何网盘，结果为了下一个软件找了两个小时最后才在一个搜盘工具里找到）

可以考虑电脑实际容量和个人情况装对应的网盘，这些软件的安装相对简单：

- [百度网盘](https://pan.baidu.com/download#win)
- [123云盘](https://www.123pan.com/Downloadclient?type=App)
- [阿里云盘](https://www.alipan.com/)

## 四.音乐

音乐只推荐一个[lx-music](https://github.com/lyswhut/lx-music-desktop/releases )，软件开源免费，没有任何VIP限制，全网资源都能下载使用，只不过安装步骤有点麻烦

> [!note]
> 这个软件还有手机版，不过貌似不能支持本地音乐，或者说支持的不大好

首先，点开[软件的release页面](https://github.com/lyswhut/lx-music-desktop/releases )，找到合适的版本，参阅[版本选择的相关问题](#版本选择的相关问题)

下载到安装包，安装即可

此时打开软件，会发现音乐无法播放，这是因为这个软件被腾讯法国律师函，因此不敢提供音源，只能做一个壳子，真音源需要自己找

点入设置，找到“自定义源管理”，选择在线导入，然后从下面的三个链接指向的文章中找到一个能连上的复制进输入框，点击导入，确定后勾上便可以使用了

- [洛雪音乐源](https://awaw.cc/post/lx-music-source)
- [洛雪音乐助手音乐源](https://github.com/piko017/-LX-luoxue_yinyuan/diffs/1?base_sha=6b35139b917e83ca770894406562d8e7c38b8c50&head_user=2061360308&name=master&pull_number=3&qualified_name=refs%2Fheads%2Fmaster&sha1=6b35139b917e83ca770894406562d8e7c38b8c50&sha2=f0e2cee0c021c17877b6d27646af70a4f2d9fe91&short_path=b335630&unchanged=expanded&w=false)
- [开源音乐播放器和音源分享（洛雪）](https://blog.csdn.net/qq_38869359/article/details/147562391)

音乐下载需要去单独设置

附带一张我设置好的lx的截图

![lx-music设置好的状态](/imgs/blogs/电脑开荒windows/lxmusic.png)

这个设置包含歌单可以从[网盘下载](https://wwxf.lanzouu.com/ing4X38t137c )，设置中有导入选项，不再赘述

## 五.系统工具

Windows的很多功能是很杂乱的，一些问题也没有很好的解决方案，所以就需要引入一些软件去管理，有些人可能会选择360系列，但与之相对应的，广告会十分泛滥

我们需要引入一些安全的、无广告的且方便的软件：

首先是国内安装比较方便的、产自较知名公司的软件产品（我个人喜欢腾讯的，不图别的，就因为有一个“解除文件占用”）

- [腾讯电脑管家](https://guanjia.qq.com/)
- [微软电脑管家](https://pcmanager.microsoft.com/zh-cn)

两者都是非常简单的点下载就行，但是后者是打开的微软商店，因此安装步骤很简洁，不过不会默认创建快捷方式，需要去开始菜单寻找

下面是一些不好安装的，我将会详细的讲解安装步骤

### FixWin

首先打开下载页面（好像是篇文章？）：[FixWin 11 is the best PC Repair software to fix Windows 11/10 problems](https://www.thewindowsclub.com/fixwin-windows-pc-repair-software)

打开后，忽视所有废话，向下滑找到“Download FixWin”，一般来讲伴随着一个蓝色的按钮，点击即可下载一个zip文件，解压后就可以使用了

### Yasb

这个软件是一个开源软件，开源在[Github](https://github.com/amnweb/yasb)，其用途是改善状态栏

可以通过开源页中的命令获取软件，当然，你也可以使用开源页右侧栏目中的Release选项下载msi版本。软件安装时注意字体问题，开源页中有过讲解，你需要先行下载支持的字体

这里有[一篇安装的介绍文章](https://x1g.la/yasb.html)，我当时就是看的这个文章安装的

### ZyperWin++

[ZyperWin++](https://github.com/ZyperWave/ZyperWinOptimize?tab=readme-ov-file)是一个Windows优化工具，可以一键式的优化Windows的各项问题，同样是在Release中选择适当的版本，然后安装，软件操作很简单，所以不再详细说明。

## 六.视频工具

### 1.唧唧down

打开[官方网站](https://client.sabe.cc/installation/windows/)，点击“JiJiDownCore 文件列表”，`选择JiJiDownCore-win64.exe`

> [!note]
> 这个网站不保证安全性，因为我是两年前下的，之后没管过，当时并没有官方网站，所以这个只能存疑（说白了就是我懒得查证了，那个安装包我都懒得运行，嘻嘻）

### 2.downkyi

唧唧down下不了的downkyi就不一定，前者提供了高清画质，后者提供最后保证（额两年前是这样的，现在不知道）

这是官方[Release页面](https://github.com/leiurayer/downkyi/releases)，在最新的版本中点开`Assets`，然后选择其中的zip下载就好

### 3.oCam

强大的录屏软件，我的大多数视频都是它录的，不过这玩意在国内搜出来的网站要么就是软件园，要么就是下不了，要么就是压根连不上，总之很难装（真不知道我小学是怎么折腾到这玩意的安装包的）

感谢[CSDN上的一篇博客](https://blog.csdn.net/u010942212/article/details/149294104)提供了安装包（虽然我没有亲自检验，但大概可行），这个链接是夸克网盘的，你看，我在[浏览器](#二浏览器)那边说了什么来着，夸克会派上用场的

当然当然，如果你没有，我帮你传到蓝奏云了，这玩意不需要账号也不需要什么客户端：[跳转蓝奏云](https://wwxf.lanzouu.com/b00jetb70h)，密码是`7bb4`（这玩意没VIP居然无法取消文件夹密码）

### 4.OBS-studio

一款直播软件，兼有录屏功能，可以搞一些画面实时合成的活，想要下载，首先点开[这玩意的官网](https://obsproject.com/zh-cn/download)，不过我被一个假的官网戏耍了一次，所以不大放心，这里还是给一下GitHub仓库为妙：[GitHub](https://github.com/obsproject/obs-studio)（你可以自己去找release）

### 5.剪映专业版

很出名了，不过VIP横行，不建议使用，我主要是因为有几个功能用得顺手才留着的，下载很简单，开[官网](https://www.capcut.cn/)找下载就行

### 6.必剪

B站的剪辑工具，和B站绑定的很紧

搜的时候我都快笑死了，满屏剪映广告，还有一个金山软件管家做的假官网

官网链接[放这里了](https://bcut.bilibili.cn/)，点开下载

### 7.小丸工具箱

这个玩意还是当时B站推荐的，我个人用的很少，不过有的时候很实用的来着

主要作用就是把视频音频什么的压到一起或者分离

[跳转至官网下载](https://maruko.appinn.me/)

### 8.来自设备制造商的HEVC视频扩展

严格来讲这不叫软件，算是个补丁（吧？），微软官方很多软件不支持HEVC视频格式，包括但不限于官方播放器、浏览器，所以有些视频是放不了的，因此需要装HEVC视频扩展

但是这个牢微不讲武德，直接收费六块人民币，于是便有了如下一招：来自设备制造商的HEVC视频扩展

这玩意起初是微软给设备制造商用的，设备制造商买过了这个扩展，用户不需要再次支付，而是可以直接通过这样一个特殊版本享受扩展，但微软又有一个我不知道是干什么的网站可以下载静态的文件，就导致我们可以直接拿到扩展文件

这是[我拿到的版本的文件链接](https://wwxf.lanzouu.com/iFSHE39d5fja)

下载后双击选择安装即可，如果不行，则需要上网探寻了，这就不再本文讨论范围之内了（人话就是这文章我赶不完了）

### 9.PotPlayer

PotPlayer是一款极为强大的视频播放器，在播放器这个领域它基本上算得上是最权威的了，不过国内也难找官网：[官网链接](https://potplayer.tv/?lang=zh_CN)

### 10.VLC media Player

很老的一款视频播放器，功能也还行，依旧[官网下载](https://www.videolan.org/vlc/index.zh_CN.html)

### 11.Mediainfo

这个算是很强的一个软件了，可以查看视频文件的视频格式编码等信息，展示的各种内容都很详细，如果遇到视频损坏等问题，可以先用Mediainfo取一下视频信息再去找AI，效率会相当之高

还是点入[官网下载链接](https://mediaarea.net/zh-CN/MediaInfo/Download/Windows)，但是相对就比较难找到合适的版本了，可以跟着我来：

首先看`Version`，你用的是什么系统就选择那一栏，最后向右看到`Architecture`，这里根据自己的电脑系统位数判断，一般电脑都是64位，如果不知道，可以在[版本选择的相关问题](#版本选择的相关问题)板块中学习如何查看（哦对了，如果你实在不知道选什么，就选那个`Universal installer`，那玩意是个通用选项）

找到合适位数后，找到右边的`GUI`字样，如果你选择的是`Universal installer`则可以直接向右边点链接了，如果不是，则需要点**64 bit only installer**，这样就能下到安装包了

### 12.ffmpeg

ffmpeg属于一个非常知名且重要的软件了，它值得称得上是音视频处理领域的**最强软件**，几乎所有的视频平台、软件都会使用它的功能，比如bilibili、抖音

日常使用上，它可以提供优秀的转码操作，也能处理某些特定的音视频文件，它可以和[Mediainfo](#11mediainfo)组合使用用于视频格式等修正，因此在遇到视频问题需要求助AI或网友时，可以提供条件：**我已安装ffmpeg**

其下载可以在[Github release页面](https://github.com/BtbN/FFmpeg-Builds/releases)进行，一般选取**ffmpeg-master-latest-win64-gpl-shared.zip**，你也可以去[gyan.dev](https://www.gyan.dev/ffmpeg/builds/)下载，但限于篇幅将不再介绍详细流程

### 13.FFmpegFreeUI

前面讲了FFmpeg功能强大，但是属于控制台程序，只能在命令行中使用，下面的软件可以为其安装UI：[FFmpegFreeUI](https://github.com/Lake1059/FFmpegFreeUI)

该软件简称为3FUI，详细安装请见开源页介绍（看得出来原作者很讨厌新手，怕是被问烦了）

## 七.技术

哎呀，终于进领域了，我等待这一刻多时了，技术方面可以谈的那就真的太多了

### 1.开发工具

#### 1.1.Make

Make\.exe是一个知名的构建工具，用于软件项目的自动构建，可以在官网上看到详细的介绍：[Make - GNU Project - Free Software Foundation](https://www.gnu.org/software/make/)

从官网找到合适的下载页面似乎很困难，这里我已经预先的找好了window版的下载页面：[window版的下载页面](https://sourceforge.net/projects/gnuwin32/)，点击**download**即可

#### 1.2.CMake

Make是自动构建工具，但它的版本非常古老，有时并不能很好的适应大型软件的开发需求，此时，CMake就可以派上用场了。

CMake是**跨平台**构建工具，能自动生成适配系统的构建文件比如Makefile，可以很好的简化编译安装流程

安装CMake，可以经过官网：[CMake - Upgrade Your Software Build System](https://cmake.org/)

在官网中，点入**download**，向下滑看到window的软件版本列表，通常的，我们选择**Windows x64 Installer**，点击右边的链接即可下载

#### 1.3.Git

Git在开源领域是必不可少的领域，工作中也是必要的软件，用于版本控制

安装很简单，但是选项很多且都是英文，新手很容易绕晕，所以这里给大家贴一篇文章，我第一次安装Git就是跟着这一篇走的：[Git 详细安装教程（详解 Git 安装过程的每一个步骤）_git安装-CSDN博客](https://blog.csdn.net/mukes/article/details/115693833)

我这边也做了个配置指南生成网站：[Git安装配置指南 - 交互式配置工具](https://xiaoditx.github.io/pages/InstallGit/)，可以参考着安装

#### 1.4.Vim

vim是一款强大的文本编辑器，不过褒贬不一，喜欢的人特别喜欢甚至不肯换任何其他的编辑器，不喜欢的则极力排斥（当然，我属于中间地带）

Vim的主要功能都是靠键盘完成的，据说能够提升效率（虽然我目前只在Git操作时感受到了一些便捷性），它是一个终端软件，也就是跑在命令行上的，所以很建议安装一个[Terminal](#110终端（Terminal）)

官网安装界面是：[download : vim online](https://www.vim.org/download.php)

但是Windows的安装似乎更应该从GitHub下载：[Releases · vim/vim-win32-installer](https://github.com/vim/vim-win32-installer/releases)

关于vim的配置方面，后期可能会单独写文来介绍的，有些复杂，这里不展开了

#### 1.5.VScode

VScode是很出名的编辑器了，轻量化可扩展，算是我现阶段最爱的编辑器，没有之一

下载直接去官网：[Visual Studio Code - The open source AI code editor](https://code.visualstudio.com/)，点哪个中间的下载按钮就行

你也可以去VSc的在线版：[Visual Studio Code](https://vscode.dev/?vscode-lang=zh-cn)

#### 1.6.Visual Studio

Visual Studio是一款非常强大的编程软件，提供了IDE、编译器等各种内容，软件包比较大，性能要求也比较高

官网提供了免费的社区版，付费的版本对于个人开发者而言意义不大所以直接下载社区版就行：[Visual Studio: 适用于软件开发的 IDE 和代码编辑器](https://visualstudio.microsoft.com/zh-hans/)

软件安装不是直接运行安装包，官网下载的是一个专用的下载器，这是因为VS支持很多语言，全部安装也能到100GB左右不是所有电脑都能吃的消的，会在专用下载器上进行选择安装，因此下载到的安装包安装好后需要进入第二步安装，这里不再赘述，可以自行上网查阅相关教程

#### 1.7.VMware

VMware是一款虚拟机软件，用于病毒测试等领域

**该软件付费，需要自行购买密钥**，当然你也可以找免费密钥

官网链接：[VMware by Broadcom - Cloud Computing for the Enterprise](https://www.vmware.com/)，具体安装流程我忘了，自行查找吧

#### 1.8.Visual Box

visual box和VMware差不多，也是虚拟机，不过它是开源的，所以不需要付费

到官网就能下载安装，不再展开：[Oracle VirtualBox](https://www.virtualbox.org/)

#### 1.9.MarkText

MarkText是一款markdown编辑工具，一般用来写readme正好合适（不过在html代码等内容的处理方面相对逊色）

这软件好像很久没更新了，不过markdown语法又没什么大变化，所以照常用

软件在GitHub开源：[marktext/marktext: 📝A simple and elegant markdown editor, available for Linux, macOS and Windows.](https://github.com/marktext/marktext)

marktext貌似没有官方中文，所以这里找到了一个中文版本：[首页 | MarkText中文特别版/汉化版](https://marktext.weero.net/)，具体怎么样我也不知道，没用过，读者用过的可以在评论中反馈

> [!note]
> 
> 我好像是用的原版软件但安的汉化插件，有点久远了想不起来也懒得查证了

#### 1.10.Notepad++

notepad++是一款编辑器，比较轻量化，有时候工作量很小的话用起来很顺手，我一般会用它改配置文件

GitHub：[notepad-plus-plus/notepad-plus-plus: Notepad++ official repository](https://github.com/notepad-plus-plus/notepad-plus-plus/)

另外我还看到有一个中文网站，是否是安全的下载方式姑且存疑：[Notepad++下载 - Notepad++](https://cn-notepadplusplus.com/downloads/)

我不清楚这个软件有没有中文，我记得当时我是直接从某某软件园下载的

#### 1.11.终端（Terminal）

终端是微软开发的工具，默认将cmd和powershell集成到了里面，也就是相当于一个美化软件同时也提供了很多现代化的功能，你可以通过它来将各种终端集成在一起比如Git bash、乌班图终端

安装很简单，直接微软商店就行了：[Windows Terminal| Microsoft Store](https://apps.microsoft.com/detail/9N0DX20HK701?hl=zh-cn&gl=CN&ocid=pdpshare)

#### 1.12.Inno Setup

Inno Setup是用于制作软件安装包的简单工具，语言自由度很高（虽然我一般都是直接用GUI向导解决）

官网安装包下载：[Inno Setup Downloads](https://jrsoftware.org/isdl.php)

打开后翻到Current Release栏目，下面应该有个蓝条条写着`filename`之类的东西，在右边的`download sites`选一个下载节点（随便哪个都行，有快有慢不过这两个节点在中国没啥区别）

![节点选择](/imgs/blogs/电脑开荒windows/download.png)

下载下来后，会发现软件安装时没有中文选项，这就意味着需要面对着英语界面去开发，如果英语不好简直是折磨，不过问题不大，简体中文只是没有官方翻译，但官方同样在官网上提供了非官方的翻译版本，只是因为不知道质量没有默认自带，需要手动单独安装

官方的翻译页面：[Inno Setup Translations](https://jrsoftware.org/files/istrans/)

打开后，一直下翻到**Unofficial translations**板块，在最左侧栏目找到`Chinese (Simplified)`，然后点击第三栏（download）对应的链接，有时候网络不是很好，会显示*Request:An error occurred while sending the request.*，这里提供一个替代的链接：[下载5.6.0+](/txts/blogs/电脑开荒windows/ChineseSimplified.isl)

文件内容复制到安装目录下的`Default.isl`中即可

> [!note]
> 
> 我似乎用的是另一版翻译，具体从哪来的我自己也不是很清楚，好想是某某下载园，我把我的default.isl放在下面的链接里了：[另一个版本](/txts/blogs/电脑开荒windows/Default.isl)

### 2.游戏开发

游戏开发工具我了解的不算多，也就几个，早些年研究游戏开发，现在也都抛弃了

这里只给出GM和Godot这两个比较轻量化的游戏引擎，其它的姑且不谈（那种复杂的玩意我应该一辈子也不会学着去用）

#### 2.1.GameMaker

GameMaker现在转型成为免费软件了，可以直接从steam下载，steam安装参照本文：[十一.1.steam](#1steam)

你也可以从官网下载[Make 2D Games With GameMaker | Free Video Game Maker](https://gamemaker.io/zh-CN)

#### 2.2.Godot

Godot是一款使用简单的游戏引擎，相对于GameMaker，我反而更偏好Godot，下面是官网链接：

[Godot Engine - 免费开源的 2D 与 3D 游戏引擎](https://godotengine.org/zh-cn/)

### 3.软件逆向与调试

-------

> [!note]
> 
> 今天先写到这里

#### 3.1.x64dbg

#### 3.2.ollydbg

#### 3.3.Resource Hacker

#### 3.4.GARbro

#### 3.5.Cheat Engine

### 4.语言环境

#### Python

#### Dev-C++

#### MSY32

### 5.其他软件

#### 5.1.Bz

Bz是一个开源的二进制编辑器，不过不是很出名（虽然使用范围也不是很广），可以直接编辑很多文件的二进制内容，这玩意好像是很古早的软件了来着，并没有找到官网，可以从[我传的网盘版本](https://wwxf.lanzouu.com/iSa3F39eqm3i)中下载

### 5.2.wireshark

## 八.办公软件

## 九.U盘/磁盘/移动硬盘工具

## 十.桌宠

## 十一.游戏环境

### 1.Steam

先下载**steam**，来到[steam下载页面](https://store.steampowered.com/about/)，找到下载按钮，下载并安装

> [!note]
> 具体安装教程不赘述，可以查阅[我在B站上公布的教学](https://www.bilibili.com/video/BV1whsLeNEgp/)

针对网络加速，直接在微软应用商店下载Watt tools即可，当然也可以从官网下载exe版本，详情请见[我在B站的视频](https://www.bilibili.com/video/BV1whsLeNEgp/)

### 2.PCL2

前往[PCL2的官网](https://afdian.com/a/LTCat)可以下载PCL2的文件，注意无需捐款，在捐助选项左侧的是下载链接。

### 3.Epic

下载Epic（为了领取喜加一OvO），打开[官网](https://www.epicgames.com/site/zh-CN/home/)下载安装即可

### 4.桌宠

先在Steam下载虚拟桌宠模拟器，然后去GitHub下载[BongoCat](C:\Program Files\BongoCat)，最后下载[Neuro的桌宠](https://wwxf.lanzouu.com/ijb7G3885kxi)

## 十二.加速工具

## 十三.其他工具

## 常见问题的相关讨论

### 删除广告软件的实用建议

对于没有电脑基础的人，对付360等软件可能毫无还手之力，此时可以以毒攻毒，使用360软件管家可以直接一键调出各种软件的卸载程序，写在过程需要留心，不要点到误导性的选项，一般都是寻找“继续卸载”、“狠心卸载”，这些文字不会很显眼，甚至可能藏在窗口一角作为小字呈现

360软件管家的卸载逻辑和微软的程序管理工具的卸载逻辑一致，都是寻找程序的卸载程序，通常是`uninstall.exe`

另外，文章中提及的腾讯电脑管家自带软件管理，可以直接理解为360不流氓版

我还找到了一个软件，貌似是卸载用的，不过我没细看，感兴趣的可以自行体验一下：[GeekUninstall](https://geekuninstaller.com/)

### 微软的激活相关问题

还没写，我忘了的话提醒我一下

### 版本选择的相关问题

对于GitHub的开源软件，安装包大多都会放到Release中，大型项目往往有不同版本来对应不同版本的系统

对于一些专业性强的软件，其官网上提供了大量不同版本的安装包，一般会有`download`字样导向对应内容

为Windows系统安装软件，应当寻找带有`windows`、`win`字样的文件，或者直接寻找exe、msi文件；对于windows11，只要选择x64即可，对于其他系统，建议去（此处可能有差异，本文参考win10）**桌面\-\>右键此电脑\-\>属性\-\>设备规格\-\>系统类型**检查系统类型，通常为64位（x64）、32位（x86）和ARM64

有时，安装程序会和各种内容参杂，很难辨识，我们可以去找`install`字样

## sourceforg的提速策略

一些历史悠久的开源软件会开源到sourceforg，这个平台提供了下载服务，你可以在对应软件的下载页点击**download**进行下载，但是这个网站某些时候速度很慢（起码我以前是这样的），是因为网站在提速时只考虑了地缘距离，将中国大陆的请求自动匹配到了台北的服务器，因此，解决速度问题，只要不采用自动连接策略即可。

在下载软件的页面，有一个倒计时，结束后会开始下载，此时，如果发现速度过慢，可以点击倒计时下方的`Problems Downloading?`，随后会弹出一个服务器列表，左边是名称，右边是地理位置，只要不选右边带有`Taipei`字样的即可。（建议是`OnboardCloud (Singapore, Singapore, SG)`)
