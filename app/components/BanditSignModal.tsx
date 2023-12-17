import React, { useEffect, useRef, useState } from "react";
import { useAccount, useSignMessage } from "wagmi";
import { useBanditContext } from "@bandit-network/quest-widget";

export function BanditSignModal() {
  const { address } = useAccount();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const { getSignatureMessage, walletSettings } = useBanditContext();
  const { signMessageAsync, isLoading } = useSignMessage();

  const previousAddress = useRef<`0x${string}`>();

  const fetchSignatureMessage = async () => {
    const { message } = await getSignatureMessage(address as string);
    setMessage(message);
  };

  const onClickSign = async () => {
    const res = await signMessageAsync({
      message,
    });
    walletSettings?.setSignature(res);
    setIsOpen(false);
  };

  useEffect(() => {
    fetchSignatureMessage();
  }, [fetchSignatureMessage]);

  useEffect(() => {
    if (!address) setIsOpen(false);

    if (address && address !== previousAddress.current) {
      previousAddress.current = address;
      setIsOpen(true);
    }
  }, [address]);

  // return (
  //   isOpen && (
  //     <dialog>
  //       <div>
  //         <h3 className="font-bold text-lg">Hello!</h3>
  //         <p className="py-4">
  //           Thank you for connecting your wallet, please sign this message to begin your OMA hunt!
  //         </p>
  //         <p>
  //           This step is necessary to prove you own the address supplied, and to allow you to
  //           activate the Gacha Machines
  //         </p>

  //         <button
  //           disabled={isLoading}
  //           onClick={onClickSign}
  //           type="button"
  //           className="btn btn-primary"
  //         >
  //           Sign Message
  //         </button>
  //       </div>
  //     </dialog>
  //   )
  // );
  return (
    isOpen && (
      <div
        className="fixed inset-0 flex items-center justify-center z-30"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

        <div className="bg-gray-300 opacity-90 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
              Hello!
            </h3>
            <div className="mt-2">
              <p className="text-sm text-gray-900">
                Thank you for connecting your wallet, please sign this message to begin your OMA
                hunt!
              </p>
              <p className="text-sm text-gray-900">
                This step is necessary to prove you own the address supplied, and to allow you to
                activate the Gacha Machines
              </p>
            </div>
          </div>
          <div className="mt-5 sm:mt-6">
            <button
              disabled={isLoading}
              onClick={onClickSign}
              type="button"
              className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    )
  );
}
