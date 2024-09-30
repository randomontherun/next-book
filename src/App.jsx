import { useState } from 'react'

function App() {
    const [books, setBooks] = useState([]);
    const [selectedBooks, setSelectedBooks] = useState([]);

return (
    <div>
        <h1>Next Book</h1>
        <SearchBar setBooks={setBooks} />
        <BookList books={books} addToList={setSelectedBooks} selectedBooks={selectedBooks}/>
        <SelectedBookList selectedBooks={selectedBooks} />
    </div>
  );
}

function SearchBar({ setBooks }) {
    const [query, setQuery] = useState("");

    const handleInputChange = (e) => {
        setQuery(e.target.value)
    };

    const handleSearch = async () => {
        if (!query) return;

        const API_KEY = 'AIzaSyA5ufxXw-OrLb6vDTzjFzUEVCXcMQwNiwo';
        const API_URL = `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${API_KEY}`;
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            setBooks(data.items || []);
        } catch (error) {
            console.error("Error fetching books: ", error);
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search for books..."
                value={query}
                onChange={handleInputChange}
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    )
}

function BookList({ books, addToList, selectedBooks }) {
    const addBookToList = (book) => {
        if (!selectedBooks.some((selected) => selected.id === book.id)) {
            addToList((prevSelectedBooks) => [...prevSelectedBooks, book]);
        }
    };

    return (
        <div>
            {books.length === 0 ? (
               <p>No books found.</p>
            ) : (
                <ul>
                    {books.map((book) => (
                        <li key={book.id}>
                            <h3>{book.volumeInfo.title}</h3>
                            <p>{book.volumeInfo.authors?.join(", ")}</p>
                            <img
                                src={book.volumeInfo.imageLinks?.thumbnail}
                                alt={book.volumeInfo.title }
                            />
                            <button onClick={() => addBookToList(book)}>Add</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

function SelectedBookList({ selectedBooks }) {
    return (
        <div>
            <h2>Selected Books</h2>
            {selectedBooks.length === 0 ? (
                <p>No books selected yet.</p>
            ) : (
                <ul>
                    {selectedBooks.map((book) => (
                        <li key={book.id}>
                            <h3>{book.volumeInfo.title}</h3>
                            <p>{book.volumeInfo.authors?.join(", ")}</p>
                            <img
                                src={book.volumeInfo.imageLinks?.thumbnail}
                                alt={book.volumeInfo.title}
                            />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default App
