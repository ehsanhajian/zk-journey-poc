import React, { useEffect, useRef, useState } from "react";
import { useAccount, useSignMessage } from "wagmi";
import { useBanditContext } from "@bandit-network/quest-widget";

const SignatureModal = () => {
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

  return (
    isOpen && (
      <div className="relative z-30" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <h3
                      className="text-base text-center font-semibold leading-6 text-gray-900"
                      id="modal-title"
                    >
                      Signature Required
                    </h3>
                    <div className="mt-2 text-center">
                      <h6>This app would like to verify you as the owner of this wallet.</h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  disabled={isLoading}
                  onClick={onClickSign}
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default SignatureModal;
