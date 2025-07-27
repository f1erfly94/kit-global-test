Single Page Blog with Redux Toolkit, TypeScript, and Next.js 13+
A modern blog web app built using the latest web development technologies. The project demonstrates the best practices for developing React apps using TypeScript, Redux Toolkit for state management, Next.js 13+ with App Router for SSR, Zod for data validation, and Firebase Firestore as a database.
🚀 Features
✨ Key Features

View Posts: Display a list of blog posts with pagination
Create Posts: Create form with field validation
Edit Posts: Ability to edit existing posts
Delete Posts: Delete posts with confirmation
Comments: Post comment system
Filtering: Search by title, author and sorting
Tags: Tag system for categorizing posts

🎨 UI/UX

Responsive Design: Works on all devices
Modern UI: Uses Tailwind CSS
Smooth Animations: Transitions and hover effects
Dark Theme: Supports light and dark themes
Accessibility: Compliance with accessibility standards

🛠 Technical Features

TypeScript: Full code typing
SSR: Server-Side Rendering with Next.js 13+
Redux Toolkit Query: Efficient state management
Zod validation: Strict form validation
Firebase Integration: Real database
Jest testing: Test coverage

📋 Requirements

Node.js 18+
npm or yarn
Firebase project with Firestore configured


🔄 Redux Store
State Slices
Posts Slice
typescriptinterface PostsState {
items: Post[]; // Array of all posts
currentPost: Post | null; // Current viewed post
loading: boolean; // Loading state
error: string | null; // Errors
}
Comments Slice
typescriptinterface CommentsState {
items: Comment[]; // Comments of the current post
loading: boolean;
error: string | null;
}
Filters Slice
typescriptinterface FilterState {
searchTerm: string; // Search term
author: string; // Filter by author
sortBy: 'newest' | 'oldest' | 'title'; // Sorting
}
Async Actions

fetchPosts() - Load all posts
fetchPost(id) - Load a specific post
createPost(data) - Create a new post
updatePost({id, updates}) - Update a post
deletePost(id) - Delete a post
fetchComments(postId) - Load comments
createComment(data) - Create a comment
deleteComment(id) - Delete a comment

📝 Data validation (Zod)
Post schema
typescriptconst createPostSchema = z.object({
title: z.string().min(3).max(100),
content: z.string().min(10).max(5000),
author: z.string().min(2).max(50),
excerpt: z.string().min(10).max(200),
tags: z.array(z.string()).max(5)
});
Comment Schema
typescriptconst createCommentSchema = z.object({
postId: z.string().min(1),
author: z.string().min(2).max(50),
content: z.string().min(5).max(500)
});
🎨 UI Components
Basic components

Button - Button with different style options
Input - Input field with validation
Textarea - Multiline input field
Card - Container with shadow
Badge - Label for tags
LoadingSpinner - Loading indicator

Composite components

PostCard - Post card in the list
PostForm - Post creation/editing form
PostDetail - Post detailed view
FilterBar - Filter and search panel
CommentForm - Comment adding form
CommentList - Comment list
