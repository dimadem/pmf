import CanvasFrame from "../components/CanvasFrame";
import { TreeContext } from "../context/tree.context";
import { useContext, useState } from "react";
import useLsystem from "../hook/lsystem.hook";
import Button from "../components/UI/Button";
import Connect from "../components/Connect";

export default function plant() {
  const { setTree } = useContext(TreeContext);
  const [metamaskAddress, setMetamaskAddress] = useState("");

  // use hook to store data from lsystem
  const data = useLsystem(metamaskAddress);

  // put data into context
  const handleChangeTree = () => {
    setTree(data);
  };
  const takeScreenShot = () => {
    window.takeScreenshot();
  };

  return (
    <div className="w-screen h-screen">
      <div className="flex flex-col justify-center items-center">
        {/* /подключение к метамаску ведет на новую страницу с ссылкой (адрес кошелька) */}
        <Connect />
        <Button onClick={handleChangeTree}>Plant Tree</Button>
        <Button onClick={takeScreenShot}>Скриншот</Button>
      </div>
      <CanvasFrame />
    </div>
  );
}
