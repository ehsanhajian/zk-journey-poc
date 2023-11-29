import React from 'react';
import {embeddedWallet, metamaskWallet, rainbowWallet, ThirdwebProvider, walletConnect} from "@thirdweb-dev/react";
import {useEthersSigner} from "~/hooks/useEthersSigner";

const zKatana = {
    // === Required information for connecting to the network === \\
    chainId: 1261120, // Chain ID of the network
    // Array of RPC URLs to use
    rpc: ["https://rpc.zkatana.gelato.digital"],
    // === Information for adding the network to your wallet (how it will appear for first time users) === \\
    // Information about the chain's native currency (i.e. the currency that is used to pay for gas)
    nativeCurrency: {
        decimals: 18,
        name: "Sepolia ETH",
        symbol: "ETH",
    },
    shortName: "zKatana", // Display value shown in the wallet UI
    slug: "consensys", // Display value shown in the wallet UI
    testnet: true, // Boolean indicating whether the chain is a testnet or mainnet
    chain: "zKatana ", // Name of the network
    name: "Astar zKatana Testnet", // Name of the network
};


const ThirdwebProviders = ({children, twApiKey}:{children: React.ReactNode, twApiKey: string}) => {
    const signer = useEthersSigner()
    return (
        <ThirdwebProvider
            activeChain={zKatana}
            clientId={twApiKey}
            signer={signer}
            supportedWallets={[
                metamaskWallet(),
                walletConnect(),
                embeddedWallet({
                    auth: {
                        options: ["apple", "facebook", "email", "google"],
                    },
                }),
                rainbowWallet(),
            ]}
        >
            {children}
        </ThirdwebProvider>
    );
};

export default ThirdwebProviders;
