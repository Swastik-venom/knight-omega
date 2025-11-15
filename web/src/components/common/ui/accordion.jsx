import React from 'react';
import { Collapse } from '@douyinfe/semi-ui';

// Glass effect accordion components
const { Panel } = Collapse;

const GlassAccordion = ({ type = 'default', collapsible = false, className = '', children, ...props }) => {
  const glassClasses = `w-full bg-white/5 border border-white/10 backdrop-blur-xl rounded-xl ${className}`;
  
  return (
    <Collapse 
      accordion={type === 'single'} 
      className={glassClasses}
      {...props}
    >
      {children}
    </Collapse>
  );
};

const GlassAccordionItem = ({ value, className = '', children, ...props }) => {
  const glassClasses = `border-b border-white/10 ${className}`;
  
  return (
    <div className={glassClasses} {...props}>
      {children}
    </div>
  );
};

const GlassAccordionTrigger = ({ className = '', children, ...props }) => {
  const glassClasses = `p-4 text-left text-white hover:text-white/90 rounded-lg backdrop-blur-sm hover:bg-white/10 transition-colors ${className}`;
  
  return (
    <div className={glassClasses} {...props}>
      {children}
    </div>
  );
};

const GlassAccordionContent = ({ className = '', children, ...props }) => {
  const glassClasses = `p-4 pt-0 text-white/80 ${className}`;
  
  return (
    <div className={glassClasses} {...props}>
      {children}
    </div>
  );
};

export { 
  GlassAccordion as Accordion, 
  GlassAccordionItem as AccordionItem, 
  GlassAccordionTrigger as AccordionTrigger, 
  GlassAccordionContent as AccordionContent,
  Panel as GlassPanel
};