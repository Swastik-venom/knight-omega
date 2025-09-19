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

import React, { useContext, useEffect, useState, useRef } from 'react';
import {
  Button,
  Typography,
  Input,
  ScrollList,
  ScrollItem,
} from '@douyinfe/semi-ui';
import { API, showError, copy, showSuccess } from '../../helpers';
import { useIsMobile } from '../../hooks/common/useIsMobile';
import { API_ENDPOINTS } from '../../constants/common.constant';
import { StatusContext } from '../../context/Status';
import { useActualTheme } from '../../context/Theme';
import { marked } from 'marked';
import { useTranslation } from 'react-i18next';
import {
  IconGithubLogo,
  IconPlay,
  IconFile,
  IconCopy,
} from '@douyinfe/semi-icons';
import { Link } from 'react-router-dom';
import NoticeModal from '../../components/layout/NoticeModal';
import {
  Moonshot,
  OpenAI,
  XAI,
  Zhipu,
  Volcengine,
  Cohere,
  Claude,
  Gemini,
  Suno,
  Minimax,
  Wenxin,
  Spark,
  Qingyan,
  DeepSeek,
  Qwen,
  Midjourney,
  Grok,
  AzureAI,
  Hunyuan,
  Xinference,
} from '@lobehub/icons';

const { Text } = Typography;

// Animated Counter Component
const AnimatedCounter = ({ end, duration = 2000, suffix = '', prefix = '' }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime;
    const startValue = 0;
    const endValue = end;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(startValue + (endValue - startValue) * easeOutQuart);
      
      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return (
    <div ref={counterRef} className='text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2'>
      {prefix}{count}{suffix}
    </div>
  );
};

