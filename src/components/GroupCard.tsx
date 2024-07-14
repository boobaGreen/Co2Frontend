import React, { useState } from "react";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { Group } from "../types/Group";
import { useNavigate } from "react-router-dom";
import { useMain } from "../contexts/MainContext";
import DonationModal from "./DonationModal";

interface GroupCardProps {
  group: Group;
  isFavourite: boolean;
  toggleFavourite: (groupId: string) => void;
}

const GroupCard: React.FC<GroupCardProps> = ({
  group,
  isFavourite,
  toggleFavourite,
}) => {
  const navigate = useNavigate();
  const mainContext = useMain();
  const { userId } = mainContext || {};
  console.log("userId", userId);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDonationId, setSelectedDonationId] = useState<string | null>(
    null
  );
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const navigateToDonatePage = (groupId: string, groupName: string) => {
    navigate(`/donate/${groupId}/${encodeURIComponent(groupName)}`);
  };

  const openDonationModal = (donationId: string) => {
    setSelectedDonationId(donationId);
    setIsModalOpen(true);
  };

  const closeDonationModal = () => {
    setSelectedDonationId(null);
    setIsModalOpen(false);
  };

  const userIdNumber = parseInt(userId);
  console.log("userIdNumber", userIdNumber);
  console.log("group.adminIds", group.adminIds);
  const isAdmin = group.adminIds.includes(userIdNumber);
  console.log("isAdmin", isAdmin);
  const navigateToLimitPage = (
    groupId: string,
    groupName: string,
    groupLimits: string
  ) => {
    navigate(
      `/limit/${groupId}/${encodeURIComponent(groupName)}/${groupLimits}`
    );
  };

  const limitToShow =
    group.groupLimits + "" === "-1" ? "No limit" : group.groupLimits + "";

  return (
    <div className="mt-8 relative w-full max-w-xs bg-white text-green-800 font-body py-2 px-4 rounded border-2 border-green-800 shadow-md hover:bg-gray-100 flex flex-col items-start">
      {/* Prima riga */}
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center">
          <h2 className="font-bold text-xl">{group.groupName}</h2>
        </div>
        <button
          onClick={() => toggleFavourite(group.groupId)}
          className="text-2xl focus:outline-none"
        >
          {isFavourite ? (
            <AiFillStar className="text-green-500" />
          ) : (
            <AiOutlineStar className="text-gray-500" />
          )}
        </button>
      </div>

      {/* Seconda riga */}
      <button
        onClick={toggleExpand}
        className="w-full mt-2 mb-4 bg-yellow-400 hover:bg-yellow-500 text-green-900 font-bold py-2 px-4 rounded"
      >
        {isExpanded ? "Hide Details" : "Show Details"}
      </button>

      {/* Contenuto sempre visibile */}
      <div className="m-2">
        <p>Limit (KB) : {limitToShow}</p>
        <p>
          Donations :{" "}
          {group.donations.map((donation, index) => (
            <span
              key={index}
              className="text-blue-500 cursor-pointer"
              onClick={() => openDonationModal(donation)}
            >
              {donation}
              {index !== group.donations.length - 1 && ", "}
            </span>
          ))}
        </p>
        <p>Last Report TimeStamp: {group.lastReportTimestamp}</p>
        <p>
          Admin:{" "}
          {group.adminIds.map((admin, index) => (
            <span key={index}>
              {admin}
              {index !== group.adminIds.length - 1 && ", "}
            </span>
          ))}
        </p>
      </div>

      {/* Contenuto espandibile */}
      {isExpanded && (
        <div className="m-2">
          <p>Total Messages : {group.totalMessages}</p>
          <p>Total Size (KB) : {group.totalSizeKB}</p>
          <p>Emissions OneByte (g): {group.totalEmissionsOneByte}</p>
          <p>Emissions SWD (g): {group.totalEmissionsSWD}</p>
          <p>Text Messages : {group.textTotalMessages}</p>
          <p>Text Size (KB) : {group.textTotalSize}</p>
          <p>Text Emissions OneByte (g): {group.textEmissionsOneByteMethod}</p>
          <p>Text Emissions SWD (g): {group.textEmissionsSWDMethod}</p>
          <p>Photo Messages : {group.photoTotalMessages}</p>
          <p>Photo Size (KB) : {group.photoTotalSize}</p>
          <p>
            Photo Emissions OneByte (g): {group.photoEmissionsOneByteMethod}
          </p>
          <p>Photo Emissions SWD (g): {group.photoEmissionsSWDMethod}</p>
          <p>Voice Messages : {group.voiceTotalMessages}</p>
          <p>Voice Size (KB) : {group.voiceTotalSize}</p>
          <p>
            Voice Emissions OneByte (g): {group.voiceEmissionsOneByteMethod}
          </p>
          <p>Voice Emissions SWD (g): {group.voiceEmissionsSWDMethod}</p>
          <p>Video Messages : {group.videoTotalMessages}</p>
          <p>Video Size (KB) : {group.videoTotalSize}</p>
          <p>
            Video Emissions OneByte (g): {group.videoEmissionsOneByteMethod}
          </p>
          <p>Video Emissions SWD (g): {group.videoEmissionsSWDMethod}</p>
          <p>Document Messages : {group.documentTotalMessages}</p>
          <p>Document Size (KB) : {group.documentTotalSize}</p>
          <p>
            Document Emissions OneByte (g):{" "}
            {group.documentEmissionsOneByteMethod}
          </p>
          <p>Document Emissions SWD (g): {group.documentEmissionsSWDMethod}</p>
          <p>Poll Messages : {group.pollTotalMessages}</p>
          <p>Poll Size (KB) : {group.pollTotalSize}</p>
          <p>Poll Emissions OneByte (g): {group.pollEmissionsOneByteMethod}</p>
          <p>Poll Emissions SWD (g): {group.pollEmissionsSWDMethod}</p>
          <p>Sticker Messages : {group.stickerTotalMessages}</p>
          <p>Sticker Size (KB) : {group.stickerTotalSize}</p>
          <p>
            Sticker Emissions OneByte (g): {group.stickerEmissionsOneByteMethod}
          </p>
          <p>Sticker Emissions SWD (g): {group.stickerEmissionsSWDMethod}</p>
        </div>
      )}

      {/* Pulsanti in fondo */}
      <div className="flex justify-between w-full mt-auto">
        <button
          onClick={() => navigateToDonatePage(group.groupId, group.groupName)}
          className="my-4 bg-yellow-400 hover:bg-yellow-500 text-green-900 font-bold py-2 px-4 rounded"
        >
          Donate
        </button>
        <button className="my-4 bg-yellow-400 hover:bg-yellow-500 text-green-900 font-bold py-2 px-4 rounded">
          Stats
        </button>
        {isAdmin && (
          <button
            onClick={() =>
              navigateToLimitPage(
                group.groupId,
                group.groupName,
                group.groupLimits
              )
            }
            className="my-4 bg-yellow-400 hover:bg-yellow-500 text-green-900 font-bold py-2 px-4 rounded"
          >
            Limit
          </button>
        )}
      </div>

      {/* Modal per le donazioni */}
      {selectedDonationId && (
        <DonationModal
          donationId={selectedDonationId}
          isOpen={isModalOpen}
          onRequestClose={closeDonationModal}
        />
      )}
    </div>
  );
};

export default GroupCard;
