import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import SideMenu from "../SideMenu/SideMenu";
import TodoContent from "../TodoContent/TodoContent";
import { useEffect, useState } from "react";
import ProfileMenu from "../ProfileMenu/ProfileMenu";
import SettingsMenu from "../SettingsMenu/SettingsMenu";
import { AppDispatch, RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { getContentBgImage } from "../../../redux/slices/userSlice/asyncActions";

const MainContent = () => {
  const [show, setIsShow] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [currentBlur, setCurrentBlur] = useState<number>(() => {
    const savedBlur = localStorage.getItem("blurValue");
    return savedBlur ? Number(savedBlur) : 11;
  });
  const [isUsernameHide, setIsUsernameHide] = useState("no");
  const [currentContent, setCurrentContent] = useState("todo");

  const { contentBgImage } = useSelector((state: RootState) => state.user);
  const dispatch: AppDispatch = useDispatch();

  const handleContentChange = (content: string) => {
    setCurrentContent(content);
  };

  const showSidebar = () => {
    setIsShow(!show);
  };

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getContentBgImage());
    };
    fetchData();
  }, [dispatch]);

  //fix for hide sidebar animation
  useEffect(() => {
    if (!show) {
      setTimeout(() => {
        setIsVisible(false);
      }, 500);
    } else {
      setIsVisible(true);
    }
  }, [show]);

  return (
    <div className="flex justify-center items-center h-screen relative">
      <div className="">
        <SideMenu
          isVisible={isVisible}
          show={show}
          handleContentChange={handleContentChange}
          isUsernameHide={isUsernameHide}
        />
      </div>

      <div
        className="relative w-[1400px] h-[800px] flex rounded-lg shadow-2xl shadow-black  bg-no-repeat bg-cover"
        style={{ backgroundImage: `url(${contentBgImage})` }}
      >
        <div
          className="absolute inset-0 bg-opacity-50 backdrop-blur-md rounded-r-lg "
          style={{ backdropFilter: `blur(${currentBlur}px)` }}
        >
          {/* Arrow Button for Sidebar */}
          <div
            className="absolute -left-4 top-1/2 transform -translate-y-1/2 cursor-pointer z-50 transition-transform duration-300"
            onClick={showSidebar}
          >
            <div className="p-3 bg-gray-800/60 backdrop-blur-md rounded-full shadow-lg hover:bg-gray-700/80 transition-colors duration-300">
              {show ? (
                <FaAngleLeft className="text-white text-3xl" />
              ) : (
                <FaAngleRight className="text-white text-3xl" />
              )}
            </div>
          </div>

          {/* Main content */}
          <div className="h-full w-full">
            {currentContent == "todo" && <TodoContent />}
            {currentContent == "profile" && <ProfileMenu />}
            {currentContent == "settings" && (
              <SettingsMenu
                currentBlur={currentBlur}
                setCurrentBlur={setCurrentBlur}
                setIsUsernameHide={setIsUsernameHide}
                isUsernameHide={isUsernameHide}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
