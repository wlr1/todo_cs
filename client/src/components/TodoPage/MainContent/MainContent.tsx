import { FaAngleLeft } from "react-icons/fa";
import SideMenu from "../SideMenu/SideMenu";
import TodoContent from "../TodoContent/TodoContent";
import { useEffect, useState } from "react";

const MainContent = () => {
  const [show, setIsShow] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  const showSidebar = () => {
    setIsShow(!show);
  };

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
    <div className="flex justify-center items-center h-screen ">
      <div className=" w-[1700px] h-[800px]  flex rounded-lg shadow-2xl shadow-black ">
        <div className="absolute left-14 top-1/2  cursor-pointer">
          <FaAngleLeft
            className="text-2xl text-gray-400 hover:text-gray-200 transition duration-300"
            onClick={showSidebar}
          />
        </div>
        {/* Side menu */}
        <div className="h-full">
          <SideMenu isVisible={isVisible} show={show} />
        </div>
        {/* Main content */}
        <div className="h-full w-full ">
          <TodoContent />
        </div>
      </div>
    </div>
  );
};

export default MainContent;
