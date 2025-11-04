export default function MovieList({ movies, deleteMovie }) {
  return (
    <div className="movie-list">
      {movies.map((m) => (
        <div key={m.id} className="movie-card">
          <h2>{m.title}</h2>
          <p className="stars-display">{"⭐".repeat(m.rating)}</p>
          {m.review && <p className="review">"{m.review}"</p>}
          <button onClick={() => deleteMovie(m.id)} className="delete-btn">
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
