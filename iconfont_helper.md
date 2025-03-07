# Iconfont图标助手使用指南

本指南将帮助您从阿里巴巴图标库（iconfont.cn）获取SVG格式的图标并正确集成到扩展程序中。

## 方法一：逐个下载SVG图标（推荐）

### 扩展主图标
1. 访问[阿里巴巴图标库](https://www.iconfont.cn/)
2. 搜索合适的图标（推荐搜索"技术"、"检测"、"AI助手"等）
3. 找到合适的图标后，点击图标进入详情页
4. 在详情页选择"SVG下载"
5. 将下载的SVG文件重命名为以下文件名：
   - `icons/icon16.svg`
   - `icons/icon48.svg` 
   - `icons/icon128.svg`

### 技术图标
1. 对于每种技术（HTML、CSS、JavaScript等），在iconfont.cn上搜索该技术名称
2. 下载对应的SVG图标
3. 将图标重命名为对应的名称（如`html.svg`、`css.svg`等）
4. 保存到`icons/tech/`目录下

## 方法二：批量下载图标（项目图标库）

如果您需要批量下载多个图标，可以使用iconfont的项目功能：

1. 在iconfont.cn注册并登录账号
2. 搜索并将所需图标添加到购物车
3. 点击购物车图标，将所有图标添加到项目
4. 在项目中，您可以为每个图标设置特定的名称
5. 选择"下载至本地"，选择SVG格式
6. 下载后解压，将图标按照要求的命名规则放入正确的目录

## 图标命名规则

确保您的图标按照以下命名规则保存：

### 扩展主图标
- `icons/icon16.svg`
- `icons/icon48.svg`
- `icons/icon128.svg`

### 技术图标
所有技术图标应保存在`icons/tech/`目录下，命名如下：
- `html.svg` - HTML技术图标
- `css.svg` - CSS技术图标
- `javascript.svg` - JavaScript技术图标
- `react.svg` - React技术图标
- ... (参见`icons/tech/README.md`获取完整列表)

## SVG格式的优势

使用SVG格式的图标有以下优势：
- 矢量图形，在任何尺寸下都保持清晰
- 文件大小通常比PNG小
- 可以通过CSS轻松更改颜色和样式
- 支持透明度和动画
- 在高DPI屏幕上表现更好

## SVG图标调整方法

如果您需要调整SVG图标的大小或颜色，可以编辑SVG文件：

1. 使用任何文本编辑器打开SVG文件
2. 修改`width`和`height`属性调整大小
3. 修改`fill`或`stroke`属性更改颜色
4. 也可以通过CSS样式表控制图标的外观：
   ```css
   .tech-icon {
     width: 24px;
     height: 24px;
     fill: currentColor; /* 使用当前文本颜色 */
   }
   ```

## 注意事项

- 选择简洁清晰的图标，便于在小尺寸下识别
- 尽量选择带有特定技术标志性颜色的图标
- 确保SVG图标包含适当的viewBox属性
- 如果在iconfont.cn上找不到某些技术的图标，可以在其他SVG图标库如[SVG Repo](https://www.svgrepo.com/)或[Simple Icons](https://simpleicons.org/)上寻找 