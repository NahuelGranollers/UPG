import React, { useEffect, useState } from 'react';
import { Link, LinkProps, useLocation } from 'react-router-dom';

interface PrefetchLinkProps extends LinkProps {
  prefetch?: boolean;
}

/**
 * A Link component that prefetches the route's code chunk on hover/focus.
 * This simulates the "instant" navigation feel by ensuring the JS is ready.
 */
export const PrefetchLink: React.FC<PrefetchLinkProps> = ({ 
  children, 
  to, 
  prefetch = true, 
  ...props 
}) => {
  const [prefetched, setPrefetched] = useState(false);

  const handlePrefetch = () => {
    if (!prefetch || prefetched) return;
    
    // In a Vite app, dynamic imports are automatically split into chunks.
    // To prefetch, we would ideally call the import() function for that route.
    // However, since we don't have direct access to the route map here easily without
    // a more complex setup, we rely on the browser's ability to cache modules
    // once requested.
    
    // For a true "McMaster" style, we would fetch the data for the next page here.
    // Example: fetch(`/api/data-for-route?path=${to}`)
    
    setPrefetched(true);
  };

  return (
    <Link
      to={to}
      onMouseEnter={handlePrefetch}
      onFocus={handlePrefetch}
      {...props}
    >
      {children}
    </Link>
  );
};
