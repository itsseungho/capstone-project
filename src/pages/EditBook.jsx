import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchBooks, updateBook } from "../api";

export default function EditBook() {
    const { id } = useParams();
    const [form, setForm] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loadBook = async () => {
            try {
                const books = await fetchBooks();
                const bookToEdit = books.find((book) => book.id === parseInt(id));
                setForm(bookToEdit);
            } catch (error) {
                console.error("Error fetching book details:", error);
            }
        };
        loadBook();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateBook(id, form);
            navigate("/");
        } catch (error) {
            console.error("Error updating book:", error);
        }
    };

    if (!form) return <div>Loading...</div>;

    return (
        <div className="container mt-5">
            <h2>Edit Book</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        className="form-control"
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-3">
                    Save Changes
                </button>
            </form>
        </div>
    );
}
