import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Header from "../component/Header";
import HeaderPage from "../pages/HeaderPage";

const UserLayout = () => {
  const token = localStorage.getItem("token");
  const userName = localStorage.getItem("userName");
  return token ? (
    <>
      {" "}
     < HeaderPage userName={userName}/>
       <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default UserLayout;
