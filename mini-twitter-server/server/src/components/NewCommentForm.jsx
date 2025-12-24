import React, { useState } from 'react';

const NewCommentForm = ({ onSubmit }) => {
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      onSubmit({ comment });
      setComment('');
    }
  };

  return (
    <div className="new-comment-form">
      <h3>Add a Comment</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <textarea
            placeholder="Write your comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Comment</button>
      </form>
    </div>
  );
};

export default NewCommentForm;
