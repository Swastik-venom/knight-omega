

import React, { useCallback } from 'react';
import { Card, Divider, Empty, Button } from '@douyinfe/semi-ui-19';
import { Server, RotateCcw, Copy, ExternalLink as ExternalLinkIcon } from 'lucide-react';
import { IllustrationConstruction, IllustrationConstructionDark } from '@douyinfe/semi-illustrations';
import ScrollableContainer from '../common/ui/ScrollableContainer';
import { Card as GlassCard, CardHeader, CardContent } from '../common/ui/card';

const ApiInfoPanel = ({
  apiInfoData,
  handleCopyUrl,
  handleSpeedTest,
  CARD_PROPS,
  FLEX_CENTER_GAP2,
  ILLUSTRATION_SIZE,
  t,
}) => {
  // Memoize the click handlers to prevent unnecessary re-renders
  const handleSpeedTestMemo = useCallback((url) => {
    handleSpeedTest(url);
  }, [handleSpeedTest]);

  const handleOpenUrl = useCallback((url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  }, []);

  const handleCopyUrlMemo = useCallback((url) => {
    handleCopyUrl(url);
  }, [handleCopyUrl]);

  return (
    <GlassCard 
      elevated 
      className='border border-slate-200/70 bg-white/95 !rounded-3xl shadow-[0_20px_55px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-slate-900/70 dark:shadow-[0_20px_55px_rgba(15,23,42,0.4)]'
      {...CARD_PROPS}
    >
      <CardHeader className="w-full">
        <div className="w-full flex justify-center items-center gap-2">
          <Server size={16} />
          <span className="text-lg font-semibold text-slate-900 dark:text-white">
            {t('API信息', { defaultValue: 'API Information' })}
          </span>
        </div>
      </CardHeader>
      
      <CardContent padding="none">
        <ScrollableContainer maxHeight='24rem'>
          {apiInfoData.length > 0 ? (
            apiInfoData.map((api) => (
              <React.Fragment key={api.id}>
                <div className='flex p-4 transition-all duration-200 cursor-pointer hover:bg-slate-100/80 dark:hover:bg-white/10'>
                  <div className='mr-3 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500'>
                    <span className='text-xs font-medium text-white'>
                      {api.route.substring(0, 2).toUpperCase()}
                    </span>
                  </div>
                  <div className='flex-1'>
                    <div className='flex flex-wrap items-center justify-between mb-1 w-full gap-2'>
                      <span className='text-sm font-semibold text-slate-900 break-all dark:text-white'>
                        {api.route}
                      </span>
                      <div className='flex items-center gap-2 mt-1 lg:mt-0'>
                        <Button
                          theme='borderless'
                          size='small'
                          className='!rounded-full !px-3 !py-1.5 !text-xs !text-slate-600 hover:!bg-slate-100 dark:!text-white dark:hover:!bg-white/10'
                          icon={<RotateCcw size={12} />}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSpeedTestMemo(api.url);
                          }}
                        >
                          {t('测速', { defaultValue: 'Speed test' })}
                        </Button>
                        <Button
                          theme='borderless'
                          size='small'
                          className='!rounded-full !px-3 !py-1.5 !text-xs !text-slate-600 hover:!bg-slate-100 dark:!text-white dark:hover:!bg-white/10'
                          icon={<ExternalLinkIcon size={12} />}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenUrl(api.url);
                          }}
                        >
                          {t('跳转', { defaultValue: 'Open' })}
                        </Button>
                        <Button
                          theme='borderless'
                          size='small'
                          className='!rounded-full !px-3 !py-1.5 !text-xs !text-slate-600 hover:!bg-slate-100 dark:!text-white dark:hover:!bg-white/10'
                          icon={<Copy size={12} />}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopyUrlMemo(api.url);
                          }}
                        >
                          {t('复制', { defaultValue: 'Copy' })}
                        </Button>
                      </div>
                    </div>
                    <div
                      className='text-slate-600 break-all cursor-pointer hover:text-indigo-500 hover:underline transition-colors dark:text-blue-300'
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopyUrlMemo(api.url);
                      }}
                    >
                      {api.url}
                    </div>
                    <div className='text-sm text-slate-500 dark:text-white/70'>{api.description}</div>
                  </div>
                </div>
                <Divider className='my-0 bg-slate-200/70 dark:bg-white/10' />
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
      </CardContent>
    </GlassCard>
  );
};

export default ApiInfoPanel;