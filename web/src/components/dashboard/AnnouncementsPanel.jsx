

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

  // Pre-process announcement data to avoid using hooks inside map
  const processedAnnouncements = useMemo(() => {
    return announcementData.map(item => ({
      ...item,
      parsedContent: marked(item.content || ''),
      parsedExtra: item.extra ? marked(item.extra) : ''
    }));
  }, [announcementData]);

  return (
    <GlassCard
      elevated
      className='lg:col-span-2 border border-slate-200/70 bg-white/95 !rounded-3xl shadow-[0_20px_55px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-slate-900/70 dark:shadow-[0_20px_55px_rgba(15,23,42,0.4)]'
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
          <div className='flex flex-wrap gap-3 text-xs text-slate-500 dark:text-white/70'>
            {announcementLegendData.map((legend, index) => (
              <div key={index} className='flex items-center gap-1'>
                <div
                  className='w-2 h-2 rounded-full'
                  style={{
                    backgroundColor: getColorStyle(legend.color)
                  }}
                />
                <span className='text-slate-500 dark:text-white/60'>{legend.label}</span>
              </div>
            ))}
          </div>
        </div>
      </CardHeader>

      <CardContent padding="none">
        <ScrollableContainer maxHeight='24rem'>
          {announcementData.length > 0 ? (
            <div className="space-y-4 p-4">
              {processedAnnouncements.map((processedItem, idx) => {
                const item = announcementData[idx];
                return (
                  <div key={idx} className='relative p-4 pl-8 rounded-lg transition-all duration-200 hover:bg-slate-100/80 dark:hover:bg-white/10 last:pb-0'>
                    <div className='absolute left-0 top-1 h-3 w-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600'></div>
                    <div className='absolute left-1.5 top-4 bottom-0 w-px bg-gradient-to-b from-blue-500/20 to-transparent'></div>
                    <div className='mb-1 ml-4 text-xs text-slate-500 dark:text-white/60'>{item.relative ? item.relative + ' ' : ''}{item.time}</div>
                    <div
                      className='ml-4 text-slate-700 dark:text-white/80'
                      dangerouslySetInnerHTML={{
                        __html: processedItem.parsedContent,
                      }}
                    />
                    {item.extra && (
                      <div
                        className='ml-4 mt-2 text-xs text-slate-500 dark:text-white/60'
                        dangerouslySetInnerHTML={{ __html: processedItem.parsedExtra }}
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