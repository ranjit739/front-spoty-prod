import Signup from "../pages/authPages/SignUp";
import  Login from "../pages/authPages/Login";

export const authRoute = () => {
  return [


    {
      element: <Login />,
      path: "/",
    },
 
    {
      element: <Login />,
      path: "/login",
    },
    
    {
        element: <Signup />,
        path: "/signup",
      },
  ];
};
