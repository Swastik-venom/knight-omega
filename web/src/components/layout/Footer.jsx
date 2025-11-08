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

import React, { useEffect, useState, useMemo, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from '@douyinfe/semi-ui';
import { getFooterHTML, getLogo, getSystemName } from '../../helpers';
import { StatusContext } from '../../context/Status';

const FooterBar = () => {
  const { t } = useTranslation();
  const [footer, setFooter] = useState(getFooterHTML());
  const systemName = getSystemName();
  const logo = getLogo();
  const [statusState] = useContext(StatusContext);
  const isDemoSiteMode = statusState?.status?.demo_site_enabled || false;

  const loadFooter = () => {
    let footer_html = localStorage.getItem('footer_html');
    if (footer_html) {
      setFooter(footer_html);
    }
  };

  const currentYear = new Date().getFullYear();

  const customFooter = useMemo(
    () => (
      <footer className='relative bg-white/10 border-t border-white/20 backdrop-blur-sm py-12 px-6 w-full flex flex-col items-center justify-between overflow-hidden'>
        <div className='w-full max-w-6xl mx-auto'>
          {isDemoSiteMode && (
            <div className='flex flex-col md:flex-row justify-between w-full mb-10 gap-8'>
              <div className='flex-shrink-0'>
                <img
                  src={logo}
                  alt={systemName}
                  className='w-16 h-16 rounded-full bg-gray-800 p-1.5 object-contain'
                />
              </div>

              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 w-full'>
                <div className='text-left'>
                  <p className='text-white font-semibold mb-5'>
                    {t('关于我们')}
                  </p>
                  <div className='flex flex-col gap-4'>
                    <a
                      href='https://docs.newapi.pro/wiki/project-introduction/'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-white/80 hover:text-white transition-colors'
                    >
                      {t('关于项目')}
                    </a>
                    <a
                      href='https://docs.newapi.pro/support/community-interaction/'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-white/80 hover:text-white transition-colors'
                    >
                      {t('联系我们')}
                    </a>
                    <a
                      href='https://docs.newapi.pro/wiki/features-introduction/'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-white/80 hover:text-white transition-colors'
                    >
                      {t('功能特性')}
                    </a>
                  </div>
                </div>

                <div className='text-left'>
                  <p className='text-white font-semibold mb-5'>
                    {t('文档')}
                  </p>
                  <div className='flex flex-col gap-4'>
                    <a
                      href='https://docs.newapi.pro/getting-started/'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-white/80 hover:text-white transition-colors'
                    >
                      {t('快速开始')}
                    </a>
                    <a
                      href='https://docs.newapi.pro/installation/'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-white/80 hover:text-white transition-colors'
                    >
                      {t('安装指南')}
                    </a>
                    <a
                      href='https://docs.newapi.pro/api/'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-white/80 hover:text-white transition-colors'
                    >
                      {t('API 文档')}
                    </a>
                  </div>
                </div>

                <div className='text-left'>
                  <p className='text-white font-semibold mb-5'>
                    {t('相关项目')}
                  </p>
                  <div className='flex flex-col gap-4'>
                    <a
                      href='https://github.com/songquanpeng/one-api'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-white/80 hover:text-white transition-colors'
                    >
                      One API
                    </a>
                    <a
                      href='https://github.com/novicezk/midjourney-proxy'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-white/80 hover:text-white transition-colors'
                    >
                      Midjourney-Proxy
                    </a>
                    <a
                      href='https://github.com/Calcium-Ion/neko-api-key-tool'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-white/80 hover:text-white transition-colors'
                    >
                      neko-api-key-tool
                    </a>
                  </div>
                </div>

                <div className='text-left'>
                  <p className='text-white font-semibold mb-5'>
                    {t('友情链接')}
                  </p>
                  <div className='flex flex-col gap-4'>
                    <a
                      href='https://github.com/Calcium-Ion/new-api-horizon'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-white/80 hover:text-white transition-colors'
                    >
                      new-api-horizon
                    </a>
                    <a
                      href='https://github.com/coaidev/coai'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-white/80 hover:text-white transition-colors'
                    >
                      CoAI
                    </a>
                    <a
                      href='https://www.gpt-load.com/'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-white/80 hover:text-white transition-colors'
                    >
                      GPT-Load
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className='flex flex-col md:flex-row items-center justify-between w-full gap-6 pt-8 border-t border-white/10'>
            <div className='flex flex-wrap items-center gap-2'>
              <Typography.Text className='text-sm text-white/70'>
                © {currentYear} {systemName}. {t('版权所有')}
              </Typography.Text>
            </div>

            <div className='text-sm'>
              <span className='text-white/70'>
                {t('设计与开发由')}{' '}
              </span>
              <a
                href='https://github.com/QuantumNous/new-api'
                target='_blank'
                rel='noopener noreferrer'
                className='text-blue-400 font-medium hover:text-blue-300 transition-colors'
              >
                New API
              </a>
            </div>
          </div>
        </div>
      </footer>
    ),
    [logo, systemName, t, currentYear, isDemoSiteMode],
  );

  useEffect(() => {
    loadFooter();
  }, []);

  return (
    <div className='w-full bg-white/5'>
      {footer ? (
        <div className='relative bg-white/10 border-t border-white/20 backdrop-blur-sm'>
          <div
            className='custom-footer'
            dangerouslySetInnerHTML={{ __html: footer }}
          ></div>
          <div className='absolute bottom-2 right-4 text-xs text-white/60'>
            <span>{t('设计与开发由')} </span>
            <a
              href='https://github.com/QuantumNous/new-api'
              target='_blank'
              rel='noopener noreferrer'
              className='text-blue-400 font-medium hover:text-blue-300 transition-colors'
            >
              New API
            </a>
          </div>
        </div>
      ) : (
        customFooter
      )}
    </div>
  );
};

export default FooterBar;
