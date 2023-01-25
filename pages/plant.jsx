import CanvasFrame from "../components/CanvasFrame";
import { TreeContext } from "../context/tree.context";
import { useContext, useState } from "react";
import ConnectMetamask from "../components/ConnectMetamask";
import {useThree, Canvas } from "@react-three/fiber"
import useLsystem from "../hook/lsystem.hook";
import UseScreenshot from "../hook/useScreenshot";


export default function plant() {
  const { setTree } = useContext(TreeContext);
  const [metamaskAddress, setMetamaskAddress] = useState("");

  // use hook to store data from lsystem
  const data = useLsystem(metamaskAddress);

  // put data into context
  const handleChangeTree = () => {
    setTree(data);
  };

  // const gl = useThree((state) => state.gl)
  // const screenShot = () => {
  //   const link = document.createElement("a")
  //   link.setAttribute("download", "canvas.jpg")
  //   link.setAttribute("href", gl.domElement.toDataURL("image/png").replace("image/png", "image/octed-stream"))
  //   link.click()
  // }

  // window.screenShot = screenShot


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
        

        <button onClick={() => window.takeScreenShot()}>save img</button>
 
      </div>
     
      {/* <CanvasOld /> */}

     
      <CanvasFrame>

 
      {/* <button onClick={() => window.takeScreenshot()}>Скриншот</button> */}

    </CanvasFrame>

    </div>
  );
}
