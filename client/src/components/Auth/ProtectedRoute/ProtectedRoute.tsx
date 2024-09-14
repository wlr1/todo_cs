import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import api from "../../../redux/api";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const validateToken = async () => {
      //white screen(bcs of cookie delay) fix
      setTimeout(async () => {
        try {
          await api.get("/Account/validate-token", { withCredentials: true });
          setIsValid(true);
        } catch (error: any) {
          setIsValid(false);
        }
      }, 1000);
    };
    validateToken();
  }, []);

  useEffect(() => {
    if (isValid === false) {
      navigate("/todo");
    }
  }, [isValid, navigate]);

  if (isValid === null) {
    return <div className="font-bold text-black text-2xl">Loading...</div>;
  }

  if (!isValid) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
