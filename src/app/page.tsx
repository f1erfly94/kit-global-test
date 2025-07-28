'use client';
import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { PostList } from '@/components/PostList';
import { FilterBar } from '@/components/FilterBar';
import { PostForm } from '@/components/PostForm';
import { Button } from '@/components/ui/Button';
import { Post } from '@/types/post';

export default function HomePage() {
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const handleEdit = (post: Post) => {
    setEditingPost(post);
    setShowCreateForm(false);
  };

  const handleSuccess = () => {
    setEditingPost(null);
    setShowCreateForm(false);
  };

  const handleCancel = () => {
    setEditingPost(null);
    setShowCreateForm(false);
  };

  return (
    <div className="space-y-8">
      <div className="text-center bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to my blog</h1>
        <p className="text-xl text-gray-600 mb-8">
          A place for interesting articles and idea sharing
        </p>

        <Button onClick={() => setShowCreateForm(true)} className="inline-flex items-center gap-2">
          <PlusCircle className="w-5 h-5" />
          Create new post
        </Button>
      </div>
      {(showCreateForm || editingPost) && (
        <PostForm post={editingPost} onSuccess={handleSuccess} onCancel={handleCancel} />
      )}
      <FilterBar />
      <PostList onEdit={handleEdit} showActions={true} />
    </div>
  );
}
