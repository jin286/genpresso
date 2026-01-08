import React, { useState, useRef, useEffect, useCallback } from 'react';
import { MessageCircle } from 'lucide-react';
import type { CanvasComment } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';

interface CommentPinProps {
  comment: CanvasComment;
  zoom: number;
  onSave: (content: string) => void;
  onCancel: () => void;
  onToggleExpand: () => void;
  onUpdatePosition?: (x: number, y: number) => void;
}

export const CommentPin = React.memo<CommentPinProps>(({ comment, zoom, onSave, onCancel, onToggleExpand, onUpdatePosition }) => {
  const { t } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);
  const [inputValue, setInputValue] = useState(comment.content);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef<{ x: number; y: number; commentX: number; commentY: number } | null>(null);

  // 작성 모드일 때 자동 포커스
  useEffect(() => {
    if (comment.isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [comment.isEditing]);

  // 외부 클릭 감지 (작성 모드일 때만)
  useEffect(() => {
    if (!comment.isEditing) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      
      // 입력창 컨테이너 외부 클릭 시 취소
      if (containerRef.current && !containerRef.current.contains(target)) {
        // 다른 UI 요소(버튼, 다이얼로그 등) 클릭도 취소로 처리
        // 단, 노드 카드는 제외 (노드 작업 방해하지 않도록)
        const targetElement = target as HTMLElement;
        if (!targetElement.closest || !targetElement.closest('.node-card')) {
          onCancel();
        }
      }
    };

    // 약간의 지연을 두어 핀 생성 직후의 클릭이 취소로 이어지지 않도록 함
    const timeoutId = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [comment.isEditing, onCancel]);

  const handleSubmit = useCallback(() => {
    if (inputValue.trim()) {
      onSave(inputValue.trim());
    } else {
      onCancel();
    }
  }, [inputValue, onSave, onCancel]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    } else if (e.key === 'Escape') {
      onCancel();
    }
  }, [handleSubmit, onCancel]);

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return '방금 전';
    if (diffMins < 60) return `${diffMins}분 전`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}시간 전`;
    
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 7) return `${diffDays}일 전`;
    
    return date.toLocaleDateString('ko-KR');
  };

  // 드래그 핸들러
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    // 작성 중이면 드래그 불가
    if (comment.isEditing) return;
    
    // 왼쪽 마우스 버튼이 아니면 무시
    if (e.button !== 0) return;

    e.preventDefault();
    e.stopPropagation();

    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      commentX: comment.x,
      commentY: comment.y,
    };

    setIsDragging(true);

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!dragStartRef.current || !onUpdatePosition) return;

      const deltaX = (moveEvent.clientX - dragStartRef.current.x) / zoom;
      const deltaY = (moveEvent.clientY - dragStartRef.current.y) / zoom;

      const newX = dragStartRef.current.commentX + deltaX;
      const newY = dragStartRef.current.commentY + deltaY;

      onUpdatePosition(newX, newY);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      dragStartRef.current = null;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [comment.isEditing, comment.x, comment.y, zoom, onUpdatePosition]);

  // 작성 중인 경우 (파란색 핀 + 입력창 좌우 배치)
  if (comment.isEditing) {
    return (
      <div
        ref={containerRef}
        className="absolute pointer-events-auto flex items-center gap-2"
        style={{
          left: `${comment.x}px`,
          top: `${comment.y}px`,
          transform: 'translate(-50%, -100%)',
          zIndex: 9999,
        }}
      >
        {/* 입력창 */}
        <div
          className="rounded-2xl border-[0.5px] border-solid"
          style={{
            backgroundColor: 'var(--color-glass-bg)',
            backdropFilter: 'blur(var(--blur-glass))',
            WebkitBackdropFilter: 'blur(var(--blur-glass))',
            borderColor: 'var(--color-glass-border)',
            boxShadow: 'var(--glass-shadow)',
            minWidth: '200px',
          }}
        >
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t('canvas.tools.addComment')}
            className="w-full bg-transparent px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground outline-none"
          />
        </div>

        {/* 파란색 핀 */}
        <div
          className="flex items-center justify-center rounded-full shrink-0"
          style={{
            width: '32px',
            height: '32px',
            backgroundColor: 'var(--color-primary)',
          }}
        >
          <MessageCircle className="w-4 h-4 text-white" />
        </div>
      </div>
    );
  }

  // 작성 완료 후 (마젠타 아바타)
  return (
    <div
      className="absolute pointer-events-auto"
      style={{
        left: `${comment.x}px`,
        top: `${comment.y}px`,
        transform: 'translate(-50%, -100%)',
        zIndex: 9999,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 프로필 아바타 - 클릭으로 토글, 드래그로 이동 */}
      <div
        className="flex items-center justify-center rounded-full shrink-0 transition-transform duration-200 hover:scale-110 overflow-hidden"
        style={{
          width: '32px',
          height: '32px',
          backgroundColor: 'rgba(79,168,216,0.2)',
          color: 'white',
          fontSize: '14px',
          fontWeight: 600,
          cursor: isDragging ? 'grabbing' : 'grab',
          opacity: isDragging ? 0.6 : 1,
        }}
        onMouseDown={handleMouseDown}
        onClick={(e) => {
          // 드래그가 아닐 때만 토글
          if (!isDragging) {
            e.stopPropagation();
            onToggleExpand();
          }
        }}
      >
        <div className="w-5 h-5">
          <svg className="block w-full h-full" fill="none" viewBox="0 0 16 16">
            <path d="M12.666 13.9993V12.666C12.666 11.9588 12.3851 11.2806 11.885 10.7805C11.385 10.2804 10.7067 9.9995 9.99951 9.9995H5.9997C5.29249 9.9995 4.61425 10.2804 4.11418 10.7805C3.61411 11.2806 3.33317 11.9588 3.33317 12.666V13.9993" stroke="#4FA8D8" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33327" />
            <path d="M7.99961 7.33297C9.47229 7.33297 10.6661 6.13912 10.6661 4.66644C10.6661 3.19375 9.47229 1.9999 7.99961 1.9999C6.52692 1.9999 5.33307 3.19375 5.33307 4.66644C5.33307 6.13912 6.52692 7.33297 7.99961 7.33297Z" stroke="#4FA8D8" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33327" />
          </svg>
        </div>
      </div>

      {/* 클릭 시 말풍선 (comment.isExpanded가 true일 때) - 왼쪽에 표시 */}
      {comment.isExpanded && comment.content && (
        <div
          className="absolute rounded-2xl border-[0.5px] border-solid"
          style={{
            right: '40px',
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: 'var(--color-glass-bg)',
            backdropFilter: 'blur(var(--blur-glass))',
            WebkitBackdropFilter: 'blur(var(--blur-glass))',
            borderColor: 'var(--color-glass-border)',
            boxShadow: 'var(--glass-shadow)',
            minWidth: '200px',
            maxWidth: '300px',
          }}
        >
          <div className="p-3 space-y-2">
            {/* 작성자 및 시간 */}
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs text-foreground">
                홍길동(나)
              </span>
              <span className="text-xs text-muted-foreground">
                {formatTime(comment.createdAt)}
              </span>
            </div>

            {/* 코멘트 내용 */}
            <p className="text-xs text-foreground leading-relaxed">
              {comment.content}
            </p>
          </div>
        </div>
      )}
    </div>
  );
});

CommentPin.displayName = "CommentPin";
