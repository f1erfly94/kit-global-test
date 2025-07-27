'use client';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MessageCircle, Trash2, User, Calendar } from 'lucide-react';
import { RootState, AppDispatch } from '@/store';
import { deleteComment, fetchComments } from '@/store/slices/commentsSlice';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { LoadingSpinner } from './ui/LoadingSpinner';

interface CommentListProps {
    postId: string;
}

export const CommentList: React.FC<CommentListProps> = ({ postId }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { items: comments, loading, error } = useSelector((state: RootState) => state.comments);

    useEffect(() => {
        if (postId) {
            dispatch(fetchComments(postId));
        }
    }, [dispatch, postId]);

    const postComments = comments.filter(comment => comment.postId === postId);

    const formatDate = (dateString: string) => {
        try {
            return new Date(dateString).toLocaleDateString('uk-UA', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch (error) {
            return 'Invalid date';
        }
    };

    const handleDelete = async (commentId: string) => {
        if (window.confirm('Ви впевнені, що хочете видалити цей коментар?')) {
            try {
                await dispatch(deleteComment(commentId)).unwrap();
            } catch (error) {
                console.error('Failed to delete comment:', error);
            }
        }
    };

    if (loading && postComments.length === 0) {
        return (
            <div className="flex justify-center py-8 min-h-[200px]">
                <LoadingSpinner />
            </div>
        );
    }

    if (error) {
        return (
            <Card>
                <div className="p-6 text-center">
                    <p className="text-red-600">Не вдалося завантажити коментарі: {error}</p>
                </div>
            </Card>
        );
    }

    return (
        <Card>
            <div className="p-6">
                <div className="flex items-center gap-2 mb-6">
                    <MessageCircle className="w-5 h-5 text-gray-600" />
                    <h3 className="text-lg font-semibold text-gray-900">
                        Comments ({postComments.length})
                    </h3>
                </div>

                {postComments.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                        <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-300"/>
                        <p>No comments yet. Be the first!</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {postComments.map((comment) => (
                            <div
                                key={comment.id}
                                className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors group"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-3 text-sm text-gray-600">
                                        <div className="flex items-center gap-1">
                                            <User className="w-4 h-4" />
                                            <span className="font-medium text-gray-900">
                                                {comment.author || 'Анонім'}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-4 h-4" />
                                            <span>{formatDate(comment.createdAt)}</span>
                                        </div>
                                    </div>

                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => handleDelete(comment.id)}
                                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                                        disabled={loading}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>

                                <p className="text-gray-700 leading-relaxed">
                                    {comment.content}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Card>
    );
};