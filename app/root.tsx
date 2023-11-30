import {json, type LinksFunction, LoaderFunction} from "@remix-run/node";
import {Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData,} from "@remix-run/react";


import styles from "./tailwind.css";
import questStyles from "@bandit-network/quest-widget/dist/styles.css"
import rainbowStyles from '@rainbow-me/rainbowkit/styles.css';
import ThirdwebProviders from "~/providers/ThirdwebProviders";
import RainbowProviders from "~/providers/RainbowProviders";


export const links: LinksFunction = () => [{rel: "stylesheet", href: styles}, {
    rel: "stylesheet",
    href: questStyles
}, {rel: "stylesheet", href: rainbowStyles}];

export async function loader() {
    // console.group(process.env.TW_API_KEY);
    return json({twApiKey: process.env.TW_API_KEY});
}


export default function App() {
    const {twApiKey} = useLoaderData<LoaderFunction>();
    return (
        <html lang="en">
        <head>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <title>Yomi Origins</title>
            <Meta/>
            <Links/>
        </head>
        <body>
        <RainbowProviders>
            <ThirdwebProviders twApiKey={twApiKey}>
                <Outlet/>
            </ThirdwebProviders>
        </RainbowProviders>
        <ScrollRestoration/>
        <Scripts/>
        <LiveReload/>
        </body>
        </html>
    )
        ;
}
