'use client';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Calendar, User, Tag, Edit, Trash2 } from 'lucide-react';
import { RootState, AppDispatch } from '@/store';
import { fetchPost, deletePost } from '@/store/slices/postsSlice';
import { fetchComments } from '@/store/slices/commentsSlice';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { LoadingSpinner } from './ui/LoadingSpinner';
import { CommentList } from './CommentList';
import { CommentForm } from './CommentForm';

interface PostDetailProps {
    postId: string;
    onEdit?: () => void;
}

export const PostDetail: React.FC<PostDetailProps> = ({ postId, onEdit }) => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const { currentPost: post, loading, error } = useSelector((state: RootState) => state.posts);

    useEffect(() => {
        dispatch(fetchPost(postId));
        dispatch(fetchComments(postId));
    }, [dispatch, postId]);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const handleDelete = async () => {
        if (window.confirm('Вы уверены, что хотите удалить этот пост?')) {
            await dispatch(deletePost(postId));
            router.push('/');
        }
    };

    if (loading && !post) {
        return (
            <div className="flex justify-center py-12">
                <LoadingSpinner size="lg" />
            </div>
        );
    }

    if (error || !post) {
        return (
            <div className="text-center py-12">
                <div className="text-red-600 mb-4">
                    <p className="text-lg font-semibold">Пост не найден</p>
                </div>
                <Button onClick={() => router.push('/')}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Вернуться к списку
                </Button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <Button
                    variant="ghost"
                    onClick={() => router.push('/')}
                    className="flex items-center gap-2"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Назад к списку
                </Button>

                <div className="flex gap-2">
                    {onEdit && (
                        <Button onClick={onEdit} variant="secondary" size="sm">
                            <Edit className="w-4 h-4 mr-2" />
                            Редактировать
                        </Button>
                    )}
                    <Button onClick={handleDelete} variant="danger" size="sm">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Удалить
                    </Button>
                </div>
            </div>

            <Card>
                <div className="p-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-6">
                        {post.title}
                    </h1>

                    <div className="flex items-center gap-6 text-gray-500 mb-6 pb-6 border-b border-gray-200">
                        <div className="flex items-center gap-2">
                            <User className="w-5 h-5" />
                            <span className="font-medium">{post.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="w-5 h-5" />
                            <span>{formatDate(post.createdAt)}</span>
                        </div>
                        {post.updatedAt !== post.createdAt && (
                            <span className="text-sm text-gray-400">
                (обновлено {formatDate(post.updatedAt)})
              </span>
                        )}
                    </div>

                    {post.tags && post.tags.length > 0 && (
                        <div className="flex items-center gap-2 flex-wrap mb-8">
                            <Tag className="w-5 h-5 text-gray-400" />
                            {post.tags.map((tag, index) => (
                                <Badge key={index} variant="secondary">
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    )}

                    <div className="prose prose-lg max-w-none">
                        {post.content.split('\n').map((paragraph, index) => (
                            <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </div>
            </Card>

            <div className="space-y-6">
                <CommentForm postId={postId} />
                <CommentList postId={postId} />
            </div>
        </div>
    );
};
