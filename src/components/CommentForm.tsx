'use client';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MessageCircle } from 'lucide-react';
import { AppDispatch, RootState } from '@/store';
import { createComment } from '@/store/slices/commentsSlice';
import { BlogComment, CreateBlogCommentData } from '@/types';
import { Input } from './ui/Input';
import { Textarea } from './ui/Textarea';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { validateFormData } from '@/lib/validations/filterSchema';
import { createCommentSchema } from '@/lib/validations/commentSchema';

interface CommentFormProps {
  postId: string;
}

export const CommentForm: React.FC<CommentFormProps> = ({ postId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.comments);
  const [localLoading, setLocalLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<CreateBlogCommentData>({
    postId,
    author: '',
    content: '',
  });

  const handleInputChange = (field: keyof CreateBlogCommentData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalLoading(true);
    setErrors({});

    const validation = validateFormData(createCommentSchema, formData);

    if (!validation.success) {
      setErrors(validation.errors || {});
      setLocalLoading(false);
      return;
    }

    try {
      const optimisticComment: BlogComment = {
        id: `temp-${Date.now()}`,
        postId: formData.postId,
        author: formData.author,
        content: formData.content,
        createdAt: new Date().toISOString(),
      };

      setFormData({ postId, author: '', content: '' });

      const result = await dispatch(createComment(validation.data!));

      if (createComment.rejected.match(result)) {
        setFormData(validation.data!);
        throw new Error(result.payload as string);
      }
    } catch (error) {
      console.error('Error creating comment:', error);
      setErrors({
        general:
          error instanceof Error ? error.message : 'An error occurred while adding the comment',
      });
    } finally {
      setLocalLoading(false);
    }
  };

  const displayError = errors.general || (error && typeof error === 'string' ? error : null);

  return (
    <Card>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <MessageCircle className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Add a Comment</h3>
        </div>

        {displayError && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600">{displayError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Your Name"
            value={formData.author}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange('author', e.target.value)
            }
            error={errors.author}
            placeholder="Enter your name..."
            required
            disabled={localLoading}
          />

          <Textarea
            label="Comment"
            value={formData.content}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              handleInputChange('content', e.target.value)
            }
            error={errors.content}
            placeholder="Write your comment..."
            rows={4}
            required
            disabled={localLoading}
          />

          <Button
            type="submit"
            loading={localLoading}
            disabled={localLoading || !formData.author.trim() || !formData.content.trim()}
          >
            {localLoading ? 'Adding Comment...' : 'Submit Comment'}
          </Button>
        </form>
      </div>
    </Card>
  );
};
