const SearchInput = ({ handleChange }) => {
  return (
    <input
      onKeyUp={handleChange}
      type="search"
      name="podcast-search"
      placeholder="Filter podcasts..."
    ></input>
  )
}

export default SearchInput
