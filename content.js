// 在页面加载完成后初始化
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'detectTechnologies') {
    const technologies = detectTechnologies();
    sendResponse({ technologies: technologies });
  } else if (request.action === 'watchPageChanges') {
    startMutationObserver();
    sendResponse({ success: true });
  }
  return true; // 保持消息通道开放以进行异步响应
});

// 上次检测到的技术栈指纹
let lastTechFingerprint = '';

// 网页变化观察器
let pageObserver = null;

/**
 * 开始观察页面变化
 */
function startMutationObserver() {
  if (pageObserver) {
    pageObserver.disconnect();
  }
  
  // 创建MutationObserver实例
  pageObserver = new MutationObserver(function(mutations) {
    // 检查是否有重要的DOM变化
    let hasSignificantChanges = false;
    
    for (let mutation of mutations) {
      // 如果添加了脚本或样式标签，认为是重要变化
      if (mutation.type === 'childList') {
        for (let node of mutation.addedNodes) {
          if (node.nodeName === 'SCRIPT' || node.nodeName === 'LINK' || node.nodeName === 'STYLE') {
            hasSignificantChanges = true;
            break;
          }
        }
      }
      
      if (hasSignificantChanges) break;
    }
    
    // 如果有重要变化，重新检测技术
    if (hasSignificantChanges) {
      setTimeout(() => {
        const technologies = detectTechnologies();
        const newFingerprint = generateTechFingerprint(technologies);
        
        // 只有当技术栈发生变化时才通知
        if (newFingerprint !== lastTechFingerprint) {
          lastTechFingerprint = newFingerprint;
          chrome.runtime.sendMessage({
            action: 'technologiesUpdated',
            technologies: technologies
          });
        }
      }, 1000); // 延迟1秒，确保资源加载完成
    }
  });
  
  // 开始观察整个文档
  pageObserver.observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: false,
    characterData: false
  });
  
  // 首次检测
  const technologies = detectTechnologies();
  lastTechFingerprint = generateTechFingerprint(technologies);
}

/**
 * 生成技术栈指纹
 * @param {Array} technologies 检测到的技术
 * @returns {String} 指纹字符串
 */
function generateTechFingerprint(technologies) {
  return technologies.map(tech => `${tech.name}:${tech.version || 'none'}`).sort().join('|');
}

/**
 * 检测网页使用的技术框架
 * @returns {Array} 检测到的技术列表
 */
function detectTechnologies() {
  const technologies = [];
  
  // 检测基本的HTML5
  technologies.push({
    name: 'HTML',
    version: detectHtml5() ? '5' : null,
    icon: 'icons/tech/html.svg'
  });
  
  // 检测CSS3
  if (detectCss3()) {
    technologies.push({
      name: 'CSS',
      version: '3',
      icon: 'icons/tech/css.svg'
    });
  }
  
  // 检测JavaScript
  technologies.push({
    name: 'JavaScript',
    version: detectES6() ? 'ES6+' : null,
    icon: 'icons/tech/javascript.svg'
  });
  
  // 检测主要的框架
  detectReact(technologies);
  detectVue(technologies);
  detectAngular(technologies);
  detectSvelte(technologies);
  detectJQuery(technologies);
  detectBootstrap(technologies);
  detectTailwind(technologies);
  detectWebpack(technologies);
  
  // 检测服务端框架痕迹
  detectNodeJS(technologies);
  detectPHP(technologies);
  detectRubyOnRails(technologies);
  detectDjango(technologies);
  detectLaravel(technologies);
  detectSpring(technologies);
  detectASPNET(technologies);
  
  // 检测状态管理库
  detectRedux(technologies);
  detectVuex(technologies);
  detectMobX(technologies);
  
  // 检测UI库
  detectMaterialUI(technologies);
  detectAntDesign(technologies);
  detectElementUI(technologies);
  
  // 检测数据库相关技术
  detectGraphQL(technologies);
  detectFirebase(technologies);
  
  // 检测Web3相关技术
  detectEthereum(technologies);
  
  // 检测WebAssembly
  detectWebAssembly(technologies);
  
  // 检测打包工具
  detectVite(technologies);
  detectParcel(technologies);
  
  // 检测测试框架
  detectJest(technologies);
  
  return technologies;
}

/**
 * 检测是否使用HTML5
 */
