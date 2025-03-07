// 图标下载工具
// 这个脚本可以帮助从CDN下载常用的技术图标作为示例
// 使用方法: node icon_downloader.js

const fs = require('fs');
const https = require('https');
const path = require('path');

// 确保目录存在
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`创建目录: ${dirPath}`);
  }
}

// 下载文件
function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destPath);
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`下载失败，状态码: ${response.statusCode}`));
        return;
      }

      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`下载完成: ${destPath}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(destPath, () => {});
      reject(err);
    });
  });
}

// 创建默认SVG图标
function createDefaultIcon(filePath, size, letter = 'T') {
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" rx="${size/8}" fill="#4285f4"/>
  <text x="${size/2}" y="${size/2 + size/10}" font-family="Arial" font-size="${size/2}" fill="white" text-anchor="middle" dominant-baseline="middle">${letter}</text>
</svg>`;

  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, svgContent, (err) => {
      if (err) {
        reject(err);
        return;
      }
      console.log(`创建默认图标: ${filePath}`);
      resolve();
    });
  });
}

// 下载扩展主图标（示例）
async function downloadExtensionIcons() {
  const iconSizes = [16, 48, 128];
  const baseUrl = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons';
  const iconDir = path.join(__dirname, 'icons');
  
  ensureDirectoryExists(iconDir);
  
  // 使用一个通用技术图标作为扩展图标示例
  for (const size of iconSizes) {
    try {
      // 下载SVG而不是PNG
      await downloadFile(
        `${baseUrl}/react/react-original.svg`,
        path.join(iconDir, `icon${size}.svg`)
      );
    } catch (error) {
      console.error(`下载扩展图标失败（尺寸 ${size}）:`, error.message);
      // 创建默认图标
      await createDefaultIcon(path.join(iconDir, `icon${size}.svg`), size);
    }
  }
}

// 下载技术图标
async function downloadTechIcons() {
  const techIconsDir = path.join(__dirname, 'icons', 'tech');
  ensureDirectoryExists(techIconsDir);
  
  // 创建默认图标
  await createDefaultIcon(path.join(techIconsDir, 'default.svg'), 32);
  
  const icons = [
    // 基础技术
    { name: 'html', url: 'html5/html5-original.svg' },
    { name: 'css', url: 'css3/css3-original.svg' },
    { name: 'javascript', url: 'javascript/javascript-original.svg' },
    
    // 前端框架与库
    { name: 'react', url: 'react/react-original.svg' },
    { name: 'nextjs', url: 'nextjs/nextjs-original.svg' },
    { name: 'vue', url: 'vuejs/vuejs-original.svg' },
    { name: 'nuxtjs', url: 'nuxtjs/nuxtjs-original.svg' },
    { name: 'angular', url: 'angularjs/angularjs-original.svg' },
    { name: 'svelte', url: 'svelte/svelte-original.svg' },
    { name: 'jquery', url: 'jquery/jquery-original.svg' },
    
    // CSS框架
    { name: 'bootstrap', url: 'bootstrap/bootstrap-original.svg' },
    { name: 'tailwind', url: 'tailwindcss/tailwindcss-plain.svg' },
    
    // UI组件库
    { name: 'material-ui', url: 'materialui/materialui-original.svg' },
    { name: 'antd', url: 'react/react-original.svg' }, // 使用React图标替代
    { name: 'element-ui', url: 'vuejs/vuejs-original.svg' }, // 使用Vue图标替代
    
    // 构建工具
    { name: 'webpack', url: 'webpack/webpack-original.svg' },
    { name: 'vite', url: 'vitejs/vitejs-original.svg' },
    { name: 'parcel', url: 'javascript/javascript-original.svg' }, // 使用JS图标替代
    
    // 后端技术
    { name: 'nodejs', url: 'nodejs/nodejs-original.svg' },
    { name: 'php', url: 'php/php-original.svg' },
    { name: 'rails', url: 'rails/rails-original-wordmark.svg' },
    { name: 'django', url: 'django/django-plain.svg' },
    { name: 'laravel', url: 'laravel/laravel-plain.svg' },
    { name: 'spring', url: 'spring/spring-original.svg' },
    { name: 'aspnet', url: 'dot-net/dot-net-original.svg' },
    
    // 状态管理
    { name: 'redux', url: 'redux/redux-original.svg' },
    { name: 'vuex', url: 'vuejs/vuejs-original.svg' }, // 使用Vue图标替代
    { name: 'mobx', url: 'react/react-original.svg' }, // 使用React图标替代
    
    // 数据相关
    { name: 'graphql', url: 'graphql/graphql-plain.svg' },
    { name: 'firebase', url: 'firebase/firebase-plain.svg' },
    
    // Web3技术
    { name: 'ethereum', url: 'ethereum/ethereum-original.svg' },
    
    // 测试工具
    { name: 'jest', url: 'jest/jest-plain.svg' },
    
    // 其他技术
    { name: 'wasm', url: 'webassembly/webassembly-original.svg' }
  ];
  
  const baseUrl = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons';
  
  for (const icon of icons) {
    try {
      // 使用SVG格式而不是PNG
      await downloadFile(
        `${baseUrl}/${icon.url}`,
        path.join(techIconsDir, `${icon.name}.svg`)
      );
    } catch (error) {
      console.error(`下载技术图标 ${icon.name} 失败:`, error.message);
      // 创建默认图标
      await createDefaultIcon(
        path.join(techIconsDir, `${icon.name}.svg`), 
        32, 
        icon.name.charAt(0).toUpperCase()
      );
    }
  }
}

