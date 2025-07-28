'use client';

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { PostForm } from '@/components/PostForm';
import { PostDetail } from '@/components/PostDetail';

interface PostPageClientProps {
  postId: string;
}

export default function PostPageClient({ postId }: PostPageClientProps) {
  const [isEditing, setIsEditing] = useState(false);
  const currentPost = useSelector((state: RootState) => state.posts.currentPost);

  const handleEditSuccess = () => setIsEditing(false);
  const handleEditCancel = () => setIsEditing(false);

  if (isEditing) {
    return (
      <PostForm post={currentPost} onSuccess={handleEditSuccess} onCancel={handleEditCancel} />
    );
  }

  return <PostDetail postId={postId} onEdit={() => setIsEditing(true)} />;
}
