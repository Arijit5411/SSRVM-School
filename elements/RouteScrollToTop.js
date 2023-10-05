import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { usePathname } from 'next/navigation'

const RouteScrollToTop = () => {
  // const { pathname } = useLocation();
  const pathname = usePathname()
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default RouteScrollToTop;
