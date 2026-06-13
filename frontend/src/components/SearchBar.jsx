import "./SearchBar.css";

function SearchBar({ search, setSearch }) {

  return (
    <input
      className="search-box"
      placeholder="Search subscriber..."
      value={search}
      onChange={(e) =>
        setSearch(e.target.value)
      }
    />
  );
}

export default SearchBar;