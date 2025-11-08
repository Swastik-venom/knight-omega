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

import React, { useMemo } from 'react';
import { Card, Tag, Empty } from '@douyinfe/semi-ui';
import { Bell } from 'lucide-react';
import { marked } from 'marked';
import {
  IllustrationConstruction,
  IllustrationConstructionDark,
} from '@douyinfe/semi-illustrations';
import ScrollableContainer from '../common/ui/ScrollableContainer';
import { Card as GlassCard, CardHeader, CardContent } from '../common/ui/card';

const AnnouncementsPanel = ({
  announcementData,
  announcementLegendData,
  CARD_PROPS,
  ILLUSTRATION_SIZE,
  t,
}) => {
  // Memoize the color mapping function for better performance
  const getColorStyle = useMemo(() => (color) => {
    const colorMap = {
      grey: '#8b9aa7',
      blue: '#3b82f6',
      green: '#10b981',
      orange: '#f59e0b',
      red: '#ef4444',
    };
    return colorMap[color] || '#8b9aa7';
  }, []);

  return (
    <GlassCard 
      elevated 
      className='shadow-sm !rounded-2xl lg:col-span-2'
      {...CARD_PROPS}
    >
      <CardHeader>
        <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2 w-full'>
          <div className='flex items-center gap-2'>
            <Bell size={16} />
            {t('系统公告')}
            <Tag color='white' shape='circle'>
              {t('显示最新20条')}
            </Tag>
          </div>
          {/* 图例 */}
          <div className='flex flex-wrap gap-3 text-xs'>
            {announcementLegendData.map((legend, index) => (
              <div key={index} className='flex items-center gap-1'>
                <div
                  className='w-2 h-2 rounded-full'
                  style={{
                    backgroundColor: getColorStyle(legend.color)
                  }}
                />
                <span className='text-white/60'>{legend.label}</span>
              </div>
            ))}
          </div>
        </div>
      </CardHeader>
      
      <CardContent padding="none">
        <ScrollableContainer maxHeight='24rem'>
          {announcementData.length > 0 ? (
            <div className="space-y-4 p-4">
              {announcementData.map((item, idx) => {
                // Memoize the parsed extra content
                const parsedExtra = useMemo(() => {
                  return item.extra ? marked.parse(item.extra) : '';
                }, [item.extra]);

                return (
                  <div key={idx} className="relative pl-8 pb-6 last:pb-0 p-4 rounded-lg hover:bg-white/10 transition-all duration-200">
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
                        dangerouslySetInnerHTML={{ __html: parsedExtra }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className='flex justify-center items-center py-8'>
              <Empty
                image={<IllustrationConstruction style={ILLUSTRATION_SIZE} />}
                darkModeImage={
                  <IllustrationConstructionDark style={ILLUSTRATION_SIZE} />
                }
                title={t('暂无系统公告')}
                description={t('请联系管理员在系统设置中配置公告信息')}
              />
            </div>
          )}
        </ScrollableContainer>
      </CardContent>
    </GlassCard>
  );
};

export default AnnouncementsPanel;