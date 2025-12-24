import React, { useState, useEffect } from "react";
import PostList from "./components/PostList";
import NewPostForm from "./components/NewPostForm";
import SinglePostView from "./components/SinglePostView";
import NewCommentForm from "./components/NewCommentForm";
import {
  getAllPosts,
  getPostDetails,
  createNewPost,
  createNewComment,
} from "./api/api";
import "./App.css";

const App = () => {
  const [view, setView] = useState("LIST_VIEW"); // 'LIST_VIEW' or 'DETAIL_VIEW'
  const [posts, setPosts] = useState([]);
  const [allComments, setAllComments] = useState([]); // Store all comments locally
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);

  // Load initial posts and comments from API
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const postsData = await getAllPosts();
        setPosts(postsData);

        // Load comments for all posts
        const allCommentsData = [];
        for (const post of postsData) {
          try {
            const { comments } = await getPostDetails(post.id);
            allCommentsData.push(...comments);
          } catch (err) {
            console.error(`Failed to load comments for post ${post.id}`, err);
          }
        }
        setAllComments(allCommentsData);
      } catch (err) {
        console.error("Failed to load posts", err);
      }
    };
    loadInitialData();
  }, []);

  // Handler to select a post and switch to detail view
  const handleSelectPost = (postId) => {
    setSelectedPostId(postId);
    // Find the post from local state
    const post = posts.find((p) => p.id === postId);
    setSelectedPost(post);
    setView("DETAIL_VIEW");
  };

  // Handler to go back to the list view
  const handleBackToList = () => {
    setView("LIST_VIEW");
    setSelectedPostId(null);
    setSelectedPost(null);
  };

  // Handler to create a new post
  const handleCreatePost = async (newPostData) => {
    // Create post with local ID and add to local database
    const newPost = {
      id: Date.now(),
      ...newPostData,
      createdAt: new Date().toISOString()
    };
    setPosts([newPost, ...posts]);

    // Optionally call API in background (for learning/practice)
    try {
      await createNewPost(newPostData);
    } catch (err) {
      console.error("Failed to sync post with API", err);
    }
  };

  // Handler to create a new comment
  const handleCreateComment = async (newCommentData) => {
    if (!selectedPostId) return;

    // Create comment with local ID and add to local database
    const newComment = {
      id: Date.now(),
      postId: selectedPostId,
      ...newCommentData,
      createdAt: new Date().toISOString()
    };
    setAllComments([...allComments, newComment]);

    // Optionally call API in background (for learning/practice)
    try {
      await createNewComment(selectedPostId, newCommentData);
    } catch (err) {
      console.error("Failed to sync comment with API", err);
    }
  };

  // Get comments for the selected post
  const selectedPostComments = allComments.filter(
    (comment) => comment.postId === selectedPostId
  );

  return (
    <div className="app-container">
      <h1>Mini-Twitter</h1>
      {view === "LIST_VIEW" ? (
        <>
          <NewPostForm onSubmit={handleCreatePost} />
          <PostList posts={posts} onPostClick={handleSelectPost} />
        </>
      ) : (
        <>
          <SinglePostView
            post={selectedPost}
            comments={selectedPostComments}
            onBack={handleBackToList}
          />
          <NewCommentForm onSubmit={handleCreateComment} />
        </>
      )}
    </div>
  );
};

export default App;
