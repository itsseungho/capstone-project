import { useContext, useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { TodoContext } from "../contexts/TodoContext";

export default function BookCard({ book }) {
    const completed = book.completed;
    const border = completed ? "success" : "danger";
    const [readingTime, setReadingTime] = useState(0);
    const [timerInterval, setTimerInterval] = useState(null);
    const setBooks = useContext(TodoContext).setTodos;

    const startTimer = () => {
        if (timerInterval === null) {
            const intervalID = setInterval(() => {
                setReadingTime((prevTime) => prevTime + 1);
            }, 1000);
            setTimerInterval(intervalID);
        }
    };

    const pauseTimer = () => {
        clearInterval(timerInterval);
        setTimerInterval(null);
    };

    const resetTimer = () => {
        clearInterval(timerInterval);
        setTimerInterval(null);
        setReadingTime(0);
    };

    const deleteBook = () => {
        setBooks((prevBooks) =>
            prevBooks.filter((prevBook) => prevBook.id !== book.id)
        );
    };

    useEffect(() => {
        return () => {
            clearInterval(timerInterval);
        };
    }, [timerInterval]);

    return (
        <>
            <Card border={border} className="my-3">
                <Card.Header>{completed ? "Finished Reading" : "Currently Reading"}</Card.Header>
                <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <Card.Text>
                        <strong>Author:</strong> {book.author}
                    </Card.Text>
                    <Card.Text>
                        <strong>Description:</strong> {book.description}
                    </Card.Text>
                    <Card.Text>
                        <strong>Progress:</strong> {book.progress}%
                    </Card.Text>
                    <p><strong>Time Spent Reading:</strong> {readingTime} seconds</p>
                    <Button onClick={startTimer}>
                        <i className="bi bi-play"></i>
                    </Button>
                    <Button onClick={pauseTimer} className="ms-2">
                        <i className="bi bi-pause-fill"></i>
                    </Button>
                    <Button onClick={resetTimer} className="ms-2">
                        <i className="bi bi-arrow-clockwise"></i>
                    </Button>
                    <Button variant="secondary" href={`/book/${book.id}`} className="ms-2">
                        <i className="bi bi-pencil"></i>
                    </Button>
                    <Button variant="danger" onClick={deleteBook} className="ms-2">
                        <i className="bi bi-trash3"></i>
                    </Button>
                </Card.Body>
            </Card>
        </>
    );
}