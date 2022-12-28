import { DoubleSide } from "three";
export default function Plane(params) {
  return (
    <>
      <mesh position-y={-2} rotation-x={-Math.PI * 0.5} scale={6}>
        <planeGeometry />
        <meshStandardMaterial color="green" side={DoubleSide} />
      </mesh>
    </>
  );
}
