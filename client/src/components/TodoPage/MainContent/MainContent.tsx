import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import SideMenu from "../SideMenu/SideMenu";
import TodoContent from "../TodoContent/TodoContent";
import { useEffect, useState } from "react";

const MainContent = () => {
  const [show, setIsShow] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

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
    <div className="flex justify-center items-center h-screen relative">
      <div>
        <SideMenu isVisible={isVisible} show={show} />
      </div>

      <div className="relative w-[1400px] h-[800px] flex rounded-lg shadow-2xl shadow-black">
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
          <TodoContent />
        </div>
      </div>
    </div>
  );
};

export default MainContent;

// return (
//   <div className="flex justify-center items-center h-screen relative">
//     <SideMenu isVisible={isVisible} show={show} />

//     <div className="relative w-[1400px] h-[800px] flex rounded-lg shadow-2xl shadow-black">
//       {/* Arrow Button for Sidebar */}
//       <div
//         className="absolute left-0 top-1/2 transform -translate-y-1/2 cursor-pointer z-50 transition-transform duration-300"
//         onClick={showSidebar}
//       >
//         <div className="p-3 bg-gray-800/60 backdrop-blur-md rounded-full shadow-lg hover:bg-gray-700/80 transition-colors duration-300">
//           {show ? (
//             <FaAngleLeft className="text-white text-3xl" />
//           ) : (
//             <FaAngleRight className="text-white text-3xl" />
//           )}
//         </div>
//       </div>

//       {/* Main content */}
//       <div className="h-full w-full">
//         <TodoContent />
//       </div>
//     </div>
//   </div>
// );
