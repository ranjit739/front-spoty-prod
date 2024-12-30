import React, { useContext, useEffect, useState } from "react";
import {
  createPlaylist,
  deletePlaylist,
  deleteSongFromPlaylist,
  getPlaylist,
  updatePlaylist,
} from "../../services/userService.jsx";
import defaultImage from "../../assets/defaultImage.webp";
import Loader from "../../component/Loader.jsx";
import { useNavigate } from "react-router-dom";
import { red } from "@mui/material/colors";
import CommonModel from "../../component/CommonModel.jsx";
import { createSpotifyContext } from "../../context/Context.jsx";
import { toast } from "react-toastify";

const MyPlayList = () => {
  const [playlists, setPlaylists] = useState([]);
  const [playlistId, setPayListId] = useState();
  const [isDelete, setIsDelete] = useState(false);
  const [onClick11, setOnClick] = useState();

  const {
    openModal,
    playListName,
    handlePlaylistName,
    closeModal,
    handleSetLoading,
    loading,
    isModalOpen,
    handleColor,
    handleTitle,
color,title,
handleDescription,
descriotion
  } = useContext(createSpotifyContext);
  const handleRenameSubmit = async (e) => {
    e.preventDefault();
    if (!playListName.trim()) {
      return;
    }
    handleSetLoading(true);
    try {
      const res = await updatePlaylist(playlistId, { name: playListName });
      fetchPlayList();
      closeModal()
      toast?.success(res?.message)
    } catch (error) {
      console.error("Error renaming playlist:", error);
   
    } finally {
      handleSetLoading(false);
    }
  };

  const handleDeletePlaylist = async () => {
    handleSetLoading(true);
    try {
      const res = await deletePlaylist(playlistId); 
      fetchPlayList();
      closeModal()
      toast.success(res?.message)
    } catch (error) {
      console.error("Error deleting playlist:", error);
     
    } finally {
      handleSetLoading(false);
      handleTitle("");
    }
  };

  const handleDelete = (id, name) => {
    setPayListId(id);
    handleColor("danger");
    handleTitle("Delete");
    openModal();
    handleDescription("Are you sure want to delete songs");
    handlePlaylistName(name);
    setIsDelete(true);

  };

  const handleRename = (id, name) => {
    setIsDelete(false)
    setPayListId(id);
    handleColor("success");
    handleTitle("Rename");
handleDescription("Rename playlist name");
    handlePlaylistName(name);
    openModal();

  };

  const navigate = useNavigate();

  const fetchPlayList = async () => {
    handleSetLoading(true);
    try {
      const res = await getPlaylist();
      console.log("Successfully fetched playlists:", res);
      setPlaylists(res?.data);
    } catch (error) {
      console.log("Error fetching playlist:", error);
    } finally {
      handleSetLoading(false);
      handleTitle("");
    }
  };


  const onCreate = async (e) => {
    e.preventDefault();
    handleSetLoading(true);

    try {
      console.log("newPlaylistName", playListName);
      const res = await createPlaylist({ name: playListName });
      toast.success(res?.message)
     
      fetchPlayList()
      handlePlaylistName("")
      closeModal(); // Close the modal after successful creation
    } catch (error) {
      console.error("Playlist creation failed:", error);
    } finally {
      handleSetLoading(false);
    }
  };  

  useEffect(() => {
    fetchPlayList();
  }, []);



  return (
    <>
      {loading && <Loader />}
      <div className="container py-4">
        <div className="row g-4">
          {playlists?.map((playlist) => (
            <div key={playlist._id} className="col-sm-6 col-lg-3">
              <div className="card shadow-sm">
                {/* Playlist Image */}
                <div className="position-relative">
                  <img
                    src={defaultImage}
                    className="card-img-top"
                    alt={playlist.name}
                  />
                  <div className="position-absolute top-0 end-0 bg-dark bg-opacity-50 text-white rounded px-2 py-1 m-2">
                    {playlist.songs.length} Songs
                  </div>
                </div>

                {/* Playlist Info */}
                <div className="card-body">
                  <h5 className="card-title">{playlist.name}</h5>
                  <p className="card-text text-truncate">
                    {playlist.description}
                  </p>
                </div>

                {/* Dropdown Actions */}
                <div className="card-footer bg-light d-flex justify-content-between align-items-center">
                  <button
                    className="btn btn-dark btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target={`#playlistModal-${playlist._id}`}
                    onClick={() => navigate(`/view-all-songs/${playlist._id}`)}
                  >
                    View
                  </button>
                  <div className="dropdown">
                    <button
                      className="btn btn-dark dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Action
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={() =>
                            navigate(`/view-all-songs/${playlist._id}`)
                          }
                        >
                          View
                        </a>
                      </li>
                      <li
                        onClick={() =>
                          handleDelete(playlist?._id, playlist?.name)
                        }
                      >
                        <a className="dropdown-item" href="#">
                          Delete
                        </a>
                      </li>

                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={() =>
                            handleRename(playlist._id, playlist.name)
                          }
                        >
                          Rename
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <CommonModel
        playListName={playListName}
        descriotion={descriotion}
        closeModal={closeModal}
        isModalOpen={isModalOpen}
        color={color}
        title={title}
        loading={loading}
        handlePlaylistName={handlePlaylistName}
        onClick={isDelete?handleDeletePlaylist:handleRenameSubmit}
        onCreate={onCreate}
      />
    </>
  );
};

export default MyPlayList;
