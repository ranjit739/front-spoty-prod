import React from 'react'

const PlayList = () => {
  return (
 <>
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
     
 {playlists?.map((playlist) => (
   <div key={playlist._id} className="bg-white  shadow-md rounded-lg overflow-hidden"  style={{width:"300px"}}>
     <div className="relative">
       <img
         src={defaultImage}
         alt={playlist.name}
         className="w-full h-40 object-cover"
       />
       <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-sm rounded-full px-2 py-1">
         {playlist.songs.length} Songs
       </div>
     </div>
     <div className="p-4">
       <h3 className="text-xl font-bold">{playlist.name}</h3>
       <p className="text-sm text-gray-600">{playlist.description}</p>
     </div>
     <div className="flex justify-between p-4 bg-gray-100">
       <button
         onClick={() => handleViewPlaylist(playlist._id)}
         className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
       >
         View
       </button>
       <button
         onClick={() => handleRenameClick(playlist)}
         className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
       >
         Rename
       </button>
       <button
         onClick={() => openDeleteModal(playlist)}
         className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
       >
         Delete
       </button>
     </div>
   </div>
 ))}
</div>
 </>
  )
}

export default PlayList