
import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = ({ handleModel,handleLogout,userName}) => {
  return (
    <header className="bg-dark text-white py-3 sticky-top">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-12 d-flex justify-content-between flex-wrap">
            {/* Logo Section */}
            <div className="mb-2">
              <h3 className="m-0 text-white">{userName}</h3>
            </div>
            {/* Navigation Buttons */}
            <div className="d-flex flex-wrap">
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `btn mx-2 mb-2 ${isActive ? "btn-success" : "btn-outline-light"}`
                }
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/myplaylist"
                className={({ isActive }) =>
                  `btn mx-2 mb-2 ${isActive ? "btn-success" : "btn-outline-light"}`
                }
              >
                My Playlist
              </NavLink>

              <button
                className="btn btn-outline-light mx-2 mb-2"
                onClick={handleModel }
                
              >
                Create Playlist
              </button>

              <NavLink
              to="/login"
              className={({ isActive }) =>
                `btn mx-2 mb-2 ${isActive ? "btn-success" : "btn-outline-light"}`
              }
           onClick ={handleLogout}
              >
             
            logout
            </NavLink>
          
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

