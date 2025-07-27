import { initializeApp } from 'firebase/app';
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    doc,
    getDoc,
    updateDoc,
    deleteDoc,
    query,
    orderBy,
    where,
    Timestamp
} from 'firebase/firestore';
import {Post, CreatePostData, Comment, Blog} from '@/types';
import CreateCommentData = Blog.CreateCommentData;

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const postsCollection = collection(db, 'posts');
export const commentsCollection = collection(db, 'comments');

export class FirebaseService {
    static async createPost(postData: CreatePostData): Promise<string> {
        try {
            const docRef = await addDoc(postsCollection, {
                ...postData,
                createdAt: Timestamp.now(),
                updatedAt: Timestamp.now()
            });
            return docRef.id;
        } catch (error) {
            console.error('Error creating post:', error);
            throw new Error('Failed to create post');
        }
    }

    static async getPosts(): Promise<Post[]> {
        try {
            const q = query(postsCollection, orderBy('createdAt', 'desc'));
            const querySnapshot = await getDocs(q);

            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                createdAt: doc.data().createdAt?.toDate().toISOString() || new Date().toISOString(),
                updatedAt: doc.data().updatedAt?.toDate().toISOString() || new Date().toISOString()
            })) as Post[];
        } catch (error) {
            console.error('Error fetching posts:', error);
            throw new Error('Failed to fetch posts');
        }
    }

    static async getPost(id: string): Promise<Post | null> {
        try {
            const docRef = doc(db, 'posts', id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                return {
                    id: docSnap.id,
                    ...data,
                    createdAt: data.createdAt?.toDate().toISOString() || new Date().toISOString(),
                    updatedAt: data.updatedAt?.toDate().toISOString() || new Date().toISOString()
                } as Post;
            }
            return null;
        } catch (error) {
            console.error('Error fetching post:', error);
            throw new Error('Failed to fetch post');
        }
    }

    static async updatePost(id: string, updates: Partial<CreatePostData>): Promise<void> {
        try {
            const docRef = doc(db, 'posts', id);
            await updateDoc(docRef, {
                ...updates,
                updatedAt: Timestamp.now()
            });
        } catch (error) {
            console.error('Error updating post:', error);
            throw new Error('Failed to update post');
        }
    }

    static async deletePost(id: string): Promise<void> {
        try {
            const docRef = doc(db, 'posts', id);
            await deleteDoc(docRef);

            const commentsQuery = query(commentsCollection, where('postId', '==', id));
            const commentsSnapshot = await getDocs(commentsQuery);

            const deletePromises = commentsSnapshot.docs.map(doc => deleteDoc(doc.ref));
            await Promise.all(deletePromises);
        } catch (error) {
            console.error('Error deleting post:', error);
            throw new Error('Failed to delete post');
        }
    }

    static async createComment(commentData: CreateCommentData): Promise<string> {
        try {
            const docRef = await addDoc(commentsCollection, {
                ...commentData,
                createdAt: Timestamp.now()
            });
            return docRef.id;
        } catch (error) {
            console.error('Error creating comment:', error);
            throw new Error('Failed to create comment');
        }
    }

    static async getCommentsByPost(postId: string): Promise<Comment[]> {
        try {
          const q = query(
                commentsCollection,
                where('postId', '==', postId),
                orderBy('createdAt', 'desc')
            );
            const querySnapshot = await getDocs(q);

            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                createdAt: doc.data().createdAt?.toDate().toISOString() || new Date().toISOString()
            })) as Comment[];
        } catch (error) {
            console.error('Error fetching comments:', error);

            if (error instanceof Error && error.message.includes('index')) {
                console.warn('Using fallback query without ordering - please create the required index');
                return await this.getCommentsByPostFallback(postId);
            }

            throw new Error('Failed to fetch comments');
        }
    }

    static async getCommentsByPostFallback(postId: string): Promise<Comment[]> {
        try {
            const q = query(commentsCollection, where('postId', '==', postId));
            const querySnapshot = await getDocs(q);

            const comments = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                createdAt: doc.data().createdAt?.toDate().toISOString() || new Date().toISOString()
            })) as Comment[];

            return comments.sort((a, b) => {
                const dateA = new Date(a.createdAt);
                const dateB = new Date(b.createdAt);
                return dateB.getTime() - dateA.getTime();
            });
        } catch (error) {
            console.error('Error in fallback query:', error);
            return [];
        }
    }

    static async deleteComment(id: string): Promise<void> {
        try {
            const docRef = doc(db, 'comments', id);
            await deleteDoc(docRef);
        } catch (error) {
            console.error('Error deleting comment:', error);
            throw new Error('Failed to delete comment');
        }
    }
}