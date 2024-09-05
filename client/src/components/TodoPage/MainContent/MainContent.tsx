import { FaAngleLeft } from "react-icons/fa";
import SideMenu from "../SideMenu/SideMenu";
import TodoContent from "../TodoContent/TodoContent";
import { useState } from "react";

const MainContent = () => {
  const [show, setIsShow] = useState(false);

  const showSidebar = () => {
    setIsShow(!show);
    console.log(show);
  };

  return (
    <div className="flex justify-center items-center h-screen ">
      <div className=" w-[1700px] h-[800px]  flex rounded-lg shadow-2xl shadow-black">
        <div className="absolute left-14 top-1/2  cursor-pointer">
          <FaAngleLeft
            className="text-2xl text-gray-400 hover:text-gray-200 transition duration-300"
            onClick={showSidebar}
          />
        </div>
        {/* Side menu */}
        <div className="h-full">
          <SideMenu show={show} />
        </div>
        {/* Main content */}
        <div className="h-full w-full">
          <TodoContent />
        </div>
      </div>
    </div>
  );
};

export default MainContent;
