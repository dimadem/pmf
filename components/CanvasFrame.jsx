// import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import GenerativeTree from "./Geometry/Tree";
import Plane from "./Geometry/Plane";
import UseScreenshot from "../hook/useScreenshot";



// todo сделать квадртаный экран просмотра или делать снимок с квадратного экрана
// todo добавить сохранение изображения

export default function CanvasFrame(props) {

  return (
    <>
      {/* Canvas */}
      <Canvas gl={{ antialias: false, preserveDrawingBuffer: true }} frameloop="demand">
        {/* performance data */}
        {/* <Perf position="bottom-left" /> */}
        {/* background */}
        <color args={["lightgrey"]} attach="background" />
        {/* Effects */}
        {/* <EffectComposer>
          <DepthOfField
            focusDistance={0.0025}
            focalLength={0.007}
            bokehScale={4}
            height={height}
          />
          <Noise opacity={0.1} />
          <Glitch delay={[0.5, 2]} duration={[0.01, 0.2]} />

          <Vignette offset={0.1} darkness={0.6} />
        </EffectComposer> */}
        {/* Camera */}
        <OrbitControls
          // makeDefault
          enableDamping={true}
          enablePan={false}
          enableRotate={true}
          enableZoom={false}
        />
        {/* lights */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[-10, 10, 5]} intensity={1.5} />
        {/* Tree */}
        <GenerativeTree />
        {/* Plane */}
        <Plane />
        <UseScreenshot/>
      </Canvas>
      
    </>
  );
}
