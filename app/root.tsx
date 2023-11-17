import { cssBundleHref } from "@remix-run/css-bundle";
import { json, LoaderFunction, type LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";

import {
  ThirdwebProvider,
  ConnectWallet,
  metamaskWallet,
  walletConnect,
  localWallet,
  embeddedWallet,
} from "@thirdweb-dev/react";

import styles from "./tailwind.css";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export async function loader() {
  // console.group(process.env.TW_API_KEY);
  return json({ twApiKey: process.env.TW_API_KEY });
}

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

export default function App() {
  const { twApiKey } = useLoaderData<LoaderFunction>();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Yomi Origins</title>
        <Meta />
        <Links />
      </head>
      <body>
        <ThirdwebProvider
          activeChain={zKatana}
          clientId={twApiKey}
          supportedWallets={[metamaskWallet(), walletConnect(), localWallet(), embeddedWallet()]}
        >
          <Outlet />
        </ThirdwebProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
