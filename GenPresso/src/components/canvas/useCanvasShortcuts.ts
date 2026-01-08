import { useEffect, useCallback } from 'react';
import type { CanvasToolId } from '../../types';

interface UseCanvasShortcutsProps {
  activeTool: string;
  onToolChange: (toolId: CanvasToolId) => void;
  onDeleteSelected?: () => void;
  onDuplicateSelected?: () => void;
  onCopy?: () => void;
  onPaste?: () => void;
  onUndo?: () => void;
  onRedo?: () => void;
  onGroupSelected?: () => void;
}

/**
 * useCanvasShortcuts - 캔버스 단축키 Hook
 * 
 * 지원 단축키:
 * - Space: 핸드 툴 (임시 활성화)
 * - N: 노드 추가 모드
 * - H: 핸드 툴
 * - V: 선택 툴
 * - Delete/Backspace: 선택된 노드 삭제
 * - Ctrl/Cmd + C: 노드 복사
 * - Ctrl/Cmd + V: 노드 붙여넣기
 * - Ctrl/Cmd + D: 노드 복제
 * - Ctrl/Cmd + G: 선택된 노드 그룹 생성
 * - Ctrl/Cmd + Z: 실행 취소
 * - Ctrl/Cmd + Shift + Z: 다시 실행
 * - Escape: 도구 선택 해제
 */
export function useCanvasShortcuts({
  activeTool,
  onToolChange,
  onDeleteSelected,
  onDuplicateSelected,
  onCopy,
  onPaste,
  onUndo,
  onRedo,
  onGroupSelected,
}: UseCanvasShortcutsProps) {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // 입력 필드에서는 단축키 비활성화
    const target = e.target as HTMLElement;
    if (
      target.tagName === 'INPUT' ||
      target.tagName === 'TEXTAREA' ||
      target.contentEditable === 'true'
    ) {
      return;
    }

    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    const ctrlOrCmd = isMac ? e.metaKey : e.ctrlKey;

    // Ctrl/Cmd + C: 노드 복사
    if (ctrlOrCmd && e.key === 'c') {
      e.preventDefault();
      onCopy?.();
      return;
    }

    // Ctrl/Cmd + V: 노드 붙여넣기
    if (ctrlOrCmd && e.key === 'v') {
      e.preventDefault();
      onPaste?.();
      return;
    }

    // Ctrl/Cmd + D: 노드 복제
    if (ctrlOrCmd && e.key === 'd') {
      e.preventDefault();
      onDuplicateSelected?.();
      return;
    }

    // Ctrl/Cmd + G: 그룹 생성
    if (ctrlOrCmd && e.key === 'g') {
      e.preventDefault();
      onGroupSelected?.();
      return;
    }

    // Ctrl/Cmd + Z: 실행 취소
    if (ctrlOrCmd && e.key === 'z' && !e.shiftKey) {
      e.preventDefault();
      onUndo?.();
      return;
    }

    // Ctrl/Cmd + Shift + Z: 다시 실행
    if (ctrlOrCmd && e.key === 'z' && e.shiftKey) {
      e.preventDefault();
      onRedo?.();
      return;
    }

    // Delete/Backspace: 선택된 노드 삭제
    if (e.key === 'Delete' || e.key === 'Backspace') {
      e.preventDefault();
      onDeleteSelected?.();
      return;
    }

    // Space: 핸드 툴 (임시 활성화)
    if (e.key === ' ' && !e.repeat) {
      e.preventDefault();
      onToolChange('hand');
      return;
    }

    // N: 노드 추가 모드
    if (e.key === 'n' || e.key === 'N') {
      e.preventDefault();
      onToolChange('node');
      return;
    }

    // H: 핸드 툴
    if (e.key === 'h' || e.key === 'H') {
      e.preventDefault();
      onToolChange('hand');
      return;
    }

    // V: 선택 툴
    if (e.key === 'v' || e.key === 'V') {
      e.preventDefault();
      onToolChange('select');
      return;
    }

    // Escape: 도구 선택 해제
    if (e.key === 'Escape') {
      e.preventDefault();
      onToolChange('select');
      return;
    }
  }, [onToolChange, onDeleteSelected, onDuplicateSelected, onCopy, onPaste, onUndo, onRedo]);

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    // Space 키를 떼면 이전 도구로 복귀
    if (e.key === ' ') {
      e.preventDefault();
      if (activeTool === 'hand') {
        onToolChange('select');
      }
    }
  }, [activeTool, onToolChange]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);
}
