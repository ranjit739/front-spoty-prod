import React from "react";

const SongsCard = ({ searchResults, handleAddToPlayList }) => {
  console.log(searchResults);
  return (
    <div className="search-results my-2">
      <h2 className="text-3xl font-bold text-center text-black mb-8">
       {searchResults.length>0&& "Search Results"} 
      </h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {searchResults?.map((track) => (
          <li
            key={track?._id}
            className="bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-xl overflow-hidden shadow-md hover:scale-105 transition-transform duration-300"
          >
            <div className="p-4 flex flex-col items-center">
              {track.album.images?.[0]?.url && (
                <img
                  src={track.album.images[0].url}
                  alt={track.name}
                  className="w-32 h-32 rounded-full shadow-lg mb-4"
                />
              )}
              <h3 className="text-lg font-bold text-center truncate">
                {track.name}
              </h3>
              <p className="text-sm text-gray-300 mt-2 text-center">
                <span className="font-medium">Artist:</span>{" "}
                {track.artists.map((artist) => artist?.name).join(", ")}
              </p>
              <p className="text-sm text-gray-400 mt-1 text-center">
                <span className="font-medium">Album:</span> {track?.album?.name}
              </p>
              <div className="flex justify-center">
                <button
                  className="border border-white text-white px-4
                mt-4 py-2 rounded-lg hover:text-black transition-all"
                  onClick={() => handleAddToPlayList(track)}
                  
                >
                  Add to Playlist
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SongsCard;
