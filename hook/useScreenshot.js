import * as THREE from "three";
import { useThree, extend } from "@react-three/fiber";

extend(THREE);

const UseScreenshot = () => {
  const gl = useThree((state) => state.gl);
  const screenshot = () => {
    const link = document.createElement("a");
    link.setAttribute("download", "canvas.jpg");
    link.setAttribute(
      "href",
      gl.domElement
        .toDataURL("image/png")
        .replace("image/png", "image/octed-stream")
    );
    link.click();
  };
  window.takeScreenshot = screenshot;
};
export default UseScreenshot;
