import React from "react";
import {
  AiOutlineCheckCircle,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";

const EmailModal = () => {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <div className="flex  justify-center">
          <AiOutlineLoading3Quarters className="text-4xl text-indigo-600 animate-spin" />
        </div>

        <div className="mt-4">
          <p className="text-[16px] text-gray-600">
            We just send you a confirmation email.
          </p>
          <span className="text-sm text-gray-600/85">
            Please check your email!
          </span>
        </div>
        <div className="mt-6">
          <p className="text-gray-600 text-[14px]">
            The email didnt arrive?{" "}
            <span className="ml-1 text-blue-500 hover:underline cursor-pointer">
              Send again
            </span>
          </p>
          <p className="text-[12px] mt-1 text-gray-600">
            Still no email? Check <span className="text-red-500">SPAM</span>{" "}
            folder.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmailModal;
