import React from 'react';
import {darkTheme, getDefaultWallets, RainbowKitProvider} from "@rainbow-me/rainbowkit";
import {defineChain} from "viem";
import {configureChains, createConfig, WagmiConfig} from "wagmi";
import {publicProvider} from "wagmi/providers/public";
import {polygonMumbai} from 'wagmi/chains';


const astarZkatana = defineChain({
    id: 1261120,
    name: 'Astar zkEVM Testnet zKatana',
    network: 'zKatana',
    nativeCurrency: {name: 'Ether', symbol: 'ETH', decimals: 18},
    rpcUrls: {
        default: {
            http: [
                'https://rpc.zkatana.gelato.digital',
                'https://rpc.startale.com/zkatana',
            ],
        },
        public: {
            http: [
                'https://rpc.zkatana.gelato.digital',
                'https://rpc.startale.com/zkatana',
            ],
        },
    },
    blockExplorers: {
        blockscout: {
            name: 'Blockscout zKatana chain explorer',
            url: 'https://zkatana.blockscout.com',
        },
        default: {
            name: 'zKatana Explorer',
            url: 'https://zkatana.explorer.startale.com',
        },
    },
    contracts: {
        multicall3: {
            address: '0xca11bde05977b3631167028862be2a173976ca11',
            blockCreated: 31317,
        },
    },
    testnet: true,
})

const {chains, publicClient} = configureChains(
    [astarZkatana, polygonMumbai],
    [
        publicProvider()
    ]
);

const {connectors} = getDefaultWallets({
    appName: 'App',
    projectId: "WALLET_CONNECT_API_KEY",
    chains
});

const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient
})
const RainbowProviders = ({children}: {children: React.ReactNode}) => {
    return (
        <WagmiConfig config={wagmiConfig}>
            <RainbowKitProvider
                theme={darkTheme({
                    accentColor: '#000000',
                })}
                chains={chains}>
                {children}
            </RainbowKitProvider>
        </WagmiConfig>
    );
};

export default RainbowProviders;
