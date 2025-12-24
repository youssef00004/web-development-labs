import React, { useState } from 'react';

const NewPostForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && content.trim()) {
      onSubmit({ name, content });
      setName('');
      setContent('');
    }
  };

  return (
    <div className="new-post-form">
      <h2>Create New Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default NewPostForm;
