import { createContext, useState } from "react";

// Fixing the typo in context name
const createSpotifyContext = createContext();

const SpotifyContext = ({ children }) => {
  const [playListName, setPlayListName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState("");
  const [title, setTitle] = useState("");
  const [keys, setkeys] = useState("");
  const [searchQuery, setSearchQuery] = useState();
  const [descriotion, setDescriotion] = useState("");
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handlePlaylistName = (value) => {
    setPlayListName(value);
  };

  const handleSetLoading = (value) => {
    setLoading(value);
  };

  const handleColor = (value) => {

    setColor(value);
  };

  const handleTitle = (value) => {
  
    setTitle(value);
  };

  const handleKeys = (value) => {
    setkeys(value);
  };


  const handleSearchChange = (value) => {
    setSearchQuery(value);
  };

  const handleDescription=(value)=>{
setDescriotion(value)
  }

  return (
    <createSpotifyContext.Provider
      value={{
        keys,
        handleKeys,
        color,
        title,
        handleColor,
        handleTitle,
        playListName,
        handlePlaylistName,
        isModalOpen,
        loading,
        openModal,
        closeModal,
        handleSetLoading,
        handleSearchChange,
        searchQuery,
        handleDescription,
        descriotion
      }}
    >
      {children}
    </createSpotifyContext.Provider>
  );
};

export { createSpotifyContext, SpotifyContext };
