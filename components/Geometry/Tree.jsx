import { useContext, useEffect, useMemo } from "react";
import { TreeContext } from "../../context/tree.context";
import { BufferGeometry, Vector3 } from "three";

export default function GenerativeTree() {
  // context
  const { tree } = useContext(TreeContext);
  console.log("GenerativeTree:", tree);

  // desctructurise data
  const [
    axiom,
    n,
    sentence,
    numIterations,
    rule0,
    rule1,
    rule2,
    rule3,
    angle,
    segmentLength,
    segmentRadius,
    radialModifier,
    lengthModifier,
    color,
    texture,
    trigger,
  ] = tree;

  // check all data
  console.log("Tree data:", [
    sentence,
    angle,
    segmentLength,
    segmentRadius,
    radialModifier,
    lengthModifier,
    color,
    texture,
  ]);

  // изначальные данные
  let data = sentence.sentence;
  const startingPoint = new Vector3(0, 0, 0);
  const endingPoint = new Vector3(0, 0, 0);

  // попробуем нарисовать линию
  let geometry = useMemo(() => {
    const g = new BufferGeometry();
    const points = [];

    // добавить точки в массив
    points.push(new Vector3(0, -2, 0)); // start
    // angle xyz
    points.push(new Vector3(0, -1, 0)); // end

    // add points to geometry
    g.setFromPoints(points);

    return g;
  }, []);

  console.log("data:", data);
  useEffect(() => {
    for (let i = 0; i < data.length; i++) {
      if (data[i] === "F") {
        console.log("F");
      }
    }
  }, [data]);

  return (
    <>
      <line geometry={geometry} position={[0, 0, 0]} renderOrder="0">
        <lineBasicMaterial
          color="black"
          linewidth={10}
          linecap="round" //ignored by WebGLRenderer
          linejoin="round" //ignored by WebGLRenderer
        />
      </line>
    </>
  );
}
