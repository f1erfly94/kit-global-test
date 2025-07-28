'use client';

import React, { useState, useEffect, KeyboardEvent, ChangeEvent, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { X, Plus } from 'lucide-react';
import { AppDispatch } from '@/store';
import { createPost, updatePost } from '@/store/slices/postsSlice';
import { Input } from './ui/Input';
import { Textarea } from './ui/Textarea';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { validateFormData } from '@/lib/validations/filterSchema';
import { createPostSchema } from '@/lib/validations/postSchema';
import { CreatePostData, Post } from '@/types/post';

interface PostFormProps {
  post?: Post | null;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export const PostForm: React.FC<PostFormProps> = ({ post, onSuccess, onCancel }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [tagInput, setTagInput] = useState('');

  const [formData, setFormData] = useState<CreatePostData>({
    title: '',
    content: '',
    author: '',
    excerpt: '',
    tags: [],
  });

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        content: post.content,
        author: post.author,
        excerpt: post.excerpt,
        tags: post.tags || [],
      });
    }
  }, [post]);

  const handleInputChange = (field: keyof CreatePostData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleAddTag = () => {
    const trimmedTag = tagInput.trim();
    if (trimmedTag && !formData.tags.includes(trimmedTag) && formData.tags.length < 5) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, trimmedTag],
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const validation = validateFormData(createPostSchema, formData);

    if (!validation.success) {
      setErrors(validation.errors || {});
      setLoading(false);
      return;
    }

    try {
      if (post) {
        await dispatch(updatePost({ id: post.id, updates: validation.data! }));
      } else {
        await dispatch(createPost(validation.data!));
      }

      onSuccess?.();
    } catch (error) {
      setErrors({ general: 'An error occurred while saving the post.' });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleTagInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };

  return (
    <Card>
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {post ? 'Edit Post' : 'Create New Post'}
        </h2>

        {errors.general && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600">{errors.general}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Title"
            value={formData.title}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleInputChange('title', e.target.value)
            }
            error={errors.title}
            placeholder="Enter post title..."
            required
          />

          <Input
            label="Author"
            value={formData.author}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleInputChange('author', e.target.value)
            }
            error={errors.author}
            placeholder="Your name..."
            required
          />

          <Textarea
            label="Excerpt"
            value={formData.excerpt}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              handleInputChange('excerpt', e.target.value)
            }
            error={errors.excerpt}
            placeholder="Short description of the post..."
            rows={3}
            required
          />

          <Textarea
            label="Content"
            value={formData.content}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              handleInputChange('content', e.target.value)
            }
            error={errors.content}
            placeholder="Main content of the post..."
            rows={8}
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tags (maximum 5)</label>

            <div className="flex gap-2 mb-3">
              <Input
                value={tagInput}
                onChange={handleTagInputChange}
                placeholder="Add a tag..."
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button
                type="button"
                onClick={handleAddTag}
                disabled={!tagInput.trim() || formData.tags.length >= 5}
                size="sm"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="hover:text-blue-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}

            {errors.tags && <p className="mt-1 text-sm text-red-600">{errors.tags}</p>}
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="submit" loading={loading} className="flex-1 sm:flex-initial">
              {post ? 'Update Post' : 'Create Post'}
            </Button>

            {onCancel && (
              <Button type="button" variant="secondary" onClick={onCancel} disabled={loading}>
                Cancel
              </Button>
            )}
          </div>
        </form>
      </div>
    </Card>
  );
};
