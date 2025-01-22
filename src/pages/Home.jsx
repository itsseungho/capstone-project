import { useEffect, useState } from "react";
import TodoCard from "../components/TodoCard";
import { fetchBooks, deleteBook } from "../api";

export default function Home() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const loadBooks = async () => {
            try {
                const data = await fetchBooks();
                setBooks(data);
            } catch (error) {
                console.error("Error fetching books:", error);
            }
        };
        loadBooks();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteBook(id);
            setBooks(books.filter((book) => book.id !== id));
        } catch (error) {
            console.error("Error deleting book:", error);
        }
    };

    return (
        <div className="container">
            <h1>Your Book List</h1>
            {books.map((book) => (
                <TodoCard key={book.id} book={book} onDelete={handleDelete} />
            ))}
        </div>
    );
}
