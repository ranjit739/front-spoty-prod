import React, { useState } from 'react';
import PlaylistCreator from './PlaylistCreator';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Header = () => {
  const [createIsOpen, setCreateIsOpen] = useState(false);
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

let userName= Cookies.get("userNmae")

  const OpenCreateField = () => {

    setCreateIsOpen(true);
  };

  const handleLogout = () => {
    Cookies.remove('token');
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <>
      <div
        className="flex flex-wrap justify-between bg-black py-3 px-4"
        style={{
          background: '#1d1d1d',
          color: '#fff',
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          width: '100%',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
        }}
      >
<h4 className=' text-white font-bold text-lg'> {userName}</h4>


     

        <div className="relative flex flex-wrap gap-2">

        <button
        className="playlist-button sm: mx-1 mb-2 sm:mb-0 sm:mr-1"
        style={{
          backgroundColor: '#1DB954',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '50px',
          color: '#fff',
          fontSize: '16px',
        }}
        onClick={() => navigate("/dashboard")}
      >
        Home
      </button>
          <button
            className="playlist-button sm: mx-1 mb-2 sm:mb-0 sm:mr-1"
            style={{
              backgroundColor: '#1DB954',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '50px',
              color: '#fff',
              fontSize: '16px',
            }}
            onClick={() => navigate("/myplaylist")}
          >
            My Playlist
          </button>


          <button
            className="playlist-button sm: mx-1 mb-2 sm:mb-0 sm:mr-1"
            style={{
              backgroundColor: '#1DB954',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '50px',
              color: '#fff',
              fontSize: '16px',
            }}
            onClick={() => handleLogout()}
          >
            Logout
          </button>
        </div>
      </div>

    
    </>
  );
};

export default Header;
