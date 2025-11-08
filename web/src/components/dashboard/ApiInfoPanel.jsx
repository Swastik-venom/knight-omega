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
import { Card, Tag, Divider, Empty, Button } from '@douyinfe/semi-ui';
import { Server, RotateCcw } from 'lucide-react';
import { ExternalLink } from '@douyinfe/semi-icons';
import { IllustrationConstruction, IllustrationConstructionDark } from '@douyinfe/semi-illustrations';
import ScrollableContainer from '../common/ui/ScrollableContainer';

const ApiInfoPanel = ({
  apiInfoData,
  handleCopyUrl,
  handleSpeedTest,
  CARD_PROPS,
  FLEX_CENTER_GAP2,
  ILLUSTRATION_SIZE,
  t,
}) => {
  return (
    <Card
      {...CARD_PROPS}
      className='bg-white/10 border-0 !rounded-2xl glass-apple'
      title={
        <div className={FLEX_CENTER_GAP2}>
          <Server size={16} />
          {t('API信息')}
        </div>
      }
      bodyStyle={{ padding: 0 }}
    >
      <ScrollableContainer maxHeight='24rem'>
        {apiInfoData.length > 0 ? (
          apiInfoData.map((api) => (
            <React.Fragment key={api.id}>
              <div className='flex p-4 hover:bg-white/10 transition-colors cursor-pointer'>
                <div className='flex-shrink-0 mr-3 flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600'>
                  <span className='text-xs font-medium text-white'>
                    {api.route.substring(0, 2).toUpperCase()}
                  </span>
                </div>
                <div className='flex-1'>
                  <div className='flex flex-wrap items-center justify-between mb-1 w-full gap-2'>
                    <span className='text-sm font-medium text-white break-all'>
                      {api.route}
                    </span>
                    <div className='flex items-center gap-2 mt-1 lg:mt-0'>
                      <Tag
                        size='small'
                        color='white'
                        shape='basic'
                        onClick={() => handleSpeedTest(api.url)}
                        className='cursor-pointer text-xs hover:opacity-80'
                      >
                        <RotateCcw size={12} className='mr-1' />
                        {t('测速')}
                      </Tag>
                      <Tag
                        size='small'
                        color='white'
                        shape='basic'
                        onClick={() =>
                          window.open(api.url, '_blank', 'noopener,noreferrer')
                        }
                        className='cursor-pointer text-xs hover:opacity-80'
                      >
                        <ExternalLink style={{ width: 12, height: 12 }} className='mr-1' />
                        {t('跳转')}
                      </Tag>
                    </div>
                  </div>
                  <div
                    className='text-blue-400 break-all cursor-pointer hover:underline mb-1'
                    onClick={() => handleCopyUrl(api.url)}
                  >
                    {api.url}
                  </div>
                  <div className='text-white/60 text-sm'>{api.description}</div>
                </div>
              </div>
              <Divider className='my-0 bg-white/20' />
            </React.Fragment>
          ))
        ) : (
          <div className='flex justify-center items-center min-h-[20rem] w-full'>
            <Empty
              image={<IllustrationConstruction style={ILLUSTRATION_SIZE} />}
              darkModeImage={
                <IllustrationConstructionDark style={ILLUSTRATION_SIZE} />
              }
              title={t('暂无API信息')}
              description={t('请联系管理员在系统设置中配置API信息')}
            />
          </div>
        )}
      </ScrollableContainer>
    </Card>
  );
};

export default ApiInfoPanel;
