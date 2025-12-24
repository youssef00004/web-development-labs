import React from 'react';

const PostList = ({ posts, onPostClick }) => {
  return (
    <div className="post-list">
      <h2>Posts</h2>
      {posts.length === 0 ? (
        <p>No posts available</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.id} onClick={() => onPostClick(post.id)}>
              <h3>{post.name}</h3>
              <p>{post.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PostList;
