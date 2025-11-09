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
      <footer className='relative w-full overflow-hidden border-t border-slate-200/70 bg-white/90 py-12 px-6 text-slate-600 backdrop-blur-xl dark:border-slate-800/60 dark:bg-slate-900/85 dark:text-slate-300'>
        <div className='mx-auto w-full max-w-6xl'>
          {isDemoSiteMode && (
            <div className='mb-10 flex w-full flex-col gap-8 md:flex-row md:items-start md:justify-between'>
              <div className='flex-shrink-0'>
                <img
                  src={logo}
                  alt={systemName}
                  className='h-16 w-16 rounded-full border border-slate-200/70 bg-white p-1.5 object-contain shadow-sm dark:border-white/15 dark:bg-white/10'
                />
              </div>

              <div className='grid w-full grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4'>
                <div className='text-left'>
                  <p className='mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400'>
                    {t('关于我们')}
                  </p>
                  <div className='flex flex-col gap-3 text-sm'>
                    <a
                      href='https://docs.newapi.pro/wiki/project-introduction/'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='transition-colors hover:text-slate-900 dark:hover:text-white'
                    >
                      {t('关于项目')}
                    </a>
                    <a
                      href='https://docs.newapi.pro/support/community-interaction/'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='transition-colors hover:text-slate-900 dark:hover:text-white'
                    >
                      {t('联系我们')}
                    </a>
                    <a
                      href='https://docs.newapi.pro/wiki/features-introduction/'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='transition-colors hover:text-slate-900 dark:hover:text-white'
                    >
                      {t('功能特性')}
                    </a>
                  </div>
                </div>

                <div className='text-left'>
                  <p className='mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400'>
                    {t('文档')}
                  </p>
                  <div className='flex flex-col gap-3 text-sm'>
                    <a
                      href='https://docs.newapi.pro/getting-started/'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='transition-colors hover:text-slate-900 dark:hover:text-white'
                    >
                      {t('快速开始')}
                    </a>
                    <a
                      href='https://docs.newapi.pro/installation/'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='transition-colors hover:text-slate-900 dark:hover:text-white'
                    >
                      {t('安装指南')}
                    </a>
                    <a
                      href='https://docs.newapi.pro/api/'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='transition-colors hover:text-slate-900 dark:hover:text-white'
                    >
                      {t('API 文档')}
                    </a>
                  </div>
                </div>

                <div className='text-left'>
                  <p className='mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400'>
                    {t('相关项目')}
                  </p>
                  <div className='flex flex-col gap-3 text-sm'>
                    <a
                      href='https://github.com/songquanpeng/one-api'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='transition-colors hover:text-slate-900 dark:hover:text-white'
                    >
                      One API
                    </a>
                    <a
                      href='https://github.com/novicezk/midjourney-proxy'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='transition-colors hover:text-slate-900 dark:hover:text-white'
                    >
                      Midjourney-Proxy
                    </a>
                    <a
                      href='https://github.com/Calcium-Ion/neko-api-key-tool'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='transition-colors hover:text-slate-900 dark:hover:text-white'
                    >
                      neko-api-key-tool
                    </a>
                  </div>
                </div>

                <div className='text-left'>
                  <p className='mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400'>
                    {t('友情链接')}
                  </p>
                  <div className='flex flex-col gap-3 text-sm'>
                    <a
                      href='https://github.com/Calcium-Ion/new-api-horizon'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='transition-colors hover:text-slate-900 dark:hover:text-white'
                    >
                      new-api-horizon
                    </a>
                    <a
                      href='https://github.com/coaidev/coai'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='transition-colors hover:text-slate-900 dark:hover:text-white'
                    >
                      CoAI
                    </a>
                    <a
                      href='https://www.gpt-load.com/'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='transition-colors hover:text-slate-900 dark:hover:text-white'
                    >
                      GPT-Load
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className='flex w-full flex-col items-center justify-between gap-6 border-t border-slate-200/70 pt-8 text-sm md:flex-row dark:border-slate-800/60'>
            <div className='flex flex-wrap items-center gap-2 text-slate-500 dark:text-slate-400'>
              <Typography.Text className='text-sm text-slate-500 dark:text-slate-400'>
                © {currentYear} {systemName}. {t('版权所有')}
              </Typography.Text>
            </div>

            <div className='text-sm text-slate-500 dark:text-slate-400'>
              <span>
                {t('设计与开发由')}{' '}
              </span>
              <a
                href='https://github.com/QuantumNous/new-api'
                target='_blank'
                rel='noopener noreferrer'
                className='font-medium text-slate-700 transition-colors hover:text-indigo-600 dark:text-slate-200 dark:hover:text-white'
              >
                Knight Omega
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
    <div className='w-full bg-white/90 text-slate-600 dark:bg-slate-900/85 dark:text-slate-300'>
      {footer ? (
        <div className='relative border-t border-slate-200/70 bg-white/90 backdrop-blur-xl dark:border-slate-800/60 dark:bg-slate-900/85'>
          <div
            className='custom-footer'
            dangerouslySetInnerHTML={{ __html: footer }}
          ></div>
          <div className='absolute bottom-2 right-4 text-xs text-slate-500 dark:text-slate-400'>
            <span>{t('设计与开发由')} </span>
            <a
              href='https://github.com/QuantumNous/new-api'
              target='_blank'
              rel='noopener noreferrer'
              className='font-medium text-indigo-600 transition-colors hover:text-indigo-500 dark:text-indigo-300 dark:hover:text-indigo-200'
            >
              Knight Omega
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