const Home = () => {
  const { t, i18n } = useTranslation();
  const [statusState] = useContext(StatusContext);
  const actualTheme = useActualTheme();
  const [homePageContentLoaded, setHomePageContentLoaded] = useState(false);
  const [homePageContent, setHomePageContent] = useState('');
  const [noticeVisible, setNoticeVisible] = useState(false);
  const isMobile = useIsMobile();
  const isDemoSiteMode = statusState?.status?.demo_site_enabled || false;
  const docsLink = statusState?.status?.docs_link || '';
  const serverAddress =
    statusState?.status?.server_address || `${window.location.origin}`;
  const endpointItems = API_ENDPOINTS.map((e) => ({ value: e }));
  const [endpointIndex, setEndpointIndex] = useState(0);
  const isChinese = i18n.language.startsWith('zh');

  const displayHomePageContent = async () => {
    setHomePageContent(localStorage.getItem('home_page_content') || '');
    const res = await API.get('/api/home_page_content');
    const { success, message, data } = res.data;
    if (success) {
      let content = data;
      if (!data.startsWith('https://')) {
        content = marked.parse(data);
      }
      setHomePageContent(content);
      localStorage.setItem('home_page_content', content);

      // 如果内容是 URL，则发送主题模式
      if (data.startsWith('https://')) {
        const iframe = document.querySelector('iframe');
        if (iframe) {
          iframe.onload = () => {
            iframe.contentWindow.postMessage({ themeMode: actualTheme }, '*');
            iframe.contentWindow.postMessage({ lang: i18n.language }, '*');
          };
        }
      }
    } else {
      showError(message);
      setHomePageContent('加载首页内容失败...');
    }
    setHomePageContentLoaded(true);
  };

  const handleCopyBaseURL = async () => {
    const ok = await copy(serverAddress);
    if (ok) {
      showSuccess(t('已复制到剪切板'));
    }
  };

  useEffect(() => {
    const checkNoticeAndShow = async () => {
      const lastCloseDate = localStorage.getItem('notice_close_date');
      const today = new Date().toDateString();
      if (lastCloseDate !== today) {
        try {
          const res = await API.get('/api/notice');
          const { success, data } = res.data;
          if (success && data && data.trim() !== '') {
            setNoticeVisible(true);
          }
        } catch (error) {
          console.error('获取公告失败:', error);
        }
      }
    };

    checkNoticeAndShow();
  }, []);

  useEffect(() => {
    displayHomePageContent().then();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setEndpointIndex((prev) => (prev + 1) % endpointItems.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [endpointItems.length]);

  return (
    <div className='w-full overflow-x-hidden'>
      <NoticeModal
        visible={noticeVisible}
        onClose={() => setNoticeVisible(false)}
        isMobile={isMobile}
      />
      {homePageContentLoaded && homePageContent === '' ? (
        <div className='w-full overflow-x-hidden'>
          {/* Enhanced Hero Section */}
          <div className='w-full border-b border-semi-color-border min-h-[500px] md:min-h-[600px] lg:min-h-[700px] relative overflow-hidden'>
            {/* Dynamic Animated Background */}
            <div className='absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20'></div>
            
            {/* Floating AI Provider Icons */}
            <div className='absolute inset-0 overflow-hidden pointer-events-none'>
              <div className='absolute top-20 left-[10%] w-12 h-12 opacity-20 dark:opacity-30 animate-float'>
                <img src="https://unpkg.com/@lobehub/icons-static-svg/icons/openai.svg" alt="OpenAI" className='w-full h-full filter blur-[0.5px]' />
              </div>
              <div className='absolute top-32 right-[15%] w-10 h-10 opacity-15 dark:opacity-25 animate-float' style={{animationDelay: '2s'}}>
                <img src="https://unpkg.com/@lobehub/icons-static-svg/icons/anthropic.svg" alt="Anthropic" className='w-full h-full filter blur-[0.5px]' />
              </div>
              <div className='absolute top-[60%] left-[20%] w-14 h-14 opacity-25 dark:opacity-35 animate-float' style={{animationDelay: '4s'}}>
                <img src="https://unpkg.com/@lobehub/icons-static-svg/icons/google.svg" alt="Google" className='w-full h-full filter blur-[0.5px]' />
              </div>
              <div className='absolute bottom-32 right-[25%] w-11 h-11 opacity-20 dark:opacity-30 animate-float' style={{animationDelay: '1s'}}>
                <img src="https://unpkg.com/@lobehub/icons-static-svg/icons/mistral.svg" alt="Mistral" className='w-full h-full filter blur-[0.5px]' />
              </div>
              <div className='absolute top-[45%] right-[8%] w-9 h-9 opacity-15 dark:opacity-25 animate-float' style={{animationDelay: '3s'}}>
                <img src="https://unpkg.com/@lobehub/icons-static-svg/icons/cohere.svg" alt="Cohere" className='w-full h-full filter blur-[0.5px]' />
              </div>
              <div className='absolute bottom-[20%] left-[12%] w-13 h-13 opacity-20 dark:opacity-30 animate-float' style={{animationDelay: '5s'}}>
                <img src="https://unpkg.com/@lobehub/icons-static-svg/icons/huggingface.svg" alt="HuggingFace" className='w-full h-full filter blur-[0.5px]' />
              </div>
            </div>
            
            {/* Enhanced Colorful Blur Orbs */}
            <div className='absolute top-10 left-5 w-80 h-80 bg-gradient-to-br from-pink-400/30 via-purple-500/25 to-indigo-600/30 dark:from-pink-400/20 dark:via-purple-500/15 dark:to-indigo-600/20 rounded-full blur-3xl animate-pulse opacity-70'></div>
            <div className='absolute top-32 right-10 w-96 h-96 bg-gradient-to-br from-cyan-400/25 via-blue-500/30 to-purple-600/25 dark:from-cyan-400/15 dark:via-blue-500/20 dark:to-purple-600/15 rounded-full blur-3xl animate-pulse delay-1000 opacity-60'></div>
            <div className='absolute bottom-20 left-20 w-72 h-72 bg-gradient-to-br from-orange-400/30 via-red-500/25 to-pink-600/30 dark:from-orange-400/20 dark:via-red-500/15 dark:to-pink-600/20 rounded-full blur-3xl animate-pulse delay-500 opacity-75'></div>
            <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] bg-gradient-to-br from-emerald-400/20 via-teal-500/25 to-cyan-600/20 dark:from-emerald-400/10 dark:via-teal-500/15 dark:to-cyan-600/10 rounded-full blur-3xl animate-pulse delay-2000 opacity-50'></div>
            
            {/* Animated Grid Pattern */}
            <div className='absolute inset-0 opacity-[0.02] dark:opacity-[0.05]'>
              <div className='absolute inset-0' style={{
                backgroundImage: `
                  linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '60px 60px',
                animation: 'gridMove 20s linear infinite'
              }}></div>
            </div>
            
            {/* Floating Particles */}
            <div className='absolute inset-0 overflow-hidden pointer-events-none'>
              <div className='absolute top-[20%] left-[15%] w-2 h-2 bg-blue-400/60 rounded-full animate-ping'></div>
              <div className='absolute top-[70%] right-[20%] w-1 h-1 bg-purple-400/60 rounded-full animate-ping' style={{animationDelay: '1s'}}></div>
              <div className='absolute bottom-[30%] left-[25%] w-1.5 h-1.5 bg-pink-400/60 rounded-full animate-ping' style={{animationDelay: '2s'}}></div>
              <div className='absolute top-[60%] right-[35%] w-2 h-2 bg-cyan-400/60 rounded-full animate-ping' style={{animationDelay: '3s'}}></div>
            </div>
            <div className='flex items-center justify-center h-full px-4 py-20 md:py-24 lg:py-32 mt-10'>
              {/* 居中内容区 */}
              <div className='flex flex-col items-center justify-center text-center max-w-4xl mx-auto'>
                <div className='flex flex-col items-center justify-center mb-6 md:mb-8'>
                  <h1
                    className={`text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight ${isChinese ? 'tracking-wide md:tracking-wider' : ''}`}
                  >
                    {i18n.language === 'en' ? (
                      <>
                        The Unified
                        <br />
                        <span className='bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#ec4899] bg-clip-text text-transparent'>LLMs API Gateway</span>
                      </>
                    ) : (
                      <>
                        统一的
                        <br />
                        <span className='bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#ec4899] bg-clip-text text-transparent'>大模型接口网关</span>
                      </>
                    )}
                  </h1>
                  <p className='text-base md:text-lg lg:text-xl text-semi-color-text-1 mt-4 md:mt-6 max-w-xl'>
                    {t('更好的价格，更好的稳定性，只需要将模型基址替换为：')}
                  </p>
                  {/* BASE URL 与端点选择 */}
                  <div className='flex flex-col md:flex-row items-center justify-center gap-4 w-full mt-4 md:mt-6 max-w-md'>
                    <Input
                      readOnly
                      value={serverAddress}
                      className='flex-1 !rounded-full'
                      size={isMobile ? 'default' : 'large'}
                      suffix={
                        <div className='flex items-center gap-2'>
                          <ScrollList
                            bodyHeight={32}
                            style={{ border: 'unset', boxShadow: 'unset' }}
                          >
                            <ScrollItem
                              mode='wheel'
                              cycled={true}
                              list={endpointItems}
                              selectedIndex={endpointIndex}
                              onSelect={({ index }) => setEndpointIndex(index)}
                            />
                          </ScrollList>
                          <Button
                            type='primary'
                            onClick={handleCopyBaseURL}
                            icon={<IconCopy />}
                            className='!rounded-full'
                          />
                        </div>
                      }
                    />
                  </div>
                </div>

                {/* 操作按钮 - Glassmorphism Design */}
                <div className='flex flex-row gap-4 justify-center items-center'>
                  <Link to='/console'>
                    <Button
                      theme='solid'
                      type='primary'
                      size={isMobile ? 'default' : 'large'}
                      className='!rounded-3xl px-8 py-2 backdrop-blur-md bg-gradient-to-r from-[#6366f1]/80 to-[#8b5cf6]/80 hover:from-[#4f46e5] hover:to-[#7c3aed] transition-all duration-300 hover:shadow-lg hover:shadow-[#6366f1]/25 border border-white/20'
                      icon={<IconPlay />}
                    >
                      {t('获取密钥')}
                    </Button>
                  </Link>
                  {isDemoSiteMode && statusState?.status?.version ? (
                    <Button
                      size={isMobile ? 'default' : 'large'}
                      className='flex items-center !rounded-3xl px-6 py-2 backdrop-blur-md bg-white/10 border border-white/30 text-semi-color-text-0 hover:bg-white/20 hover:border-white/40 transition-all duration-300'
                      icon={<IconGithubLogo />}
                      onClick={() =>
                        window.open(
                          'https://github.com/QuantumNous/new-api',
                          '_blank',
                        )
                      }
                    >
                      {statusState.status.version}
                    </Button>
                  ) : (
                    docsLink && (
                      <Button
                        size={isMobile ? 'default' : 'large'}
                        className='flex items-center !rounded-3xl px-6 py-2 backdrop-blur-md bg-white/10 border border-white/30 text-semi-color-text-0 hover:bg-white/20 hover:border-white/40 transition-all duration-300'
                        icon={<IconFile />}
                        onClick={() => window.open(docsLink, '_blank')}
                      >
                        {t('文档')}
                      </Button>
                    )
                  )}
                </div>

                {/* 框架兼容性图标 */}
                <div className='mt-12 md:mt-16 lg:mt-20 w-full'>
                  <div className='flex items-center mb-6 md:mb-8 justify-center'>
                    <Text
                      type='tertiary'
                      className='text-lg md:text-xl lg:text-2xl font-light'
                    >
                      {t('支持众多的大模型供应商')}
                    </Text>
                  </div>
                  <div className='flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 max-w-5xl mx-auto px-4'>
                    <div className='w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center'>
                      <Moonshot size={40} />
                    </div>
                    <div className='w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center'>
                      <OpenAI size={40} />
                    </div>
                    <div className='w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center'>
                      <XAI size={40} />
                    </div>
                    <div className='w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center'>
                      <Zhipu.Color size={40} />
                    </div>
                    <div className='w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center'>
                      <Volcengine.Color size={40} />
                    </div>
                    <div className='w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center'>
                      <Cohere.Color size={40} />
                    </div>
                    <div className='w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center'>
                      <Claude.Color size={40} />
                    </div>
                    <div className='w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center'>
                      <Gemini.Color size={40} />
                    </div>
                    <div className='w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center'>
                      <Suno size={40} />
                    </div>
                    <div className='w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center'>
                      <Minimax.Color size={40} />
                    </div>
                    <div className='w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center'>
                      <Wenxin.Color size={40} />
                    </div>
                    <div className='w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center'>
                      <Spark.Color size={40} />
                    </div>
                    <div className='w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center'>
                      <Qingyan.Color size={40} />
                    </div>
                    <div className='w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center'>
                      <DeepSeek.Color size={40} />
                    </div>
                    <div className='w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center'>
                      <Qwen.Color size={40} />
                    </div>
                    <div className='w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center'>
                      <Midjourney size={40} />
                    </div>
                    <div className='w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center'>
                      <Grok size={40} />
                    </div>
                    <div className='w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center'>
                      <AzureAI.Color size={40} />
                    </div>
                    <div className='w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center'>
                      <Hunyuan.Color size={40} />
                    </div>
                    <div className='w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center'>
                      <Xinference.Color size={40} />
                    </div>
                    <div className='w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center'>
                      <Typography.Text className='!text-lg sm:!text-xl md:!text-2xl lg:!text-3xl font-bold'>
                        30+
                      </Typography.Text>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features Section - Glassmorphism Design */}
          <div className='w-full py-16 md:py-20 lg:py-24 bg-gradient-to-b from-semi-color-bg-0 to-semi-color-bg-1 relative overflow-hidden'>
            {/* Animated Background Elements */}
            <div className='absolute inset-0'>
              <div className='absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-[#6366f1]/20 to-[#8b5cf6]/20 rounded-full blur-3xl animate-pulse'></div>
              <div className='absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-[#06b6d4]/20 to-[#0891b2]/20 rounded-full blur-3xl animate-pulse delay-1000'></div>
              <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-[#f59e0b]/20 to-[#ef4444]/20 rounded-full blur-3xl animate-pulse delay-500'></div>
            </div>
            
            <div className='max-w-7xl mx-auto px-4 relative z-10'>
              <div className='text-center mb-12 md:mb-16'>
                <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-semi-color-text-0 mb-4'>
                  <span className='bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#ec4899] bg-clip-text text-transparent'>
                    {i18n.language === 'en' ? 'Powerful Features' : '强大功能'}
                  </span>
                </h2>
                <p className='text-lg md:text-xl text-semi-color-text-1 max-w-3xl mx-auto'>
                  {i18n.language === 'en' 
                    ? 'Everything you need to manage and scale your AI applications'
                    : '管理和发展AI应用所需的一切功能'
                  }
                </p>
              </div>
              
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'>
                {/* Feature 1 - Glassmorphism Indigo/Purple Theme */}
                <div className='group p-6 md:p-8 rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 hover:border-[#6366f1]/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:shadow-[#6366f1]/20 hover:bg-white/20'>
                  <div className='w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 backdrop-blur-sm'>
                    <IconPlay className='text-white text-xl' />
                  </div>
                  <h3 className='text-xl md:text-2xl font-semibold text-semi-color-text-0 mb-3'>
                    {i18n.language === 'en' ? 'Easy Integration' : '轻松集成'}
                  </h3>
                  <p className='text-semi-color-text-1 leading-relaxed'>
                    {i18n.language === 'en' 
                      ? 'Drop-in replacement for OpenAI API. No code changes required.'
                      : 'OpenAI API的即插即用替代方案，无需修改代码。'
                    }
                  </p>
                </div>

                {/* Feature 2 - Glassmorphism Cyan/Teal Theme */}
                <div className='group p-6 md:p-8 rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 hover:border-[#06b6d4]/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:shadow-[#06b6d4]/20 hover:bg-white/20'>
                  <div className='w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-[#06b6d4] to-[#0891b2] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 backdrop-blur-sm'>
                    <IconFile className='text-white text-xl' />
                  </div>
                  <h3 className='text-xl md:text-2xl font-semibold text-semi-color-text-0 mb-3'>
                    {i18n.language === 'en' ? 'Multi-Provider' : '多供应商'}
                  </h3>
                  <p className='text-semi-color-text-1 leading-relaxed'>
                    {i18n.language === 'en' 
                      ? 'Access 30+ AI providers through a single unified interface.'
                      : '通过统一的接口访问30多个AI供应商。'
                    }
                  </p>
                </div>

                {/* Feature 3 - Glassmorphism Orange/Red Theme */}
                <div className='group p-6 md:p-8 rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 hover:border-[#f59e0b]/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:shadow-[#f59e0b]/20 hover:bg-white/20'>
                  <div className='w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-[#f59e0b] to-[#ef4444] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 backdrop-blur-sm'>
                    <IconCopy className='text-white text-xl' />
                  </div>
                  <h3 className='text-xl md:text-2xl font-semibold text-semi-color-text-0 mb-3'>
                    {i18n.language === 'en' ? 'Cost Optimization' : '成本优化'}
                  </h3>
                  <p className='text-semi-color-text-1 leading-relaxed'>
                    {i18n.language === 'en' 
                      ? 'Intelligent routing and load balancing to minimize costs.'
                      : '智能路由和负载均衡，最大化降低成本。'
                    }
                  </p>
                </div>

                {/* Feature 4 - Glassmorphism Purple/Pink Theme */}
                <div className='group p-6 md:p-8 rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 hover:border-[#8b5cf6]/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:shadow-[#8b5cf6]/20 hover:bg-white/20'>
                  <div className='w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-[#8b5cf6] to-[#ec4899] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 backdrop-blur-sm'>
                    <IconGithubLogo className='text-white text-xl' />
                  </div>
                  <h3 className='text-xl md:text-2xl font-semibold text-semi-color-text-0 mb-3'>
                    {i18n.language === 'en' ? 'Open Source' : '开源项目'}
                  </h3>
                  <p className='text-semi-color-text-1 leading-relaxed'>
                    {i18n.language === 'en' 
                      ? 'Fully open source with active community support.'
                      : '完全开源，拥有活跃的社区支持。'
                    }
                  </p>
                </div>

                {/* Feature 5 - Glassmorphism Emerald/Green Theme */}
                <div className='group p-6 md:p-8 rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 hover:border-[#10b981]/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:shadow-[#10b981]/20 hover:bg-white/20'>
                  <div className='w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-[#10b981] to-[#059669] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 backdrop-blur-sm'>
                    <div className='w-6 h-6 border-2 border-white rounded-full'></div>
                  </div>
                  <h3 className='text-xl md:text-2xl font-semibold text-semi-color-text-0 mb-3'>
                    {i18n.language === 'en' ? 'High Availability' : '高可用性'}
                  </h3>
                  <p className='text-semi-color-text-1 leading-relaxed'>
                    {i18n.language === 'en' 
                      ? '99.9% uptime with automatic failover and monitoring.'
                      : '99.9%正常运行时间，自动故障转移和监控。'
                    }
                  </p>
                </div>

                {/* Feature 6 - Glassmorphism Amber/Yellow Theme */}
                <div className='group p-6 md:p-8 rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 hover:border-[#f59e0b]/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:shadow-[#f59e0b]/20 hover:bg-white/20'>
                  <div className='w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-[#f59e0b] to-[#d97706] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 backdrop-blur-sm'>
                    <div className='w-6 h-6 border-2 border-white rounded'></div>
                  </div>
                  <h3 className='text-xl md:text-2xl font-semibold text-semi-color-text-0 mb-3'>
                    {i18n.language === 'en' ? 'Advanced Analytics' : '高级分析'}
                  </h3>
                  <p className='text-semi-color-text-1 leading-relaxed'>
                    {i18n.language === 'en' 
                      ? 'Detailed usage analytics and performance insights.'
                      : '详细的使用分析和性能洞察。'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Statistics Section - Modern Unique Design */}
          <div className='w-full py-16 md:py-20 relative overflow-hidden'>
            {/* Modern Geometric Background */}
            <div className='absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900'>
              {/* Animated Grid Pattern */}
              <div className='absolute inset-0 opacity-20'>
                <div className='absolute inset-0' style={{
                  backgroundImage: `
                    linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)
                  `,
                  backgroundSize: '50px 50px'
                }}></div>
              </div>
              
              {/* Floating Geometric Shapes */}
              <div className='absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-[#6366f1]/30 to-[#8b5cf6]/30 rounded-2xl rotate-45 animate-pulse'></div>
              <div className='absolute top-32 right-32 w-24 h-24 bg-gradient-to-br from-[#8b5cf6]/30 to-[#ec4899]/30 rounded-full animate-pulse delay-1000'></div>
              <div className='absolute bottom-20 left-1/4 w-40 h-40 bg-gradient-to-br from-[#ec4899]/30 to-[#f59e0b]/30 rounded-lg rotate-12 animate-pulse delay-500'></div>
              <div className='absolute bottom-32 right-20 w-28 h-28 bg-gradient-to-br from-[#06b6d4]/30 to-[#10b981]/30 rounded-3xl -rotate-12 animate-pulse delay-700'></div>
              
              {/* Animated Lines */}
              <div className='absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#6366f1]/50 to-transparent animate-pulse'></div>
              <div className='absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#8b5cf6]/50 to-transparent animate-pulse delay-1000'></div>
              
              {/* Floating Particles */}
              <div className='absolute top-1/3 left-1/3 w-2 h-2 bg-white/60 rounded-full animate-ping'></div>
              <div className='absolute top-2/3 right-1/3 w-1 h-1 bg-[#6366f1]/80 rounded-full animate-ping delay-500'></div>
              <div className='absolute bottom-1/3 left-2/3 w-1.5 h-1.5 bg-[#8b5cf6]/80 rounded-full animate-ping delay-1000'></div>
            </div>
            
            <div className='max-w-6xl mx-auto px-4 relative z-10'>
              <div className='text-center mb-12'>
                <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4'>
                  {i18n.language === 'en' ? 'Trusted by Developers' : '开发者信赖'}
                </h2>
                <p className='text-lg md:text-xl text-white/90 max-w-2xl mx-auto'>
                  {i18n.language === 'en' 
                    ? 'Join thousands of developers building the future with AI'
                    : '加入数千名开发者，用AI构建未来'
                  }
                </p>
              </div>
              
              <div className='grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8'>
                {/* AI Providers Card */}
                <div className='text-center group relative'>
                  <div className='p-6 md:p-8 rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 shimmer-effect'>
                    <div className='w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 relative overflow-hidden'>
                      <div className='absolute inset-0 flex items-center justify-center opacity-70 group-hover:opacity-90 transition-opacity duration-300'>
                        <img src="https://unpkg.com/@lobehub/icons-static-svg/icons/openai.svg" alt="OpenAI" className='w-6 h-6 filter invert' />
                      </div>
                      <div className='absolute -inset-1 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300'></div>
                    </div>
                    <AnimatedCounter 
                      end={30} 
                      duration={2000} 
                      suffix="+" 
                    />
                    <div className='text-white/80 text-lg group-hover:text-white transition-colors duration-300'>
                      {i18n.language === 'en' ? 'AI Providers' : 'AI供应商'}
                    </div>
                    
                    {/* Floating Provider Icons */}
                    <div className='absolute -top-2 -right-2 w-8 h-8 opacity-50 group-hover:opacity-80 transition-opacity duration-300'>
                      <img src="https://unpkg.com/@lobehub/icons-static-svg/icons/anthropic.svg" alt="Anthropic" className='w-full h-full animate-float' style={{animationDelay: '1s'}} />
                    </div>
                    <div className='absolute -bottom-2 -left-2 w-6 h-6 opacity-40 group-hover:opacity-70 transition-opacity duration-300'>
                      <img src="https://unpkg.com/@lobehub/icons-static-svg/icons/google.svg" alt="Google" className='w-full h-full animate-float' style={{animationDelay: '2s'}} />
                    </div>
                  </div>
                </div>

                {/* Active Users Card */}
                <div className='text-center group relative'>
                  <div className='p-6 md:p-8 rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105'>
                    <div className='w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#8b5cf6] to-[#ec4899] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300'>
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                      </svg>
                    </div>
                    <AnimatedCounter 
                      end={10} 
                      duration={2500} 
                      suffix="K+" 
                    />
                    <div className='text-white/80 text-lg group-hover:text-white transition-colors duration-300'>
                      {i18n.language === 'en' ? 'Active Users' : '活跃用户'}
                    </div>
                  </div>
                </div>

                {/* Uptime Card */}
                <div className='text-center group relative'>
                  <div className='p-6 md:p-8 rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105'>
                    <div className='w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#10b981] to-[#059669] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300'>
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    </div>
                    <AnimatedCounter 
                      end={99.9} 
                      duration={3000} 
                      suffix="%" 
                    />
                    <div className='text-white/80 text-lg group-hover:text-white transition-colors duration-300'>
                      {i18n.language === 'en' ? 'Uptime' : '正常运行时间'}
                    </div>
                  </div>
                </div>

                {/* Support Card */}
                <div className='text-center group relative'>
                  <div className='p-6 md:p-8 rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105'>
                    <div className='w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#f59e0b] to-[#ef4444] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300'>
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </div>
                    <div className='text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300'>
                      24/7
                    </div>
                    <div className='text-white/80 text-lg group-hover:text-white transition-colors duration-300'>
                      {i18n.language === 'en' ? 'Support' : '技术支持'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonials Section with Marquee */}
          <div className='w-full py-16 md:py-20 bg-semi-color-bg-1 relative overflow-hidden'>
            {/* Background gradient overlay */}
            <div className='absolute inset-0 bg-gradient-to-r from-semi-color-bg-1 via-semi-color-bg-0 to-semi-color-bg-1 opacity-50'></div>
            
            <div className='max-w-7xl mx-auto px-4 relative z-10'>
              <div className='text-center mb-12'>
                <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-semi-color-text-0 mb-4'>
                  {i18n.language === 'en' ? 'What Our Users Say' : '用户评价'}
                </h2>
                <p className='text-lg md:text-xl text-semi-color-text-1 max-w-2xl mx-auto'>
                  {i18n.language === 'en' 
                    ? 'Hear from developers who are building amazing things'
                    : '听听正在构建精彩应用的开发者们怎么说'
                  }
                </p>
              </div>
              
              {/* Marquee Container */}
              <div className='relative'>
                {/* Fade edges */}
                <div className='absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-semi-color-bg-1 to-transparent z-10'></div>
                <div className='absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-semi-color-bg-1 to-transparent z-10'></div>
                
                {/* Marquee */}
                <div className='overflow-hidden'>
                  <div className='flex animate-marquee hover:pause-marquee'>
                    {/* First set of testimonials */}
                    <div className='flex space-x-6 min-w-max'>
                      {/* Testimonial 1 - Glassmorphism */}
                      <div className='p-6 md:p-8 rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 hover:shadow-lg hover:bg-white/20 transition-all duration-300 min-w-[350px] group'>
                        <div className='flex items-center mb-4'>
                          <div className='w-12 h-12 bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] rounded-full flex items-center justify-center text-white font-bold text-lg mr-4 group-hover:scale-110 transition-transform duration-300 backdrop-blur-sm'>
                            A
                          </div>
                          <div>
                            <div className='font-semibold text-semi-color-text-0'>Alex Chen</div>
                            <div className='text-sm text-semi-color-text-1'>Senior Developer</div>
                          </div>
                        </div>
                        <p className='text-semi-color-text-1 leading-relaxed'>
                          {i18n.language === 'en' 
                            ? '"This platform has revolutionized how we integrate AI into our applications. The unified API makes everything so much simpler."'
                            : '"这个平台彻底改变了我们将AI集成到应用中的方式。统一的API让一切都变得如此简单。"'
                          }
                        </p>
                      </div>

                      {/* Testimonial 2 - Glassmorphism */}
                      <div className='p-6 md:p-8 rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 hover:shadow-lg hover:bg-white/20 transition-all duration-300 min-w-[350px] group'>
                        <div className='flex items-center mb-4'>
                          <div className='w-12 h-12 bg-gradient-to-br from-[#10b981] to-[#059669] rounded-full flex items-center justify-center text-white font-bold text-lg mr-4 group-hover:scale-110 transition-transform duration-300 backdrop-blur-sm'>
                            S
                          </div>
                          <div>
                            <div className='font-semibold text-semi-color-text-0'>Sarah Johnson</div>
                            <div className='text-sm text-semi-color-text-1'>AI Engineer</div>
                          </div>
                        </div>
                        <p className='text-semi-color-text-1 leading-relaxed'>
                          {i18n.language === 'en' 
                            ? '"The cost savings are incredible. We reduced our AI costs by 60% while improving reliability."'
                            : '"成本节省令人难以置信。我们在提高可靠性的同时将AI成本降低了60%。"'
                          }
                        </p>
                      </div>

                      {/* Testimonial 3 - Glassmorphism */}
                      <div className='p-6 md:p-8 rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 hover:shadow-lg hover:bg-white/20 transition-all duration-300 min-w-[350px] group'>
                        <div className='flex items-center mb-4'>
                          <div className='w-12 h-12 bg-gradient-to-br from-[#f59e0b] to-[#ef4444] rounded-full flex items-center justify-center text-white font-bold text-lg mr-4 group-hover:scale-110 transition-transform duration-300 backdrop-blur-sm'>
                            M
                          </div>
                          <div>
                            <div className='font-semibold text-semi-color-text-0'>Mike Rodriguez</div>
                            <div className='text-sm text-semi-color-text-1'>CTO</div>
                          </div>
                        </div>
                        <p className='text-semi-color-text-1 leading-relaxed'>
                          {i18n.language === 'en' 
                            ? '"The analytics dashboard gives us insights we never had before. It\'s a game-changer for our AI strategy."'
                            : '"分析仪表板为我们提供了前所未有的洞察。这对我们的AI战略来说是改变游戏规则的存在。"'
                          }
                        </p>
                      </div>

                      {/* Testimonial 4 - Glassmorphism */}
                      <div className='p-6 md:p-8 rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 hover:shadow-lg hover:bg-white/20 transition-all duration-300 min-w-[350px] group'>
                        <div className='flex items-center mb-4'>
                          <div className='w-12 h-12 bg-gradient-to-br from-[#8b5cf6] to-[#ec4899] rounded-full flex items-center justify-center text-white font-bold text-lg mr-4 group-hover:scale-110 transition-transform duration-300 backdrop-blur-sm'>
                            E
                          </div>
                          <div>
                            <div className='font-semibold text-semi-color-text-0'>Emma Wilson</div>
                            <div className='text-sm text-semi-color-text-1'>Product Manager</div>
                          </div>
                        </div>
                        <p className='text-semi-color-text-1 leading-relaxed'>
                          {i18n.language === 'en' 
                            ? '"The seamless integration saved us weeks of development time. Our team can now focus on building features instead of managing APIs."'
                            : '"无缝集成为我们节省了数周的开发时间。我们的团队现在可以专注于构建功能而不是管理API。"'
                          }
                        </p>
                      </div>

                      {/* Testimonial 5 - Glassmorphism */}
                      <div className='p-6 md:p-8 rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 hover:shadow-lg hover:bg-white/20 transition-all duration-300 min-w-[350px] group'>
                        <div className='flex items-center mb-4'>
                          <div className='w-12 h-12 bg-gradient-to-br from-[#06b6d4] to-[#0891b2] rounded-full flex items-center justify-center text-white font-bold text-lg mr-4 group-hover:scale-110 transition-transform duration-300 backdrop-blur-sm'>
                            D
                          </div>
                          <div>
                            <div className='font-semibold text-semi-color-text-0'>David Kim</div>
                            <div className='text-sm text-semi-color-text-1'>Tech Lead</div>
                          </div>
                        </div>
                        <p className='text-semi-color-text-1 leading-relaxed'>
                          {i18n.language === 'en' 
                            ? '"Outstanding reliability and performance. We\'ve been using it for 6 months with zero downtime."'
                            : '"出色的可靠性和性能。我们已经使用了6个月，零停机时间。"'
                          }
                        </p>
                      </div>
                    </div>

                    {/* Duplicate set for seamless loop */}
                    <div className='flex space-x-6 min-w-max ml-6'>
                      {/* Testimonial 1 - Duplicate */}
                      <div className='p-6 md:p-8 rounded-2xl bg-semi-color-bg-0 border border-semi-color-border hover:shadow-lg transition-all duration-300 min-w-[350px] group'>
                        <div className='flex items-center mb-4'>
                          <div className='w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4 group-hover:scale-110 transition-transform duration-300'>
                            A
                          </div>
                          <div>
                            <div className='font-semibold text-semi-color-text-0'>Alex Chen</div>
                            <div className='text-sm text-semi-color-text-1'>Senior Developer</div>
                          </div>
                        </div>
                        <p className='text-semi-color-text-1 leading-relaxed'>
                          {i18n.language === 'en' 
                            ? '"This platform has revolutionized how we integrate AI into our applications. The unified API makes everything so much simpler."'
                            : '"这个平台彻底改变了我们将AI集成到应用中的方式。统一的API让一切都变得如此简单。"'
                          }
                        </p>
                      </div>

                      {/* Testimonial 2 - Duplicate */}
                      <div className='p-6 md:p-8 rounded-2xl bg-semi-color-bg-0 border border-semi-color-border hover:shadow-lg transition-all duration-300 min-w-[350px] group'>
                        <div className='flex items-center mb-4'>
                          <div className='w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4 group-hover:scale-110 transition-transform duration-300'>
                            S
                          </div>
                          <div>
                            <div className='font-semibold text-semi-color-text-0'>Sarah Johnson</div>
                            <div className='text-sm text-semi-color-text-1'>AI Engineer</div>
                          </div>
                        </div>
                        <p className='text-semi-color-text-1 leading-relaxed'>
                          {i18n.language === 'en' 
                            ? '"The cost savings are incredible. We reduced our AI costs by 60% while improving reliability."'
                            : '"成本节省令人难以置信。我们在提高可靠性的同时将AI成本降低了60%。"'
                          }
                        </p>
                      </div>

                      {/* Testimonial 3 - Duplicate */}
                      <div className='p-6 md:p-8 rounded-2xl bg-semi-color-bg-0 border border-semi-color-border hover:shadow-lg transition-all duration-300 min-w-[350px] group'>
                        <div className='flex items-center mb-4'>
                          <div className='w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4 group-hover:scale-110 transition-transform duration-300'>
                            M
                          </div>
                          <div>
                            <div className='font-semibold text-semi-color-text-0'>Mike Rodriguez</div>
                            <div className='text-sm text-semi-color-text-1'>CTO</div>
                          </div>
                        </div>
                        <p className='text-semi-color-text-1 leading-relaxed'>
                          {i18n.language === 'en' 
                            ? '"The analytics dashboard gives us insights we never had before. It\'s a game-changer for our AI strategy."'
                            : '"分析仪表板为我们提供了前所未有的洞察。这对我们的AI战略来说是改变游戏规则的存在。"'
                          }
                        </p>
                      </div>

                      {/* Testimonial 4 - Duplicate */}
                      <div className='p-6 md:p-8 rounded-2xl bg-semi-color-bg-0 border border-semi-color-border hover:shadow-lg transition-all duration-300 min-w-[350px] group'>
                        <div className='flex items-center mb-4'>
                          <div className='w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4 group-hover:scale-110 transition-transform duration-300'>
                            E
                          </div>
                          <div>
                            <div className='font-semibold text-semi-color-text-0'>Emma Wilson</div>
                            <div className='text-sm text-semi-color-text-1'>Product Manager</div>
                          </div>
                        </div>
                        <p className='text-semi-color-text-1 leading-relaxed'>
                          {i18n.language === 'en' 
                            ? '"The seamless integration saved us weeks of development time. Our team can now focus on building features instead of managing APIs."'
                            : '"无缝集成为我们节省了数周的开发时间。我们的团队现在可以专注于构建功能而不是管理API。"'
                          }
                        </p>
                      </div>

                      {/* Testimonial 5 - Duplicate */}
                      <div className='p-6 md:p-8 rounded-2xl bg-semi-color-bg-0 border border-semi-color-border hover:shadow-lg transition-all duration-300 min-w-[350px] group'>
                        <div className='flex items-center mb-4'>
                          <div className='w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4 group-hover:scale-110 transition-transform duration-300'>
                            D
                          </div>
                          <div>
                            <div className='font-semibold text-semi-color-text-0'>David Kim</div>
                            <div className='text-sm text-semi-color-text-1'>Tech Lead</div>
                          </div>
                        </div>
                        <p className='text-semi-color-text-1 leading-relaxed'>
                          {i18n.language === 'en' 
                            ? '"Outstanding reliability and performance. We\'ve been using it for 6 months with zero downtime."'
                            : '"出色的可靠性和性能。我们已经使用了6个月，零停机时间。"'
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Integration Showcase Section - Enhanced */}
          <div className='w-full py-16 md:py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900 relative overflow-hidden'>
            {/* Animated Background Elements */}
            <div className='absolute inset-0'>
              <div className='absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-blue-400/20 to-indigo-600/20 rounded-full blur-3xl animate-pulse'></div>
              <div className='absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000'></div>
              <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-cyan-400/10 to-blue-600/10 rounded-full blur-3xl animate-pulse delay-500'></div>
            </div>
            
            <div className='max-w-7xl mx-auto px-4 relative z-10'>
              <div className='text-center mb-12 md:mb-16'>
                <div className='inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/50 dark:to-indigo-900/50 border border-blue-200 dark:border-blue-700 mb-6'>
                  <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  <span className='text-sm font-medium text-blue-700 dark:text-blue-300'>
                    {i18n.language === 'en' ? 'Developer Friendly' : '开发者友好'}
                  </span>
                </div>
                <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 dark:from-white dark:via-blue-200 dark:to-indigo-200 bg-clip-text text-transparent mb-6'>
                  {i18n.language === 'en' ? 'Easy Integration' : '轻松集成'}
                </h2>
                <p className='text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed'>
                  {i18n.language === 'en' 
                    ? 'Get started in seconds with our drop-in replacement. Works with all major frameworks and programming languages.'
                    : '通过我们的即插即用替代方案，几秒钟即可开始使用。支持所有主流框架和编程语言。'
                  }
                </p>
              </div>
              
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center'>
                {/* Enhanced Code Example */}
                <div className='order-2 lg:order-1'>
                  <div className='group relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-1 shadow-2xl hover:shadow-3xl transition-all duration-300'>
                    <div className='bg-gray-900 rounded-xl overflow-hidden'>
                      {/* Enhanced Terminal Header */}
                      <div className='flex items-center justify-between px-6 py-4 bg-gradient-to-r from-gray-800 to-gray-750 border-b border-gray-700 relative overflow-hidden'>
                        {/* Animated Background */}
                        <div className='absolute inset-0 bg-gradient-to-r from-blue-900/10 to-purple-900/10'></div>
                        
                        <div className='flex items-center space-x-2 relative z-10'>
                          <div className='flex space-x-2'>
                            <button 
                              className='w-3 h-3 bg-red-500 rounded-full hover:bg-red-400 transition-all duration-200 hover:scale-110 hover:shadow-lg hover:shadow-red-500/50'
                              onClick={() => {
                                // Add minimize animation
                                const terminal = document.querySelector('.bg-gray-900');
                                terminal.style.transform = 'scale(0.95)';
                                setTimeout(() => {
                                  terminal.style.transform = 'scale(1)';
                                }, 200);
                              }}
                            ></button>
                            <button 
                              className='w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-400 transition-all duration-200 hover:scale-110 hover:shadow-lg hover:shadow-yellow-500/50'
                              onClick={() => {
                                // Add minimize animation
                                const terminal = document.querySelector('.bg-gray-900');
                                terminal.style.transform = 'scale(0.98)';
                                setTimeout(() => {
                                  terminal.style.transform = 'scale(1)';
                                }, 200);
                              }}
                            ></button>
                            <button 
                              className='w-3 h-3 bg-green-500 rounded-full hover:bg-green-400 transition-all duration-200 hover:scale-110 hover:shadow-lg hover:shadow-green-500/50'
                              onClick={() => {
                                // Add maximize animation
                                const terminal = document.querySelector('.bg-gray-900');
                                terminal.style.transform = 'scale(1.02)';
                                setTimeout(() => {
                                  terminal.style.transform = 'scale(1)';
                                }, 200);
                              }}
                            ></button>
                          </div>
                          <div className='flex items-center space-x-3 ml-4'>
                            <span className='text-gray-400 text-sm font-medium'>integration_example.py</span>
                            <div className='flex items-center space-x-1'>
                              <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse'></div>
                              <span className='text-green-400 text-xs font-medium'>Live</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className='flex items-center space-x-3 relative z-10'>
                          {/* Terminal Actions */}
                          <button 
                            className='p-1.5 rounded-md bg-gray-700/50 hover:bg-gray-600/50 text-gray-400 hover:text-white transition-all duration-200 hover:scale-110'
                            onClick={() => {
                              // Toggle fullscreen effect
                              const container = document.querySelector('.group.relative.bg-gradient-to-br');
                              container.classList.toggle('fixed');
                              container.classList.toggle('inset-4');
                              container.classList.toggle('z-50');
                            }}
                            title="Toggle Fullscreen"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
                            </svg>
                          </button>
                          
                          <button 
                            className='p-1.5 rounded-md bg-gray-700/50 hover:bg-gray-600/50 text-gray-400 hover:text-white transition-all duration-200 hover:scale-110'
                            onClick={() => {
                              // Refresh animation
                              const codeContent = document.getElementById('code-content');
                              codeContent.style.opacity = '0';
                              setTimeout(() => {
                                codeContent.style.opacity = '1';
                              }, 300);
                            }}
                            title="Refresh Code"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
                            </svg>
                          </button>
                        </div>
                        
                        {/* Enhanced Copy Button */}
                        <button 
                          className='flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg transition-all duration-300 text-white text-sm font-medium shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 group/copy'
                          onClick={(event) => {
                            const button = event.currentTarget;
                            const codeText = `import openai

openai.api_base = "${serverAddress}"
openai.api_key = "your-api-key"

response = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    messages=[{"role": "user", "content": "Hello!"}]
)`;
                            
                            // Add loading state
                            button.disabled = true;
                            button.innerHTML = '<svg class="w-4 h-4 animate-spin" fill="currentColor" viewBox="0 0 24 24"><path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/></svg><span class="ml-2">Copying...</span>';
                            
                            // Copy with error handling
                            if (navigator.clipboard && navigator.clipboard.writeText) {
                              navigator.clipboard.writeText(codeText).then(() => {
                                // Success feedback
                                button.innerHTML = '<svg class="w-4 h-4 text-green-300" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg><span class="text-green-300 ml-2">Copied!</span>';
                                button.className = 'flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg transition-all duration-300 text-white text-sm font-medium shadow-lg transform scale-105';
                                setTimeout(() => {
                                  button.innerHTML = '<svg class="w-4 h-4 group-hover/copy:scale-110 transition-transform duration-200" fill="currentColor" viewBox="0 0 24 24"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg><span>Copy Code</span>';
                                  button.className = 'flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg transition-all duration-300 text-white text-sm font-medium shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 group/copy';
                                  button.disabled = false;
                                }, 2500);
                              }).catch(() => {
                                // Fallback for older browsers
                                const textArea = document.createElement('textarea');
                                textArea.value = codeText;
                                document.body.appendChild(textArea);
                                textArea.select();
                                try {
                                  document.execCommand('copy');
                                  button.innerHTML = '<svg class="w-4 h-4 text-green-300" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg><span class="text-green-300 ml-2">Copied!</span>';
                                  button.className = 'flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg transition-all duration-300 text-white text-sm font-medium shadow-lg transform scale-105';
                                } catch (err) {
                                  button.innerHTML = '<svg class="w-4 h-4 text-red-300" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg><span class="text-red-300 ml-2">Copy failed</span>';
                                  button.className = 'flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 rounded-lg transition-all duration-300 text-white text-sm font-medium shadow-lg';
                                }
                                document.body.removeChild(textArea);
                                setTimeout(() => {
                                  button.innerHTML = '<svg class="w-4 h-4 group-hover/copy:scale-110 transition-transform duration-200" fill="currentColor" viewBox="0 0 24 24"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg><span>Copy Code</span>';
                                  button.className = 'flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg transition-all duration-300 text-white text-sm font-medium shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 group/copy';
                                  button.disabled = false;
                                }, 2500);
                              });
                            } else {
                              // Fallback for browsers without clipboard API
                              const textArea = document.createElement('textarea');
                              textArea.value = codeText;
                              document.body.appendChild(textArea);
                              textArea.select();
                              try {
                                document.execCommand('copy');
                                button.innerHTML = '<svg class="w-4 h-4 text-green-300" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg><span class="text-green-300 ml-2">Copied!</span>';
                                button.className = 'flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg transition-all duration-300 text-white text-sm font-medium shadow-lg transform scale-105';
                              } catch (err) {
                                button.innerHTML = '<svg class="w-4 h-4 text-red-300" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg><span class="text-red-300 ml-2">Copy failed</span>';
                                button.className = 'flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 rounded-lg transition-all duration-300 text-white text-sm font-medium shadow-lg';
                              }
                              document.body.removeChild(textArea);
                              setTimeout(() => {
                                button.innerHTML = '<svg class="w-4 h-4 group-hover/copy:scale-110 transition-transform duration-200" fill="currentColor" viewBox="0 0 24 24"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg><span>Copy Code</span>';
                                button.className = 'flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg transition-all duration-300 text-white text-sm font-medium shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 group/copy';
                                button.disabled = false;
                              }, 2500);
                            }
                          }}
                        >
                          <svg className="w-4 h-4 group-hover/copy:scale-110 transition-transform duration-200" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
                          </svg>
                          <span>Copy Code</span>
                        </button>
                      </div>
                      
                      {/* Dynamic Code Content */}
                      <div className='p-6 font-mono text-sm overflow-x-auto' id='code-content'>
                        <div className='text-gray-300 leading-relaxed space-y-1' id='python-code'>
                          <div><span className='text-pink-400'>import</span> <span className='text-blue-400'>openai</span></div>
                          <div className='mt-3'></div>
                          <div><span className='text-blue-400'>openai</span>.<span className='text-yellow-400'>api_base</span> = <span className='text-green-400'>"{serverAddress}"</span></div>
                          <div><span className='text-blue-400'>openai</span>.<span className='text-yellow-400'>api_key</span> = <span className='text-green-400'>"your-api-key"</span></div>
                          <div className='mt-3'></div>
                          <div><span className='text-cyan-400'>response</span> = <span className='text-blue-400'>openai</span>.<span className='text-yellow-400'>ChatCompletion</span>.<span className='text-purple-400'>create</span>(</div>
                          <div className='ml-4'><span className='text-orange-400'>model</span>=<span className='text-green-400'>"gpt-3.5-turbo"</span>,</div>
                          <div className='ml-4'><span className='text-orange-400'>messages</span>=[{'{'}<span className='text-green-400'>"role"</span>: <span className='text-green-400'>"user"</span>, <span className='text-green-400'>"content"</span>: <span className='text-green-400'>"Hello!"</span>{'}'}]</div>
                          <div>)</div>
                        </div>
                        
                        <div className='text-gray-300 leading-relaxed space-y-1 hidden' id='javascript-code'>
                          <div><span className='text-pink-400'>const</span> <span className='text-blue-400'>{'{ OpenAI }'}</span> = <span className='text-yellow-400'>require</span>(<span className='text-green-400'>'openai'</span>);</div>
                          <div className='mt-3'></div>
                          <div><span className='text-pink-400'>const</span> <span className='text-cyan-400'>openai</span> = <span className='text-pink-400'>new</span> <span className='text-blue-400'>OpenAI</span>({'{'}</div>
                          <div className='ml-4'><span className='text-orange-400'>baseURL</span>: <span className='text-green-400'>'{serverAddress}'</span>,</div>
                          <div className='ml-4'><span className='text-orange-400'>apiKey</span>: <span className='text-green-400'>'your-api-key'</span></div>
                          <div>{'}'});</div>
                          <div className='mt-3'></div>
                          <div><span className='text-pink-400'>const</span> <span className='text-cyan-400'>response</span> = <span className='text-pink-400'>await</span> <span className='text-blue-400'>openai</span>.<span className='text-yellow-400'>chat</span>.<span className='text-yellow-400'>completions</span>.<span className='text-purple-400'>create</span>({'{'}</div>
                          <div className='ml-4'><span className='text-orange-400'>model</span>: <span className='text-green-400'>'gpt-3.5-turbo'</span>,</div>
                          <div className='ml-4'><span className='text-orange-400'>messages</span>: [{'{'} <span className='text-orange-400'>role</span>: <span className='text-green-400'>'user'</span>, <span className='text-orange-400'>content</span>: <span className='text-green-400'>'Hello!'</span> {'}'}]</div>
                          <div>{'}'});</div>
                        </div>
                        
                        <div className='text-gray-300 leading-relaxed space-y-1 hidden' id='curl-code'>
                          <div><span className='text-cyan-400'>curl</span> <span className='text-yellow-400'>-X</span> <span className='text-green-400'>POST</span> <span className='text-green-400'>"{serverAddress}/v1/chat/completions"</span> \</div>
                          <div className='ml-4'><span className='text-yellow-400'>-H</span> <span className='text-green-400'>"Content-Type: application/json"</span> \</div>
                          <div className='ml-4'><span className='text-yellow-400'>-H</span> <span className='text-green-400'>"Authorization: Bearer your-api-key"</span> \</div>
                          <div className='ml-4'><span className='text-yellow-400'>-d</span> <span className='text-green-400'>'{'{'}</span></div>
                          <div className='ml-8'><span className='text-green-400'>"model": "gpt-3.5-turbo",</span></div>
                          <div className='ml-8'><span className='text-green-400'>"messages": [</span></div>
                          <div className='ml-12'><span className='text-green-400'>{'{'}</span></div>
                          <div className='ml-16'><span className='text-green-400'>"role": "user",</span></div>
                          <div className='ml-16'><span className='text-green-400'>"content": "Hello!"</span></div>
                          <div className='ml-12'><span className='text-green-400'>{'}'}</span></div>
                          <div className='ml-8'><span className='text-green-400'>]</span></div>
                          <div className='ml-4'><span className='text-green-400'>{'}'}'</span></div>
                        </div>
                      </div>
                      
                      {/* Interactive Language Tabs */}
                      <div className='px-6 pb-4'>
                        <div className='flex space-x-2'>
                          <button 
                            id='python-tab'
                            className='px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm rounded-lg font-medium shadow-md transform transition-all duration-300'
                            onClick={() => {
                              // Hide all code blocks
                              document.getElementById('python-code').classList.remove('hidden');
                              document.getElementById('javascript-code').classList.add('hidden');
                              document.getElementById('curl-code').classList.add('hidden');
                              
                              // Update tab styles
                              document.getElementById('python-tab').className = 'px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm rounded-lg font-medium shadow-md transform transition-all duration-300';
                              document.getElementById('javascript-tab').className = 'px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white text-sm rounded-lg font-medium transition-all duration-300 hover:shadow-md hover:scale-105';
                              document.getElementById('curl-tab').className = 'px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white text-sm rounded-lg font-medium transition-all duration-300 hover:shadow-md hover:scale-105';
                              
                              // Update filename
                              document.querySelector('.text-gray-400').textContent = 'integration_example.py';
                            }}
                          >
                            Python
                          </button>
                          <button 
                            id='javascript-tab'
                            className='px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white text-sm rounded-lg font-medium transition-all duration-300 hover:shadow-md hover:scale-105'
                            onClick={() => {
                              // Hide all code blocks
                              document.getElementById('python-code').classList.add('hidden');
                              document.getElementById('javascript-code').classList.remove('hidden');
                              document.getElementById('curl-code').classList.add('hidden');
                              
                              // Update tab styles
                              document.getElementById('python-tab').className = 'px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white text-sm rounded-lg font-medium transition-all duration-300 hover:shadow-md hover:scale-105';
                              document.getElementById('javascript-tab').className = 'px-4 py-2 bg-gradient-to-r from-yellow-600 to-orange-600 text-white text-sm rounded-lg font-medium shadow-md transform transition-all duration-300';
                              document.getElementById('curl-tab').className = 'px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white text-sm rounded-lg font-medium transition-all duration-300 hover:shadow-md hover:scale-105';
                              
                              // Update filename
                              document.querySelector('.text-gray-400').textContent = 'integration_example.js';
                            }}
                          >
                            JavaScript
                          </button>
                          <button 
                            id='curl-tab'
                            className='px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white text-sm rounded-lg font-medium transition-all duration-300 hover:shadow-md hover:scale-105'
                            onClick={() => {
                              // Hide all code blocks
                              document.getElementById('python-code').classList.add('hidden');
                              document.getElementById('javascript-code').classList.add('hidden');
                              document.getElementById('curl-code').classList.remove('hidden');
                              
                              // Update tab styles
                              document.getElementById('python-tab').className = 'px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white text-sm rounded-lg font-medium transition-all duration-300 hover:shadow-md hover:scale-105';
                              document.getElementById('javascript-tab').className = 'px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white text-sm rounded-lg font-medium transition-all duration-300 hover:shadow-md hover:scale-105';
                              document.getElementById('curl-tab').className = 'px-4 py-2 bg-gradient-to-r from-green-600 to-teal-600 text-white text-sm rounded-lg font-medium shadow-md transform transition-all duration-300';
                              
                              // Update filename
                              document.querySelector('.text-gray-400').textContent = 'api_request.sh';
                            }}
                          >
                            cURL
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Glow Effect */}
                    <div className='absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-300'></div>
                  </div>
                  
                  {/* Features List */}
                  <div className='mt-8 space-y-4'>
                    <div className='flex items-center space-x-3 p-3 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700'>
                      <div className='w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center'>
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                      </div>
                      <span className='text-gray-700 dark:text-gray-300 font-medium'>
                        {i18n.language === 'en' ? 'Drop-in OpenAI replacement' : 'OpenAI即插即用替代'}
                      </span>
                    </div>
                    <div className='flex items-center space-x-3 p-3 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700'>
                      <div className='w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center'>
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      </div>
                      <span className='text-gray-700 dark:text-gray-300 font-medium'>
                        {i18n.language === 'en' ? 'No code changes required' : '无需修改代码'}
                      </span>
                    </div>
                    <div className='flex items-center space-x-3 p-3 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700'>
                      <div className='w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center'>
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9z"/>
                        </svg>
                      </div>
                      <span className='text-gray-700 dark:text-gray-300 font-medium'>
                        {i18n.language === 'en' ? 'Works with existing libraries' : '兼容现有库'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Framework Icons */}
                <div className='order-1 lg:order-2'>
                  <h3 className='text-2xl md:text-3xl font-bold text-semi-color-text-0 mb-6 text-center lg:text-left'>
                    {i18n.language === 'en' ? 'Supported Frameworks' : '支持的框架'}
                  </h3>
                  <div className='grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6'>
                    <div className='flex flex-col items-center p-4 rounded-xl bg-semi-color-bg-1 border border-semi-color-border hover:border-semi-color-primary transition-all duration-300 hover:shadow-md'>
                      <div className='w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center mb-2'>
                        <span className='text-white font-bold text-lg'>JS</span>
                      </div>
                      <span className='text-sm font-medium text-semi-color-text-0'>JavaScript</span>
                    </div>
                    <div className='flex flex-col items-center p-4 rounded-xl bg-semi-color-bg-1 border border-semi-color-border hover:border-semi-color-primary transition-all duration-300 hover:shadow-md'>
                      <div className='w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-2'>
                        <span className='text-white font-bold text-lg'>TS</span>
                      </div>
                      <span className='text-sm font-medium text-semi-color-text-0'>TypeScript</span>
                    </div>
                    <div className='flex flex-col items-center p-4 rounded-xl bg-semi-color-bg-1 border border-semi-color-border hover:border-semi-color-primary transition-all duration-300 hover:shadow-md'>
                      <div className='w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-2'>
                        <span className='text-white font-bold text-lg'>PY</span>
                      </div>
                      <span className='text-sm font-medium text-semi-color-text-0'>Python</span>
                    </div>
                    <div className='flex flex-col items-center p-4 rounded-xl bg-semi-color-bg-1 border border-semi-color-border hover:border-semi-color-primary transition-all duration-300 hover:shadow-md'>
                      <div className='w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-2'>
                        <span className='text-white font-bold text-lg'>R</span>
                      </div>
                      <span className='text-sm font-medium text-semi-color-text-0'>React</span>
                    </div>
                    <div className='flex flex-col items-center p-4 rounded-xl bg-semi-color-bg-1 border border-semi-color-border hover:border-semi-color-primary transition-all duration-300 hover:shadow-md'>
                      <div className='w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-700 rounded-lg flex items-center justify-center mb-2'>
                        <span className='text-white font-bold text-lg'>N</span>
                      </div>
                      <span className='text-sm font-medium text-semi-color-text-0'>Node.js</span>
                    </div>
                    <div className='flex flex-col items-center p-4 rounded-xl bg-semi-color-bg-1 border border-semi-color-border hover:border-semi-color-primary transition-all duration-300 hover:shadow-md'>
                      <div className='w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center mb-2'>
                        <span className='text-white font-bold text-lg'>G</span>
                      </div>
                      <span className='text-sm font-medium text-semi-color-text-0'>Go</span>
                    </div>
                  </div>
                  
                  <div className='mt-8 p-6 rounded-xl bg-gradient-to-r from-semi-color-primary/10 to-semi-color-primary-light/10 border border-semi-color-primary/20'>
                    <div className='flex items-center mb-3'>
                      <div className='w-8 h-8 bg-semi-color-primary rounded-lg flex items-center justify-center mr-3'>
                        <IconPlay className='text-white text-sm' />
                      </div>
                      <h4 className='text-lg font-semibold text-semi-color-text-0'>
                        {i18n.language === 'en' ? 'Quick Start' : '快速开始'}
                      </h4>
                    </div>
                    <p className='text-semi-color-text-1 text-sm leading-relaxed'>
                      {i18n.language === 'en' 
                        ? 'Replace your OpenAI endpoint with our URL and you\'re ready to go. No code changes required.'
                        : '将您的OpenAI端点替换为我们的URL即可开始使用，无需修改代码。'
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Preview Section */}
          <div className='w-full py-16 md:py-20 bg-semi-color-bg-1'>
            <div className='max-w-6xl mx-auto px-4'>
              <div className='text-center mb-12'>
                <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-semi-color-text-0 mb-4'>
                  {i18n.language === 'en' ? 'Simple Pricing' : '简单定价'}
                </h2>
                <p className='text-lg md:text-xl text-semi-color-text-1 max-w-2xl mx-auto'>
                  {i18n.language === 'en' 
                    ? 'Transparent pricing with no hidden fees'
                    : '透明的定价，无隐藏费用'
                  }
                </p>
              </div>
              
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8'>
                {/* Free Plan - Glassmorphism */}
                <div className='p-6 md:p-8 rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 hover:shadow-lg hover:bg-white/20 transition-all duration-300'>
                  <div className='text-center mb-6'>
                    <h3 className='text-2xl font-bold text-semi-color-text-0 mb-2'>
                      {i18n.language === 'en' ? 'Free' : '免费版'}
                    </h3>
                    <div className='text-4xl font-bold text-semi-color-text-0 mb-2'>$0</div>
                    <div className='text-semi-color-text-1'>
                      {i18n.language === 'en' ? 'per month' : '每月'}
                    </div>
                  </div>
                  <ul className='space-y-3 mb-8'>
                    <li className='flex items-center text-semi-color-text-1'>
                      <div className='w-5 h-5 bg-gradient-to-br from-[#10b981] to-[#059669] rounded-full flex items-center justify-center mr-3 backdrop-blur-sm'>
                        <span className='text-white text-xs'>✓</span>
                      </div>
                      {i18n.language === 'en' ? '10,000 requests/month' : '每月10,000次请求'}
                    </li>
                    <li className='flex items-center text-semi-color-text-1'>
                      <div className='w-5 h-5 bg-gradient-to-br from-[#10b981] to-[#059669] rounded-full flex items-center justify-center mr-3 backdrop-blur-sm'>
                        <span className='text-white text-xs'>✓</span>
                      </div>
                      {i18n.language === 'en' ? 'Basic support' : '基础支持'}
                    </li>
                    <li className='flex items-center text-semi-color-text-1'>
                      <div className='w-5 h-5 bg-gradient-to-br from-[#10b981] to-[#059669] rounded-full flex items-center justify-center mr-3 backdrop-blur-sm'>
                        <span className='text-white text-xs'>✓</span>
                      </div>
                      {i18n.language === 'en' ? 'All AI providers' : '所有AI供应商'}
                    </li>
                  </ul>
                  <Button 
                    className='w-full !rounded-xl backdrop-blur-sm bg-white/20 border border-white/30 text-semi-color-text-0 hover:bg-white/30' 
                    onClick={() => window.open('/console', '_self')}
                  >
                    {i18n.language === 'en' ? 'Get Started' : '开始使用'}
                  </Button>
                </div>

                {/* Pro Plan - Glassmorphism */}
                <div className='p-6 md:p-8 rounded-2xl backdrop-blur-md bg-gradient-to-br from-[#6366f1]/20 via-[#8b5cf6]/20 to-[#ec4899]/20 border border-white/30 relative hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:bg-gradient-to-br hover:from-[#6366f1]/30 hover:via-[#8b5cf6]/30 hover:to-[#ec4899]/30'>
                  <div className='absolute -top-3 left-1/2 transform -translate-x-1/2'>
                    <span className='bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white px-4 py-1 rounded-full text-sm font-medium backdrop-blur-sm'>
                      {i18n.language === 'en' ? 'Most Popular' : '最受欢迎'}
                    </span>
                  </div>
                  <div className='text-center mb-6'>
                    <h3 className='text-2xl font-bold text-semi-color-text-0 mb-2'>
                      {i18n.language === 'en' ? 'Pro' : '专业版'}
                    </h3>
                    <div className='text-4xl font-bold text-semi-color-text-0 mb-2'>$29</div>
                    <div className='text-semi-color-text-1'>
                      {i18n.language === 'en' ? 'per month' : '每月'}
                    </div>
                  </div>
                  <ul className='space-y-3 mb-8'>
                    <li className='flex items-center text-semi-color-text-1'>
                      <div className='w-5 h-5 bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] rounded-full flex items-center justify-center mr-3 backdrop-blur-sm'>
                        <span className='text-white text-xs'>✓</span>
                      </div>
                      {i18n.language === 'en' ? '100,000 requests/month' : '每月100,000次请求'}
                    </li>
                    <li className='flex items-center text-semi-color-text-1'>
                      <div className='w-5 h-5 bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] rounded-full flex items-center justify-center mr-3 backdrop-blur-sm'>
                        <span className='text-white text-xs'>✓</span>
                      </div>
                      {i18n.language === 'en' ? 'Priority support' : '优先支持'}
                    </li>
                    <li className='flex items-center text-semi-color-text-1'>
                      <div className='w-5 h-5 bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] rounded-full flex items-center justify-center mr-3 backdrop-blur-sm'>
                        <span className='text-white text-xs'>✓</span>
                      </div>
                      {i18n.language === 'en' ? 'Advanced analytics' : '高级分析'}
                    </li>
                    <li className='flex items-center text-semi-color-text-1'>
                      <div className='w-5 h-5 bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] rounded-full flex items-center justify-center mr-3 backdrop-blur-sm'>
                        <span className='text-white text-xs'>✓</span>
                      </div>
                      {i18n.language === 'en' ? 'Custom domains' : '自定义域名'}
                    </li>
                  </ul>
                  <Button 
                    className='w-full !rounded-xl backdrop-blur-sm bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white hover:from-[#4f46e5] hover:to-[#7c3aed]' 
                    onClick={() => window.open('/console', '_self')}
                  >
                    {i18n.language === 'en' ? 'Upgrade to Pro' : '升级到专业版'}
                  </Button>
                </div>

                {/* Enterprise Plan - Glassmorphism */}
                <div className='p-6 md:p-8 rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 hover:shadow-lg hover:bg-white/20 transition-all duration-300'>
                  <div className='text-center mb-6'>
                    <h3 className='text-2xl font-bold text-semi-color-text-0 mb-2'>
                      {i18n.language === 'en' ? 'Enterprise' : '企业版'}
                    </h3>
                    <div className='text-4xl font-bold text-semi-color-text-0 mb-2'>Custom</div>
                    <div className='text-semi-color-text-1'>
                      {i18n.language === 'en' ? 'contact us' : '联系我们'}
                    </div>
                  </div>
                  <ul className='space-y-3 mb-8'>
                    <li className='flex items-center text-semi-color-text-1'>
                      <div className='w-5 h-5 bg-gradient-to-br from-[#10b981] to-[#059669] rounded-full flex items-center justify-center mr-3 backdrop-blur-sm'>
                        <span className='text-white text-xs'>✓</span>
                      </div>
                      {i18n.language === 'en' ? 'Unlimited requests' : '无限制请求'}
                    </li>
                    <li className='flex items-center text-semi-color-text-1'>
                      <div className='w-5 h-5 bg-gradient-to-br from-[#10b981] to-[#059669] rounded-full flex items-center justify-center mr-3 backdrop-blur-sm'>
                        <span className='text-white text-xs'>✓</span>
                      </div>
                      {i18n.language === 'en' ? '24/7 dedicated support' : '24/7专属支持'}
                    </li>
                    <li className='flex items-center text-semi-color-text-1'>
                      <div className='w-5 h-5 bg-gradient-to-br from-[#10b981] to-[#059669] rounded-full flex items-center justify-center mr-3 backdrop-blur-sm'>
                        <span className='text-white text-xs'>✓</span>
                      </div>
                      {i18n.language === 'en' ? 'Custom integrations' : '自定义集成'}
                    </li>
                    <li className='flex items-center text-semi-color-text-1'>
                      <div className='w-5 h-5 bg-gradient-to-br from-[#10b981] to-[#059669] rounded-full flex items-center justify-center mr-3 backdrop-blur-sm'>
                        <span className='text-white text-xs'>✓</span>
                      </div>
                      {i18n.language === 'en' ? 'SLA guarantee' : 'SLA保证'}
                    </li>
                  </ul>
                  <Button 
                    className='w-full !rounded-xl backdrop-blur-sm bg-white/20 border border-white/30 text-semi-color-text-0 hover:bg-white/30' 
                    onClick={() => window.open('mailto:support@example.com', '_blank')}
                  >
                    {i18n.language === 'en' ? 'Contact Sales' : '联系销售'}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Call to Action Section - Dynamic Themes */}
          <div className='w-full py-20 md:py-24 relative overflow-hidden'>
            {/* Dynamic Theme Background */}
            <div className='absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 dark:from-gray-900 dark:via-indigo-900/50 dark:to-purple-900/50'></div>
            
            {/* Floating AI Provider Icons Background */}
            <div className='absolute inset-0 overflow-hidden pointer-events-none opacity-10'>
              <div className='absolute top-20 left-[5%] w-16 h-16 animate-float'>
                <img src="https://unpkg.com/@lobehub/icons-static-svg/icons/openai.svg" alt="OpenAI" className='w-full h-full filter blur-sm' />
              </div>
              <div className='absolute top-32 right-[8%] w-12 h-12 animate-float' style={{animationDelay: '1s'}}>
                <img src="https://unpkg.com/@lobehub/icons-static-svg/icons/anthropic.svg" alt="Anthropic" className='w-full h-full filter blur-sm' />
              </div>
              <div className='absolute bottom-32 left-[12%] w-14 h-14 animate-float' style={{animationDelay: '2s'}}>
                <img src="https://unpkg.com/@lobehub/icons-static-svg/icons/google.svg" alt="Google" className='w-full h-full filter blur-sm' />
              </div>
              <div className='absolute bottom-20 right-[15%] w-13 h-13 animate-float' style={{animationDelay: '3s'}}>
                <img src="https://unpkg.com/@lobehub/icons-static-svg/icons/mistral.svg" alt="Mistral" className='w-full h-full filter blur-sm' />
              </div>
              <div className='absolute top-1/2 left-[20%] w-10 h-10 animate-float' style={{animationDelay: '4s'}}>
                <img src="https://unpkg.com/@lobehub/icons-static-svg/icons/cohere.svg" alt="Cohere" className='w-full h-full filter blur-sm' />
              </div>
              <div className='absolute top-1/3 right-[25%] w-15 h-15 animate-float' style={{animationDelay: '5s'}}>
                <img src="https://unpkg.com/@lobehub/icons-static-svg/icons/huggingface.svg" alt="HuggingFace" className='w-full h-full filter blur-sm' />
              </div>
            </div>
            
            {/* Enhanced Animated Background Elements */}
            <div className='absolute inset-0'>
              {/* Large Colorful Orbs */}
              <div className='absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-cyan-400/30 via-blue-500/25 to-indigo-600/30 rounded-full blur-3xl animate-pulse opacity-60'></div>
              <div className='absolute top-20 right-0 w-80 h-80 bg-gradient-to-br from-pink-400/30 via-purple-500/25 to-indigo-600/30 rounded-full blur-3xl animate-pulse delay-1000 opacity-70'></div>
              <div className='absolute bottom-0 left-1/3 w-72 h-72 bg-gradient-to-br from-orange-400/25 via-red-500/20 to-pink-600/25 rounded-full blur-3xl animate-pulse delay-500 opacity-50'></div>
              <div className='absolute bottom-10 right-1/4 w-64 h-64 bg-gradient-to-br from-emerald-400/30 via-teal-500/25 to-cyan-600/30 rounded-full blur-3xl animate-pulse delay-2000 opacity-65'></div>
              
              {/* Medium Floating Orbs */}
              <div className='absolute top-1/4 left-1/4 w-32 h-32 bg-white/15 rounded-full blur-2xl animate-pulse opacity-40'></div>
              <div className='absolute top-3/4 right-1/3 w-40 h-40 bg-white/10 rounded-full blur-2xl animate-pulse delay-1500 opacity-30'></div>
              <div className='absolute top-1/2 right-1/5 w-28 h-28 bg-white/20 rounded-full blur-xl animate-pulse delay-3000 opacity-50'></div>
            </div>
            
            {/* Floating Particles */}
            <div className='absolute inset-0 overflow-hidden pointer-events-none'>
              <div className='absolute top-[15%] left-[10%] w-3 h-3 bg-cyan-400/70 rounded-full animate-ping'></div>
              <div className='absolute top-[25%] right-[15%] w-2 h-2 bg-pink-400/70 rounded-full animate-ping' style={{animationDelay: '1s'}}></div>
              <div className='absolute bottom-[30%] left-[20%] w-2.5 h-2.5 bg-purple-400/70 rounded-full animate-ping' style={{animationDelay: '2s'}}></div>
              <div className='absolute bottom-[20%] right-[25%] w-2 h-2 bg-orange-400/70 rounded-full animate-ping' style={{animationDelay: '3s'}}></div>
              <div className='absolute top-[60%] left-[30%] w-1.5 h-1.5 bg-emerald-400/70 rounded-full animate-ping' style={{animationDelay: '4s'}}></div>
              <div className='absolute top-[40%] right-[35%] w-3 h-3 bg-blue-400/70 rounded-full animate-ping' style={{animationDelay: '5s'}}></div>
            </div>
            
            <div className='max-w-5xl mx-auto text-center px-4 relative z-10'>
              <div className='w-4/5 mx-auto bg-gradient-to-br from-white/15 via-white/10 to-white/5 backdrop-blur-xl border border-white/30 rounded-3xl p-10 md:p-16 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] group'>
                {/* Icon Section */}
                <div className='flex justify-center mb-8'>
                  <div className='relative'>
                    <div className='w-20 h-20 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300'>
                      <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9z"/>
                      </svg>
                    </div>
                    <div className='absolute -inset-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300'></div>
                  </div>
                </div>
                
                <h2 className='text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 group-hover:scale-105 transition-transform duration-300'>
                  <span className='bg-gradient-to-r from-cyan-200 via-blue-200 to-purple-200 bg-clip-text text-transparent'>
                    {i18n.language === 'en' ? 'Ready to Get Started?' : '准备好开始了吗？'}
                  </span>
                </h2>
                
                <p className='text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed'>
                  {i18n.language === 'en' 
                    ? 'Join thousands of developers building the future with AI. Experience the power of unified LLM access.'
                    : '加入数千名开发者，用AI构建未来。体验统一大模型访问的强大力量。'
                  }
                </p>
                
                {/* Enhanced Stats */}
                <div className='grid grid-cols-3 gap-8 mb-10 max-w-2xl mx-auto'>
                  <div className='text-center'>
                    <div className='text-3xl md:text-4xl font-bold text-cyan-300 mb-2'>30+</div>
                    <div className='text-sm md:text-base text-white/80'>AI Models</div>
                  </div>
                  <div className='text-center'>
                    <div className='text-3xl md:text-4xl font-bold text-purple-300 mb-2'>99.9%</div>
                    <div className='text-sm md:text-base text-white/80'>Uptime</div>
                  </div>
                  <div className='text-center'>
                    <div className='text-3xl md:text-4xl font-bold text-pink-300 mb-2'>10K+</div>
                    <div className='text-sm md:text-base text-white/80'>Developers</div>
                  </div>
                </div>
                
                <div className='flex flex-col sm:flex-row gap-6 justify-center items-center'>
                  <Link to='/console'>
                    <Button
                      theme='solid'
                      type='primary'
                      size='large'
                      className='!rounded-2xl backdrop-blur-md bg-gradient-to-r from-cyan-500/80 via-blue-500/80 to-purple-500/80 border border-white/30 text-white hover:from-cyan-400/90 hover:via-blue-400/90 hover:to-purple-400/90 hover:border-white/40 transition-all duration-300 px-10 py-4 font-semibold shadow-2xl hover:shadow-3xl transform hover:scale-110 active:scale-95 group/btn'
                      icon={<IconPlay className='group-hover/btn:rotate-12 transition-transform duration-300' />}
                    >
                      {t('获取密钥')}
                    </Button>
                  </Link>
                  {docsLink && (
                    <Button
                      size='large'
                      className='!rounded-2xl backdrop-blur-md bg-white/15 border border-white/30 text-white hover:bg-white/25 hover:border-white/40 transition-all duration-300 px-10 py-4 font-semibold shadow-lg hover:shadow-2xl transform hover:scale-110 active:scale-95 group/btn'
                      icon={<IconFile className='group-hover/btn:translate-x-1 transition-transform duration-300' />}
                      onClick={() => window.open(docsLink, '_blank')}
                    >
                      {t('View the document')}
                    </Button>
                  )}
                </div>
                
                {/* Trust Indicators */}
                <div className='mt-12 pt-8 border-t border-white/20'>
                  <p className='text-white/70 text-sm mb-4'>
                    {i18n.language === 'en' ? 'Trusted by developers at' : '受到以下公司开发者信赖'}
                  </p>
                  <div className='flex items-center justify-center space-x-8 opacity-60'>
                    <img src="https://unpkg.com/@lobehub/icons-static-svg/icons/microsoft.svg" alt="Microsoft" className='h-8 w-8 filter invert' />
                    <img src="https://unpkg.com/@lobehub/icons-static-svg/icons/google.svg" alt="Google" className='h-8 w-8 filter invert' />
                    <img src="https://unpkg.com/@lobehub/icons-static-svg/icons/meta.svg" alt="Meta" className='h-8 w-8 filter invert' />
                    <img src="https://unpkg.com/@lobehub/icons-static-svg/icons/nvidia.svg" alt="NVIDIA" className='h-8 w-8 filter invert' />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='overflow-x-hidden w-full'>
          {homePageContent.startsWith('https://') ? (
            <iframe
              src={homePageContent}
              className='w-full h-screen border-none'
              title='Home Page Content'
            />
          ) : (
            <div
              className='mt-[60px]'
              dangerouslySetInnerHTML={{ __html: homePageContent }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
