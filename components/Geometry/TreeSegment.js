// Character        Meaning
//    F             Move forward by line length drawing a line
//    f             Move forward by line length without drawing a line
//    +             Turn left by turning angle
//    -             Turn right by turning angle
//    |             Reverse direction (ie: turn by 180 degrees)
//    [             Push current drawing state onto stack
//    ]             Pop current drawing state from the stack
//    #             Increment the line width by line width increment
//    !             Decrement the line width by line width increment
//    @             Draw a dot with line width radius
//    {             Open a polygon
//    }             Close a polygon and fill it with fill colour
//    3            Multiply the line length by the line length scale factor
//    <             Divide the line length by the line length scale factor
//    &             Swap the meaning of + and -
//    (             Decrement turning angle by turning angle increment
//    )             Increment turning angle by turning angle increment

import * as THREE from "three";
import { useRef, useEffect } from "react";

export function TreeSegment(
  length,
  radius,
  radialDecrease,
  xAngle,
  yAngle,
  zAngle,
  lengthDecrease,
  color,
  texture,
  prevLength
) {
  // let geometry = new THREE.CylinderGeometry(
  //   radius * radialDecrease,
  //   radius,
  //   length,
  //   radius * 200,
  //   radius * 200
  // );
  // let geometry2 = new THREE.CylinderGeometry(
  //   radius * radialDecrease,
  //   radius * 0.85,
  //   length,
  //   radius * 50,
  //   radius * 50,
  //   true
  // );
  // geometry.translate(0, length / 2, 0);
  // geometry2.translate(0, length / 2, 0);

  // if (texture) {
  //   let vertices = geometry.attributes.position.array;

  //   for (let i = 0; i < vertices.length; i++) {
  //     if (vertices[i] === 10 || vertices[i] === -10) {
  //       continue;
  //     }
  //     let randAmount = Math.random() / 100;
  //     if (Math.random() > 0.5) {
  //       vertices[i] += randAmount;
  //     } else {
  //       vertices[i] -= randAmount;
  //       if (vertices[i] < 0.01) {
  //       }
  //     }
  //   }
  // }

  // console.log("color:", color);
  // let material = new THREE.MeshPhongMaterial({
  //   // color: `rgb(${color[0]}, ${color[1]}, ${color[2]})`,
  //   color: "red",
  //   dithering: true,
  //   flatShading: true,
  //   precision: "lowp",
  // });
  // let cylinder = new THREE.Mesh(geometry, material);
  // let cylinder2 = new THREE.Mesh(geometry2, material);

  const cylinderRotation = [
    (xAngle * Math.PI) / 180,
    (yAngle * Math.PI) / 180,
    (zAngle * Math.PI) / 180,
  ];
  // const cylinder2Rotation = [cylinder2Rotation.y * 1.2];

  // let sphereGeometry = new THREE.SphereGeometry(
  //   radius * radialDecrease,
  //   radius * 80,
  //   radius * 80
  // );

  //? временно комментирую
  // if (texture) {
  //   let sphereVertices = sphereGeometry.attributes.position.array;

  //   for (let i = 0; i < sphereVertices.length; i++) {
  //     let randAmount = Math.random() / 100;
  //     if (Math.random() > 0.5) {
  //       sphereVertices[i] += randAmount;
  //     } else {
  //       sphereVertices[i] -= randAmount;
  //     }
  //   }
  // }

  // let sphere = new THREE.Mesh(sphereGeometry, material);
  // sphere.position.set(0, length, 0);

  //! осталось добавить
  // cylinder.add(sphere);
  // cylinder.position.set(0, prevLength, 0);

  // if (texture) {
  //   cylinder.add(cylinder2);
  // }

  // const cylinderRef = useRef();
  // const sphereRef = useRef();

  return (
    <>
      <mesh>
        <vector3 name="position" x={0} y={length / 2} z={0} />
      </mesh>
    </>
  );
}

//   return (
//     <>
//       {/* cylinder */}
//       <mesh position={[0, length / 2, 0]} rotation={cylinderRotation}>
//         <cylinderGeometry
//           args={[
//             radius * radialDecrease,
//             radius,
//             length,
//             radius * 200,
//             radius * 200,
//           ]}
//         />
//         <meshPhongMaterial
//           color="red"
//           dithering="true"
//           flatShading="true"
//           precision="lowp"
//         />
//       </mesh>
//       {/* cylinder2 */}
//       <mesh position={[0, length / 2, 0]} rotation-y={[1.2]}>
//         <cylinderGeometry
//           args={[
//             radius * radialDecrease,
//             radius * 0.85,
//             length,
//             radius * 50,
//             radius * 50,
//             true,
//           ]}
//         />
//         <meshPhongMaterial
//           color="red"
//           dithering="true"
//           flatShading="true"
//           precision="lowp"
//         />
//       </mesh>
//       {/* sphere */}
//       <mesh position={[0, length, 0]}>
//         <sphereGeometry
//           args={[radius * radialDecrease, radius * 80, radius * 80]}
//         />
//         <meshPhongMaterial
//           color="red"
//           dithering="true"
//           flatShading="true"
//           precision="lowp"
//         />
//       </mesh>
//     </>
//   );
// }
