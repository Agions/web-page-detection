// 技术详情数据库
const techDetailsDB = {
  'HTML': {
    description: 'HTML（超文本标记语言）是创建网页和Web应用程序的标准标记语言。通过HTML，可以定义网页的结构和内容。',
    features: [
      'Web页面的基础结构',
      '语义化标记使内容更有意义',
      'HTML5新增了音频、视频、画布等功能',
      '跨平台兼容所有主流浏览器'
    ],
    resources: [
      { title: 'MDN Web Docs', url: 'https://developer.mozilla.org/zh-CN/docs/Web/HTML', description: '详尽的HTML文档和教程' },
      { title: 'W3Schools', url: 'https://www.w3schools.com/html/', description: '交互式HTML学习网站' },
      { title: 'HTML5 规范', url: 'https://html.spec.whatwg.org/', description: 'HTML标准规范文档' }
    ]
  },
  
  'CSS': {
    description: 'CSS（层叠样式表）是一种用于描述HTML或XML文档表现形式的样式表语言。CSS用于控制网页的外观，如布局、颜色和字体。',
    features: [
      '分离内容与表现形式',
      '提供响应式设计能力',
      '支持动画和过渡效果',
      '模块化样式管理'
    ],
    resources: [
      { title: 'MDN CSS文档', url: 'https://developer.mozilla.org/zh-CN/docs/Web/CSS', description: '全面的CSS参考资料' },
      { title: 'CSS-Tricks', url: 'https://css-tricks.com/', description: 'CSS技巧和最佳实践' },
      { title: 'Can I Use', url: 'https://caniuse.com/', description: '浏览器CSS特性兼容性查询' }
    ]
  },
  
  'JavaScript': {
    description: 'JavaScript是一种高级、解释型的编程语言，是Web前端开发的核心技术之一。通过JavaScript可以为网页添加交互性和动态行为。',
    features: [
      '客户端脚本语言',
      '支持面向对象编程',
      '动态类型和弱类型',
      '事件驱动的编程模型',
      '与HTML和DOM紧密集成'
    ],
    resources: [
      { title: 'JavaScript MDN', url: 'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript', description: '权威的JavaScript参考' },
      { title: 'JavaScript.info', url: 'https://zh.javascript.info/', description: '现代JavaScript教程' },
      { title: 'ECMAScript规范', url: 'https://tc39.es/ecma262/', description: 'JavaScript的标准规范' }
    ]
  },
  
  'React': {
    description: 'React是一个用于构建用户界面的JavaScript库，由Facebook开发。它采用组件化思想，使开发者可以创建复杂的UI，同时保持代码的可维护性。',
    features: [
      '组件化架构',
      '虚拟DOM提高性能',
      'JSX语法',
      '单向数据流',
      '大型生态系统和社区支持'
    ],
    resources: [
      { title: 'React官方文档', url: 'https://zh-hans.reactjs.org/docs/getting-started.html', description: '官方入门和API文档' },
      { title: 'React开发者路线图', url: 'https://roadmap.sh/react', description: 'React学习路径' },
      { title: 'React GitHub仓库', url: 'https://github.com/facebook/react', description: '源码和问题跟踪' }
    ]
  },
  
  'Vue.js': {
    description: 'Vue.js是一个用于构建用户界面的渐进式JavaScript框架。它易于上手，同时也能满足复杂应用的需求。',
    features: [
      '渐进式框架设计',
      '响应式数据绑定',
      '组件系统',
      '模板语法',
      '轻量级'
    ],
    resources: [
      { title: 'Vue.js官方文档', url: 'https://cn.vuejs.org/', description: '综合的Vue.js指南' },
      { title: 'Vue Mastery', url: 'https://www.vuemastery.com/', description: 'Vue视频教程' },
      { title: 'Awesome Vue', url: 'https://github.com/vuejs/awesome-vue', description: 'Vue资源列表' }
    ]
  },
  
  'Angular': {
    description: 'Angular是一个由Google维护的开源Web应用框架，提供了完整的前端开发解决方案，包括模板系统、依赖注入和测试工具等。',
    features: [
      '基于TypeScript开发',
      '双向数据绑定',
      '依赖注入',
      '组件化架构',
      '全面的开发工具'
    ],
    resources: [
      { title: 'Angular官方文档', url: 'https://angular.cn/', description: '全面的Angular学习资源' },
      { title: 'Angular博客', url: 'https://blog.angular.io/', description: '最新Angular动态' },
      { title: 'Angular University', url: 'https://angular-university.io/', description: 'Angular课程和教程' }
    ]
  },
  
  'Node.js': {
    description: 'Node.js是一个基于Chrome V8引擎的JavaScript运行环境，使开发者可以使用JavaScript构建服务器端应用程序。',
    features: [
      '非阻塞I/O模型',
      '事件驱动架构',
      'NPM包管理系统',
      '跨平台兼容性',
      '强大的网络编程能力'
    ],
    resources: [
      { title: 'Node.js官方文档', url: 'https://nodejs.org/zh-cn/docs/', description: 'API文档和指南' },
      { title: 'Node.js最佳实践', url: 'https://github.com/goldbergyoni/nodebestpractices', description: 'Node.js开发技巧集合' },
      { title: 'Node.js Design Patterns', url: 'https://www.nodejsdesignpatterns.com/', description: 'Node.js设计模式' }
    ]
  },
  
  'Bootstrap': {
    description: 'Bootstrap是一个流行的前端框架，用于开发响应式、移动优先的网站。它提供了预定义的CSS样式和JavaScript组件。',
    features: [
      '响应式布局系统',
      '预定义UI组件',
      '跨浏览器兼容性',
      '可定制主题',
      'JavaScript插件和交互组件'
    ],
    resources: [
      { title: 'Bootstrap官方文档', url: 'https://getbootstrap.com/docs/', description: '组件和使用指南' },
      { title: 'Bootstrap中文网', url: 'https://www.bootcss.com/', description: '中文Bootstrap资源' },
      { title: 'Bootstrap Themes', url: 'https://themes.getbootstrap.com/', description: 'Bootstrap主题市场' }
    ]
  },
  
  'Tailwind CSS': {
    description: 'Tailwind CSS是一个功能类优先的CSS框架，它提供了大量的原子类让开发者可以直接在HTML中构建自定义设计，而无需编写CSS。',
    features: [
      '原子化CSS类',
      '高度可定制',
      'JIT编译模式提高性能',
      '响应式设计友好',
      '暗黑模式支持'
    ],
    resources: [
      { title: 'Tailwind官方文档', url: 'https://tailwindcss.com/docs', description: '详细的使用指南' },
      { title: 'Tailwind UI', url: 'https://tailwindui.com/', description: 'Tailwind组件库' },
      { title: 'Tailwind Play', url: 'https://play.tailwindcss.com/', description: '在线Tailwind编辑器' }
    ]
  },
  
  'Redux': {
    description: 'Redux是JavaScript应用的状态容器，提供可预测的状态管理。它通常与React一起使用，但也可以与任何其他视图库一起使用。',
    features: [
      '单一数据源',
      '状态只读',
      '使用纯函数进行更改',
      '强大的中间件系统',
      '时间旅行调试'
    ],
    resources: [
      { title: 'Redux官方文档', url: 'https://redux.js.org/', description: '核心概念和API' },
      { title: 'Redux工具包', url: 'https://redux-toolkit.js.org/', description: 'Redux官方推荐的工具集' },
      { title: 'Redux DevTools', url: 'https://github.com/reduxjs/redux-devtools', description: 'Redux调试工具' }
    ]
  },
  
  'Webpack': {
    description: 'Webpack是一个现代JavaScript应用程序的静态模块打包工具。它会递归地构建一个依赖关系图，然后将所有模块打包成一个或多个bundle。',
    features: [
      '模块打包',
      '代码分割',
      '资源管理',
      '丰富的插件系统',
      '支持多种模块系统'
    ],
    resources: [
      { title: 'Webpack官方文档', url: 'https://webpack.js.org/concepts/', description: '概念和配置指南' },
      { title: 'Webpack中文文档', url: 'https://webpack.docschina.org/', description: 'Webpack中文资源' },
      { title: 'Awesome Webpack', url: 'https://github.com/webpack-contrib/awesome-webpack', description: 'Webpack资源集合' }
    ]
  },
  
  'Vite': {
    description: 'Vite是一种新型前端构建工具，由Vue.js的创建者尤雨溪开发。它显著提高了开发服务器的启动时间和模块热替换(HMR)的性能。',
    features: [
      '极快的冷启动速度',
      '即时的热模块替换',
      '按需编译',
      '内置TypeScript支持',
      '开箱即用的优化构建'
    ],
    resources: [
      { title: 'Vite官方文档', url: 'https://cn.vitejs.dev/', description: '指南和配置参考' },
      { title: 'Awesome Vite', url: 'https://github.com/vitejs/awesome-vite', description: 'Vite生态系统资源' },
      { title: 'Vite GitHub', url: 'https://github.com/vitejs/vite', description: 'Vite源码仓库' }
    ]
  },
  
  'GraphQL': {
    description: 'GraphQL是一种用于API的查询语言，也是一个用于执行这些查询的运行时。它使客户端能够精确地获取所需的数据，而不是服务器确定返回什么。',
    features: [
      '声明式数据获取',
      '单一请求获取多个资源',
      '强类型系统',
      '自省系统',
      '版本控制不再需要'
    ],
    resources: [
      { title: 'GraphQL官方文档', url: 'https://graphql.org/learn/', description: '学习GraphQL' },
      { title: 'Apollo GraphQL', url: 'https://www.apollographql.com/docs/', description: 'GraphQL客户端和服务器' },
      { title: 'GraphQL中文网', url: 'https://graphql.cn/', description: 'GraphQL中文学习资源' }
    ]
  },
  
  'ASP.NET': {
    description: 'ASP.NET是由微软开发的Web应用程序框架，用于构建动态网站、应用程序和服务。最新版本ASP.NET Core是跨平台的开源框架。',
    features: [
      '高性能',
      '跨平台（ASP.NET Core）',
      'MVC架构模式',
      'Razor Pages和Blazor',
      '强大的依赖注入系统'
    ],
    resources: [
      { title: 'ASP.NET文档', url: 'https://docs.microsoft.com/zh-cn/aspnet/core/', description: '官方指南和教程' },
      { title: 'ASP.NET Core源码', url: 'https://github.com/dotnet/aspnetcore', description: 'GitHub仓库' },
      { title: '.NET中文社区', url: 'https://dotnet-china.com/', description: '中文开发者社区' }
    ]
  },
  
  'Laravel': {
    description: 'Laravel是一个用于Web应用程序的开源PHP框架，遵循MVC架构模式。它提供了优雅的语法和丰富的功能，简化了常见的Web开发任务。',
    features: [
      '优雅的语法和API',
      'Blade模板引擎',
      'Eloquent ORM',
      '内置认证系统',
      '强大的队列和任务调度'
    ],
    resources: [
      { title: 'Laravel文档', url: 'https://laravel.com/docs', description: '官方指南' },
      { title: 'Laravel中文文档', url: 'https://learnku.com/docs/laravel', description: '中文学习资料' },
      { title: 'Laracasts', url: 'https://laracasts.com/', description: 'Laravel视频教程' }
    ]
  }
};

