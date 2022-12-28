import { useContext, useEffect, useRef } from "react";
import { TreeContext } from "../../context/tree.context";
import { TreeSegment } from "./TreeSegment";

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

  // check sentence
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
  console.log("data:", data);

  // начальные данные
  let xAngle = 0;
  let yAngle = 0;
  let zAngle = 0;
  let length = segmentLength.segmentLength;
  let radius = segmentRadius.segmentRadius;
  let states = [];
  let prevLength = 0;
  let prevSeg = useRef();

  //! решить вопрос с предыдущим сегментом, что это такое к чему нужно добавлять обьект

  // create tree segment
  useEffect(() => {
    for (let i = 0; i < sentence.sentence.length; i++) {
      // Если F - создаем сегмент
      if (sentence.sentence[i] === "F") {
        let mySegment = TreeSegment(
          length,
          radius,
          radialModifier.radialModifier,
          xAngle,
          yAngle,
          zAngle,
          lengthModifier.lengthModifier,
          color.color,
          texture.texture,
          prevLength
        );

        //? что мы тут делаем?
        // добавляем сегмент к предыдущему сегменту
        // prevSeg.add(mySegment);
        prevSeg = mySegment;
        xAngle = 0;
        yAngle = 0;
        zAngle = 0;
        prevLength = length;
        length *= lengthModifier.lengthModifier;
        radius *= radialModifier.radialModifier;

        if (radius * radialModifier.radialModifier < 0.03) {
          radius = 0.03;
        }
        if (length * lengthModifier.lengthModifier < 0.3) {
          length = 0.3;
        }
      }

      // Если + - ^ & < > - меняем углы
      if (sentence.sentence[i] === "+") {
        zAngle += angle.angle;
      }
      if (sentence.sentence[i] === "-") {
        zAngle -= angle.angle;
      }
      if (sentence.sentence[i] === "^") {
        xAngle += angle.angle;
      }
      if (sentence.sentence[i] === "&") {
        xAngle -= angle.angle;
      }
      if (sentence.sentence[i] === "<") {
        yAngle += angle.angle;
      }
      if (sentence.sentence[i] === ">") {
        yAngle -= angle.angle;
      }

      // Если [ - открываем ветку
      if (sentence.sentence[i] === "[") {
        states.push({
          segment: prevSeg,
          zAngle: zAngle,
          yAngle: yAngle,
          xAngle: xAngle,
          length: length,
          prevLength: prevLength,
          radius: radius,
        });
      }

      // Если ] - закрываем ветку
      if (sentence.sentence[i] === "]") {
        let lastState = states[states.length - 1];
        prevSeg = lastState.segment;
        zAngle = lastState.zAngle;
        yAngle = lastState.yAngle;
        xAngle = lastState.xAngle;
        length = lastState.length;
        prevLength = lastState.prevLength;
        radius = lastState.radius;
        states.pop();
      }

      // setTrigger(false);
    }
  }, [sentence]);

  return (
    <group>
      <mesh>
        <vector3 name="position" x={0} y={length / 2} z={0} />
      </mesh>
    </group>
  );
}
