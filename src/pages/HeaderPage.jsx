import React, { useContext, useState } from "react";
import Header from "../component/Header";
import CreatePlaylistModel from "../component/CommonModel";
import CommonModel from "../component/CommonModel";
import { createPlaylist } from "../services/userService.jsx";
import { createSpotifyContext } from "../context/Context.jsx";
import { toast } from "react-toastify";

const HeaderPage = ({userName}) => {
  const {
    playListName,
    handlePlaylistName,
    openModal,
    closeModal,
    handleSetLoading,
    loading,
    isModalOpen,
    handleTitle,
    handleColor,
    title,
    color,
    handleDescription,descriotion
  } = useContext(createSpotifyContext);


  const handleModel=()=>{
    handleTitle("Create");
    handleDescription("")
    handlePlaylistName("")
    handleColor("success")
    openModal();
  }

  const onCreate = async (e) => {
    e.preventDefault();
    handleSetLoading(true);

    try {
      console.log("newPlaylistName", playListName);
      const res = await createPlaylist({ name: playListName });
      toast.success(res?.message)

      closeModal(); // Close the modal after successful creation
    } catch (error) {
      console.error("Playlist creation failed:", error);
    } finally {
      handleSetLoading(false);
    }
  };  

const handleLogout=()=>{
  localStorage.clear();
}

  return (
    <>
      <Header handleModel={handleModel} handleLogout={handleLogout} userName={userName}/>
      <CommonModel
        loading={loading}
        isModalOpen={isModalOpen}
        color={"success"}
        handlePlaylistName={handlePlaylistName}
        title={title}
        openModal={openModal}
        closeModal={closeModal}
        onCreate={onCreate}
        descriotion={descriotion}
      />
    </>
  );
};

export default HeaderPage;
