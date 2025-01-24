const GOOGLE_BOOKS_API_URL = "https://www.googleapis.com/books/v1/volumes";

export const searchBooks = async (query) => {
    try {
        const response = await fetch(
            `${GOOGLE_BOOKS_API_URL}?q=${encodeURIComponent(query)}&key=${import.meta.env.VITE_GOOGLE_BOOKS_API_KEY}`
        );
        if (!response.ok) {
            throw new Error("Failed to fetch books from Google Books API");
        }
        const data = await response.json();
        return data.items || [];
    } catch (error) {
        console.error("Error fetching books:", error);
        throw error;
    }
};

