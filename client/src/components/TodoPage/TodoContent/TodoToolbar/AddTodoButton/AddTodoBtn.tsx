import React from "react";
import { LuPlus } from "react-icons/lu";

const AddTodoBtn = () => {
  return (
    <div className="absolute right-0">
      <button className="mr-3 bg-white/10 text-white p-3 rounded-full hover:bg-white/20 transition ">
        <LuPlus size={21} color="lightgreen" />
      </button>
    </div>
  );
};

export default AddTodoBtn;
