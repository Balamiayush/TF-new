import React from "react";

interface ScrollToSectionOptions {
  e?: React.MouseEvent<HTMLAnchorElement>;
  id: string;
  offset?: number;
  onScrollComplete?: (id: string) => void;
}

export function scrollToSection({
  e,
  id,
  offset = 100,
  onScrollComplete,
}: ScrollToSectionOptions): void {
  if (e) {
    e.preventDefault();
  }

  const targetElement = document.getElementById(id);
  if (!targetElement) return;

  const bodyRect = document.body.getBoundingClientRect().top;
  const elementRect = targetElement.getBoundingClientRect().top;
  const elementPosition = elementRect - bodyRect;
  const offsetPosition = elementPosition - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
  });

  if (onScrollComplete) {
    onScrollComplete(id);
  }
}