function detectHtml5() {
  const doctype = document.doctype;
  return !!doctype && doctype.name.toLowerCase() === 'html';
}

/**
 * 检测是否使用CSS3
 */
function detectCss3() {
  const styles = Array.from(document.styleSheets);
  return styles.length > 0;
}

/**
 * 检测是否使用React
 */
function detectReact(technologies) {
  // 检查是否存在React特有的属性和DOM元素
  const reactElements = document.querySelectorAll('[data-reactroot], [data-reactid]');
  const hasReactAttr = reactElements.length > 0;
  
  // 检查全局React对象
  const hasReactObject = typeof window.React !== 'undefined' || typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined';
  
  // 检查是否有React特有的注释
  const pageSource = document.documentElement.outerHTML;
  const hasReactComments = pageSource.includes('<!-- react-text') || pageSource.includes('<!-- /react-text');
  
  if (hasReactAttr || hasReactObject || hasReactComments) {
    let version = null;
    
    // 尝试获取React版本
    if (typeof window.React !== 'undefined' && window.React.version) {
      version = window.React.version;
    }
    
    technologies.push({
      name: 'React',
      version: version,
      icon: 'icons/tech/react.svg'
    });
    
    // 检测是否使用Next.js
    if (document.querySelector('#__next') || document.querySelector('script[src*="/_next/"]')) {
      technologies.push({
        name: 'Next.js',
        version: null,
        icon: 'icons/tech/nextjs.svg'
      });
    }
  }
}

/**
 * 检测是否使用Vue
 */
function detectVue(technologies) {
  // 检查Vue特有的属性
  const vueElements = document.querySelectorAll('[data-v-]');
  const hasVueAttr = vueElements.length > 0;
  
  // 检查全局Vue对象
  const hasVueObject = typeof window.Vue !== 'undefined';
  
  // 检查Vue devtools标志
  const hasVueDevtools = !!document.querySelector('div[data-v-app]') || 
                          !!document.querySelector('#__vue') || 
                          !!document.querySelector('#app[data-v-]');
  
  if (hasVueAttr || hasVueObject || hasVueDevtools) {
    let version = null;
    
    // 尝试获取Vue版本
    if (typeof window.Vue !== 'undefined' && window.Vue.version) {
      version = window.Vue.version;
    }
    
    technologies.push({
      name: 'Vue.js',
      version: version,
      icon: 'icons/tech/vue.svg'
    });
    
    // 检测是否使用Nuxt.js
    if (document.querySelector('#__nuxt') || document.querySelector('script[src*="/_nuxt/"]')) {
      technologies.push({
        name: 'Nuxt.js',
        version: null,
        icon: 'icons/tech/nuxtjs.svg'
      });
    }
  }
}

/**
 * 检测是否使用Angular
 */
function detectAngular(technologies) {
  // 检查Angular特有的属性
  const ngElements = document.querySelectorAll('[ng-app], [ng-controller], [ng-model], [ng-repeat], [ng-view], [ng-if], [ng-class]');
  const hasNgAttributes = ngElements.length > 0;
  
  // 检查Angular 2+特有的属性
  const ng2Elements = document.querySelectorAll('[_nghost], [_ngcontent]');
  const hasNg2Attributes = ng2Elements.length > 0;
  
  // 检查全局Angular对象
  const hasAngularObject = typeof window.angular !== 'undefined';
  
  if (hasNgAttributes || hasNg2Attributes || hasAngularObject) {
    let version = null;
    let name = 'Angular';
    
    // 尝试获取Angular版本
    if (typeof window.angular !== 'undefined') {
      if (window.angular.version && window.angular.version.full) {
        version = window.angular.version.full;
        if (version.startsWith('1.')) {
          name = 'AngularJS';
        }
      }
    }
    
    technologies.push({
      name: name,
      version: version,
      icon: 'icons/tech/angular.svg'
    });
  }
}

/**
 * 检测是否使用Svelte
 */
function detectSvelte(technologies) {
  // 检查Svelte特有的类名和属性
  const svelteElements = document.querySelectorAll('[svelte-]');
  const hasSvelteAttr = svelteElements.length > 0;
  
  // 检查页面代码中是否有Svelte痕迹
  const pageSource = document.documentElement.outerHTML;
  const hasSvelteComments = pageSource.includes('__SVELTE') || pageSource.includes('svelte-');
  
  if (hasSvelteAttr || hasSvelteComments) {
    technologies.push({
      name: 'Svelte',
      version: null,
      icon: 'icons/tech/svelte.svg'
    });
  }
}

