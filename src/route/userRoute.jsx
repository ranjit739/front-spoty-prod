import UserLayout from "../layout/UserLayout";
import Dashboard from "../pages/Dashboard";
import MyPlayList from "../pages/userPages/MyPlayList";
import ViewAllSongs from "../pages/userPages/ViewAllSongs";

export const userRoute = () => {
  return [


{element :<UserLayout />,
  path :"/",
  children:[
    { element:  <Dashboard /> ,
      path: "/dashboard"},
      {
        element: <MyPlayList />,
        path: "/myplaylist",
      },
      {
        element: <ViewAllSongs />,
        path: "/view-all-songs/:id",
      },
    ]
  
 },

    
  
    // {
    //   element: <ProtectedRoute element={<ViewAllSongs />} />,
    //   path: "/myplaylist/:id",
    // },
  ];
};
