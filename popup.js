document.addEventListener('DOMContentLoaded', function() {
  // 初始化标签页功能
  initTabs();
  
  // 初始化设置
  loadSettings();
  
  // 绑定发送按钮事件
  document.getElementById('send-button').addEventListener('click', sendMessage);
  
  // 绑定输入框的回车键事件
  document.getElementById('chat-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });
  
  // 绑定保存设置按钮事件
  document.getElementById('save-settings').addEventListener('click', saveSettings);
  
  // 获取当前活跃标签页并检测技术
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    if (tabs[0]) {
      detectTechnologies(tabs[0].id);
      
      // 保存当前活跃标签ID
      currentTabId = tabs[0].id;
    }
  });
  
  // 监听来自background的消息
  chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action === 'updateTechList' && message.tabId === currentTabId) {
      updateTechnologiesList(message.technologies);
    }
  });
});

// 当前活跃标签ID
let currentTabId = null;

// 标签页切换功能
function initTabs() {
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const tabName = button.getAttribute('data-tab');
      
      // 更新按钮状态
      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // 更新内容显示
      tabContents.forEach(content => {
        if (content.id === tabName) {
          content.classList.add('active');
        } else {
          content.classList.remove('active');
        }
      });
    });
  });
}

// 加载设置
function loadSettings() {
  chrome.storage.local.get(['ollamaUrl', 'ollamaModel'], function(result) {
    if (result.ollamaUrl) {
      document.getElementById('ollama-url').value = result.ollamaUrl;
    }
    if (result.ollamaModel) {
      document.getElementById('ollama-model').value = result.ollamaModel;
    }
  });
}

// 保存设置
function saveSettings() {
  const ollamaUrl = document.getElementById('ollama-url').value;
  const ollamaModel = document.getElementById('ollama-model').value;
  
  chrome.storage.local.set({
    ollamaUrl: ollamaUrl,
    ollamaModel: ollamaModel
  }, function() {
    const saveButton = document.getElementById('save-settings');
    const originalText = saveButton.textContent;
    
    saveButton.textContent = '已保存！';
    setTimeout(() => {
      saveButton.textContent = originalText;
    }, 2000);
  });
}

// 检测网页技术
function detectTechnologies(tabId) {
  const techLoader = document.getElementById('tech-loader');
  const techList = document.getElementById('tech-list');
  
  techLoader.classList.add('active');
  techList.innerHTML = '';
  
  // 调用content script来检测技术
  chrome.tabs.sendMessage(tabId, { action: 'detectTechnologies' }, function(response) {
    techLoader.classList.remove('active');
    
    if (chrome.runtime.lastError || !response) {
      // 如果content script未响应，可能是因为它还没有加载
      techList.innerHTML = '<div class="error">正在加载检测模块，请稍后再试...</div>';
      return;
    }
    
    updateTechnologiesList(response.technologies);
  });
}

