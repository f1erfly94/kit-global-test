'use client';

import React, { useState } from 'react';
import { PostDetail } from '@/components/PostDetail';
import { PostForm } from '@/components/PostForm';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

interface PostClientProps {
    postId: string;
}

export default function PostClient({ postId }: PostClientProps) {
    const [isEditing, setIsEditing] = useState(false);
    const currentPost = useSelector((state: RootState) => state.posts.currentPost);

    const handleEditSuccess = () => setIsEditing(false);
    const handleEditCancel = () => setIsEditing(false);

    if (isEditing) {
        return (
            <PostForm
                post={currentPost}
                onSuccess={handleEditSuccess}
                onCancel={handleEditCancel}
            />
        );
    }

    return <PostDetail postId={postId} onEdit={() => setIsEditing(true)} />;
}
