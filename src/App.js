import { useState, useEffect, useCallback } from "react";
import useDebounce from "./hooks/useDebounce";
import "./styles.css";
import { BsSearch } from "react-icons/bs";

export default function App() {
  const [seacrhInput, setSearchInput] = useState("");
  const [result, setResults] = useState([]);

  const debounceSearchTerm = useDebounce(seacrhInput, 5000);

  useEffect(() => {
    if (debounceSearchTerm) {
      console.log("I have been called");
      fetchApi(debounceSearchTerm);
    } else {
      console.log("something else");
    }
  }, [debounceSearchTerm]);

  const fetchApi = (searchValue) => {
    fetch(`https://jsonplaceholder.typicode.com/users`)
      .then((res) => res.json())
      .then((response) => {
        let results = response.filter((user) => {
          return (
            searchValue &&
            user &&
            user.name &&
            user.name.toLowerCase().includes(searchValue)
          );
        });
        setResults(results);
      });
  };

  const handleChange = (value) => {
    setSearchInput(value);
  };

  return (
    <div className="App">
      <h5>Search the details</h5>
      <div className="searchBox">
        <BsSearch className="searchIcon" />
        <input
          type="text"
          placeholder="search here..."
          value={seacrhInput}
          className="seacrhInput"
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>
      {result.map((user, id) => (
        <h5 key={id}>{user.name}</h5>
      ))}
    </div>
  );
}
