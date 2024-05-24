import { getToken } from "@/utils";
import React from "react";
import { Navigate } from "react-router-dom";

type Layout = {
  children: React.ReactNode;
};

export const AuthRoute = ({ children }: Layout) => {
  const token = getToken();
  if (token) {
    return <>{children}</>;
  } else {
    return <Navigate to="/login" replace />;
  }
};
