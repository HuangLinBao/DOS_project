import React, { useState, useEffect } from "react";
import SearchAppBar from "./Components/AppBarMUI";
import { Box } from "@mui/material";
import BookCard from "./Components/BooksCard";
import axios from "axios";

function App() {
  // State to store the fetched data
  const [books, setBooks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  // const handleSearchChange = (event) => {
  //   const query = event.target.value;
  //   setSearchQuery(query);

  //   const filteredResults = books.filter((book) =>
  //     book.title.toLowerCase().includes(query.toLowerCase())
  //   );
  //   setSearchResults(filteredResults);
  // };

  // useEffect to fetch data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/catalog/books"
        );
        setBooks(response.data); // the response is an array of books
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once after the initial render

  return (
    <>
      <SearchAppBar setSearchResults={setSearchResults}></SearchAppBar>
      <Box
        sx={{
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)",
          borderRadius: "1em",
          m: 1,
          p: 2,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {searchResults.length > 0
          ? // Display search results
            searchResults.map((result) => (
              <BookCard
                id={result.uuid}
                title={result.title}
                category={result.category}
                price={result.price}
                stock={result.stock}
              />
            ))
          : // Display all books if there are no search results
            books.map((book) => (
              <BookCard
                id={book.uuid}
                title={book.title}
                cat={book.category}
                price={book.price}
                stock={book.stock}
              />
            ))}
      </Box>
    </>
  );
}

export default App;
