import React from 'react';

const Searchbar = ({ handleSearchChange, searchQuery, handleSearchSubmit }) => {
  return (
    <div className="container my-5 ">
      <div className="input-group shadow rounded">
        <input
          type="text"
          className="form-control border-0 shadow-none mx-5 "
          placeholder="Search for playlists, songs, or artists..."
          aria-label="Search"
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          style={{ borderRadius: "8px 0 0 8px" }}
        />
        <button
          className="btn btn-primary  px-4"
          type="button"
          onClick={handleSearchSubmit}
          style={{ borderRadius: "0 8px 8px 0" }}
        >
          <i className="bi bi-search"></i> Search
        </button>
      </div>
    </div>
  );
};

export default Searchbar;
