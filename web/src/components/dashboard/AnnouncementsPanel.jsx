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

import React from 'react';
import { Card, Tag, Empty } from '@douyinfe/semi-ui';
import { Bell } from 'lucide-react';
import { marked } from 'marked';
import { 
  IllustrationConstruction,
  IllustrationConstructionDark,
} from '@douyinfe/semi-illustrations';
import ScrollableContainer from '../common/ui/ScrollableContainer';

const AnnouncementsPanel = ({
  announcementData,
  announcementLegendData,
  CARD_PROPS,
  ILLUSTRATION_SIZE,
  t,
}) => {
  return (
    <Card className='bg-white/10 border border-white/20 backdrop-blur-xl !rounded-2xl lg:col-span-2 glass-apple'>
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-6 border-b border-white/20'>
        <div className='flex items-center gap-2'>
          <Bell size={16} className='text-blue-400' />
          <h3 className='font-semibold text-white'>{t('系统公告')}</h3>
          <Badge variant="secondary" className='text-xs bg-white/20 border-white/30 backdrop-blur-xl'>
            {t('显示最新20条')}
          </Badge>
        </div>
        {/* 图例 */}
        <div className='flex flex-wrap gap-3 text-xs'>
          {announcementLegendData.map((legend, index) => (
            <div key={index} className='flex items-center gap-1'>
              <div
                className='w-2 h-2 rounded-full'
                style={{
                  backgroundColor:
                    legend.color === 'grey'
                      ? '#8b9aa7'
                      : legend.color === 'blue'
                        ? '#3b82f6'
                        : legend.color === 'green'
                          ? '#10b981'
                          : legend.color === 'orange'
                            ? '#f59e0b'
                            : legend.color === 'red'
                              ? '#ef4444'
                              : '#8b9aa7',
                }}
              />
              <span className='text-white/60'>{legend.label}</span>
            </div>
          ))}
        </div>
      </div>
      <CardContent className='p-0'>
        <ScrollableContainer maxHeight='24rem'>
          {announcementData.length > 0 ? (
            <div className="space-y-4 p-4">
              {announcementData.map((item, idx) => {
                const htmlExtra = item.extra ? marked.parse(item.extra) : '';
                return (
                  <div key={idx} className="relative pl-8 pb-6 last:pb-0 p-4 rounded-lg backdrop-blur-sm glass-apple-hover">
                    <div className="absolute left-0 top-1 w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"></div>
                    <div className="absolute left-1.5 top-4 bottom-0 w-px bg-gradient-to-b from-blue-500/20 to-transparent"></div>
                    <div className="text-xs text-white/60 mb-1 ml-4">{item.relative ? item.relative + ' ' : ''}{item.time}</div>
                    <div 
                      className="ml-4 text-white/80"
                      dangerouslySetInnerHTML={{
                        __html: marked.parse(item.content || ''),
                      }}
                    />
                    {item.extra && (
                      <div
                        className='ml-4 text-xs text-white/50 mt-2'
                        dangerouslySetInnerHTML={{ __html: htmlExtra }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className='flex justify-center items-center py-8'>
              <Empty
                title={t('暂无系统公告')}
                description={t('请联系管理员在系统设置中配置公告信息')}
              />
            </div>
          )}
        </ScrollableContainer>
      </CardContent>
    </Card>
  );
};

export default AnnouncementsPanel;
