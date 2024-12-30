import React from 'react';
import Loader from './Loader';
import BtnLoader from './BtnLoader';

const Model = ({ 
  playlists, 
  selectedPlaylist, 
  addToPlayList, 
  handleSelectPlaylist, 
  isModalOpen,
  openModel,
  closeModal,
  loading  
}) => {

    
  return (
    <>
      {isModalOpen && ( // Render modal conditionally based on visibility
        <div
          className="modal show"
          tabIndex={-1}
          style={{ display: 'block', background: 'rgba(0,0,0,0.5)' }}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Playlist
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal} // Close modal on button click
                  aria-label="Close"
                 
                />
              </div>
              <div className="modal-body">
                <ul className="list-group">
                {loading ? <Loader/>: <>
                
                {playlists && playlists.length > 0 ? (
                    playlists.map((playlist, index) => (
                      <li
                        key={index}
                        className={`list-group-item d-flex justify-content-between align-items-center ${
                          selectedPlaylist === playlist._id ? 'active' : ''
                        }`}
                        onClick={() => handleSelectPlaylist(playlist._id)}
                        style={{ cursor: 'pointer' }}
                      >
                        {playlist.name}
                      </li>
                    ))
                  ) : (
                    <p className="text-muted">No playlists available.</p>
                  )}
                  </>
                }
                </ul>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal} // Close modal on button click
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={addToPlayList}
                >
               {loading ? <BtnLoader /> : "Add To Playlist"}   
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Model;
