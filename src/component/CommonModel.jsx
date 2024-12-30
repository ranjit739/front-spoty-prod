import React, { useState } from "react";
import Loader from "./Loader"; // Assuming you have a Loader component for loading state
import BtnLoader from "./BtnLoader";

const CommonModel = ({
  playListName,
  title,
  onClick,
  handlePlaylistName,
  isModalOpen,
  closeModal,
  loading,
  color,
  name,
  descriotion,
  onCreate
}) => {

  console.log("----",title)
  return (
    <>
      {isModalOpen && (
        <div
          className="modal show"
          tabIndex={-1}
          style={{ display: "block", background: "rgba(0, 0, 0, 0.5)" }}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: "500px" }}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  {title} Playlist
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal} // Close modal on button click
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
              

                {/* Playlist Name */}
                <div className="mb-3">
                  <label htmlFor="playlistName" className="form-label">
                    {descriotion}
                  </label>
                  <input
                    type="text"
                    id="playlistName"
                    value={playListName}
                    onChange={(e) => handlePlaylistName(e.target.value)}
                    placeholder="Enter playlist name"
                    className="form-control rounded-3"
                  disabled ={color==="danger"?true:false}
                    />
                </div>

            
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal} // Close modal on button click
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className= {`btn btn-${color}`} 
                  onClick={title==="Create"? onCreate: onClick}
                  disabled={loading} // Disable if loading
                >
                  {loading ? <BtnLoader /> :  `${title}`}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CommonModel;
