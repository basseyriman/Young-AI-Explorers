"use client";

import type { AnchorHTMLAttributes, MouseEvent } from "react";

type SiteLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
};

/** Reliable navigation — avoids broken Next.js client router after hydration issues. */
export function SiteLink({ href, onClick, children, ...rest }: SiteLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;

    if (href.startsWith("#")) {
      event.preventDefault();
      const target = document.getElementById(href.slice(1));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.pushState(null, "", href);
      }
      return;
    }

    const isInternal =
      href.startsWith("/") &&
      !href.startsWith("//") &&
      event.button === 0 &&
      !event.metaKey &&
      !event.ctrlKey &&
      !event.shiftKey &&
      !event.altKey;

    if (isInternal) {
      event.preventDefault();
      window.location.assign(href);
    }
  };

  return (
    <a href={href} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
