import { useState } from "react";
import { searchBooks } from "../api/googleBooks";

export default function SearchBooks() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [error, setError] = useState("");

    const handleSearch = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const books = await searchBooks(query);
            setResults(books);
        } catch {
            setError("Failed to fetch books. Please try again.");
        }
    };

    const handleAddBook = (book) => {
        console.log("Add book:", book);
    };

    return (
        <div className="container mt-5">
            <h2>Search Books</h2>
            <form onSubmit={handleSearch} className="mt-4">
                <div className="mb-3">
                    <label htmlFor="query" className="form-label">
                        Search for a Book
                    </label>
                    <input
                        type="text"
                        id="query"
                        className="form-control"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Search
                </button>
            </form>

            {error && <p className="text-danger mt-3">{error}</p>}

            <div className="mt-5">
                <h3>Results</h3>
                {results.map((book) => (
                    <div key={book.id} className="card mb-3">
                        <div className="card-body">
                            <h5 className="card-title">{book.volumeInfo.title}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">
                                {book.volumeInfo.authors?.join(", ")}
                            </h6>
                            <p className="card-text">{book.volumeInfo.description}</p>
                            <button
                                className="btn btn-primary"
                                onClick={() => handleAddBook(book)}
                            >
                                Add to Reading List
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
