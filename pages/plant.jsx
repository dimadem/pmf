"use client";
import { LSystemContext } from "../context/lsystem.context";
import { useContext, useState } from "react";
import ConnectMetamask from "../components/ConnectMetamask";
import useLsystem from "../hook/lsystem.hook";

import P5Sketch from "../components/P5Sketch";

export default function Plant() {
  const { setLSystem } = useContext(LSystemContext);
  // const [login, setLogin] = useState(false);
  const [metamaskAddress, setMetamaskAddress] = useState("");
  // use hook to store data from lsystem
  const data = useLsystem(metamaskAddress);
  // put data into context
  const handleMint = () => {
    setLSystem(data);
  };

  return (
    <div className="w-screen h-screen">
      <div className="flex flex-col justify-center items-center">
        <ConnectMetamask onSetMetamaskAddress={setMetamaskAddress} />
        {/* сгенерировать дерево */}
        <button
          className="text-sm rounded-sm bg-green-600 p-2"
          onClick={handleMint}
        >
          Plant Tree
        </button>
        {/* сделать скриншот */}
        {/* <button
          className="rounded-sm bg-green-400 p-2"
          onClick={() => window.takeScreenshot()}
        >
          Скриншот
        </button> */}
        <P5Sketch props={data} />
      </div>
    </div>
  );
}
