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
import { Card, Avatar, Skeleton, Tag } from '@douyinfe/semi-ui';
import { VChart } from '@visactor/react-vchart';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const StatsCards = ({
  groupedStatsData,
  loading,
  getTrendSpec,
  CARD_PROPS,
  CHART_CONFIG,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div className='mb-6'>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
        {groupedStatsData.map((group, idx) => (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: idx * 0.06, ease: 'easeOut' }}
          >
            <Card
              {...CARD_PROPS}
              className='!rounded-3xl border border-slate-200/80 bg-white/95 px-4 py-5 shadow-[0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur-md dark:border-white/10 dark:bg-slate-900/70 dark:shadow-[0_18px_45px_rgba(15,23,42,0.4)]'
              title={
                <span className='text-sm font-semibold text-slate-700 dark:text-white/80'>
                  {group.title}
                </span>
              }
            >
              <div className='space-y-5'>
                {group.items.map((item, itemIdx) => (
                  <div
                    key={itemIdx}
                    className='flex cursor-pointer items-center justify-between rounded-2xl border border-slate-200/60 bg-white/70 px-3 py-3 transition hover:border-indigo-200 hover:bg-indigo-50/70 dark:border-white/10 dark:bg-white/5 dark:hover:border-indigo-400/30 dark:hover:bg-indigo-500/10'
                    onClick={item.onClick}
                  >
                    <div className='flex items-center gap-3'>
                      <Avatar
                        className='shadow-inner'
                        size='small'
                        style={{
                          background: item.avatarColor,
                          color: '#fff',
                        }}
                      >
                        {item.icon}
                      </Avatar>
                      <div>
                        <div className='text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-white/60'>
                          {item.title}
                        </div>
                        <div className='text-lg font-semibold text-slate-900 dark:text-white'>
                          <Skeleton
                            loading={loading}
                            active
                            placeholder={
                              <Skeleton.Paragraph
                                active
                                rows={1}
                                style={{
                                  width: '70px',
                                  height: '22px',
                                  marginTop: '4px',
                                }}
                              />
                            }
                          >
                            {item.value}
                          </Skeleton>
                        </div>
                      </div>
                    </div>

                    {item.title === t('当前余额') ? (
                      <Tag
                        color='lavender'
                        shape='circle'
                        size='large'
                        className='!border-0 !bg-indigo-500/10 !text-indigo-600 dark:!bg-indigo-500/20 dark:!text-indigo-200'
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate('/console/topup');
                        }}
                      >
                        {t('充值')}
                      </Tag>
                    ) : (
                      (loading || (item.trendData && item.trendData.length > 0)) && (
                        <div className='h-12 w-24'>
                          <VChart
                            spec={getTrendSpec(item.trendData, item.trendColor)}
                            option={CHART_CONFIG}
                          />
                        </div>
                      )
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StatsCards;
