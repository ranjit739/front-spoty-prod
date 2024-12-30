import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteSongFromPlaylist,
  fetchToPlaylistSongs,
} from "../../services/userService.jsx";
import CommonModel from "../../component/CommonModel.jsx";
import Loader from "../../component/Loader.jsx";
import { toast } from "react-toastify";
import { createSpotifyContext } from "../../context/Context.jsx";

const ViewAllSongs = () => {
  const [songs, setSongs] = useState([]);

  const [songId, setSongId] = useState("");

  const params = useParams();
  let { id } = params;

  const {
    openModal,
    playListName,
    handlePlaylistName,
    closeModal,
    handleSetLoading,
    loading,
    isModalOpen,
  } = useContext(createSpotifyContext);

  const fetchSongs = async () => {
    handleSetLoading(true)
    try {
      const res = await fetchToPlaylistSongs(id);
    
      setSongs(res.data.songs || []); // Ensure songs is always an array
      console.log("res_songs", res);
    } catch (error) {
      console.log("Error fetching songs:", error);
    } finally {
      handleSetLoading(false);
    }
  };

  useEffect(() => {
    fetchSongs();
  }, [id]);

  const handleDeleteSong = async () => {
    handleSetLoading(true);
    try {
      const res = await deleteSongFromPlaylist(id, songId);
      console.log("delete",res)
      closeModal();
      fetchSongs();
      toast.success(res?.message);
    } catch (error) {
     
    } finally {
      handleSetLoading(false);
    }
  };

  const handleModel = (songId, name) => {
    setSongId(songId);
    handlePlaylistName(name);
    openModal();
  };

  const navigate = useNavigate();

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="search-results my-4">
          <button
            className=" btn btn-dark text-white  py-2 px-4 rounded-lg flex items-center  transition-all ml-auto"
            onClick={() => navigate(-1)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
            Back
          </button>
          {songs.length === 0 ? (
            <p className="text-center  text-lg">No songs available</p>
          ) : (
            <>
              {" "}
              <h2 className="text-3xl font-bold text-center  mb-8">
                All Songs
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {songs.map((track) => (
                  <li
                    key={track.songId}
                    className="bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-xl overflow-hidden shadow-md hover:scale-105 transition-transform duration-300"
                  >
                    <div className="p-4 flex flex-col items-center">
                      <h3 className="text-lg font-bold text-center truncate">
                        {track.title}
                      </h3>
                      <p className="text-sm text-gray-300 mt-2 text-center">
                        <span className="font-medium">Artist:</span>{" "}
                        {track.artist}
                      </p>
                      <p className="text-sm text-gray-400 mt-1 text-center">
                        <span className="font-medium">Album:</span>{" "}
                        {track.album}
                      </p>
                      <div className="flex justify-center">
                        <button
                          className="border border-white text-white px-4 mt-4 py-2 rounded-lg hover:text-black transition-all"
                          onClick={() => handleModel(track._id, track.title)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-white hover:text-red-600 transition-colors duration-300"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M9 3V4H4V6H5V19C5 20.1 5.9 21 7 21H17C18.1 21 19 20.1 19 19V6H20V4H15V3H9ZM7 6H17V19H7V6ZM9 8H11V17H9V8ZM13 8H15V17H13V8Z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
          <CommonModel
            isModalOpen={isModalOpen}
            loading={loading}
            title={"Delete"}
            closeModal={closeModal}
            onClick={handleDeleteSong}
            color={"danger"}
            descriotion={"Are you sure want to delete song"}
            playListName={playListName}
          />
        </div>
      )}
    </>
  );
};

export default ViewAllSongs;
