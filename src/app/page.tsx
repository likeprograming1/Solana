"use client";
import {
  Metaplex,
  PublicKey,
  irysStorage,
  keypairIdentity,
  toMetaplexFileFromBrowser,
} from "@metaplex-foundation/js";
import HeaderComponents from "./components/haeder/headercomponents";
import { useEffect, useRef, useState } from "react";
import { Connection, Keypair, clusterApiUrl } from "@solana/web3.js";

export default function Home() {
  const [asset, setAsset] = useState();
  console.log(asset);
  const Ref = useRef<HTMLInputElement>(null);
  const ImageAdd = (e: any) => {
    const { files } = e.target;
    setAsset(files);
  };

  useEffect(() => {
    const handleSearch = async () => {
      const mintAddress = new PublicKey(
        "BVDNeigfTAwkN3ixdymyxK1oWDf9KPYQVJQDJ6vKAoGy"
      );
      console.log(mintAddress);
      // token metadata
      const metadata = {
        uri: "https://raw.githubusercontent.com/solana-developers/program-examples/new-examples/tokens/tokens/.assets/spl-token.json",
        name: "Solana Gold",
        symbol: "GOLDSOL",
      };

      const connection = new Connection(clusterApiUrl("devnet"));
      // const balance = await connection.getBalance(mintAddress);
      // console.log(balance);
      // const result = await connection.requestAirdrop(mintAddress, 1000);
      // console.log(result);
      // const balance2 = await connection.getBalance(mintAddress);
      // console.log(balance2);
      const wallet = Keypair.generate();
      const metaplex = Metaplex.make(connection)
        .use(keypairIdentity(wallet))
        .use(irysStorage());

      try {
        const abortController = new AbortController();
        setTimeout(() => abortController.abort(), 100);
        console.log(abortController);
        const nft = await metaplex.nfts().findByMint(
          { mintAddress },
          {
            signal: abortController.signal,
          }
        );
        console.log("Mint Already Exists" + nft);
      } catch (error) {
        // console.log("uri ready");
        // const browserFiles = asset;

        // if (browserFiles !== undefined) {
        // const { uri, metadata } = await metaplex.nfts().uploadMetadata({
        //   name: "My NFT",
        //   description: "My description",
        //   image: await toMetaplexFileFromBrowser(browserFiles[0]),
        // properties: {
        //   files: [
        //     {
        //       type: "image/jpeg",
        //       uri: await toMetaplexFileFromBrowser(browserFiles[1]),
        //     },
        //   ],
        // },
        // });

        // console.log(metadata.image); // https://arweave.net/123
        // console.log(metadata);
        // console.log(uri);
        console.log("nft ready");
        const { nft } = await metaplex.nfts().create({
          uri: metadata.uri,
          name: metadata.symbol,
          sellerFeeBasisPoints: 500,
        });
        console.log(nft);
        // }

        console.log(error);
      }
      return mintAddress;
    };
    // if (asset !== undefined && asset) {
    //   console.log(asset);
    handleSearch();
    // }
  }, []);

  return (
    <div className="max-w-[1240px] w-full mx-auto ">
      <HeaderComponents />
      <input type="file" ref={Ref} onClick={ImageAdd} className="hidden" />
      <button
        className=" bg-white text-black w-[100px] h-[40px] rounded-[10px] cursor-pointer"
        onClick={() => {
          Ref.current?.click();
        }}
      >
        Image
      </button>
    </div>
  );
}