/**
 * 检测是否使用jQuery
 */
function detectJQuery(technologies) {
  if (typeof window.jQuery !== 'undefined') {
    technologies.push({
      name: 'jQuery',
      version: window.jQuery.fn.jquery,
      icon: 'icons/tech/jquery.svg'
    });
  }
}

/**
 * 检测是否使用Bootstrap
 */
function detectBootstrap(technologies) {
  // 检查是否有Bootstrap特有的类名
  const hasBootstrapClasses = 
    document.querySelectorAll('.container, .row, .col, .btn, .card, .navbar').length > 0;
  
  // 检查是否有Bootstrap JavaScript对象
  const hasBootstrapObject = typeof window.bootstrap !== 'undefined';
  
  // 检查是否有Bootstrap的meta标签
  const hasBootstrapMeta = !!document.querySelector('meta[name="viewport"][content*="width=device-width"]');
  
  if (hasBootstrapClasses && hasBootstrapMeta || hasBootstrapObject) {
    let version = null;
    
    // 尝试从CSS文件URL或JavaScript中获取Bootstrap版本
    const bootstrapLinks = Array.from(document.querySelectorAll('link[href*="bootstrap"]'));
    if (bootstrapLinks.length > 0) {
      const versionMatch = bootstrapLinks[0].href.match(/bootstrap[.-]v?(\d+\.\d+\.\d+)/i);
      if (versionMatch) {
        version = versionMatch[1];
      }
    }
    
    technologies.push({
      name: 'Bootstrap',
      version: version,
      icon: 'icons/tech/bootstrap.svg'
    });
  }
}

/**
 * 检测是否使用Tailwind CSS
 */
function detectTailwind(technologies) {
  // 检查是否有Tailwind特有的类名（多个组合）
  const hasTailwindClasses = 
    document.querySelectorAll('[class*="bg-"], [class*="text-"], [class*="flex"], [class*="grid"], [class*="p-"], [class*="m-"]').length > 5;
  
  // 检查是否有Tailwind的配置或其他痕迹
  const pageSource = document.documentElement.outerHTML;
  const hasTailwindConfig = pageSource.includes('tailwind') || pageSource.includes('Tailwind');
  
  if (hasTailwindClasses && hasTailwindConfig) {
    technologies.push({
      name: 'Tailwind CSS',
      version: null,
      icon: 'icons/tech/tailwind.svg'
    });
  }
}

/**
 * 检测是否使用Node.js（通常从注释或其他指标推断）
 */
function detectNodeJS(technologies) {
  // 检查是否有Node.js相关的注释或属性
  const pageSource = document.documentElement.outerHTML;
  if (pageSource.includes('node_modules') || 
      pageSource.includes('nodejs') || 
      pageSource.includes('express') || 
      document.querySelector('script[src*="node_modules"]')) {
    technologies.push({
      name: 'Node.js',
      version: null,
      icon: 'icons/tech/nodejs.svg'
    });
  }
}

/**
 * 检测是否使用PHP
 */
function detectPHP(technologies) {
  // 检查HTTP请求头、cookies或标志性的URL模式
  const hasPHPUrls = Array.from(document.querySelectorAll('script, link, img, a'))
    .some(el => el.src && (el.src.includes('.php') || el.href && el.href.includes('.php')));
  
  // 检查明显的PHP生成的注释或痕迹
  const pageSource = document.documentElement.outerHTML;
  const hasPHPComments = pageSource.includes('<?php') || pageSource.includes('Powered by PHP');
  
  if (hasPHPUrls || hasPHPComments) {
    technologies.push({
      name: 'PHP',
      version: null,
      icon: 'icons/tech/php.svg'
    });
  }
}

/**
 * 检测是否使用Ruby on Rails
 */
function detectRubyOnRails(technologies) {
  // 检查Rails相关的meta标签
  const hasRailsMeta = !!document.querySelector('meta[name="csrf-param"]');
  
  // 检查Rails特有的属性和类名
  const pageSource = document.documentElement.outerHTML;
  const hasRailsAttributes = pageSource.includes('data-remote') || pageSource.includes('rails-ujs');
  
  if (hasRailsMeta || hasRailsAttributes) {
    technologies.push({
      name: 'Ruby on Rails',
      version: null,
      icon: 'icons/tech/rails.svg'
    });
  }
}

