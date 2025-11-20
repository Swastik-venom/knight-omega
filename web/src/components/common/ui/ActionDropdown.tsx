/**
 * ActionDropdown - A robust dropdown menu component
 * Replaces Semi-UI Dropdown with shadcn/ui DropdownMenu
 * Provides consistent styling and behavior across the application
 */

import React from 'react';
import { MoreVertical, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

export interface DropdownMenuItemConfig {
  node?: 'item' | 'divider';
  name?: string;
  type?: 'default' | 'danger' | 'warning' | 'tertiary' | 'secondary';
  onClick?: () => void;
  disabled?: boolean;
  icon?: React.ReactNode;
}

interface ActionDropdownProps {
  /** Menu items configuration */
  menu?: DropdownMenuItemConfig[];
  /** Trigger button variant */
  variant?: 'default' | 'ghost' | 'outline' | 'tertiary';
  /** Button size */
  size?: 'default' | 'sm' | 'lg' | 'icon' | 'small';
  /** Icon orientation */
  iconOrientation?: 'vertical' | 'horizontal';
  /** Custom trigger element */
  trigger?: React.ReactNode;
  /** Dropdown position */
  position?: 'bottom' | 'top' | 'left' | 'right' | 'bottomRight' | 'bottomLeft';
  /** Custom className for trigger button */
  className?: string;
  /** Custom icon */
  icon?: React.ReactNode;
  /** Trigger type */
  triggerType?: 'click' | 'hover';
  /** Children for custom trigger */
  children?: React.ReactNode;
}

export const ActionDropdown: React.FC<ActionDropdownProps> = ({
  menu = [],
  variant = 'ghost',
  size = 'sm',
  iconOrientation = 'vertical',
  trigger,
  position = 'bottomRight',
  className,
  icon,
  triggerType = 'click',
  children,
}) => {
  // Map Semi-UI size to shadcn size
  const mappedSize = size === 'small' ? 'sm' : size;
  
  // Map Semi-UI variant to shadcn variant
  const mappedVariant = variant === 'tertiary' ? 'ghost' : variant;

  // Determine alignment based on position
  const getAlign = () => {
    if (position.includes('Right')) return 'end';
    if (position.includes('Left')) return 'start';
    return 'center';
  };

  // Determine side based on position
  const getSide = (): 'top' | 'right' | 'bottom' | 'left' => {
    if (position.includes('top')) return 'top';
    if (position.includes('left')) return 'left';
    if (position.includes('right')) return 'right';
    return 'bottom';
  };

  // Default trigger button
  const defaultTrigger = (
    <Button
      variant={mappedVariant}
      size={mappedSize}
      className={cn('h-8 w-8 p-0', className)}
      onClick={(e) => e.stopPropagation()}
    >
      {icon || (iconOrientation === 'vertical' ? (
        <MoreVertical className="h-4 w-4" />
      ) : (
        <MoreHorizontal className="h-4 w-4" />
      ))}
    </Button>
  );

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {children || trigger || defaultTrigger}
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align={getAlign()}
          side={getSide()}
          className="min-w-[160px]"
          onClick={(e) => e.stopPropagation()}
        >
          {menu.map((item, index) => {
            // Render divider
            if (item.node === 'divider') {
              return <DropdownMenuSeparator key={`divider-${index}`} />;
            }

            // Determine item styling based on type
            const getItemClassName = () => {
              const baseClass = 'cursor-pointer';
              switch (item.type) {
                case 'danger':
                  return cn(
                    baseClass,
                    'text-red-600 focus:text-red-600 focus:bg-red-50 dark:text-red-400 dark:focus:bg-red-950'
                  );
                case 'warning':
                  return cn(
                    baseClass,
                    'text-orange-600 focus:text-orange-600 focus:bg-orange-50 dark:text-orange-400 dark:focus:bg-orange-950'
                  );
                case 'secondary':
                  return cn(
                    baseClass,
                    'text-gray-600 focus:text-gray-600 focus:bg-gray-50 dark:text-gray-400 dark:focus:bg-gray-800'
                  );
                default:
                  return baseClass;
              }
            };

            return (
              <DropdownMenuItem
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!item.disabled && item.onClick) {
                    item.onClick();
                  }
                }}
                disabled={item.disabled}
                className={getItemClassName()}
              >
                {item.icon && <span className="mr-2">{item.icon}</span>}
                {item.name}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ActionDropdown;