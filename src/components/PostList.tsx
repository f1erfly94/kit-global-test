'use client';
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { fetchPosts, deletePost } from '@/store/slices/postsSlice';
import { PostCard } from './PostCard';
import { LoadingSpinner } from './ui/LoadingSpinner';
import { Button } from './ui/Button';
import { Post } from '@/types';

interface PostListProps {
    onEdit?: (post: Post) => void;
    showActions?: boolean;
}

export const PostList: React.FC<PostListProps> = ({ onEdit, showActions = false }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { items: posts, loading, error } = useSelector((state: RootState) => state.posts);
    const filters = useSelector((state: RootState) => state.filters);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    const filteredAndSortedPosts = useMemo(() => {
        let filtered = posts.filter(post => {
            const matchesSearch = !filters.searchTerm ||
                post.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                post.content.toLowerCase().includes(filters.searchTerm.toLowerCase());

            const matchesAuthor = !filters.author ||
                post.author.toLowerCase().includes(filters.author.toLowerCase());

            return matchesSearch && matchesAuthor;
        });

        // Sorting
        switch (filters.sortBy) {
            case 'oldest':
                filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
                break;
            case 'title':
                filtered.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'newest':
            default:
                filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                break;
        }

        return filtered;
    }, [posts, filters]);

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            await dispatch(deletePost(id));
        }
    };

    if (loading && posts.length === 0) {
        return (
            <div className="flex justify-center py-12 min-h-[50vh]">
                <LoadingSpinner size="lg" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-12">
                <div className="text-red-600 mb-4">
                    <p className="text-lg font-semibold">Failed to load posts</p>
                    <p>{error}</p>
                </div>
                <Button onClick={() => dispatch(fetchPosts())}>
                    Try again
                </Button>
            </div>
        );
    }

    if (filteredAndSortedPosts.length === 0) {
        return (
            <div className="text-center py-12 min-h-[50vh]">
                <div className="text-gray-500 mb-4">
                    <p className="text-lg font-semibold">No posts found</p>
                    <p>Try changing your search filters</p>
                </div>
            </div>
        );
    }

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredAndSortedPosts.map(post => (
                <PostCard
                    key={post.id}
                    post={post}
                    onEdit={onEdit}
                    onDelete={handleDelete}
                    showActions={showActions}
                />
            ))}
        </div>
    );
};
