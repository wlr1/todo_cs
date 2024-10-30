import React, { useEffect } from "react";
import MainContent from "./MainContent/MainContent";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { getBgImage } from "../../redux/slices/userSlice/asyncActions";

const TodoCS = () => {
  const dispatch: AppDispatch = useDispatch();
  const { bgImage } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getBgImage());
    };

    fetchData();
  }, [dispatch]);

  return (
    <>
      <div
        className="min-h-screen w-full bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      >
        <>
          <MainContent />
        </>
      </div>
    </>
  );
};

export default TodoCS;