/**
 * 检测是否使用Django
 */
function detectDjango(technologies) {
  // 检查Django特有的CSRF token
  const hasDjangoCSRF = !!document.querySelector('input[name="csrfmiddlewaretoken"]');
  
  // 检查Django admin特有的元素
  const hasDjangoAdmin = !!document.querySelector('#django-admin-form') || 
                         window.location.href.includes('/admin/');
  
  if (hasDjangoCSRF || hasDjangoAdmin) {
    technologies.push({
      name: 'Django',
      version: null,
      icon: 'icons/tech/django.svg'
    });
  }
}

/**
 * 检测是否使用Redux
 */
function detectRedux(technologies) {
  // 检查全局Redux对象或Redux开发工具
  const hasReduxObject = typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' || 
                         typeof window.Redux !== 'undefined';
  
  // 检查Redux相关的属性或标志
  const pageSource = document.documentElement.outerHTML;
  const hasReduxCode = pageSource.includes('redux') || pageSource.includes('createStore');
  
  if (hasReduxObject || hasReduxCode) {
    technologies.push({
      name: 'Redux',
      version: null,
      icon: 'icons/tech/redux.svg'
    });
  }
}

/**
 * 检测是否使用Vuex
 */
function detectVuex(technologies) {
  // 检查全局Vuex对象
  const hasVuexObject = typeof window.Vuex !== 'undefined';
  
  // 检查Vuex相关的代码痕迹
  const pageSource = document.documentElement.outerHTML;
  const hasVuexCode = pageSource.includes('vuex') || pageSource.includes('mapState') || 
                     pageSource.includes('mapGetters') || pageSource.includes('mapActions');
  
  if (hasVuexObject || hasVuexCode) {
    technologies.push({
      name: 'Vuex',
      version: null,
      icon: 'icons/tech/vuex.svg'
    });
  }
}

/**
 * 检测是否使用Webpack
 */
function detectWebpack(technologies) {
  // 检查是否有Webpack特有的注释或属性
  const pageSource = document.documentElement.outerHTML;
  const hasWebpackComments = pageSource.includes('webpackJsonp') || 
                           pageSource.includes('__webpack_require__') ||
                           pageSource.includes('webpack-dev-server');
  
  // 检查特定的script标签模式
  const hasWebpackScripts = Array.from(document.querySelectorAll('script')).some(script => 
    script.src && (script.src.includes('bundle.js') || script.src.includes('chunk') || script.src.includes('webpack'))
  );
  
  if (hasWebpackComments || hasWebpackScripts) {
    technologies.push({
      name: 'Webpack',
      version: null,
      icon: 'icons/tech/webpack.svg'
    });
  }
}

/**
 * 检测是否使用Laravel
 */
function detectLaravel(technologies) {
  // 检查Laravel的CSRF token
  const hasLaravelCSRF = !!document.querySelector('meta[name="csrf-token"]');
  
  // 检查Laravel特有的类或属性
  const pageSource = document.documentElement.outerHTML;
  const hasLaravelTraces = pageSource.includes('laravel') || 
                        pageSource.includes('Laravel') || 
                        pageSource.includes('_token');
  
  if (hasLaravelCSRF || hasLaravelTraces) {
    technologies.push({
      name: 'Laravel',
      version: null,
      icon: 'icons/tech/laravel.svg'
    });
  }
}

/**
 * 检测是否使用Spring框架
 */
function detectSpring(technologies) {
  // 检查Spring相关的HTTP头部或特征
  const pageSource = document.documentElement.outerHTML;
  const hasSpringTraces = pageSource.includes('org.springframework') || 
                       pageSource.includes('Spring Framework') ||
                       document.querySelector('script[src*="spring"]');
  
  if (hasSpringTraces) {
    technologies.push({
      name: 'Spring',
      version: null,
      icon: 'icons/tech/spring.svg'
    });
  }
}

/**
 * 检测是否使用MobX
 */
function detectMobX(technologies) {
  // 检查全局MobX对象
  const hasMobXObject = typeof window.mobx !== 'undefined';
  
  // 检查MobX相关代码痕迹
  const pageSource = document.documentElement.outerHTML;
  const hasMobXTraces = pageSource.includes('mobx') || 
                     pageSource.includes('observable') || 
                     pageSource.includes('autorun') ||
                     pageSource.includes('@observer');
  
  if (hasMobXObject || hasMobXTraces) {
    technologies.push({
      name: 'MobX',
      version: null,
      icon: 'icons/tech/mobx.svg'
    });
  }
}

