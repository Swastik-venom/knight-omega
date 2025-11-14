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
import { Button, Typography } from '@douyinfe/semi-ui';
import { Link, useNavigate } from 'react-router-dom';
import { getFooterHTML, getLogo, getSystemName } from '../../helpers';
import { StatusContext } from '../../context/Status';

const FooterBar = () => {
  const { t } = useTranslation();
  const [footer, setFooter] = useState(getFooterHTML());
  const systemName = getSystemName();
  const logo = getLogo();
  const [statusState] = useContext(StatusContext);
  const docsLink = statusState?.status?.docs_link || '';
  const navigate = useNavigate();

  useEffect(() => {
    const footerHtml = localStorage.getItem('footer_html');
    if (footerHtml) {
      setFooter(footerHtml);
    }
  }, []);

  const currentYear = useMemo(() => new Date().getFullYear(), []);

  const quickLinks = useMemo(
    () => [
      { label: t('Home'), to: '/' },
      { label: t('Console'), to: '/console' },
      { label: t('Pricing'), to: '/pricing' },
      { label: t('About'), to: '/about' },
    ],
    [t],
  );

  const resourceLinks = useMemo(() => {
    const items = [];
    if (docsLink) {
      items.push({ label: t('Product guide'), href: docsLink });
    }
    items.push({ label: t('User agreement'), to: '/user-agreement' });
    items.push({ label: t('Privacy policy'), to: '/privacy-policy' });
    return items;
  }, [docsLink, t]);

  const supportContacts = useMemo(
    () => [
      { label: 'support@knight-omega.io', href: 'mailto:support@knight-omega.io' },
      { label: 'status.knight-omega.io', href: 'https://status.knight-omega.io' },
    ],
    [],
  );

  const renderLink = (item) => {
    if (item.to) {
      return (
        <Link key={item.label} to={item.to} className='footer-link'>
          {item.label}
        </Link>
      );
    }

    return (
      <a key={item.label} href={item.href} target='_blank' rel='noopener noreferrer' className='footer-link'>
        {item.label}
      </a>
    );
  };

  const renderCustomFooter = () => (
    <footer className='footer-modern'>
      <div className='footer-modern__orb footer-modern__orb--one' />
      <div className='footer-modern__orb footer-modern__orb--two' />

      <div className='footer-modern__grid'>
        <div className='footer-modern__brand'>
          <div className='footer-modern__brand-row'>
            {logo ? (
              <img src={logo} alt={systemName} className='footer-modern__logo' />
            ) : (
              <div className='footer-modern__logo--placeholder'>{systemName?.charAt(0)}</div>
            )}
            <div>
              <Typography.Title heading={5} className='footer-modern__title'>
                {systemName || 'Knight Omega'}
              </Typography.Title>
              <Typography.Text className='footer-modern__tagline'>
                {t('The all-in-one gateway for free tiers and $8 Pro monetisation')}
              </Typography.Text>
            </div>
          </div>

          <div className='footer-modern__cta'>
            <Button size='large' theme='solid' type='primary' onClick={() => navigate('/console')}>
              {t('Open control center')}
            </Button>
            <Button
              size='large'
              theme='borderless'
              className='footer-modern__cta-secondary'
              onClick={() => window.open('mailto:support@knight-omega.io')}
            >
              {t('Schedule a demo')}
            </Button>
          </div>
        </div>

        <div className='footer-modern__links'>
          <div>
            <p className='footer-modern__links-title'>{t('Site')}</p>
            <div className='footer-modern__links-column'>{quickLinks.map(renderLink)}</div>
          </div>

          <div>
            <p className='footer-modern__links-title'>{t('Resources')}</p>
            <div className='footer-modern__links-column'>{resourceLinks.map(renderLink)}</div>
          </div>

          <div>
            <p className='footer-modern__links-title'>{t('Support')}</p>
            <div className='footer-modern__links-column'>
              {supportContacts.map((item) => (
                <a key={item.label} href={item.href} className='footer-link'>
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className='footer-modern__bottom'>
        <Typography.Text className='footer-modern__legal'>
          © {currentYear} {systemName || 'Knight Omega'}. {t('All rights reserved')}
        </Typography.Text>
        <Typography.Text className='footer-modern__legal'>
          {t('Deliver secure AI access with premium routing, billing, and compliance guardrails')}
        </Typography.Text>
      </div>
    </footer>
  );

  if (footer) {
    return (
      <div className='w-full footer-custom-html'>
        <div className='custom-footer' dangerouslySetInnerHTML={{ __html: footer }}></div>
      </div>
    );
  }

  return renderCustomFooter();
};

export default FooterBar;
