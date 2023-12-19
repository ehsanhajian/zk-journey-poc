import { Outlet } from "@remix-run/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { BridgeIcon, CardIcon, FolderIcon, LanguageIcon, PoolIcon } from "../components/Icons";

export default function Layout() {
  return (
    <>
      <div className="absolute top-0 right-0 p-4 z-50">
        <ConnectButton />
      </div>
      <div className="absolute left-[1rem] top-[3rem] flex flex-col justify-start space-y-5 items-center p-4 bg-opacity-50 z-50">
        <BridgeIcon />
        <CardIcon />
        <FolderIcon />
        <PoolIcon />
        <div className="justify-self-end">
          <LanguageIcon />
        </div>
      </div>
      <Outlet />
    </>
  );
}
