"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";
import { useAppKit } from "@reown/appkit/react";

export interface WalletInfo {
  address: string;
  isConnected: boolean;
  chainId: number;
  balance?: string;
}

export const useWallet = () => {
  const { address, isConnected, chainId } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { open, close } = useAppKit();

  const walletInfo: WalletInfo = {
    address: address || "",
    isConnected,
    chainId: chainId || 0,
  };

  const connectWallet = () => {
    open();
  };

  const disconnectWallet = () => {
    disconnect();
    close();
  };

  return {
    walletInfo,
    connectWallet,
    disconnectWallet,
    isConnected,
    address,
    chainId,
  };
};