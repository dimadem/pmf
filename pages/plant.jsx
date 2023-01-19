import CanvasFrame from "../components/CanvasFrame";
import { TreeContext } from "../context/tree.context";
import { useContext, useState } from "react";
import ConnectMetamask from "../components/ConnectMetamask";
import useLsystem from "../hook/lsystem.hook";
import html2canvas from 'html2canvas';

export default function plant() {
  const { setTree } = useContext(TreeContext);
  const [metamaskAddress, setMetamaskAddress] = useState("");

  // use hook to store data from lsystem
  const data = useLsystem(metamaskAddress);

  // put data into context
  const handleChangeTree = () => {
    setTree(data);
  };

  const saveCapture = () => {
    html2canvas(document.querySelector("#top")).then(canvas => {
      document.body.appendChild(canvas)
    })
  }

  return (
    <div id="top" className="w-screen h-screen">
      <div className="flex flex-col justify-center items-center">
        {/* /подключение к метамаску ведет на новую страницу с ссылкой (адрес кошелька) */}
        <ConnectMetamask onSetMetamaskAddress={setMetamaskAddress} />
        <button
          className="rounded-sm bg-green-400 p-2"
          onClick={handleChangeTree}
        >
          Plant Tree
        </button>
        // todo сохранение скриншота
        <button onClick={saveCapture}>save img</button>
      </div>
      <div id="capture">
      {/* <CanvasOld /> */}
      <CanvasFrame />
      </div>
    </div>
  );
}
