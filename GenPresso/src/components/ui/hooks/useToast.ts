/**
 * 토스트 메시지 관리 Hook
 * sonner 라이브러리를 래핑하여 일관된 토스트 API를 제공합니다
 */

import { toast as sonnerToast } from "sonner@2.0.3";

export interface ToastOptions {
  description?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export interface UseToastReturn {
  success: (message: string, options?: ToastOptions) => void;
  error: (message: string, options?: ToastOptions) => void;
  info: (message: string, options?: ToastOptions) => void;
  warning: (message: string, options?: ToastOptions) => void;
  loading: (message: string, options?: ToastOptions) => string | number;
  promise: <T>(
    promise: Promise<T>,
    options: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: Error) => string);
    }
  ) => Promise<T>;
  dismiss: (toastId?: string | number) => void;
}

/**
 * 토스트 메시지 Hook
 * sonner를 래핑하여 타입 안정성과 일관된 API를 제공합니다
 */
export function useToast(): UseToastReturn {
  return {
    success: (message: string, options?: ToastOptions) => {
      sonnerToast.success(message, {
        description: options?.description,
        duration: options?.duration,
        action: options?.action,
      });
    },

    error: (message: string, options?: ToastOptions) => {
      sonnerToast.error(message, {
        description: options?.description,
        duration: options?.duration,
        action: options?.action,
      });
    },

    info: (message: string, options?: ToastOptions) => {
      sonnerToast.info(message, {
        description: options?.description,
        duration: options?.duration,
        action: options?.action,
      });
    },

    warning: (message: string, options?: ToastOptions) => {
      sonnerToast.warning(message, {
        description: options?.description,
        duration: options?.duration,
        action: options?.action,
      });
    },

    loading: (message: string, options?: ToastOptions) => {
      return sonnerToast.loading(message, {
        description: options?.description,
        duration: options?.duration,
      });
    },

    promise: <T>(
      promise: Promise<T>,
      options: {
        loading: string;
        success: string | ((data: T) => string);
        error: string | ((error: Error) => string);
      }
    ) => {
      return sonnerToast.promise(promise, options);
    },

    dismiss: (toastId?: string | number) => {
      sonnerToast.dismiss(toastId);
    },
  };
}

/**
 * 전역 토스트 유틸리티 (Hook 외부에서도 사용 가능)
 */
export const toast = {
  success: (message: string, options?: ToastOptions) => {
    sonnerToast.success(message, options);
  },
  error: (message: string, options?: ToastOptions) => {
    sonnerToast.error(message, options);
  },
  info: (message: string, options?: ToastOptions) => {
    sonnerToast.info(message, options);
  },
  warning: (message: string, options?: ToastOptions) => {
    sonnerToast.warning(message, options);
  },
  loading: (message: string, options?: ToastOptions) => {
    return sonnerToast.loading(message, options);
  },
  promise: sonnerToast.promise,
  dismiss: sonnerToast.dismiss,
};
