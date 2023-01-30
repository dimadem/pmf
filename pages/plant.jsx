"use client";
import { TreeContext } from "../context/tree.context";
import { useContext, useState } from "react";
import ConnectMetamask from "../components/ConnectMetamask";
import useLsystem from "../hook/lsystem.hook";
import P5Sketch from "../components/P5Sketch";

export default function Plant() {
  const { setTree } = useContext(TreeContext);
  const [metamaskAddress, setMetamaskAddress] = useState("");

  // use hook to store data from lsystem
  const data = useLsystem(metamaskAddress);

  // put data into context
  const handleChangeTree = () => {
    setTree(data);
  };

  console.log("data", data);
  return (
    <div className="w-screen h-screen">
      <div className="flex flex-col justify-center items-center">
        {/* /подключение к метамаску ведет на новую страницу с ссылкой (адрес кошелька) */}
        <ConnectMetamask onSetMetamaskAddress={setMetamaskAddress} />

        {/* сгенерировать дерево */}
        <button
          className="rounded-sm bg-green-400 p-2"
          onClick={handleChangeTree}
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
        <P5Sketch />
      </div>
    </div>
  );
}
