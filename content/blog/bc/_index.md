---
title: "如何从一无所有配置一台编程+日常环境完善的电脑"  # 文章标题
draft: true  # 是否为草稿。设为 false 才会发布
data: 2025-10-19
description: "电脑开荒不知道安什么软件？学习编程不会配环境？一篇文章介绍大量常用软件的配置"  # 文章摘要
tags: ["软件", "环境配置"]  # 文章标签，用于分类和关联
categories: ["计算机技术零基础到精通"]  # 文章分类
comments: true
date: 2025-08-26
authors:
  - name: xiaoditx
    link: https://github.com/xiaoditx
    image: https://github.com/xiaoditx.png
---


## 开始之前

这篇文章的主要目的是为了让我自己能够在切换到新的设备时能够更快的配置好编程环境，颇有备忘录之感，文章内容有时也会因此省略一些说明，我将会尽量避免一些意义不明的操作，如果还有，请各位在评论区提醒

由于我个人没有真正用过Linux系统，也没钱买Mac，当前的文章版本是仅限Windows的，后期可能会有Linux的内容，但更有可能会先有Android尤其是HamonyOS早期版本的配置内容，到时候会以文章链接的形式呈现

对于含有流氓软件的电脑，参阅[删除广告软件的实用建议](#删除广告软件的实用建议)

对于不知道怎么在专业性强的软件官网选择安装包的，参阅[版本选择的相关问题](#版本选择的相关问题)

对于虚拟机等使用场景，可能并不值得购买微软一些产品的密钥，此时需要激活工具，请参阅[微软的激活相关话题](#微软的激活相关话题)

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
- [开源音乐播放器和音源分享\(洛雪\)](https://blog.csdn.net/qq_38869359/article/details/147562391)

音乐下载需要去单独设置

附带一张我设置好的lx的截图

![lx-music设置好的状态](/imgs/blogs/电脑开荒windows/lxmusic.png)

这个设置包含歌单可以从[网盘下载](https://wwxf.lanzouu.com/ing4X38t137c )，设置中有导入选项，不再赘述

## 五.系统工具

Windows的很多功能是很杂乱的，一些问题也没有很好的解决方案，所以就需要引入一些软件去管理，有些人可能会选择360系列，但与之相对应的，广告会十分泛滥

我们需要引入一些安全的、无广告的且方便的软件：

首先是国内安装比较方便的、产自较知名公司的软件产品

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

## 七.技术

哎呀，终于进领域了，我等待这一刻多时了，技术方面可以谈的那就真的太多了

### Bz
### CMake
### 游戏开发软件
#### GameMaker
#### Godot
### GARbro
### Git
### Vim
### Python
### Dev-C++
### MSY32
### debug工具
#### x64dbg
#### ollydbg
### VScode
### Visual Studio
### VMware
### Resource Hacker
### MarkText
### Notepad++
### 终端（Terminal）
### wireshark
### Inno Setup
### Cheat Engine





















## 一.游戏环境

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

## 二.编程环境

编程环境


## 常见问题的相关讨论

### 删除广告软件的实用建议

对于没有电脑基础的人，对付360等软件可能毫无还手之力，此时可以以毒攻毒，使用360软件管家可以直接一键调出各种软件的卸载程序，写在过程需要留心，不要点到误导性的选项，一般都是寻找“继续卸载”、“狠心卸载”，这些文字不会很显眼，甚至可能藏在窗口一角作为小字呈现

360软件管家的卸载逻辑和微软的程序管理工具的卸载逻辑一致，都是寻找程序的卸载程序，通常是`uninstall.exe`

另外，文章中提及的腾讯电脑管家自带软件管理，可以直接理解为360不流氓版

我还找到了一个软件，貌似是卸载用的，不过我没细看，感兴趣的可以自行体验一下：[GeekUninstall](https://geekuninstaller.com/)

### 微软的激活相关问题

### 版本选择的相关问题

对于GitHub的开源软件，安装包大多都会放到Release中，大型项目往往有不同版本来对应不同版本的系统

对于一些专业性强的软件，其官网上提供了大量不同版本的安装包，一般会有`download`字样导向对应内容

为Windows系统安装软件，应当寻找带有`windows`、`win`字样的文件，或者直接寻找exe、msi文件；对于windows11，只要选择x64即可，对于其他系统，建议去（此处可能有差异，本文参考win10）**桌面\-\>右键此电脑\-\>属性\-\>设备规格\-\>系统类型**检查系统类型，通常为64位（x64）、32位（x86）和ARM64

有时，安装程序会和各种内容参杂，很难辨识，我们可以去找`install`字样
