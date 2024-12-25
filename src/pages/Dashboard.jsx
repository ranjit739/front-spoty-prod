import React, {useState } from 'react';

import PlaylistCard from '../components/PlaylistCard';
import { fetchSongs } from '../services/service';

const Dashboard = () => {
  
  const [searchQuery, setSearchQuery] = useState('tere naina');
  const [searchResults, setSearchResults] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(false); // State for loader
  


  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Handle search submission
  const handleSearchSubmit = async () => {
    if (!searchQuery) return;
    setLoading(true); // Start loading
    try {
      const res = await fetchSongs(searchQuery);
      setSearchResults(res.data.tracks.items);
    } catch (error) {
      console.error('Error fetching songs:', error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div
      className="dashboard-container"
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(to bottom, #1d1d1d, #121212)', // Gradient background
        color: '#fff',
        minHeight: '100vh',
      }}
    >
      <div
        className="main-content"
        style={{
          flex: 1,
          padding: '20px',
          width: '100%',
        }}
      >
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search for a song..."
          value={searchQuery}
          onChange={handleSearchChange}
          style={{
            width: '100%',
            padding: '10px',
            margin: '20px 0',
            borderRadius: '5px',
            border: '1px solid #444',
            background: '#333',
            color: 'white',
          }}
        />
        <button
          onClick={handleSearchSubmit}
          style={{
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          className="border border-white text-white px-4 py-2 rounded-lg hover:text-black transition-all"
          disabled={loading} // Disable button while loading
        >
          {loading ? (
            <span className="loader" style={{ marginLeft: '5px', fontSize: '14px' }}>
              Loading...
            </span>
          ) : (
            'Search'
          )}
        </button>

        {/* Display Playlist Cards */}
        {playlists.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl text-white font-semibold mb-4">Your Playlists</h2>
            {playlists.map((playlist, index) => (
              <div key={index} className="bg-gray-700 p-4 mb-4 rounded-lg">
                <h3 className="text-xl text-white">{playlist.name}</h3>
              </div>
            ))}
          </div>
        )}

        {/* Display Search Results */}
        {searchResults.length > 0 && <PlaylistCard searchResults={searchResults} />}
      </div>
    </div>
  );
};

export default Dashboard;