/**
 * 检测是否使用Material UI
 */
function detectMaterialUI(technologies) {
  // 检查Material UI特有的类名和组件
  const hasMuiClasses = document.querySelectorAll('.MuiButton-root, .MuiTypography-root, .MuiPaper-root').length > 0;
  
  // 检查页面代码中是否存在Material UI的引用
  const pageSource = document.documentElement.outerHTML;
  const hasMuiReferences = pageSource.includes('@material-ui/core') || 
                        pageSource.includes('@mui/material');
  
  if (hasMuiClasses || hasMuiReferences) {
    technologies.push({
      name: 'Material UI',
      version: null,
      icon: 'icons/tech/material-ui.svg'
    });
  }
}

/**
 * 检测是否使用Ant Design
 */
function detectAntDesign(technologies) {
  // 检查Ant Design特有的类名和组件
  const hasAntClasses = document.querySelectorAll('.ant-btn, .ant-input, .ant-menu, .ant-layout').length > 0;
  
  // 检查页面代码中是否存在Ant Design的引用
  const pageSource = document.documentElement.outerHTML;
  const hasAntReferences = pageSource.includes('antd') || 
                        pageSource.includes('ant-design');
  
  if (hasAntClasses || hasAntReferences) {
    technologies.push({
      name: 'Ant Design',
      version: null,
      icon: 'icons/tech/antd.svg'
    });
  }
}

/**
 * 检测是否使用Element UI
 */
function detectElementUI(technologies) {
  // 检查Element UI特有的类名和组件
  const hasElementClasses = document.querySelectorAll('.el-button, .el-input, .el-menu, .el-form').length > 0;
  
  // 检查页面代码中是否存在Element UI的引用
  const pageSource = document.documentElement.outerHTML;
  const hasElementReferences = pageSource.includes('element-ui') || 
                           pageSource.includes('ElementUI');
  
  if (hasElementClasses || hasElementReferences) {
    technologies.push({
      name: 'Element UI',
      version: null,
      icon: 'icons/tech/element-ui.svg'
    });
  }
}

/**
 * 检测是否使用GraphQL
 */
function detectGraphQL(technologies) {
  // 检查GraphQL相关的HTTP请求或代码痕迹
  const pageSource = document.documentElement.outerHTML;
  const hasGraphQLTraces = pageSource.includes('graphql') || 
                        pageSource.includes('Apollo') ||
                        pageSource.includes('__typename') ||
                        document.querySelector('script[src*="graphql"]');
  
  if (hasGraphQLTraces) {
    technologies.push({
      name: 'GraphQL',
      version: null,
      icon: 'icons/tech/graphql.svg'
    });
  }
}

/**
 * 检测是否使用Firebase
 */
function detectFirebase(technologies) {
  // 检查Firebase全局对象
  const hasFirebaseObject = typeof window.firebase !== 'undefined';
  
  // 检查Firebase相关代码痕迹
  const pageSource = document.documentElement.outerHTML;
  const hasFirebaseTraces = pageSource.includes('firebase') || 
                        pageSource.includes('firestore') ||
                        pageSource.includes('firebaseapp');
  
  if (hasFirebaseObject || hasFirebaseTraces) {
    technologies.push({
      name: 'Firebase',
      version: null,
      icon: 'icons/tech/firebase.svg'
    });
  }
}

/**
 * 检测是否使用以太坊相关技术
 */
function detectEthereum(technologies) {
  // 检查以太坊对象
  const hasEthereumObject = typeof window.ethereum !== 'undefined' || 
                         typeof window.web3 !== 'undefined';
  
  // 检查以太坊相关代码痕迹
  const pageSource = document.documentElement.outerHTML;
  const hasEthereumTraces = pageSource.includes('metamask') || 
                        pageSource.includes('ethereum') ||
                        pageSource.includes('web3.js') ||
                        pageSource.includes('ethers.js');
  
  if (hasEthereumObject || hasEthereumTraces) {
    technologies.push({
      name: 'Ethereum',
      version: null,
      icon: 'icons/tech/ethereum.svg'
    });
  }
}

