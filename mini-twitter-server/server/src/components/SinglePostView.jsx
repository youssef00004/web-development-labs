import React from 'react';

const SinglePostView = ({ post, comments, onBack }) => {
  if (!post) {
    return <p>No post selected</p>;
  }

  return (
    <div className="single-post-view">
      <button onClick={onBack}>Back to Posts</button>
      <div className="post-details">
        <h2>{post.name}</h2>
        <p>{post.content}</p>
      </div>
      <div className="comments-section">
        <h3>Comments</h3>
        {comments.length === 0 ? (
          <p>No comments yet</p>
        ) : (
          <ul>
            {comments.map((comment) => (
              <li key={comment.id}>
                <p>{comment.comment}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SinglePostView;
