import React from 'react';

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children, className = '' }) => {
  return (
    <div className={`theme-page relative w-full overflow-hidden ${className}`}>
      {children}
    </div>
  );
};