/**
 * 检测是否使用WebAssembly
 */
function detectWebAssembly(technologies) {
  // 检查WebAssembly对象
  const hasWebAssembly = typeof WebAssembly !== 'undefined';
  
  // 检查WebAssembly相关代码痕迹
  const pageSource = document.documentElement.outerHTML;
  const hasWasmTraces = pageSource.includes('.wasm') || 
                     pageSource.includes('WebAssembly');
  
  if (hasWebAssembly && hasWasmTraces) {
    technologies.push({
      name: 'WebAssembly',
      version: null,
      icon: 'icons/tech/wasm.svg'
    });
  }
}

/**
 * 检测是否使用ES6+语法
 */
function detectES6() {
  try {
    // 尝试执行ES6代码特性
    eval('let a = 1; const b = 2; class Test {}; (() => {})');
    
    // 检查页面源码中是否有ES6特性的使用
    const pageSource = document.documentElement.outerHTML;
    const hasES6Features = 
      pageSource.includes('=>') || // 箭头函数
      pageSource.includes('const ') || // const声明
      pageSource.includes('let ') || // let声明
      pageSource.includes('class ') || // 类声明
      pageSource.includes('...') || // 展开运算符
      pageSource.includes('async '); // async/await
      
    return hasES6Features;
  } catch (e) {
    return false;
  }
}

/**
 * 检测是否使用ASP.NET
 */
function detectASPNET(technologies) {
  // 检查ASP.NET特有的标记
  const hasASPNETAttributes = 
    document.querySelectorAll('[data-asp-controller], [data-asp-action], [asp-for]').length > 0;
  
  // 检查HTTP头和Cookie
  const hasASPNETCookie = document.cookie.includes('.ASPXAUTH') || 
                        document.cookie.includes('ASP.NET_SessionId');
  
  // 检查页面源码
  const pageSource = document.documentElement.outerHTML;
  const hasASPNETTraces = 
    pageSource.includes('__VIEWSTATE') || 
    pageSource.includes('__EVENTVALIDATION') ||
    pageSource.includes('asp-controller') ||
    pageSource.includes('Microsoft.AspNetCore');
  
  if (hasASPNETAttributes || hasASPNETCookie || hasASPNETTraces) {
    technologies.push({
      name: 'ASP.NET',
      version: null,
      icon: 'icons/tech/aspnet.svg'
    });
  }
}

/**
 * 检测是否使用Vite
 */
function detectVite(technologies) {
  // 检查Vite特有的标记
  const hasViteScripts = Array.from(document.querySelectorAll('script')).some(script => 
    script.src && script.src.includes('/@vite/client')
  );
  
  // 检查页面源码
  const pageSource = document.documentElement.outerHTML;
  const hasViteTraces = 
    pageSource.includes('vite-hmr') || 
    pageSource.includes('vite-plugin') ||
    pageSource.includes('import.meta.hot');
  
  if (hasViteScripts || hasViteTraces) {
    technologies.push({
      name: 'Vite',
      version: null,
      icon: 'icons/tech/vite.svg'
    });
  }
}

/**
 * 检测是否使用Parcel
 */
function detectParcel(technologies) {
  // 检查Parcel特有的标记
  const hasParcelScripts = Array.from(document.querySelectorAll('script')).some(script => 
    script.src && script.src.includes('parcel')
  );
  
  // 检查页面源码
  const pageSource = document.documentElement.outerHTML;
  const hasParcelTraces = 
    pageSource.includes('ParcelRequire') || 
    pageSource.includes('hmr-runtime') ||
    pageSource.includes('.parcel-');
  
  if (hasParcelScripts || hasParcelTraces) {
    technologies.push({
      name: 'Parcel',
      version: null,
      icon: 'icons/tech/parcel.svg'
    });
  }
}

/**
 * 检测是否使用Jest
 */
function detectJest(technologies) {
  // Jest一般是测试框架，在页面上很难检测
  // 但有时可以通过源码中的注释或特殊对象检测
  const pageSource = document.documentElement.outerHTML;
  const hasJestTraces = 
    pageSource.includes('jest.') || 
    pageSource.includes('test(') ||
    pageSource.includes('it(') && pageSource.includes('expect(');
  
  if (hasJestTraces) {
    technologies.push({
      name: 'Jest',
      version: null,
      icon: 'icons/tech/jest.svg'
    });
  }
} 