import SideMenu from "../SideMenu/SideMenu";
import TodoContent from "../TodoContent/TodoContent";

const MainContent = () => {
  return (
    <div className="flex justify-center items-center h-screen ">
      <div className=" w-[1700px] h-[800px]  flex rounded-lg shadow-2xl shadow-black">
        {/* Side menu */}
        <div className="h-full">
          <SideMenu />
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