// 更多技术可以按照上面的格式添加

// 默认技术数据（用于未知技术）
const defaultTechData = {
  description: '该技术的详细信息尚未收录。',
  features: ['暂无特点信息'],
  resources: [
    { title: '搜索更多', url: 'https://www.google.com/search', description: '在Google上搜索该技术' }
  ]
};

// 当页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
  // 获取URL中的技术名称参数
  const urlParams = new URLSearchParams(window.location.search);
  const techName = urlParams.get('tech');
  
  if (techName) {
    loadTechDetails(techName);
  } else {
    showError('未指定技术名称');
  }
  
  // 返回按钮事件处理
  document.getElementById('back-button').addEventListener('click', function(e) {
    e.preventDefault();
    window.close();
  });
});

// 加载技术详情
function loadTechDetails(techName) {
  // 获取技术详情元素
  const iconElement = document.getElementById('detail-icon');
  const nameElement = document.getElementById('detail-name');
  const versionElement = document.getElementById('detail-version');
  const descriptionElement = document.getElementById('detail-description');
  const featuresElement = document.getElementById('detail-features');
  const resourcesElement = document.getElementById('detail-resources');
  
  // 设置标题
  document.title = `${techName} - 技术详情`;
  
  // 获取技术详情数据
  chrome.storage.local.get(['currentTechDetails'], function(result) {
    let techData;
    let version = '';
    let iconUrl = '';
    
    if (result.currentTechDetails) {
      const { tech, iconSrc, techVersion } = result.currentTechDetails;
      
      // 确保技术名称匹配
      if (tech === techName) {
        iconUrl = iconSrc;
        version = techVersion || '';
      }
    }
    
    // 获取技术详细数据
    techData = techDetailsDB[techName] || defaultTechData;
    
    // 设置技术图标 (修改为SVG格式)
    iconElement.src = iconUrl || `icons/tech/${techName.toLowerCase().replace(/[\s\.]+/g, '')}.svg`;
    iconElement.alt = techName;
    
    // 添加SVG图标加载失败的处理
    iconElement.onerror = function() {
      // 尝试使用备用图标
      this.src = 'icons/tech/default.svg';
      
      // 如果备用图标也不存在，显示技术名称的首字母
      this.onerror = function() {
        const initialDiv = document.createElement('div');
        initialDiv.className = 'icon-fallback';
        initialDiv.textContent = techName.charAt(0).toUpperCase();
        this.parentNode.replaceChild(initialDiv, this);
      };
    };
    
    // 设置技术名称和版本
    nameElement.textContent = techName;
    versionElement.textContent = version ? `版本: ${version}` : '';
    
    // 设置技术描述
    descriptionElement.textContent = techData.description;
    
    // 设置技术特点
    featuresElement.innerHTML = '';
    techData.features.forEach(feature => {
      const li = document.createElement('li');
      li.textContent = feature;
      featuresElement.appendChild(li);
    });
    
    // 设置学习资源
    resourcesElement.innerHTML = '';
    techData.resources.forEach(resource => {
      const a = document.createElement('a');
      a.href = resource.url;
      a.className = 'resource-item';
      a.target = '_blank';
      a.innerHTML = `
        <div class="resource-title">${resource.title}</div>
        <div class="resource-description">${resource.description}</div>
      `;
      resourcesElement.appendChild(a);
    });
  });
}

// 显示错误信息
function showError(message) {
  const container = document.querySelector('.container');
  container.innerHTML = `
    <div style="text-align: center; padding: 50px;">
      <h2>出错了</h2>
      <p>${message}</p>
      <a href="#" class="back-button" onclick="window.close(); return false;">返回</a>
    </div>
  `;
} 