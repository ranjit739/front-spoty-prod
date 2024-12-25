import React, { useState } from 'react';
import { getPlaylist, addSongToPlaylist } from '../services/service';
import PlaylistCreator from './PlaylistCreator';

const PlaylistCard = ({ searchResults }) => {
  const [createIsOpen, setCreateIsOpen] = useState(false);

  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);
  const [songsDetails, setSongsDetails] = useState("");
  const [loading, setLoading] = useState(false);

  const addToPlayList = async (track) => {
    setSongsDetails(track);
    setLoading(true);
    try {
      const res = await getPlaylist();
      setPlaylists(res.data);
      setIsRenameModalOpen(true);
      setSelectedPlaylistId(null);
    } catch (error) {
      console.error('Error fetching playlists:', error);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setIsRenameModalOpen(false);
  };

  const handleAddToPlaylist = async (playlistId) => {
    setLoading(true);
    try {
      await addSongToPlaylist(playlistId, songsDetails);
      closeModal();
    } catch (error) {
      console.error('Error adding song to playlist:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="search-results my-8">
        <h2 className="text-3xl font-bold text-center text-white mb-8">Search Results</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {searchResults.map((track) => (
            <li
              key={track.id}
              className="bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-xl overflow-hidden shadow-md hover:scale-105 transition-transform duration-300"
            >
              <div className="p-4 flex flex-col items-center">
                {track.album.images?.[0]?.url && (
                  <img
                    src={track.album.images[0].url}
                    alt={track.name}
                    className="w-32 h-32 rounded-full shadow-lg mb-4"
                  />
                )}
                <h3 className="text-lg font-bold text-center truncate">{track.name}</h3>
                <p className="text-sm text-gray-300 mt-2 text-center">
                  <span className="font-medium">Artist:</span>{' '}
                  {track.artists.map((artist) => artist.name).join(', ')}
                </p>
                <p className="text-sm text-gray-400 mt-1 text-center">
                  <span className="font-medium">Album:</span> {track.album.name}
                </p>
              </div>
              <div className="flex justify-center">
                <button
                  className="border border-white text-white px-4 py-2 rounded-lg hover:text-black transition-all"
                  onClick={() => addToPlayList(track)}
                  disabled={loading}
                >
                  {loading ? 'Loading...' : 'Add to Playlist'}
                </button>
              </div>
            </li>
          ))}
        </ul>

        {isRenameModalOpen && ( 
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-1/3 p-6 relative">
              <h2 className="text-xl font-semibold my-3 text-center text-black fw-bold">{playlists?.length>0?"Select Playlist":"No Playlist Record Please Create a Playlist first"} </h2>
              {loading ? (
                <div className="flex justify-center items-center">
                  <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full border-t-transparent border-blue-600" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              ) : 



               (
                <ul className="space-y-2">
                
                  {playlists?.map((playlist) => (
                    <li
                      key={playlist._id}
                      className={`py-2 px-4 fw-bold rounded-md cursor-pointer text-black hover:bg-gray-300 hover:text-white transition-all duration-300 ease-in-out ${selectedPlaylistId === playlist._id ? 'bg-blue-500 text-white' : ''}`}
                      onClick={() => setSelectedPlaylistId(playlist._id)}
                    >
                      {playlist.name}
                    </li>
                  ))}
                </ul>
              )}
{playlists?.length>0 ?<>    <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                onClick={closeModal}
              >
                &times;
              </button>

              <div className="mt-4 text-center">
               <button
  className={`py-2 px-4 rounded-lg transition-all duration-300 text-white ${
    selectedPlaylistId && !loading
      ? 'bg-blue-500 hover:bg-blue-600'
      : 'bg-gray-300 cursor-not-allowed'
  }`}
  onClick={() => handleAddToPlaylist(selectedPlaylistId)}
  disabled={loading || !selectedPlaylistId}
>
  {loading ? 'Adding...' : 'Add to Playlist'}
</button>


                 <button className="bg-gray-600 mx-2 text-white py-2 px-4 rounded-lg" onClick={closeModal}>
                    Cancel
                  </button>
              </div></> :<PlaylistCreator setCreateIsOpen={setCreateIsOpen} />}
                
            </div>
          </div>
        )}
       
      </div>
    </>
  );
};

export default PlaylistCard;
