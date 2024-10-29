import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AppDispatch, RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { getContentBgImage } from "../../../redux/slices/userSlice/asyncActions";

import useSound from "use-sound";
import { sounds } from "../../../sounds/sounds";

const TodoContent = lazy(() => import("../TodoContent/TodoContent"));
const SettingsMenu = lazy(() => import("../SettingsMenu/SettingsMenu"));
const ProfileMenu = lazy(() => import("../ProfileMenu/ProfileMenu"));
const SideMenu = lazy(() => import("../SideMenu/SideMenu"));

const MainContent = () => {
  const [show, setIsShow] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [currentBlur, setCurrentBlur] = useState<number>(() => {
    const savedBlur = localStorage.getItem("blurValue");
    return savedBlur ? Number(savedBlur) : 6;
  });
  const [isUsernameHide, setIsUsernameHide] = useState("no");
  const [currentContent, setCurrentContent] = useState("todo");

  const renderContent = () => {
    switch (currentContent) {
      case "todo":
        return <TodoContent />;
      case "profile":
        return <ProfileMenu />;
      case "settings":
        return (
          <SettingsMenu
            currentBlur={currentBlur}
            setCurrentBlur={setCurrentBlur}
            setIsUsernameHide={setIsUsernameHide}
            isUsernameHide={isUsernameHide}
          />
        );
      default:
        return <TodoContent />;
    }
  };

  const [playbackRate] = useState(1.75);

  const isSoundOn = useMemo(
    () => JSON.parse(localStorage.getItem("isSoundOn") || "true"),
    []
  );

  const [playUI] = useSound(sounds.menuclick, {
    playbackRate,
    interrupt: true,
    volume: 0.1,
    soundEnabled: isSoundOn,
  });

  const { contentBgImage } = useSelector((state: RootState) => state.user);
  const dispatch: AppDispatch = useDispatch();

  const handleContentChange = useCallback(
    (content: string) => {
      setCurrentContent(content);
      playUI();
    },
    [playUI]
  );

  const showSidebar = useCallback(() => {
    setIsShow(!show);
  }, [show]);

  useEffect(() => {
    dispatch(getContentBgImage());
  }, [dispatch]);

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
        <Suspense fallback={<div>Loading...</div>}>
          <SideMenu
            isVisible={isVisible}
            show={show}
            handleContentChange={handleContentChange}
            isUsernameHide={isUsernameHide}
          />
        </Suspense>
      </div>

      <div
        className="relative w-[1400px] h-[800px] flex rounded-lg shadow-2xl shadow-black  bg-no-repeat bg-cover"
        style={{
          backgroundImage: `url(${contentBgImage})`,
        }}
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
            <Suspense fallback={<div>Loading...</div>}>
              {renderContent()}
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
