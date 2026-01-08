import { useState, useCallback } from 'react';
import type { CanvasComment } from '../../../types';
import { toast } from 'sonner@2.0.3';
import imgUserProfileImage from 'figma:asset/f99beb83d5aa5153730131c6ce9d54f26edc0105.png';

export function useComments() {
  const [comments, setComments] = useState<CanvasComment[]>([]);

  const addComment = useCallback((x: number, y: number) => {
    const newComment: CanvasComment = {
      id: `comment-${Date.now()}`,
      x,
      y,
      content: '',
      author: {
        name: 'John Doe',
        avatar: imgUserProfileImage,
        initials: 'J',
      },
      createdAt: new Date().toISOString(),
      isEditing: true,
    };
    setComments((prev) => [...prev, newComment]);
    console.log('코멘트 생성:', newComment);
    toast.success('코멘트 핀 생성됨');
    return newComment.id;
  }, []);

  const updateComment = useCallback((id: string, content: string) => {
    setComments((prev) =>
      prev.map((comment) =>
        comment.id === id
          ? { ...comment, content, isEditing: false }
          : comment
      )
    );
  }, []);

  const deleteComment = useCallback((id: string) => {
    setComments((prev) => prev.filter((comment) => comment.id !== id));
  }, []);

  const cancelComment = useCallback((id: string) => {
    setComments((prev) => prev.filter((comment) => comment.id !== id));
  }, []);

  const cancelEditingComments = useCallback(() => {
    setComments((prev) => prev.filter((comment) => !comment.isEditing));
  }, []);

  const hasEditingComment = useCallback(() => {
    return comments.some((comment) => comment.isEditing);
  }, [comments]);

  const toggleCommentExpanded = useCallback((id: string) => {
    setComments((prev) =>
      prev.map((comment) =>
        comment.id === id
          ? { ...comment, isExpanded: !comment.isExpanded }
          : comment
      )
    );
  }, []);

  const updateCommentPosition = useCallback((id: string, x: number, y: number) => {
    setComments((prev) =>
      prev.map((comment) =>
        comment.id === id
          ? { ...comment, x, y }
          : comment
      )
    );
  }, []);

  return {
    comments,
    addComment,
    updateComment,
    deleteComment,
    cancelComment,
    cancelEditingComments,
    hasEditingComment,
    toggleCommentExpanded,
    updateCommentPosition,
  };
}
