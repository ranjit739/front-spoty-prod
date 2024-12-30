import { useRoutes } from "react-router-dom";
import { mainRoute } from "./route";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { SpotifyContext } from "./context/Context";

const App = () => {
  const routes = useRoutes(mainRoute()); // Ensure mainRoute returns a valid route object

  return (
    <>
      {/* Wrap the app in the SpotifyContext provider */}
      <SpotifyContext>
        <ToastContainer />
        {routes}
      </SpotifyContext>
    </>
  );
};

export default App;
