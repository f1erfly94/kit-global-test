import React from 'react';
import { useRouter } from 'next/navigation';
import { PostForm } from '@/components/PostForm';

export default function CreatePostPage() {
    const router = useRouter();

    const handleSuccess = () => {
        router.push('/');
    };

    const handleCancel = () => {
        router.push('/');
    };

    return (
        <div className="max-w-4xl mx-auto">
            <PostForm onSuccess={handleSuccess} onCancel={handleCancel} />
        </div>
    );
}