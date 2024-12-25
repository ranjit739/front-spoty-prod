import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deletePlaylist, fetchviewPlaylist, getPlaylist, updatePlaylist } from '../services/service';
import { toast } from 'react-toastify';
import defaultImage from "../assets/defaultImage.webp"
import PlaylistCreator from './PlaylistCreator';

const Loader = () => (
  <div className="flex justify-center items-center">
    <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full border-t-transparent border-blue-600" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);

const MyPlaylist = () => {
  const [createIsOpen, setCreateIsOpen] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPlaylistToDelete, setCurrentPlaylistToDelete] = useState(null); // Tracks the playlist being deleted
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const [currentPlaylist, setCurrentPlaylist] = useState(null);
  const [newName, setNewName] = useState("");
  const [newPlayListCreate,setNewPlaylistCreate]=useState()
  const fetchPlayList = async () => {
    setLoading(true);
    try {
      const res = await getPlaylist();
      console.log("Successfully fetched playlists:", res);
      setPlaylists(res?.data);
    } catch (error) {
      console.error("Error fetching playlist:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlayList();
  }, [newPlayListCreate]);

  const handleViewPlaylist = async(playlistId) => {
    navigate(`/myplaylist/${playlistId}`);
  };

  const handleDeletePlaylist = async () => {
    setLoading(true);
    try {
      const res = await deletePlaylist(currentPlaylistToDelete._id); // Use the playlist to delete
      console.log("Successfully deleted playlist:", res);
      fetchPlayList(); // Refresh the playlist list after deletion
      setIsModalOpen(false); // Close the modal after deletion
    } catch (error) {
      console.error("Error deleting playlist:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const openDeleteModal = (playlist) => {
    setCurrentPlaylistToDelete(playlist);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  const OpenCreateField = () => {
alert("hii")
    setCreateIsOpen(true);
  };

  console.log("createIsOpen",createIsOpen)
  const handleRenameClick = (playlist) => {
    setCurrentPlaylist(playlist);
    setNewName(playlist.name);
    setIsRenameModalOpen(true);
  };

  const handleRenameSubmit = async (e) => {
    e.preventDefault();

    if (!newName.trim()) {
      toast.error("Playlist name cannot be empty!");
      return;
    }

    setLoading(true);

    try {
      const res = await updatePlaylist(currentPlaylist._id, { name: newName });
      console.log("Successfully renamed playlist:", res);
      fetchPlayList();
      setIsRenameModalOpen(false);
    } catch (error) {
      console.error("Error renaming playlist:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className='d-flex justify-content-end my-2'>
    <button
    className="playlist-button mx-3 mb-2 sm:mb-0 sm:mr-3 bg-blue-500 "
    style={{
      // backgroundColor: '#1DB954',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '50px',
      color: '#fff',
      fontSize: '16px',
    }}
    onClick={() => OpenCreateField()}
  >
    Create Playlist
  </button>
  </div>

    <div className="container mx-auto mt-8">
    {createIsOpen && <>  <PlaylistCreator setCreateIsOpen={setCreateIsOpen} setNewPlaylistCreate={setNewPlaylistCreate} /> </>}
      <h2 className="text-2xl font-semibold text-center mb-6">My Playlists</h2>

      {loading && <Loader />}

      {error && <div className="text-center text-red-500">{error}</div>}

      {!loading && playlists.length === 0 && (
        <div className="text-center text-gray-500">No playlists found.</div>
      )}

     
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
     
        {playlists?.map((playlist) => (
          <div key={playlist._id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="relative">
              <img
                src={defaultImage}
                alt={playlist.name}
                className="w-full h-40 object-cover"
              />
              <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-sm rounded-full px-2 py-1">
                {playlist.songs.length} Songs
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-bold">{playlist.name}</h3>
              <p className="text-sm text-gray-600">{playlist.description}</p>
            </div>
            <div className="flex justify-between p-4 bg-gray-100">
              <button
                onClick={() => handleViewPlaylist(playlist._id)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                View
              </button>
              <button
                onClick={() => handleRenameClick(playlist)}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
              >
                Rename
              </button>
              <button
                onClick={() => openDeleteModal(playlist)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-1/3 p-6 relative">
            <h2 className="text-xl font-semibold mb-4">Delete Playlist</h2>
            {loading ? (
              <div className="flex justify-center items-center">
                <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full border-t-transparent border-blue-600" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            ) : (
              <>
                <p className="text-lg font-semibold">Are you sure you want to delete the playlist?</p>
                <h3 className="text-xl font-bold mt-2">{currentPlaylistToDelete?.name}</h3>

                <div className="mt-4 text-center">
                  <button
                    className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                    onClick={handleDeletePlaylist}
                    disabled={loading}
                  >
                    {loading ? 'Deleting...' : 'Delete Playlist'}
                  </button>
                  <button
                    className="bg-gray-600 mx-2 text-white py-2 px-4 rounded-lg hover:bg-gray-700"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                </div>
                <button
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                  onClick={closeModal}
                >
                  &times;
                </button>
              </>
            )}
          </div>
        </div>
      )}
         {isRenameModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-1/3 p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Rename Playlist</h2>
            <form onSubmit={handleRenameSubmit}>
              <div className="mb-4">
                <label htmlFor="newName" className="block text-sm font-medium text-gray-700">
                  New Playlist Name
                </label>
                <input
                  type="text"
                  id="newName"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter new name"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsRenameModalOpen(false)}
                  className="text-white px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}


       
    </div>


    </>
  );
};

export default MyPlaylist;
