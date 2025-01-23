const API_URL = "https://e09467f5-527a-4d9c-9c60-83643036f8d6-00-45zpr64p2cyo.sisko.replit.dev:3000";

export const fetchBooks = async () => {
    const response = await fetch(`${API_URL}/books`);
    if (!response.ok) throw new Error("Failed to fetch books");
    return response.json();
};

export const addBook = async (book) => {
    const response = await fetch(`${API_URL}/books`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(book),
    });
    if (!response.ok) throw new Error("Failed to add book");
    return response.json();
};

export const updateBook = async (id, book) => {
    const response = await fetch(`${API_URL}/books/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(book),
    });
    if (!response.ok) throw new Error("Failed to update book");
    return response.json();
};

export const deleteBook = async (id) => {
    const response = await fetch(`${API_URL}/books/${id}`, {
        method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete book");
    return response.json();
};