// 从iconfont.cn下载图标的说明
function printIconfontInstructions() {
  console.log('\n===== 从iconfont.cn下载图标的说明 =====');
  console.log('1. 访问 https://www.iconfont.cn/');
  console.log('2. 搜索您需要的技术图标（如"HTML"、"React"等）');
  console.log('3. 将喜欢的图标添加到购物车');
  console.log('4. 点击右上角的购物车图标');
  console.log('5. 点击"下载代码"按钮');
  console.log('6. 选择"SVG下载"以保持矢量图形的优势');
  console.log('7. 下载后，将图标重命名为对应的文件名，并放入icons/tech/目录中');
  console.log('\n如需更详细说明，请查看项目中的iconfont_helper.md文件');
}

// 创建一个简单的HTML页面预览所有图标
async function createIconPreviewPage() {
  const techIconsDir = path.join(__dirname, 'icons', 'tech');
  const previewPath = path.join(__dirname, 'icon_preview.html');
  
  // 获取所有图标文件
  const iconFiles = fs.readdirSync(techIconsDir).filter(file => 
    file.endsWith('.svg')
  );
  
  // 生成HTML内容
  let html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>技术图标预览</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; }
    h1 { color: #333; }
    .icon-grid { 
      display: grid; 
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 20px; 
      margin-top: 20px;
    }
    .icon-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 15px;
      border: 1px solid #eee;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .icon-item img {
      width: 32px;
      height: 32px;
      margin-bottom: 10px;
      object-fit: contain;
    }
    .icon-name {
      font-size: 12px;
      color: #666;
      text-align: center;
    }
    .missing-icon {
      color: #e74c3c;
      font-size: 10px;
      margin-top: 5px;
    }
    .instructions {
      background-color: #f8f9fa;
      border-left: 4px solid #4285f4;
      padding: 15px;
      margin: 20px 0;
    }
  </style>
</head>
<body>
  <h1>技术图标预览</h1>
  <div class="instructions">
    <p>这些是下载的技术图标示例。在实际使用中，请从iconfont.cn下载更美观的图标替换这些示例图标。</p>
    <p>所有图标都保持SVG格式，以获得最佳的显示效果。</p>
    <p><a href="icons/tech/README.md">查看详细图标下载指南</a></p>
  </div>
  <div class="icon-grid">
`;

  // 添加每个图标
  iconFiles.forEach(file => {
    const name = path.basename(file, path.extname(file));
    html += `
    <div class="icon-item">
      <img src="icons/tech/${file}" alt="${name}" onerror="this.onerror=null; this.classList.add('missing'); this.parentNode.innerHTML += '<div class=\\'missing-icon\\'>图标缺失</div>';">
      <div class="icon-name">${name}</div>
    </div>`;
  });

  html += `
  </div>
</body>
</html>`;

  // 写入HTML文件
  fs.writeFileSync(previewPath, html);
  console.log(`图标预览页面已创建: ${previewPath}`);
}

// 打包扩展程序
async function packageExtension() {
  // 创建dist目录
  const distDir = path.join(__dirname, 'dist');
  ensureDirectoryExists(distDir);
  
  // 打包文件清单
  const filesToInclude = [
    'manifest.json',
    'popup.html',
    'popup.css',
    'popup.js',
    'background.js',
    'content.js',
    'tech_details.html',
    'tech_details.js',
    'welcome.html',
    'icons/',
    'README.md'
  ];
  
  // 创建zip文件名
  const manifest = JSON.parse(fs.readFileSync(path.join(__dirname, 'manifest.json'), 'utf8'));
  const zipFileName = `网页技术检测与AI助手-v${manifest.version}.zip`;
  const zipFilePath = path.join(distDir, zipFileName);
  
  // 创建说明
  console.log('\n===== 扩展打包指南 =====');
  console.log('要创建Chrome扩展的打包文件，请按照以下步骤操作：');
  console.log('');
  console.log('方法1：使用Chrome浏览器打包');
  console.log('1. 在Chrome浏览器中打开 chrome://extensions/');
  console.log('2. 开启右上角的"开发者模式"');
  console.log('3. 点击"打包扩展程序"按钮');
  console.log('4. 在"扩展程序根目录"字段中，输入或浏览到项目目录');
  console.log('5. 点击"打包扩展程序"按钮');
  console.log('6. Chrome将创建一个.crx文件和一个.pem密钥文件');
  console.log('');
  console.log('方法2：手动创建ZIP文件');
  console.log('1. 将以下文件和目录复制到一个新文件夹：');
  filesToInclude.forEach(file => console.log(`   - ${file}`));
  console.log('2. 将该文件夹压缩为ZIP文件');
  console.log('3. 重命名ZIP文件为：', zipFileName);
  console.log('');
  console.log('建议的ZIP文件位置:', zipFilePath);
  console.log('');
  console.log('注意：要分发扩展，您需要将其上传到Chrome Web Store。');
}

// 主函数
async function main() {
  console.log('开始下载图标...');
  
  try {
    await downloadExtensionIcons();
    await downloadTechIcons();
    console.log('所有图标下载完成！');
    
    await createIconPreviewPage();
    
    console.log('');
    console.log('注意：这些图标仅作为示例。在实际使用中，请从 iconfont.cn 下载更合适的图标。');
    console.log('所有图标已保持SVG矢量格式，以获得最佳的显示效果。');
    
    printIconfontInstructions();
    
    // 生成扩展打包指南
    await packageExtension();
    
  } catch (error) {
    console.error('下载过程中出错:', error);
  }
}

main(); 