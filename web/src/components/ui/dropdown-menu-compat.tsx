/**
 * Semi-UI Dropdown compatibility wrapper using shadcn/ui DropdownMenu
 * This component provides a drop-in replacement for Semi-UI Dropdown
 * to fix the getBoundingClientRect error while maintaining the same API
 */

import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface MenuItem {
  node: 'item' | 'divider';
  name?: string;
  type?: 'primary' | 'secondary' | 'tertiary' | 'warning' | 'danger';
  onClick?: () => void;
  disabled?: boolean;
}

interface DropdownCompatProps {
  children: React.ReactNode;
  menu: MenuItem[];
  trigger?: 'click' | 'hover';
  position?: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight';
  className?: string;
}

export const DropdownCompat: React.FC<DropdownCompatProps> = ({
  children,
  menu,
  trigger = 'click',
  position = 'bottomRight',
  className,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align={position.includes('Right') ? 'end' : 'start'}
        side={position.includes('bottom') ? 'bottom' : 'top'}
        className={className}
      >
        {menu.map((item, index) => {
          if (item.node === 'divider') {
            return <DropdownMenuSeparator key={`divider-${index}`} />;
          }

          const itemClassName = item.type === 'danger' 
            ? 'text-destructive focus:text-destructive' 
            : '';

          return (
            <DropdownMenuItem
              key={index}
              onClick={item.onClick}
              disabled={item.disabled}
              className={itemClassName}
            >
              {item.name}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownCompat;