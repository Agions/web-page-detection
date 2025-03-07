/**
 * Chrome扩展打包脚本
 * 此脚本创建一个包含所有必要文件的ZIP文件，可以导入Chrome浏览器或上传到Chrome Web Store
 */

const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

// 确保目录存在
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`创建目录: ${dirPath}`);
  }
}

// 打包扩展
async function packExtension() {
  try {
    // 读取manifest获取版本号
    const manifestPath = path.join(__dirname, 'manifest.json');
    if (!fs.existsSync(manifestPath)) {
      console.error('错误: manifest.json 文件不存在！');
      return;
    }
    
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    const version = manifest.version;
    
    // 创建dist目录
    const distDir = path.join(__dirname, 'dist');
    ensureDirectoryExists(distDir);
    
    // 定义输出文件名
    const outputFileName = `网页技术检测与AI助手-v${version}.zip`;
    const outputFilePath = path.join(distDir, outputFileName);
    
    // 创建写入流
    const output = fs.createWriteStream(outputFilePath);
    const archive = archiver('zip', {
      zlib: { level: 9 } // 最高压缩级别
    });
    
    // 监听归档错误
    archive.on('error', function(err) {
      throw err;
    });
    
    // 管道输出
    archive.pipe(output);
    
    // 要包含的文件列表
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
      'README.md'
    ];
    
    // 添加文件
    filesToInclude.forEach(file => {
      const filePath = path.join(__dirname, file);
      if (fs.existsSync(filePath)) {
        archive.file(filePath, { name: file });
        console.log(`添加文件: ${file}`);
      } else {
        console.warn(`警告: 文件 ${file} 不存在，已跳过`);
      }
    });
    
    // 添加目录
    const iconsDir = path.join(__dirname, 'icons');
    if (fs.existsSync(iconsDir)) {
      archive.directory(iconsDir, 'icons');
      console.log('添加目录: icons/');
    } else {
      console.warn('警告: icons/ 目录不存在，已跳过');
    }
    
    // 完成归档
    await archive.finalize();
    
    console.log(`\n打包完成: ${outputFilePath}`);
    console.log(`\n您可以通过以下步骤安装此扩展:`);
    console.log('1. 打开Chrome浏览器，进入 chrome://extensions/');
    console.log('2. 开启右上角的"开发者模式"');
    console.log('3. 将ZIP文件拖放到浏览器窗口中');
    console.log('   或点击"加载已解压的扩展程序"并选择解压后的文件夹');
    
  } catch (error) {
    console.error('打包扩展时出错:', error);
  }
}

// 执行打包
packExtension();

/**
 * 注意: 此脚本依赖于 archiver 包
 * 使用前，请先安装依赖:
 * npm install archiver
 * 
 * 然后运行:
 * node pack_extension.js
 */ 