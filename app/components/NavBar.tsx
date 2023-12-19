import { ConnectButton } from "@rainbow-me/rainbowkit";
import { BridgeIcon, CardIcon, FolderIcon, LanguageIcon, PoolIcon } from "./Icons";

export function NavBar() {
  return (
    <div>
      <div className="row-start-1 col-start-2 justify-self-end p-4">
        <ConnectButton />
      </div>

      <div className="flex flex-col justify-start space-y-5 items-center row-start-2 col-start-1 p-4 bg-opacity-50 z-50">
        <BridgeIcon />
        <CardIcon />
        <FolderIcon />
        <PoolIcon />
        <div className="justify-self-end">
          <LanguageIcon />
        </div>
      </div>
    </div>
  );
}