// 更新技术列表
function updateTechnologiesList(technologies) {
  const techList = document.getElementById('tech-list');
  
  // 清空现有列表
  techList.innerHTML = '';
  
  if (technologies && technologies.length > 0) {
    // 添加自动更新标签
    const autoUpdateBadge = document.createElement('div');
    autoUpdateBadge.className = 'auto-update-badge';
    autoUpdateBadge.textContent = '自动更新已启用';
    techList.appendChild(autoUpdateBadge);
    
    // 添加技术项
    technologies.forEach(tech => {
      const techItem = document.createElement('div');
      techItem.className = 'tech-item';
      techItem.setAttribute('data-tech', tech.name);
      
      // 技术图标（SVG）
      if (tech.icon) {
        const iconContainer = document.createElement('div');
        
        // 创建图片元素
        const img = document.createElement('img');
        img.className = 'tech-icon';
        img.alt = tech.name;
        img.src = tech.icon;
        
        // 添加图片加载错误处理
        img.onerror = function() {
          // 创建文字首字母作为替代
          const fallback = document.createElement('div');
          fallback.className = 'icon-fallback';
          fallback.textContent = tech.name.charAt(0).toUpperCase();
          this.parentNode.replaceChild(fallback, this);
        };
        
        iconContainer.appendChild(img);
        techItem.appendChild(iconContainer);
      }
      
      // 技术名称
      const nameSpan = document.createElement('span');
      nameSpan.className = 'tech-name';
      nameSpan.textContent = tech.name;
      techItem.appendChild(nameSpan);
      
      // 技术版本（如果有）
      if (tech.version) {
        const versionSpan = document.createElement('span');
        versionSpan.className = 'tech-version';
        versionSpan.textContent = `v${tech.version}`;
        techItem.appendChild(versionSpan);
      }
      
      // 添加查看详情图标
      const detailsBtn = document.createElement('span');
      detailsBtn.className = 'tech-details-button';
      detailsBtn.title = '查看详情';
      detailsBtn.textContent = 'ℹ️';
      techItem.appendChild(detailsBtn);
      
      // 添加点击事件打开详情页
      techItem.addEventListener('click', function() {
        openTechDetails(tech);
      });
      
      techList.appendChild(techItem);
    });
  } else {
    techList.innerHTML = '<div class="no-tech">未检测到明确的框架或库</div>';
  }
  
  // 添加自动更新效果
  techList.classList.add('updated');
  setTimeout(() => {
    techList.classList.remove('updated');
  }, 1000);
}

// 打开技术详情页
function openTechDetails(tech) {
  // 保存当前技术详情到存储，以便详情页读取
  chrome.storage.local.set({
    currentTechDetails: {
      tech: tech.name,
      iconSrc: tech.icon,
      techVersion: tech.version
    }
  }, function() {
    // 打开详情页
    chrome.tabs.create({
      url: `tech_details.html?tech=${encodeURIComponent(tech.name)}`
    });
  });
}

// 发送消息到AI助手
function sendMessage() {
  const chatInput = document.getElementById('chat-input');
  const message = chatInput.value.trim();
  
  if (!message) return;
  
  // 添加用户消息到聊天区域
  addMessage(message, 'user');
  chatInput.value = '';
  
  // 获取是否启用网络搜索
  const enableWebSearch = document.getElementById('enable-web-search').checked;
  
  // 从设置中获取Ollama URL和模型
  chrome.storage.local.get(['ollamaUrl', 'ollamaModel'], function(result) {
    const ollamaUrl = result.ollamaUrl || 'http://localhost:11434';
    const ollamaModel = result.ollamaModel || 'llama3';
    
    // 显示加载中的消息
    const loadingMsgId = addMessage('思考中...', 'ai', true);
    
    // 发送消息到background script处理
    chrome.runtime.sendMessage({
      action: 'chatWithOllama',
      message: message,
      enableWebSearch: enableWebSearch,
      ollamaUrl: ollamaUrl,
      ollamaModel: ollamaModel
    }, function(response) {
      // 移除加载消息
      removeMessage(loadingMsgId);
      
      if (chrome.runtime.lastError || !response) {
        addMessage('抱歉，无法连接到Ollama服务。请确保Ollama正在运行且设置正确。', 'ai');
        return;
      }
      
      // 添加AI回复
      addMessage(response.reply, 'ai');
    });
  });
}

// 添加消息到聊天区域
function addMessage(text, sender, isLoading = false) {
  const chatMessages = document.getElementById('chat-messages');
  const messageElement = document.createElement('div');
  const msgId = 'msg-' + Date.now();
  
  messageElement.id = msgId;
  messageElement.className = `message ${sender}-message`;
  
  if (isLoading) {
    messageElement.innerHTML = `<div class="loading-dots">${text}</div>`;
  } else {
    messageElement.textContent = text;
  }
  
  chatMessages.appendChild(messageElement);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  
  return msgId;
}

// 移除消息
function removeMessage(msgId) {
  const messageElement = document.getElementById(msgId);
  if (messageElement) {
    messageElement.remove();
  }
} 