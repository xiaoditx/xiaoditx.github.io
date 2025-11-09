# Git安装配置指南

> [!note]
> 本项目基于kimiAI OK Computer功能制作，项目文件并没有特别大的改动，如有问题，可以提交PR修正

一个专为中文用户设计的交互式Git安装配置工具，通过直观的界面和详细的说明，帮助开发者轻松完成Git的个性化配置。

## 🌟 项目特色

- **智能问答系统** - 通过简单问题了解用户技术背景，自动推荐最佳配置
- **完整配置覆盖** - 涵盖Git安装过程中的所有14个主要配置选项
- **个性化指南生成** - 基于用户选择生成详细的安装步骤说明
- **现代化界面设计** - 支持浅色/深色主题，流畅的交互动画
- **多设备支持** - 完全响应式设计，支持桌面端和移动端

## 🚀 快速开始

### 在线使用

1. 访问项目网站：[Git安装配置指南](https://xiaoditx.github.io/pages/InstallGit/)
2. 选择配置模式（初学者模式或高级模式）
3. 按照引导完成配置选择
4. 生成并查看个性化安装指南
5. 按照指南步骤安装Git

### 本地部署

1. 克隆或下载项目文件
2. 在项目根目录启动本地服务器：
   ```bash
   # 使用Python
   python -m http.server 8000
   
   # 或使用Node.js
   npx serve .
   
   # 或使用PHP
   php -S localhost:8000
   ```
3. 在浏览器中访问 `http://localhost:8000`

## 📋 功能说明

### 配置模式

#### 初学者模式
- 通过3-4个简单问题了解用户技术背景
- 自动推荐最适合的配置选项
- 详细的选项说明和影响解释
- 适合Git新手和不熟悉命令行的用户

#### 高级模式
- 直接展示所有配置选项
- 快速配置界面
- 适合有经验的开发者
- 支持快速修改和自定义配置

### 配置选项

工具涵盖了Git安装过程中的所有重要配置选项：

1. **安装目录选择** - Git程序的安装位置
2. **默认编辑器** - Git使用的文本编辑器
3. **默认分支名称** - 新仓库的默认分支名
4. **PATH环境变量** - Git在系统中的可访问性
5. **SSH客户端** - 安全连接使用的SSH工具
6. **HTTPS传输后端** - HTTPS操作使用的库
7. **行尾符号转换** - 跨平台文件格式处理
8. **终端模拟器** - Git Bash使用的终端
9. **git pull行为** - 默认的代码合并方式
10. **凭证管理器** - 远程仓库登录凭证管理
11. **额外选项** - 文件系统缓存等高级功能
12. **实验性选项** - 测试中的新功能

### 导出功能

- **文本导出** - 生成纯文本格式的安装指南
- **配置导出** - 保存配置为JSON文件
- **打印支持** - 支持打印完整的安装指南

## 🛠️ 技术架构

### 前端技术栈

- **HTML5** - 语义化标记结构
- **CSS3** - 现代样式和动画效果
- **JavaScript ES6+** - 交互逻辑和状态管理
- **Tailwind CSS** - 实用优先的CSS框架
- **Anime.js** - 轻量级动画库

### 设计特色

- **响应式设计** - 适配各种屏幕尺寸
- **主题切换** - 支持浅色和深色模式
- **无障碍设计** - 支持键盘导航和屏幕阅读器
- **性能优化** - 快速加载和流畅交互

## 📁 项目结构

```
git-install-guide/
├── index.html          # 主页面 - 配置工具界面
├── guide.html          # 安装指南页面
├── about.html          # 关于页面
├── main.js            # 主要JavaScript逻辑
├── git-config-options.json  # Git配置选项数据
├── interaction.md     # 交互设计文档
├── design.md         # 视觉设计规范
├── outline.md        # 项目概要
└── README.md         # 项目说明文档
```

## 🎨 自定义配置

### 修改配置选项

要更新Git配置选项，请编辑 `git-config-options.json` 文件：

```json
{
  "gitInstallationOptions": {
    "version": "2.48.1",
    "steps": [
      {
        "id": "configuration_id",
        "title": "配置标题",
        "description": "详细描述",
        "type": "radio|checkbox|text",
        "options": [
          {
            "label": "选项标签",
            "value": "选项值",
            "description": "选项描述",
            "recommended": true
          }
        ]
      }
    ]
  }
}
```

### 添加新功能

1. **新的配置选项类型** - 在 `main.js` 中添加对应的表单生成函数
2. **新的用户配置** - 在 `userProfiles` 中添加新的推荐配置
3. **新的导出格式** - 在 `guide.html` 中添加新的导出功能

## 🔧 开发指南

### 本地开发

1. 克隆项目到本地
2. 安装开发依赖（如果需要）
3. 启动本地开发服务器
4. 在浏览器中测试功能

### 代码规范

- 使用ES6+语法
- 遵循语义化HTML标记
- 保持CSS类名的一致性
- 添加适当的注释说明

### 测试建议

- 在不同浏览器中测试兼容性
- 在移动设备上测试响应式设计
- 测试各种配置组合的功能
- 验证导出和导入功能

## 📱 移动端优化

- 所有页面都采用响应式设计
- 触摸友好的交互元素
- 优化的字体大小和间距
- 简化的移动端导航

## 🌐 浏览器兼容性

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## 🤝 贡献指南

欢迎提交Issue和Pull Request来改进这个项目！

### 报告问题

1. 检查是否已有相同问题
2. 提供详细的错误描述
3. 说明复现步骤
4. 提供浏览器和系统信息

### 提交代码

1. Fork项目到您的账户
2. 创建新的功能分支
3. 提交您的修改
4. 创建Pull Request

## 📄 许可证

本项目采用 WTFPL 许可证 - 查看 [LICENSE](https://github.com/xiaoditx/xiaoditx.github.io/blob/main/license) 文件了解详情。

## 🙏 致谢

感谢以下项目和资源：

- [Git](https://git-scm.com/) - 分布式版本控制系统
- [Tailwind CSS](https://tailwindcss.com/) - 实用优先的CSS框架
- [Anime.js](https://animejs.com/) - 轻量级JavaScript动画库
- [Noto Sans SC](https://fonts.google.com/noto/specimen/Noto+Sans+SC) - 中文字体

## 📞 联系方式

- 项目维护者：Git安装配置指南团队
- 邮箱：552333302@qq.com
- 项目主页：[Git安装配置指南](https://xiaoditx.github.io/pages/InstallGit/)

---

⭐ 如果这个项目对您有帮助，请给我们一个Star！