

import React from 'react';
import { Card, Collapse, Empty } from '@douyinfe/semi-ui';
import { HelpCircle } from 'lucide-react';
import { IconPlus, IconMinus } from '@douyinfe/semi-icons';
import { marked } from 'marked';
import { 
  IllustrationConstruction,
  IllustrationConstructionDark,
} from '@douyinfe/semi-illustrations';
import ScrollableContainer from '../common/ui/ScrollableContainer';

const { Panel } = Collapse;

const FaqPanel = ({
  faqData,
  CARD_PROPS,
  FLEX_CENTER_GAP2,
  ILLUSTRATION_SIZE,
  t,
}) => {
  return (
    <Card
      {...CARD_PROPS}
      className='lg:col-span-1 !rounded-3xl border border-slate-200/70 bg-white/95 shadow-[0_20px_55px_rgba(15,23,42,0.08)] backdrop-blur-md dark:border-white/10 dark:bg-slate-900/70 dark:shadow-[0_20px_55px_rgba(15,23,42,0.4)]'
      title={
        <div className={FLEX_CENTER_GAP2}>
          <HelpCircle size={16} />
          {t('常见问答')}
        </div>
      }
      bodyStyle={{ padding: 0 }}
    >
      <ScrollableContainer maxHeight='24rem'>
        {faqData.length > 0 ? (
          <Collapse
            accordion
            expandIcon={<IconPlus />}
            collapseIcon={<IconMinus />}
          >
            {faqData.map((item, index) => (
              <Panel
                key={index}
                header={item.question}
                itemKey={index.toString()}
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: marked.parse(item.answer || ''),
                  }}
                />
              </Panel>
            ))}
          </Collapse>
        ) : (
          <div className='flex justify-center items-center py-8'>
            <Empty
              image={<IllustrationConstruction style={ILLUSTRATION_SIZE} />}
              darkModeImage={
                <IllustrationConstructionDark style={ILLUSTRATION_SIZE} />
              }
              title={t('暂无常见问答')}
              description={t('请联系管理员在系统设置中配置常见问答')}
            />
          </div>
        )}
      </ScrollableContainer>
    </Card>
  );
};

export default FaqPanel;
