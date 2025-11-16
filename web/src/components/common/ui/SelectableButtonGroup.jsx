

import React, { useState, useRef, useEffect } from 'react';
import { useMinimumLoadingTime } from '../../../hooks/common/useMinimumLoadingTime';
import { useContainerWidth } from '../../../hooks/common/useContainerWidth';
import {
  Divider,
  Button,
  Tag,
  Row,
  Col,
  Collapsible,
  Checkbox,
  Skeleton,
  Tooltip,
} from '@douyinfe/semi-ui-19';
import { IconChevronDown, IconChevronUp } from '@douyinfe/semi-icons';

/**
 * Generic selectable button group component
 *
 * @param {string} title Title
 * @param {Array<{value:any,label:string,icon?:React.ReactNode,tagCount?:number}>} items Button items
 * @param {*|Array} activeValue Currently active value, can be single value or array (multi-select)
 * @param {(value:any)=>void} onChange Selection change callback
 * @param {function} t i18n
 * @param {object} style Additional styles
 * @param {boolean} collapsible Whether to support collapse, default true
 * @param {number} collapseHeight Height when collapsed, default 200
 * @param {boolean} withCheckbox Whether to enable prefix Checkbox to control active state
 * @param {boolean} loading Whether in loading state
 */
const SelectableButtonGroup = ({
  title,
  items = [],
  activeValue,
  onChange,
  t = (v) => v,
  style = {},
  collapsible = true,
  collapseHeight = 200,
  withCheckbox = false,
  loading = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [skeletonCount] = useState(12);
  const [containerRef, containerWidth] = useContainerWidth();

  const ConditionalTooltipText = ({ text }) => {
    const textRef = useRef(null);
    const [isOverflowing, setIsOverflowing] = useState(false);

    useEffect(() => {
      const el = textRef.current;
      if (!el) return;
      setIsOverflowing(el.scrollWidth > el.clientWidth);
    }, [text, containerWidth]);

    const textElement = (
      <span ref={textRef} className='sbg-ellipsis'>
        {text}
      </span>
    );

    return isOverflowing ? (
      <Tooltip content={text}>{textElement}</Tooltip>
    ) : (
      textElement
    );
  };

  // Calculate responsive column count and tag display strategy based on container width
  const getResponsiveConfig = () => {
    if (containerWidth <= 280) return { columns: 1, showTags: true }; // Very narrow: 1 column + tags
    if (containerWidth <= 380) return { columns: 2, showTags: true }; // Narrow: 2 columns + tags
    if (containerWidth <= 460) return { columns: 3, showTags: false }; // Medium: 3 columns without tags
    return { columns: 3, showTags: true }; // Widest: 3 columns + tags
  };

  const { columns: perRow, showTags: shouldShowTags } = getResponsiveConfig();
  const maxVisibleRows = Math.max(1, Math.floor(collapseHeight / 32)); // Approx row height 32
  const needCollapse = collapsible && items.length > perRow * maxVisibleRows;
  const showSkeleton = useMinimumLoadingTime(loading);

  // Use consistent compact grid spacing
  const gutterSize = [4, 4];

  // Calculate Semi UI Col span value
  const getColSpan = () => {
    return Math.floor(24 / perRow);
  };

  const maskStyle = isOpen
    ? {}
    : {
        WebkitMaskImage:
          'linear-gradient(to bottom, black 0%, rgba(0, 0, 0, 1) 60%, rgba(0, 0, 0, 0.2) 80%, transparent 100%)',
      };

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const linkStyle = {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    bottom: -10,
    fontWeight: 400,
    cursor: 'pointer',
    fontSize: '12px',
    color: 'var(--semi-color-text-2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  };

  const renderSkeletonButtons = () => {
    const placeholder = (
      <Row gutter={gutterSize} style={{ lineHeight: '32px', ...style }}>
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <Col span={getColSpan()} key={index}>
            <div
              style={{
                width: '100%',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                border: '1px solid var(--semi-color-border)',
                borderRadius: 'var(--semi-border-radius-medium)',
                padding: '0 12px',
                gap: '6px',
              }}
            >
              {withCheckbox && (
                <Skeleton.Title active style={{ width: 14, height: 14 }} />
              )}
              <Skeleton.Title
                active
                style={{
                  width: `${60 + (index % 3) * 20}px`,
                  height: 14,
                }}
              />
            </div>
          </Col>
        ))}
      </Row>
    );

    return (
      <Skeleton loading={true} active placeholder={placeholder}></Skeleton>
    );
  };

  const contentElement = showSkeleton ? (
    renderSkeletonButtons()
  ) : (
    <Row gutter={gutterSize} style={{ lineHeight: '32px', ...style }}>
      {items.map((item) => {
        const isDisabled =
          item.disabled ||
          (typeof item.tagCount === 'number' && item.tagCount === 0);
        const isActive = Array.isArray(activeValue)
          ? activeValue.includes(item.value)
          : activeValue === item.value;

        if (withCheckbox) {
          return (
            <Col span={getColSpan()} key={item.value}>
              <Button
                onClick={() => {
                  /* disabled */
                }}
                theme={isActive ? 'light' : 'outline'}
                type={isActive ? 'primary' : 'tertiary'}
                disabled={isDisabled}
                className='sbg-button'
                icon={
                  <Checkbox
                    checked={isActive}
                    onChange={() => onChange(item.value)}
                    disabled={isDisabled}
                    style={{ pointerEvents: 'auto' }}
                  />
                }
                style={{ width: '100%', cursor: 'default' }}
              >
                <div className='sbg-content'>
                  {item.icon && <span className='sbg-icon'>{item.icon}</span>}
                  <ConditionalTooltipText text={item.label} />
                  {item.tagCount !== undefined && shouldShowTags && (
                    <Tag
                      className='sbg-tag'
                      color='white'
                      shape='circle'
                      size='small'
                    >
                      {item.tagCount}
                    </Tag>
                  )}
                </div>
              </Button>
            </Col>
          );
        }

        return (
          <Col span={getColSpan()} key={item.value}>
            <Button
              onClick={() => onChange(item.value)}
              theme={isActive ? 'light' : 'outline'}
              type={isActive ? 'primary' : 'tertiary'}
              disabled={isDisabled}
              className='sbg-button'
              style={{
                width: '100%',
                backgroundColor: isActive ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                borderColor: isActive ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                backdropFilter: 'blur(12px)'
              }}
            >
              <div className='sbg-content' style={{ color: 'white' }}>
                {item.icon && <span className='sbg-icon' style={{ color: isActive ? 'white' : 'rgba(255, 255, 255, 0.7)' }}>{item.icon}</span>}
                <ConditionalTooltipText text={item.label} />
                {item.tagCount !== undefined && shouldShowTags && (
                  <Tag
                    className='sbg-tag'
                    style={{
                      backgroundColor: isActive ? 'rgba(99, 102, 241, 0.3)' : 'rgba(255, 255, 255, 0.15)',
                      color: isActive ? 'rgb(199, 210, 254)' : 'rgba(255, 255, 255, 0.7)',
                      border: 'none'
                    }}
                    shape='circle'
                    size='small'
                  >
                    {item.tagCount}
                  </Tag>
                )}
              </div>
            </Button>
          </Col>
        );
      })}
    </Row>
  );

  return (
    <div
      className={`mb-8 ${containerWidth <= 400 ? 'sbg-compact' : ''}`}
      ref={containerRef}
    >
      {title && (
        <Divider margin='12px' align='left' style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
          {showSkeleton ? (
            <Skeleton.Title active style={{ width: 80, height: 14 }} />
          ) : (
            <span style={{ color: 'rgba(255, 255, 255, 0.7)', fontWeight: 500 }}>{title}</span>
          )}
        </Divider>
      )}
      {needCollapse && !showSkeleton ? (
        <div style={{ position: 'relative' }}>
          <Collapsible
            isOpen={isOpen}
            collapseHeight={collapseHeight}
            style={{ ...maskStyle }}
          >
            {contentElement}
          </Collapsible>
          {isOpen ? null : (
            <div onClick={toggle} style={{ ...linkStyle, color: 'rgba(255, 255, 255, 0.6)' }}>
              <IconChevronDown size='small' />
              <span>{t('Show more')}</span>
            </div>
          )}
          {isOpen && (
            <div
              onClick={toggle}
              style={{
                ...linkStyle,
                position: 'static',
                marginTop: 8,
                bottom: 'auto',
                color: 'rgba(255, 255, 255, 0.6)'
              }}
            >
              <IconChevronUp size='small' />
              <span>{t('Collapse')}</span>
            </div>
          )}
        </div>
      ) : (
        contentElement
      )}
    </div>
  );
};

export default SelectableButtonGroup;
