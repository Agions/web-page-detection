/**
 * Chrome扩展打包脚本
 * 此脚本创建一个准备导入Chrome浏览器的ZIP文件
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

// 创建Chrome扩展包
async function buildChromeExtension() {
  console.log('开始打包Chrome扩展...');
  
  try {
    // 读取manifest以获取版本号
    const manifestPath = path.join(__dirname, 'manifest.json');
    if (!fs.existsSync(manifestPath)) {
      throw new Error('manifest.json 文件不存在!');
    }
    
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    const version = manifest.version;
    
    // 创建输出目录
    const distDir = path.join(__dirname, 'dist');
    ensureDirectoryExists(distDir);
    
    // 定义输出文件路径
    const outputFileName = `网页技术检测与AI助手-v${version}.zip`;
    const outputFilePath = path.join(distDir, outputFileName);
    
    // 创建一个文件写入流
    const output = fs.createWriteStream(outputFilePath);
    const archive = archiver('zip', {
      zlib: { level: 9 } // 最高压缩级别
    });
    
    // 监听错误
    archive.on('error', function(err) {
      throw err;
    });
    
    // 完成打包时的处理
    output.on('close', function() {
      const fileSizeMB = (archive.pointer() / 1024 / 1024).toFixed(2);
      console.log(`打包完成! 文件大小: ${fileSizeMB} MB`);
      console.log(`扩展包已创建: ${outputFilePath}`);
      console.log('\n安装说明:');
      console.log('1. 打开Chrome浏览器并访问 chrome://extensions/');
      console.log('2. 打开右上角的"开发者模式"');
      console.log('3. 将ZIP文件拖放到浏览器窗口中');
      console.log('  或解压ZIP文件，然后点击"加载已解压的扩展程序"并选择解压后的文件夹');
    });
    
    // 将输出流连接到归档
    archive.pipe(output);
    
    // 添加文件到归档
    const filesToInclude = [
      'manifest.json',
      'popup.html',
      'popup.css',
      'popup.js',
      'background.js',
      'content.js',
      'tech_details.html',
      'tech_details.js',
      'welcome.html'
    ];
    
    // 添加文件
    for (const file of filesToInclude) {
      const filePath = path.join(__dirname, file);
      if (fs.existsSync(filePath)) {
        archive.file(filePath, { name: file });
        console.log(`添加文件: ${file}`);
      } else {
        console.warn(`警告: 找不到文件 ${file}, 已跳过`);
      }
    }
    
    // 添加icons目录
    const iconsDir = path.join(__dirname, 'icons');
    if (fs.existsSync(iconsDir)) {
      // 递归添加icons目录中的所有.svg文件
      archive.glob('**/*.svg', { cwd: iconsDir }, { prefix: 'icons' });
      
      // 添加README文件
      archive.glob('**/*.md', { cwd: iconsDir }, { prefix: 'icons' });
      archive.glob('**/*.txt', { cwd: iconsDir }, { prefix: 'icons' });
      
      console.log('添加目录: icons/');
    } else {
      console.warn('警告: 找不到icons目录');
    }
    
    // 添加README和其他说明文件
    const docsToInclude = [
      'README.md',
      'INSTALL.md',
      'iconfont_helper.md'
    ];
    
    for (const doc of docsToInclude) {
      const docPath = path.join(__dirname, doc);
      if (fs.existsSync(docPath)) {
        archive.file(docPath, { name: doc });
        console.log(`添加文档: ${doc}`);
      }
    }
    
    // 完成归档
    await archive.finalize();
    
  } catch (error) {
    console.error('打包出错:', error);
  }
}

// 检查依赖
function checkDependencies() {
  try {
    require('archiver');
    return true;
  } catch (err) {
    console.error('错误: 缺少必要的依赖项');
    console.log('请先安装依赖: npm install archiver');
    return false;
  }
}

// 主函数
async function main() {
  console.log('======= Chrome扩展打包工具 =======');
  
  if (!checkDependencies()) {
    return;
  }
  
  await buildChromeExtension();
}

// 执行主函数
main(); 