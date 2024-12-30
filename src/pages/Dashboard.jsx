import React, { useContext, useEffect, useState } from "react";
import Searchbar from "../component/Searchbar";
import {
  addSongToPlaylist,
  fetchSongs,
  getPlaylist,
} from "../services/userService.jsx";
import SongsCard from "../component/SongsCard.jsx";
import Model from "../component/Model.jsx";
import Loader from "../component/Loader.jsx";
import CreatePlaylistModel from "../component/CommonModel.jsx";

import { createSpotifyContext } from "../context/Context.jsx";
import { toast } from "react-toastify";

const Dashboard = () => {

  const [searchResults, setSearchResults] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [songsDetails, setSongDetails] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false); // State for loader
const[playListName,setplayListName]=useState("")
  const [selectedPlaylist, setSelectedPlaylist] = useState(null); // Track the selected playlist


  const {
    handleSearchChange,
        searchQuery
  } = useContext(createSpotifyContext);



  const handlePlaylistName=(value)=>{
    setplayListName(value)
  }
const openModel=()=>{
  setIsModalOpen(true)
}

const closeModal=()=>{
  setIsModalOpen(false)
}
  const handleSelectPlaylist = (playlistId) => {
    console.log("playlist_id",playlistId)
    setSelectedPlaylist(playlistId); // Set the selected playlist name
  };

  

  // Handle search submission
  const handleSearchSubmit = async () => {
    if (!searchQuery) return;
    setLoading(true); // Start loading
    console.log("songsName", searchQuery);
    try {
      const res = await fetchSongs(searchQuery);
      console.log(res);
      setSearchResults(res?.data?.tracks?.items);

      // console.log(res.data.tracks.items)
    } catch (error) {
      toast.error("Spotify song access limit reached. Please try again after 2 hours.")
      console.log("Error fetching songs:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };


  useEffect(()=>{
    handleSearchSubmit()
  },[])

  const fetchPlayList = async (track) => {
    openModel()
    setSongDetails(track);
    setLoading(true);
    try {
      const res = await getPlaylist();
      console.log("Successfully fetched playlists:", res);
      setPlaylists(res?.data);
    } catch (error) {
      console.log("Error fetching playlist:", error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(()=>{
    handleSearchSubmit()
  },[])
 
  const addToPlayList = async () => {
    
    setLoading(true);
    try {
    const res=  await addSongToPlaylist(selectedPlaylist, songsDetails);
    
    toast.success(res?.message)
      closeModal();
    } catch (error) {
     
      console.log("Error adding song to playlist:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Searchbar
        handleSearchSubmit={handleSearchSubmit}
        handleSearchChange={handleSearchChange}
        searchQuery={searchQuery}
      />
      {loading && <Loader />}
      <SongsCard
        searchResults={searchResults}
        handleAddToPlayList={fetchPlayList}
      />
      <CreatePlaylistModel playListName={playListName} handlePlaylistName={handlePlaylistName} />
      <Model
        playlists={playlists}
        selectedPlaylist={selectedPlaylist}
        handleSelectPlaylist={handleSelectPlaylist}
        addToPlayList={addToPlayList}
        isModalOpen={isModalOpen}
        openModel={openModel}
        closeModal={closeModal}
        loading={loading}
      />
    </>
  );
};

export default Dashboard;
