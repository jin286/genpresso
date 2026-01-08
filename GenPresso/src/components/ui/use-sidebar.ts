import { useState, useCallback } from "react";

export type SidebarLevel = 0 | 1 | 2;

export function useSidebar(initialLevel: SidebarLevel = 0) {
  const [level, setLevel] = useState<SidebarLevel>(initialLevel);

  const navigate = useCallback((targetLevel: SidebarLevel) => {
    setLevel(targetLevel);
  }, []);

  const toggle = useCallback(() => {
    setLevel(current => current === 0 ? 1 : 0);
  }, []);

  const expand = useCallback(() => {
    setLevel(current => current === 2 ? 1 : 2);
  }, []);

  const close = useCallback(() => {
    setLevel(0);
  }, []);

  return {
    level,
    navigate,
    toggle,
    expand,
    close,
    isOpen: level > 0,
    isExpanded: level === 2,
  };
}