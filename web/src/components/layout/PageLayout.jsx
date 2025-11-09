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

import { Layout } from '@douyinfe/semi-ui';
import SiderBar from './SiderBar';
import App from '../../App';
import FooterBar from './Footer';
import { ToastContainer } from 'react-toastify';
import React, { useContext, useEffect } from 'react';
import { useIsMobile } from '../../hooks/common/useIsMobile';
import { useSidebarCollapsed } from '../../hooks/common/useSidebarCollapsed';
import MarketingHeader from '../common/header';
import ConsoleHeader from './ConsoleHeader';
import { useTranslation } from 'react-i18next';
import {
  API,
  getLogo,
  getSystemName,
  showError,
  setStatusData,
} from '../../helpers';
import { UserContext } from '../../context/User';
import { StatusContext } from '../../context/Status';
import { useLocation } from 'react-router-dom';
const { Sider, Content, Header } = Layout;

const PageLayout = () => {
  const [, userDispatch] = useContext(UserContext);
  const [, statusDispatch] = useContext(StatusContext);
  const isMobile = useIsMobile();
  const [collapsed, , setCollapsed] = useSidebarCollapsed();
  const { i18n } = useTranslation();
  const location = useLocation();

  const cardProPages = [
    '/console/channel',
    '/console/log',
    '/console/redemption',
    '/console/user',
    '/console/token',
    '/console/midjourney',
    '/console/task',
    '/console/models',
    '/pricing',
  ];

  const authRoutePrefixes = ['/login', '/register', '/reset', '/user/reset'];

  const landingPages = ['/'];

  const isConsoleRoute = location.pathname.startsWith('/console');
  const showConsoleHeader = isConsoleRoute;
  const isAuthRoute = authRoutePrefixes.some((prefix) =>
    location.pathname.startsWith(prefix),
  );
  const showMarketingHeader = true;
  const showSider = isConsoleRoute && !isMobile;

  const shouldHideFooter =
    cardProPages.includes(location.pathname) || isAuthRoute; // Don't hide footer on landing page
  const isLandingPage = landingPages.includes(location.pathname);

  const shouldInnerPadding =
    location.pathname.includes('/console') &&
    !location.pathname.startsWith('/console/chat') &&
    location.pathname !== '/console/playground';

  useEffect(() => {
    if (isMobile && collapsed) {
      setCollapsed(false);
    }
  }, [isMobile, collapsed, setCollapsed]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [location.pathname]);

  const loadUser = () => {
    let user = localStorage.getItem('user');
    if (user) {
      let data = JSON.parse(user);
      userDispatch({ type: 'login', payload: data });
    }
  };

  const loadStatus = async () => {
    try {
      const res = await API.get('/api/status');
      const { success, data } = res.data;
      if (success) {
        statusDispatch({ type: 'set', payload: data });
        setStatusData(data);
      } else {
        showError('Unable to connect to server');
      }
    } catch (error) {
      showError('Failed to load status');
    }
  };

  useEffect(() => {
    loadUser();
    loadStatus().catch(console.error);
    let systemName = getSystemName();
    if (systemName) {
      document.title = systemName;
    }
    let logo = getLogo();
    if (logo) {
      let linkElement = document.querySelector("link[rel~='icon']");
      if (linkElement) {
        linkElement.href = logo;
      }
    }
    const savedLang = localStorage.getItem('i18nextLng');
    if (savedLang) {
      i18n.changeLanguage(savedLang);
    }
  }, [i18n]);

  const marketingBackground =
    'linear-gradient(135deg, rgba(248,250,252,1) 0%, rgba(241,245,249,0.92) 45%, rgba(224,231,255,0.9) 100%)';
  const landingBackground =
    'linear-gradient(135deg, rgba(245,247,255,1) 0%, rgba(240,253,244,0.9) 55%, rgba(226,232,240,0.85) 100%)';
  const consoleBackground =
    'linear-gradient(135deg, rgba(245,247,255,1) 0%, rgba(231,240,253,0.92) 45%, rgba(220,229,247,0.9) 100%)';

  const activeBackground = showConsoleHeader
    ? consoleBackground
    : isLandingPage
      ? landingBackground
      : marketingBackground;

  const marketingHeaderHeight = showMarketingHeader ? 124 : 0;
  const combinedHeaderHeight = marketingHeaderHeight;

  return (
    <Layout
      className="gradient-bg"
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: isMobile ? 'visible' : 'hidden',
        background: activeBackground,
        backgroundSize: showConsoleHeader ? '200% 200%' : 'unset',
      }}
    >
      <Header
        style={{
          padding: 0,
          height: combinedHeaderHeight,
          lineHeight: 'normal',
          position: 'fixed',
          width: '100%',
          top: 0,
          zIndex: 100,
          pointerEvents: 'none',
          background: 'transparent',
        }}
      >
        {showMarketingHeader && (
          <div style={{ pointerEvents: 'auto' }}>
            <MarketingHeader />
          </div>
        )}
      </Header>
      <Layout
        style={{
          overflow: isMobile ? 'visible' : 'auto',
          display: 'flex',
          flexDirection: 'column',
          marginTop: `${combinedHeaderHeight}px`,
        }}
      >
        {!isLandingPage && showSider && (
          <Sider
            style={{
              position: 'fixed',
              left: 0,
              top: `${marketingHeaderHeight}px`,
              zIndex: 99,
              border: 'none',
              paddingRight: '0',
              height: `calc(100vh - ${marketingHeaderHeight}px)`,
              width: 'var(--sidebar-current-width)',
            }}
          >
            <SiderBar onNavigate={() => undefined} />
          </Sider>
        )}
        <Layout
          style={{
            marginLeft: isMobile
              ? '0'
              : !isLandingPage && showSider
                ? 'var(--sidebar-current-width)'
                : '0',
            flex: '1 1 auto',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Content
            style={{
              flex: '1 0 auto',
              overflowY: isMobile ? 'visible' : 'hidden',
              WebkitOverflowScrolling: 'touch',
              padding: !isLandingPage && shouldInnerPadding ? (isMobile ? '5px' : '24px') : '0',
              position: 'relative',
              background: activeBackground,
              width: !showConsoleHeader && !showSider ? (isMobile ? '100%' : '90%') : '100%',
              maxWidth: !showConsoleHeader && !showSider ? '90vw' : '100%',
              margin: !showConsoleHeader && !showSider ? '0 auto' : '0',
            }}
          >
            {showConsoleHeader && (
              <div className='mx-auto w-full max-w-6xl px-4 py-6 sm:px-6'>
                <ConsoleHeader />
              </div>
            )}
            <App />
          </Content>
          {!shouldHideFooter && !isLandingPage && (
            <Layout.Footer
              style={{
                flex: '0 0 auto',
                width: '100%',
              }}
            >
              <FooterBar />
            </Layout.Footer>
          )}
        </Layout>
      </Layout>
      <ToastContainer />
    </Layout>
  );
};

export default PageLayout;
