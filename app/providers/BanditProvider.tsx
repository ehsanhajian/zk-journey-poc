import { BanditContextProvider } from "@bandit-network/quest-widget";
import React from "react";
import { useConnectModal } from "@rainbow-me/rainbowkit";

const BanditProvider = ({ children }: { children: React.ReactNode }) => {
  const { openConnectModal } = useConnectModal();
  return (
    <BanditContextProvider
      cluster={"devnet"}
      apiKey={"3e779f40ecee4e1c88b46cb563936258"}
      walletSettings={{
        customSignature: true,
        onConnectClick: openConnectModal as () => void,
      }}
    >
      {children}
    </BanditContextProvider>
  );
};

export default BanditProvider;
