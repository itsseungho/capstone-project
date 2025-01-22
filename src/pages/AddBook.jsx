import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addBook } from "../api";

export default function AddBook() {
    const [form, setForm] = useState({
        title: "",
        author: "",
        description: "",
        totalPages: 0,
        pagesRead: 0,
        completed: false,
        imageUrl: "",
    });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addBook(form);
            navigate("/");
        } catch (error) {
            console.error("Error adding book:", error);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Add a New Book</h2>
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
                    Add Book
                </button>
            </form>
        </div>
    );
}
