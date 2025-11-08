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

import React, { useContext, useEffect, useState } from 'react';
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
  const isChinese = i18n.language.startsWith('en');

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
      setHomePageContent('Failed to load homepage content...');
    }
    setHomePageContentLoaded(true);
  };

  const handleCopyBaseURL = async () => {
    const ok = await copy(serverAddress);
    if (ok) {
      showSuccess(t('Copied to clipboard'));
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
          console.error('Failed to obtain announcement:', error);
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
    <div className='w-full overflow-x-hidden modern-gradient-bg'>
      <NoticeModal
        visible={noticeVisible}
        onClose={() => setNoticeVisible(false)}
        isMobile={isMobile}
      />
      {homePageContentLoaded && homePageContent === '' ? (
        <div className='w-full overflow-x-hidden'>
          {/* Enhanced Modern Hero Section */}
          <section id="hero-section" className="bg-background relative min-h-screen w-full overflow-x-hidden py-32 md:px-6">
            {/* Enhanced Background with Vector Graphics */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.3),transparent_50%)],bg-[radial-gradient(circle_at_80%_80%,rgba(147,51,234,0.3),transparent_50%)]" />
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }} />
            
            {/* Floating Vector Elements */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-r from-blue-500/10 to-purple-600/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute top-0 left-0 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-pink-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
            <div className="absolute bottom-0 -left-44 w-80 h-80 bg-gradient-to-r from-cyan-500/10 to-blue-600/10 rounded-full blur-3xl animate-pulse delay-2000" />
            <div className="absolute -right-44 bottom-0 w-80 h-80 bg-gradient-to-r from-pink-500/10 to-purple-600/10 rounded-full blur-3xl animate-pulse delay-3000" />
            
            <div className="container mx-auto px-4 2xl:max-w-[1400px]">
              {/* Enhanced Badge with Animation */}
              <div className="flex justify-center animate-fadeInUp">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6">
                  <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm font-medium text-white/80">AI API Gateway</span>
                </div>
              </div>
              
              {/* Enhanced Main Title */}
              <div className="mx-auto mt-5 max-w-4xl text-center">
                <h1 className="from-foreground/60 via-foreground to-foreground/60 dark:from-muted-foreground/55 dark:via-foreground dark:to-muted-foreground/55 max-w-5xl bg-gradient-to-r bg-clip-text text-center text-4xl font-semibold tracking-tighter text-transparent sm:text-5xl xl:text-6xl/none mb-6 animate-fadeInUp delay-200">
                  {i18n.language === 'en' ? (
                    <>
                      The Ultimate
                      <span className="inline-flex items-center gap-4 mx-4 mb-2">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                          <span className="text-2xl font-bold text-white">KΩ</span>
                        </div>
                      </span>
                      AI API Gateway
                    </>
                  ) : (
                    <>
                      统一的
                      <br />
                      <span className="text-gradient">
                        大模型接口网关
                      </span>
                    </>
                  )}
                </h1>
              </div>

              {/* Enhanced Subtitle */}
              <div className="mx-auto mt-5 max-w-3xl text-center animate-fadeInUp delay-300">
                <p className="text-muted-foreground text-xl">
                  Seamlessly access 50+ leading AI models through a single, unified API.
                  Built for developers, trusted by enterprises, powered by cutting-edge technology.
                </p>
              </div>

              {/* Enhanced API URL Display */}
              <div className='mt-8 flex justify-center gap-3 animate-fadeInUp delay-400'>
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full max-w-2xl">
                  <div className="relative flex-1 w-full">
                    <Input
                      readonly
                      value={serverAddress}
                      className='!rounded-full glass !border-white/20 !text-white placeholder:text-white/50'
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
                            onClick={handleCopyBaseURL}
                            icon={<IconCopy />}
                            className='!rounded-full gradient-primary border-0 text-white hover:scale-105 transition-transform'
                          />
                        </div>
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Enhanced Action Buttons */}
              <div className='mt-8 flex justify-center gap-3 animate-fadeInUp delay-500'>
                <Link to='/console' className="group">
                  <Button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 rounded-full px-8 py-3">
                    Get Started Free
                  </Button>
                </Link>
                <Link to='/docs' className="group">
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-full px-6 py-3">
                    View Docs
                    <svg className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Button>
                </Link>
              </div>

              {/* Enhanced Provider Trust Indicators */}
              <div className="mt-5 flex items-center justify-center gap-x-4 animate-fadeInUp delay-700">
                <span className="text-sm text-gray-500">Trusted by developers building with</span>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                    <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    <span className="text-xs text-white/80">OpenAI</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                    <svg className="w-4 h-4 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    <span className="text-xs text-white/80">Claude</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                    <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    <span className="text-xs text-white/80">Gemini</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                    <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    <span className="text-xs text-white/80">+47 more</span>
                  </div>
                </div>
              </div>

              {/* Enhanced AI Provider Icons */}
              <div className='mt-20'>
                <div className='flex items-center justify-center mb-12'>
                  <Text className='text-2xl font-light text-white/80'>
                    {t('支持众多的大模型供应商')}
                  </Text>
                </div>
                <div className='grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-6 max-w-6xl mx-auto'>
                  {[
                    { icon: Moonshot, name: 'Moonshot' },
                    { icon: OpenAI, name: 'OpenAI' },
                    { icon: XAI, name: 'xAI' },
                    { icon: Zhipu.Color, name: 'Zhipu' },
                    { icon: Volcengine.Color, name: 'Volcengine' },
                    { icon: Cohere.Color, name: 'Cohere' },
                    { icon: Claude.Color, name: 'Claude' },
                    { icon: Gemini.Color, name: 'Gemini' },
                    { icon: Suno, name: 'Suno' },
                    { icon: Minimax.Color, name: 'Minimax' }
                  ].map((provider, index) => (
                    <div
                      key={provider.name}
                      className="group flex flex-col items-center p-4 rounded-xl glass hover:bg-white/10 transition-all duration-300 hover:scale-105"
                      style={{
                        animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                      }}
                    >
                      <div className="w-12 h-12 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <provider.icon size={32} />
                      </div>
                      <span className="text-xs text-white/60 mt-2">{provider.name}</span>
                    </div>
                  ))}
                  
                  {/* 30+ More indicator */}
                  <div className="flex flex-col items-center p-4 rounded-xl glass">
                    <div className="w-12 h-12 flex items-center justify-center">
                      <Typography.Text className='!text-2xl font-bold text-gradient'>
                        30+
                      </Typography.Text>
                    </div>
                    <span className="text-xs text-white/60 mt-2">More Models</span>
                  </div>
                </div>
              </div>

              {/* Enhanced Feature Cards */}
              <div className="mx-auto mt-12 max-w-4xl text-center">
                <div className="grid md:grid-cols-2 gap-8 justify-center">
                  {[
                    {
                      title: "Lightning Fast",
                      description: "Low latency API responses with global edge caching",
                      icon: (
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                        </svg>
                      ),
                      color: "from-blue-500/20 to-cyan-500/20"
                    },
                    {
                      title: "Enterprise Security",
                      description: "Bank-grade encryption and compliance ready",
                      icon: (
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      ),
                      color: "from-purple-500/20 to-pink-500/20"
                    }
                  ].map((card, i) => (
                    <div
                      key={i}
                      className="group relative rounded-2xl p-6 bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105"
                    >
                      <div className="flex flex-col items-center text-center">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-600/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                          {card.icon}
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">{card.title}</h3>
                        <p className="text-white/60 text-sm">{card.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <div className='overflow-x-hidden w-full'>
          {homePageContent.startsWith('https://') ? (
            <iframe
              src={homePageContent}
              className='w-full h-screen border-none'
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
