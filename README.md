# 网页技术检测与AI助手

这是一个Chrome浏览器扩展，具有两个主要功能：
1. 检测当前网页使用的技术栈（HTML、CSS、JavaScript框架等）
2. 通过连接本地部署的Ollama模型提供AI聊天功能

## 功能特点

### 技术检测
- 自动识别当前网页使用的HTML、CSS和JavaScript版本
- 检测流行的前端框架，如React、Vue、Angular、Svelte等
- 检测CSS框架，如Bootstrap、Tailwind CSS
- 识别后端技术痕迹，如Node.js、PHP、Django等
- 显示技术名称、图标和版本信息（如果可用）

### AI聊天助手
- 连接本地部署的Ollama模型
- 支持多种Ollama模型（如llama3、mistral等）
- 支持网络搜索增强回答能力
- 自动记录对话历史，帮助模型学习
- 可配置的API地址和模型设置

## 安装说明

### 配置图标

本扩展需要配置两类图标：
1. 扩展主图标 - 显示在Chrome工具栏和扩展管理页面
2. 技术图标 - 用于显示检测到的各种技术框架

请按照以下步骤配置图标：
1. 查看 `icons/README.txt` 文件了解如何配置扩展主图标
2. 查看 `icons/tech/README.md` 文件了解如何配置技术图标
3. 从 [阿里巴巴图标库](https://www.iconfont.cn/) 下载所需图标

> 注意：所有图标配置完成后，扩展才能正常显示图标。

### 安装Ollama
要使用AI聊天功能，需要先在本地安装和运行Ollama：

1. 访问[Ollama官网](https://ollama.ai/)下载适合您操作系统的版本
2. 安装并启动Ollama服务
3. 下载所需的模型，例如：`ollama pull llama3`

### 安装扩展程序

方法1：通过Chrome商店安装（尚未发布）

方法2：手动安装（开发者模式）
1. 下载并解压缩本项目
2. 在Chrome浏览器中打开`chrome://extensions/`
3. 打开右上角的"开发者模式"
4. 点击"加载已解压的扩展程序"
5. 选择项目文件夹

## 使用指南

1. 点击Chrome工具栏中的扩展图标打开popup窗口
2. 在"技术检测"标签页中查看当前网页使用的技术
3. 切换到"AI聊天"标签页与AI助手交流
4. 在"设置"标签页中配置Ollama API地址和模型名称

## 配置选项

- Ollama API地址：默认为`http://localhost:11434`
- Ollama模型：默认为`llama3`
- 网络搜索：可选择是否启用网络搜索增强回答

## 技术实现

- 使用Chrome Extension Manifest V3构建
- 纯JavaScript实现，无需额外依赖
- 通过内容脚本检测网页技术
- 通过后台脚本与Ollama API通信
- 使用DuckDuckGo API进行网络搜索

## 开发指南

如要修改或扩展功能：
1. 编辑`manifest.json`添加必要的权限
2. 修改`content.js`增强技术检测能力
3. 修改`background.js`改进与Ollama的通信
4. 修改`popup.js`和`popup.html`调整用户界面

### 自定义图标

如需自定义或更新图标：
1. 在阿里巴巴图标库中寻找合适的新图标
2. 根据`icons`目录中的说明下载并替换现有图标
3. 您也可以使用自己设计的图标，只需确保文件名和路径保持一致

## 隐私声明

- 本扩展不收集或发送任何个人数据
- 所有AI对话都在本地处理，不会发送到外部服务器
- 网络搜索仅在用户明确选择时进行

## 许可证

MIT许可证 