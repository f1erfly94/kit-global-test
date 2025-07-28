# Single-Page Blog with Redux Toolkit, TypeScript, and Next.js 15+ 
A modern blog web application built using cutting-edge web technologies. This project demonstrates best practices in React development with TypeScript, Redux Toolkit for state management, Next.js 15+ with the App Router for SSR, Zod for data validation, and Firebase Firestore as a backend database.

## Installation & Setup 

1. Clone the Repository
   
```git clone https://github.com/f1erfly94/kit-global-test/```

```cd blog-app```

2. Install Dependencies
   
```npm install```
or
```yarn install```

3. Set Up Firebase
   
- Create a project in Firebase Console
  
- Enable Firestore Database
  
- Create a .env.local file in the root directory with the following:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef123456
```

4. Run the App
   
```npm run dev```
or
```yarn dev```

6. Then open http://localhost:3000 in your browser


## Features 

- Post Listing: View a paginated list of blog posts

- Post Creation: Form with field validation to create new posts
  
- Post Editing: Edit existing blog posts
  
- Post Deletion: Delete posts with confirmation
  
- Comments: Add and view comments under posts
  
- Filtering & Search: Search by title and author, sort posts

- Tag System: Tag support for post categorization
  

## UI/UX 

- Responsive Design: Works across all device sizes

- Modern UI: Built with Tailwind CSS
  
- Smooth Animations: Transitions and hover effects


## Technical Stack 

- TypeScript: Fully typed codebase
  
- Next.js 15+: Server-side rendering (SSR) with the App Router
  
- Redux Toolkit Query: Efficient and scalable state management

- Zod Validation: Strong form validation

- Firebase Firestore: Real-time database backend

- Jest Testing: Unit test coverage for key logic
  

## Zod Validation 
### Post Schema 

```
  const createPostSchema = z.object({
  title: z.string().min(3).max(100),
  content: z.string().min(10).max(5000),
  author: z.string().min(2).max(50),
  excerpt: z.string().min(10).max(200),
  tags: z.array(z.string()).max(5),
});
```

### Comment Schema 

```
  const createCommentSchema = z.object({
  postId: z.string().min(1),
  author: z.string().min(2).max(50),
  content: z.string().min(5).max(500),
});
```

##  UI Components 
### Base Components

- Button – Styled button with variants

- Input – Validated input field

- Textarea – Multi-line input

- Card – Container with shadow

- Badge – Tag label

- LoadingSpinner – Loading indicator

### Composite Components

- PostCard – Post preview card

- PostForm – Form for creating/editing posts

- PostDetail – Full post view

- FilterBar – Search and filter UI

- CommentForm – Add a comment

- CommentList – Render list of comments
  

## Environment Variables

Be sure to configure environment variables on your deployment platform:

```
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID
```

## Responsiveness 

The app is fully responsive and tested across:

- Desktop: 1920px and above

- Laptop: 1024px – 1919px

- Tablet: 768px – 1023px

- Mobile: 320px – 767px

