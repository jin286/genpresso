/**
 * 노드 히스토리 관리 Hook
 * 실행 취소/다시 실행 기능을 관리합니다
 */

import { useState, useCallback } from "react";
import type { Node } from "../types";
import { toast } from "sonner@2.0.3";

export function useNodeHistory(initialNodes: Node[] = []) {
  const [history, setHistory] = useState<Node[][]>([initialNodes]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const saveHistory = useCallback((nodes: Node[]) => {
    setHistory(prev => {
      const newHistory = prev.slice(0, historyIndex + 1);
      newHistory.push([...nodes]);
      return newHistory;
    });
    setHistoryIndex(prev => prev + 1);
  }, [historyIndex]);

  const handleUndo = useCallback((): Node[] | null => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      toast.success("실행 취소");
      return history[newIndex];
    }
    toast.error("더 이상 취소할 수 없습니다");
    return null;
  }, [history, historyIndex]);

  const handleRedo = useCallback((): Node[] | null => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      toast.success("다시 실행");
      return history[newIndex];
    }
    toast.error("더 이상 다시 실행할 수 없습니다");
    return null;
  }, [history, historyIndex]);

  const resetHistory = useCallback((nodes: Node[]) => {
    setHistory([nodes]);
    setHistoryIndex(0);
  }, []);

  return {
    // State
    history,
    historyIndex,

    // Handlers
    saveHistory,
    handleUndo,
    handleRedo,
    resetHistory,
  };
}
