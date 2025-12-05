"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import NProgress from "nprogress";

if (typeof window !== "undefined") {
  NProgress.configure({
    showSpinner: false,
    trickleSpeed: 200,
    minimum: 0.08,
  });
}

export function NProgressProvider() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      NProgress.done();
    }
  }, [pathname]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      
      if (anchor && anchor.href) {
        try {
          const url = new URL(anchor.href);
          const currentUrl = new URL(window.location.href);
          
          if (
            url.origin === currentUrl.origin &&
            url.pathname !== currentUrl.pathname
          ) {
            NProgress.start();
          }
        } catch (error) {
        }
      }
    };

    const originalPushState = history.pushState;
    history.pushState = function (...args) {
      const result = originalPushState.apply(history, args);
      if (args[2] && typeof args[2] === 'string') {
        try {
          const url = new URL(args[2], window.location.origin);
          if (url.pathname !== pathname) {
            NProgress.start();
          }
        } catch (error) {
        }
      }
      return result;
    };

    document.addEventListener("click", handleLinkClick, true);
    
    return () => {
      document.removeEventListener("click", handleLinkClick, true);
      history.pushState = originalPushState;
    };
  }, [pathname]);

  return null;
}

