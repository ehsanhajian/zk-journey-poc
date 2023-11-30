import React from 'react';
import {QuestWidget} from "@bandit-network/quest-widget";
import {useConnectModal} from "@rainbow-me/rainbowkit";
import {useLoaderData} from "@remix-run/react";
import {LoaderFunction} from "@remix-run/node";

interface BanditQuestProps {
    isOpen: boolean;
    collectionId: number;
    onClose: () => void;
}

const BanditQuest = ({isOpen, collectionId, onClose}: BanditQuestProps) => {
    const {openConnectModal} = useConnectModal();
    return (
        <div className="flex items-center justify-center p-2">
            {
                <QuestWidget
                    cluster={"devnet"}
                    apiKey={"73d8ed4eeddc43d8b96e0b08afb675ac"}
                    isOpen={isOpen}
                    dialog={false}
                    collectionId={collectionId}
                    onClose={onClose}
                    onConnectClick={openConnectModal as () => void}
                />
            }
        </div>
    );
};

export default BanditQuest;
