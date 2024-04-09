"use client";
import Link from "next/link";
import React, { useState } from "react";

const HeaderComponents = () => {
  const [Account, setAccount] = useState<string>("");
  const ButtonsClass =
    " w-full cursor-pointer p-[10px] bg-green text-black font-bold rounded-[10px] hover:text-white hover:bg-black hover:border-[1px] hover:border-solid hover:border-green";

  const handleWalletConnect = async () => {
    try {
      console.log("WalletConnet Try!!");
      const Chain = await window.ethereum.request({
        method: "eth_chainId",
      });
      console.log(Chain);

      if (Chain) {
        handleAccount();
      } else {
        alert("Try Again!");
      }

      return Chain;
    } catch (error) {
      console.log("WalletConnet Faild!!" + error);
    }
  };

  const handleAccount = async () => {
    try {
      console.log("GetAccount!!");
      const AccountValue = (await window.ethereum.request({
        method: "eth_requestAccounts",
      })) as string[] | undefined;

      if (AccountValue !== undefined) {
        setAccount(AccountValue[0]);
      }
    } catch (error) {
      console.log("Account Not Found Sorry ReTry Plz...!!");
    }
  };

  const hadleDisConnect = async () => {
    try {
      await window.ethereum
        .request({
          method: "wallet_revokePermissions",
          params: [
            {
              eth_accounts: {},
            },
          ],
        })
        .then(() => {
          console.log("DisConnect Success!!");
          setAccount("");
        });
    } catch (error) {
      console.log("Sry DisConnect Faild ReTry Plz...!");
    }
  };

  return (
    <div className="flex justify-between text-xl h-[100px] items-center">
      <Link href="/" className=" text-3xl text-green cursor-pointer">
        MoonLyt
      </Link>
      <div className="flex gap-[20px]">
        <div className={`${ButtonsClass}`}>MintingPage</div>
        <div
          className={`${ButtonsClass}`}
          onClick={Account ? hadleDisConnect : handleWalletConnect}
        >
          {Account ? "DisConnect" : "WalletLogin"}
        </div>
      </div>
    </div>
  );
};

export default HeaderComponents;
