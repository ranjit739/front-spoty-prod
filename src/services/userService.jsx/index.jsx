import { API_ENDPOINTS } from "../../endpoint/apiendpoint";
import axiosInstance from "../../utils";

export const fetchSongs = async (data) => {
  
    try {
console.log("data fetchSongs",data)
      const res = await axiosInstance.get(`${API_ENDPOINTS.TRACK}?query=${data}`);
      console.log("response",res)
      return res.data;
    } catch (error) {
      throw error.response?.data.error || error.message;
    }
  };


  export const createPlaylist = async (data) => {
    try {
      const res = await axiosInstance.post(API_ENDPOINTS.PLAYLISTS, data);
      return res.data;
    } catch (error) {
      console.error(error);
      
    }
  };
// Update Playlist Service
export const updatePlaylist = async (id, data) => {
  try {
    const response = await axiosInstance.put(`${API_ENDPOINTS.PLAYLISTS}/${id}`, data);
  
    return response.data;
  } catch (error) {
    toast.error(error.response?.data.error || 'Failed to update playlist');
   
  }
};


 // Delete Playlist Service
export const deletePlaylist = async (id) => {
  try {
    const response = await axiosInstance.delete(`${API_ENDPOINTS.PLAYLISTS}/${id}`);
    

    return response.data;
  } catch (error) {
 
   console.log(error)
  }
};
export const getPlaylist = async () => {
    try {
      const res = await axiosInstance.get(API_ENDPOINTS.PLAYLISTS);
      return res.data;
    } catch (error) {
     console.log(error)
    }
  };

  export const addSongToPlaylist = async (playlistId, track) => {
    try {
      const res = await axiosInstance.post(`${API_ENDPOINTS.PLAYLISTS}/${playlistId}/songs`, {
        songId: track.id,
        title: track.name,
        artist: track.artists.map((artist) => artist.name).join(', '),
        album: track.album.name,
        duration: track.duration_ms / 1000
      });
      return res.data;
    } catch (error) {
    console.log(error)
    }
  
  
    
  };

  export const fetchToPlaylistSongs = async (playlistId) => {
    try {
      const res = await axiosInstance.get(`${API_ENDPOINTS.PLAYLISTS}/${playlistId}`);
      return res.data;
    } catch (error) {
    console.log(error)
    }
  
  
    
  };

  export const deleteSongFromPlaylist = async (playlistId, songId) => {
console.log("ID11",playlistId,"IDDD",songId)

    try {
      const response = await axiosInstance.delete(
        `${API_ENDPOINTS.PLAYLISTS}/${playlistId}/song/${songId}`
      );
    console.log(response)
  
      return response.data;
    } catch (error) {
     console.log(error)
    }
  };

  