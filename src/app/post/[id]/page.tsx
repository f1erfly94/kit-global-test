import PostClient from "@/components/PostClient";

interface PageProps {
    params: Promise<{ id: string }>;
}
export default async function PostPage({ params }: PageProps) {
    const { id } = await params;

    return <PostClient postId={id} />;
}
