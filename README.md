# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

Features
1. User Authentication
Secure user registration and login functionality.
Passwords are hashed using bcrypt for security.
JWT is used for session management and protecting routes.
2. Playlist Management
Create: Users can create new playlists with custom names
Read: Users can view all their playlists in a dashboard.
Update: Edit playlist details
Delete: Delete playlists when no longer needed.
3. Spotify API Integration
Search for songs using the Spotify API.
Display song details including title, artist, and album.
Add songs from search results to playlists.

5. Backend and Database
Node.js and Express.js for the backend logic.
MongoDB with Mongoose for efficient data storage.
RESTful APIs to handle all data operations effectively.
