import PostPageClient from "@/components/PostPageClient";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function PostPage({params}: PageProps) {
    const {id} = await params;

    return <PostPageClient postId={id}/>;
}
