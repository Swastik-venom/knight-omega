import React, { useEffect, useRef, useState } from 'react';

const Marquee = ({
  className = '',
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}) => {
  const [duration, setDuration] = useState(50);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const resize = () => {
      if (vertical) {
        const duration = Math.round((containerRef.current.offsetHeight * repeat) / 100);
        setDuration(duration);
      } else {
        const duration = Math.round((containerRef.current.offsetWidth * repeat) / 100);
        setDuration(duration);
      }
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [repeat, vertical]);

  const animationStyle = {
    animation: vertical
      ? `marquee-vertical ${duration}s linear infinite ${reverse ? 'reverse' : 'normal'} ${isHovered && pauseOnHover ? 'paused' : 'running'}`
      : `marquee-horizontal ${duration}s linear infinite ${reverse ? 'reverse' : 'normal'} ${isHovered && pauseOnHover ? 'paused' : 'running'}`,
  };

  return (
    <div
      ref={containerRef}
      className={`flex overflow-hidden p-2 ${vertical ? 'flex-col' : 'flex-row'} ${className}`}
      {...props}
    >
      <div
        className={`flex shrink-0 justify-around ${vertical ? 'flex-col' : 'flex-row'}`}
        onMouseEnter={() => pauseOnHover && setIsHovered(true)}
        onMouseLeave={() => pauseOnHover && setIsHovered(false)}
      >
        {[...Array(repeat)].map((_, i) => (
          <div
            key={i}
            className={`flex shrink-0 justify-around ${vertical ? 'flex-col' : 'flex-row'}`}
            style={animationStyle}
          >
            {children}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;