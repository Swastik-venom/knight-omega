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

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/common/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/common/ui/accordion';
import { Empty } from '@/components/common/ui/empty';
import ScrollableContainer from '@/components/common/ui/ScrollableContainer';
import { HelpCircle, Plus, Minus } from 'lucide-react';
import { marked } from 'marked';

const FaqPanel = ({
  faqData,
  CARD_PROPS,
  FLEX_CENTER_GAP2,
  ILLUSTRATION_SIZE,
  t,
}) => {
  return (
    <Card className='bg-white/10 border border-white/20 backdrop-blur-xl !rounded-2xl lg:col-span-1 glass-apple'>
      <div className='flex items-center gap-2 px-6 py-4 border-b border-white/20'>
        <HelpCircle size={16} className='text-blue-400' />
        <h3 className='font-semibold text-white'>{t('常见问答')}</h3>
      </div>
      <CardContent className='p-0'>
        <ScrollableContainer maxHeight='24rem'>
          {faqData.length > 0 ? (
            <Accordion type="single" collapsible className="w-full">
              {faqData.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-b border-white/10 p-2 backdrop-blur-sm glass-apple-hover rounded-lg m-2">
                  <AccordionTrigger className="p-4 text-left text-white hover:text-white/90 rounded-lg backdrop-blur-sm glass-apple-hover">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="p-4 pt-0 text-white/80 bg-white/5 backdrop-blur-sm glass-apple rounded-lg m-2">
                    <div
                      className="p-2"
                      dangerouslySetInnerHTML={{
                        __html: marked.parse(item.answer || ''),
                      }}
                    />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className='flex justify-center items-center py-8'>
              <Empty
                title={t('暂无常见问答')}
                description={t('请联系管理员在系统设置中配置常见问答')}
              />
            </div>
          )}
        </ScrollableContainer>
      </CardContent>
    </Card>
  );
};

export default FaqPanel;
