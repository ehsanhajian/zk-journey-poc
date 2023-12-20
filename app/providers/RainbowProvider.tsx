import React from "react";
import { darkTheme, getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { polygonMumbai, astarZkatana } from "wagmi/chains";

const { chains, publicClient } = configureChains([astarZkatana, polygonMumbai], [publicProvider()]);

const { connectors } = getDefaultWallets({
  appName: "App",
  projectId: "c945587da18981ecf7988098ac8c6133",
  // projectId: process.env.WALLET_CONNECT_API_KEY as string,
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});
const RainbowProviders = ({ children }: { children: React.ReactNode }) => {
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

export default RainbowProviders;
