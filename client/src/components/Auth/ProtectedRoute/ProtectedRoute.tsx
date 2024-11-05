import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import api from "../../../redux/api";
import Spinner from "../../Spinner/Spinner";
import { ProtectedRouteProps } from "../../../utility/types/types";

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const validateToken = async () => {
      try {
        await api.get("/Account/validate-token", { withCredentials: true });
        setIsValid(true); // Token good
      } catch {
        setIsValid(false); // Token bad
      }
    };

    // white screen problem(need check if it works)
    const timeoutId = setTimeout(validateToken, 3000);

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (isValid === true) navigate("/todo");

    if (isValid === false) navigate("/login");
  }, [isValid, navigate]);

  if (isValid === null) return <Spinner />; // loading spinner when content is loading

  return <>{isValid ? children : null}</>; // validate(good) render content
};

export default ProtectedRoute;
