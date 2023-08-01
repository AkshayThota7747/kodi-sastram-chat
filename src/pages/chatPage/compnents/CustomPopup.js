import React from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const CustomPopup = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-10">
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="relative bg-white rounded-lg p-6 z-20">
        {children}
        <button className="absolute top-1 right-2 text-gray-500" onClick={onClose}>
          <CloseRoundedIcon />
        </button>
      </div>
    </div>
  );
};

export default CustomPopup;
