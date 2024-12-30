import { authRoute } from "./authRoutes";
import { userRoute } from "./userRoute";


export const mainRoute = () => {
  return [
    ...authRoute(),...userRoute(),
    {
      path: "*", // Catch-all route for invalid paths
      element: <div>404 Page Not Found</div>,
    },
  ];
};
