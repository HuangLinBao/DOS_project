import React, { useState, useEffect } from "react";
import SearchAppBar from "./Components/AppBarMUI";
import { Box } from "@mui/material";
import BookCard from "./Components/BooksCard";
import axios from "axios";
let currentServerIndex = 0;
const servers = ["http://localhost:7000","http://localhost:6000","http://localhost:3000"]; 
function App() {
  // State to store the fetched data
  const [books, setBooks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          servers[currentServerIndex] + "/api/catalog/books"
        );
        setBooks(response.data);
        currentServerIndex = (currentServerIndex + 1) % servers.length;
        console.log(currentServerIndex); // Update server index
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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
