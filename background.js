// 监听来自popup.js的消息
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'chatWithOllama') {
    handleChatWithOllama(request, sendResponse);
    return true; // 保持消息通道开放以进行异步响应
  } else if (request.action === 'technologiesUpdated' && sender.tab) {
    // 转发技术更新消息到popup
    chrome.runtime.sendMessage({
      action: 'updateTechList',
      technologies: request.technologies,
      tabId: sender.tab.id
    });
  }
});

// 监听标签页更新
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete' && tab.url && !tab.url.startsWith('chrome://')) {
    // 向内容脚本发送消息启动观察器
    setTimeout(() => {
      chrome.tabs.sendMessage(tabId, { action: 'watchPageChanges' })
        .catch(() => {}); // 忽略错误，因为内容脚本可能还没有加载
    }, 1000);
  }
});

/**
 * 处理与Ollama的聊天请求
 * @param {Object} request 请求数据
 * @param {Function} sendResponse 响应回调
 */
async function handleChatWithOllama(request, sendResponse) {
  const { message, enableWebSearch, ollamaUrl, ollamaModel } = request;
  
  try {
    let context = `当前时间：${new Date().toLocaleString()}`;
    let enhancedMessage = message;
    
    // 如果启用了网络搜索，先进行搜索
    if (enableWebSearch) {
      const searchResults = await performWebSearch(message);
      context += `\n\n搜索结果：\n${searchResults}`;
      enhancedMessage = `基于以下搜索结果回答用户问题:\n${searchResults}\n\n用户问题: ${message}`;
    }
    
    // 调用Ollama API
    const response = await fetch(`${ollamaUrl}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: ollamaModel,
        messages: [
          {
            role: 'system',
            content: `你是一个有帮助的AI助手。${context}
            
请根据用户的问题提供信息和帮助。如果你的知识不足或不确定，请诚实地承认并提供已知最佳答案。`
          },
          {
            role: 'user',
            content: enhancedMessage
          }
        ],
        stream: false
      })
    });
    
    if (!response.ok) {
      throw new Error(`Ollama API错误: ${response.status}`);
    }
    
    const data = await response.json();
    const reply = data.message.content;
    
    // 将回复发送回popup
    sendResponse({ reply });
    
    // 记录对话以进行学习
    saveConversation(message, reply, enableWebSearch);
    
  } catch (error) {
    console.error('与Ollama通信时出错:', error);
    sendResponse({ 
      reply: `抱歉，发生错误：${error.message}。请确保Ollama正在本地运行，并检查设置中的URL和模型名称是否正确。` 
    });
  }
}

/**
 * 执行网络搜索
 * @param {string} query 搜索查询
 * @returns {Promise<string>} 搜索结果
 */
async function performWebSearch(query) {
  try {
    // 使用DuckDuckGo API进行搜索
    // 注意：这是一个模拟的API调用，实际使用中需要根据实际情况调整
    const response = await fetch(`https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json`);
    
    if (!response.ok) {
      return "无法获取搜索结果";
    }
    
    const data = await response.json();
    
    // 处理搜索结果
    let searchResults = '';
    
    if (data.AbstractText) {
      searchResults += `摘要: ${data.AbstractText}\n`;
    }
    
    if (data.RelatedTopics && data.RelatedTopics.length > 0) {
      searchResults += '\n相关主题:\n';
      data.RelatedTopics.slice(0, 5).forEach((topic, index) => {
        if (topic.Text) {
          searchResults += `${index + 1}. ${topic.Text}\n`;
        }
      });
    }
    
    return searchResults || "未找到相关搜索结果";
  } catch (error) {
    console.error('执行网络搜索时出错:', error);
    return "执行搜索时发生错误";
  }
}

/**
 * 保存对话以供学习
 * @param {string} userMessage 用户消息
 * @param {string} aiReply AI回复
 * @param {boolean} usedWebSearch 是否使用了网络搜索
 */
function saveConversation(userMessage, aiReply, usedWebSearch) {
  chrome.storage.local.get(['conversations'], function(result) {
    const conversations = result.conversations || [];
    
    conversations.push({
      timestamp: Date.now(),
      userMessage,
      aiReply,
      usedWebSearch
    });
    
    // 只保留最近的100条对话
    if (conversations.length > 100) {
      conversations.shift();
    }
    
    chrome.storage.local.set({ conversations });
  });
}

// 扩展安装或更新时的处理
chrome.runtime.onInstalled.addListener(function(details) {
  if (details.reason === 'install') {
    // 首次安装
    chrome.tabs.create({
      url: 'welcome.html'
    });
  } else if (details.reason === 'update') {
    // 版本更新
    const currentVersion = chrome.runtime.getManifest().version;
    const previousVersion = details.previousVersion;
    
    // 记录更新信息
    console.log(`扩展从 ${previousVersion} 更新到 ${currentVersion}`);
  }
}); 