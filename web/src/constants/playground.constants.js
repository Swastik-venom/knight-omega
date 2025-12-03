/*
Copyright (C) 2025 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/

export const MESSAGE_STATUS = {
  LOADING: 'loading',
  INCOMPLETE: 'incomplete',
  COMPLETE: 'complete',
  ERROR: 'error',
};

export const MESSAGE_ROLES = {
  USER: 'user',
  ASSISTANT: 'assistant',
  SYSTEM: 'system',
};

// 默认消息示例 - 使用函数生成以支持 i18n
export const getDefaultMessages = (t) => [
  {
    role: MESSAGE_ROLES.USER,
    id: '2',
    createAt: 1715676751919,
    content: t('默认用户消息'),
  },
  {
    role: MESSAGE_ROLES.ASSISTANT,
    id: '3',
    createAt: 1715676751919,
    content: t('默认助手消息'),
    reasoningContent: '',
    isReasoningExpanded: false,
  },
];

// 保留旧的导出以保持向后兼容
export const DEFAULT_MESSAGES = [
  {
    role: MESSAGE_ROLES.USER,
    id: '2',
    createAt: 1715676751919,
    content: 'Hello',
  },
  {
    role: MESSAGE_ROLES.ASSISTANT,
    id: '3',
    createAt: 1715676751919,
    content: 'Hello! How can I help you today?',
    reasoningContent: '',
    isReasoningExpanded: false,
  },
];

// ========== UI 相关常量 ==========
export const DEBUG_TABS = {
  PREVIEW: 'preview',
  REQUEST: 'request',
  RESPONSE: 'response',
};

// ========== API 相关常量 ==========
export const API_ENDPOINTS = {
  CHAT_COMPLETIONS: '/pg/chat/completions',
  USER_MODELS: '/api/user/models',
  USER_GROUPS: '/api/user/self/groups',
};

// ========== 配置默认值 ==========
export const DEFAULT_CONFIG = {
  inputs: {
    model: 'gpt-4o',
    group: '',
    temperature: 0.7,
    top_p: 1,
    max_tokens: 4096,
    frequency_penalty: 0,
    presence_penalty: 0,
    seed: null,
    stream: true,
    imageEnabled: false,
    imageUrls: [''],
  },
  parameterEnabled: {
    temperature: true,
    top_p: true,
    max_tokens: false,
    frequency_penalty: true,
    presence_penalty: true,
    seed: false,
  },
  systemPrompt: '',
  showDebugPanel: false,
  customRequestMode: false,
  customRequestBody: '',
};

// ========== 正则表达式 ==========
export const THINK_TAG_REGEX = /<think>([\s\S]*?)<\/think>/g;

// ========== Error Messages ==========
export const ERROR_MESSAGES = {
  NO_TEXT_CONTENT: 'This message has no text content to copy',
  INVALID_MESSAGE_TYPE: 'Cannot copy this type of message content',
  COPY_FAILED: 'Copy failed, please manually select and copy the text',
  COPY_HTTPS_REQUIRED: 'Copy function requires HTTPS environment, please copy manually',
  BROWSER_NOT_SUPPORTED: 'Browser does not support copy function, please copy manually',
  JSON_PARSE_ERROR: 'Custom request body format error, please check JSON format',
  API_REQUEST_ERROR: 'Request error occurred',
  NETWORK_ERROR: 'Network connection failed or server not responding',
};

// ========== 存储键名 ==========
export const STORAGE_KEYS = {
  CONFIG: 'playground_config',
  MESSAGES: 'playground_messages',
};
