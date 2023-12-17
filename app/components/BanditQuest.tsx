import React from "react";
import { QuestWidget } from "@bandit-network/quest-widget";

interface BanditQuestProps {
  isOpen: boolean;
  collectionId: number;
  onClose: () => void;
}

const BanditQuest = ({ isOpen, collectionId, onClose }: BanditQuestProps) => {
  return (
    <div className="flex items-center justify-center p-2">
      {<QuestWidget isOpen={isOpen} dialog={false} collectionId={collectionId} onClose={onClose} />}
    </div>
  );
};

export default BanditQuest;
