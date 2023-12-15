import React from "react";
import {
  darkTheme,
  getDefaultWallets,
  RainbowKitProvider,
  createAuthenticationAdapter,
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { polygonMumbai, astarZkatana } from "wagmi/chains";

const { chains, publicClient } = configureChains([astarZkatana, polygonMumbai], [publicProvider()]);

const { connectors } = getDefaultWallets({
  appName: "App",
  projectId: "WALLET_CONNECT_API_KEY",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

const authenticationAdapter = createAuthenticationAdapter({
  getNonce: async () => {
    const response = await fetch("/api/auth/getNonce");
    const data = await response.json();
    return data.nonce;
  },
  createMessage: async () => {},
  getMessageBody: async () => {},
  verify: async () => {},
  signOut: async () => {},
});

const RainbowProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        theme={darkTheme({
          accentColor: "#000000",
        })}
        chains={chains}
      >
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default RainbowProvider;
