/**
 * 다이얼로그 상태 관리 Hook
 * 다양한 다이얼로그의 열림/닫힘 상태를 통합 관리합니다
 */

import { useState, useCallback } from "react";

export interface UseDialogReturn {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  setIsOpen: (open: boolean) => void;
}

export function useDialog(initialState = false): UseDialogReturn {
  const [isOpen, setIsOpen] = useState(initialState);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggle = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  return {
    isOpen,
    open,
    close,
    toggle,
    setIsOpen,
  };
}

/**
 * 여러 다이얼로그를 관리하는 Hook
 * 각 다이얼로그마다 고유한 ID로 관리합니다
 */
export function useDialogs<T extends string>(
  dialogs: T[]
): Record<T, UseDialogReturn> {
  const [openDialogs, setOpenDialogs] = useState<Set<T>>(new Set());

  const createDialogHandlers = useCallback((id: T): UseDialogReturn => {
    return {
      isOpen: openDialogs.has(id),
      open: () => {
        setOpenDialogs(prev => new Set(prev).add(id));
      },
      close: () => {
        setOpenDialogs(prev => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
      },
      toggle: () => {
        setOpenDialogs(prev => {
          const next = new Set(prev);
          if (next.has(id)) {
            next.delete(id);
          } else {
            next.add(id);
          }
          return next;
        });
      },
      setIsOpen: (open: boolean) => {
        setOpenDialogs(prev => {
          const next = new Set(prev);
          if (open) {
            next.add(id);
          } else {
            next.delete(id);
          }
          return next;
        });
      },
    };
  }, [openDialogs]);

  return dialogs.reduce((acc, id) => {
    acc[id] = createDialogHandlers(id);
    return acc;
  }, {} as Record<T, UseDialogReturn>);
}
