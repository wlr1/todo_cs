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

  const defaultBgImage = "/utility/img/wallpaper3.jpg";

  return (
    <>
      <div
        className=" h-screen bg-cover bg-center"
        style={{
          backgroundImage: `url(${bgImage || defaultBgImage})`,
        }}
      >
        <div className="">
          <MainContent />
        </div>
      </div>
    </>
  );
};

export default TodoCS;
