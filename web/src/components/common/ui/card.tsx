import * as React from "react"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { 
    variant?: 'default' | 'primary' | 'secondary' | 'accent';
    elevated?: boolean;
  }
>(({ className, variant = 'default', elevated = false, ...props }, ref) => {
  const variantClasses = {
    default: 'bg-white/10 border border-white/20',
    primary: 'bg-gradient-to-br from-blue-500/10 to-purple-600/10 border border-blue-500/30',
    secondary: 'bg-gradient-to-br from-gray-500/10 to-gray-700/10 border border-gray-500/30',
    accent: 'bg-gradient-to-br from-amber-500/10 to-orange-600/10 border border-amber-500/30',
  };
  
  const elevationClasses = elevated 
    ? 'shadow-lg shadow-black/10 hover:shadow-xl hover:shadow-black/15' 
    : '';

  const classes = [
    "rounded-lg backdrop-blur-xl",
    variantClasses[variant],
    elevationClasses,
    className
  ].filter(Boolean).join(' ');

  return (
    <div
      ref={ref}
      className={classes}
      {...props}
    />
  )
})
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { borderBottom?: boolean }
>(({ className, borderBottom = true, ...props }, ref) => {
  const classes = [
    "flex flex-col space-y-1.5 p-6",
    borderBottom && "border-b border-white/20",
    className
  ].filter(Boolean).join(' ');

  return (
    <div
      ref={ref}
      className={classes}
      {...props}
    />
  )
})
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
  const classes = [
    "text-lg font-semibold text-white leading-none tracking-tight",
    className
  ].filter(Boolean).join(' ');

  return (
    <h3
      ref={ref}
      className={classes}
      {...props}
    />
  )
})
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const classes = [
    "text-sm text-white/70",
    className
  ].filter(Boolean).join(' ');

  return (
    <p
      ref={ref}
      className={classes}
      {...props}
    />
  )
})
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { padding?: 'none' | 'small' | 'default' | 'large' }
>(({ className, padding = 'default', ...props }, ref) => {
  const paddingClasses = {
    none: 'p-0',
    small: 'p-3',
    default: 'p-6 pt-0',
    large: 'p-8 pt-0',
  };

  const classes = [
    paddingClasses[padding],
    className
  ].filter(Boolean).join(' ');

  return (
    <div 
      ref={ref} 
      className={classes} 
      {...props} 
    />
  )
})
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { borderTop?: boolean }
>(({ className, borderTop = true, ...props }, ref) => {
  const classes = [
    "flex items-center p-6 pt-0",
    borderTop && "border-t border-white/20",
    className
  ].filter(Boolean).join(' ');

  return (
    <div
      ref={ref}
      className={classes}
      {...props}
    />
  )
})
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }