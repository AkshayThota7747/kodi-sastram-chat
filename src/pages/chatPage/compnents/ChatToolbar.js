import React, { useState } from "react";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import CustomPopup from "./CustomPopup";
import { useNavigate } from "react-router-dom";

const ChatToolbar = ({ avatar, title, description, groupSize }) => {
  const navigate = useNavigate();

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handlePopupOpen = () => {
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="bg-[#111315] text-[#FBFBFB] py-4 px-8 flex items-center shadow-md">
      <button
        onClick={() => {
          navigate("/");
        }}
        className="pr-4"
      >
        <ArrowBackRoundedIcon className=" text-lg" />
      </button>
      <h2 className="flex-grow text-xl font-bold cursor-pointer ml-2" onClick={handlePopupOpen}>
        {title}
      </h2>
      <button className="w-10 h-10 rounded-full overflow-hidden">
        <img src={avatar} alt={title + "image"} className="w-full h-full object-cover" />
      </button>

      {groupSize && (
        <CustomPopup isOpen={isPopupOpen} onClose={handlePopupClose}>
          <div className="text-center">
            <h3 className="text-lg text-gray-600 font-bold mb-2">Total users in the group: {groupSize}</h3>
            {description && <p className="text-gray-600">{description}</p>}
          </div>
        </CustomPopup>
      )}
    </div>
  );
};

export default ChatToolbar;
