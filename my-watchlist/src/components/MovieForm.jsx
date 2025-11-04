import { useState } from "react";

export default function MovieForm({ addMovie }) {
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || rating === 0) return alert("Enter title & rating");

    addMovie({
      id: Date.now(),
      title,
      review,
      rating,
    });

    setTitle("");
    setReview("");
    setRating(0);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Movie name..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Write a review..."
        value={review}
        onChange={(e) => setReview(e.target.value)}
      ></textarea>

      <div className="stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => setRating(star)}
            style={{
              color: star <= rating ? "gold" : "gray",
              cursor: "pointer",
            }}
          >
            ⭐
          </span>
        ))}
      </div>

      <button type="submit">Add Movie</button>
    </form>
  );
}
