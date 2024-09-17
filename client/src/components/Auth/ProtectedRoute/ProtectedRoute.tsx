import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import api from "../../../redux/api";
import Spinner from "../../Spinner/Spinner";
import { ProtectedRouteProps } from "../../../utility/types/types";

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
      }, 2000);
    };
    validateToken();
  }, []);

  useEffect(() => {
    if (isValid === false) {
      navigate("/todo");
    }
  }, [isValid, navigate]);

  if (isValid === null) {
    return (
      <>
        <Spinner />
      </>
    );
  }

  if (!isValid) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
