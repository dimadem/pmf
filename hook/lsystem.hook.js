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
//    >             Multiply the line length by the line length scale factor
//    <             Divide the line length by the line length scale factor
//    &             Swap the meaning of + and -
//    (             Decrement turning angle by turning angle increment
//    )             Increment turning angle by turning angle increment

import { useEffect, useState } from "react";

export default function useLsystem(metamaskAddress) {
  // const [showMenu, setMenu] = useState(false);
  //аксиома для дерева - наш кошелек
  //если при создании графики будет слишком сложное дерево, можно обрезать аксиому - оставить 3-5 символов
  //еще кошельки для примеров
  //0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
  //0x70997970C51812dc3A010C7d01b50e0d17dc79C8
  //0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC
  //0x90F79bf6EB2c4f870365E785982E1f101E93b906

  const [axiom, setAxiom] = useState("");
  //количество ярусов дерева - итераций, возможно сочетать потом с возрастом дерева
  const [n, setN] = useState(3);
  //правила, задающие формулу дерева
  const [sentence, setSentence] = useState("");
  const [numIterations, setIterations] = useState(3);
  //задаем соответствие символа из кошелька в формулу для кусочка дерева, отражающую эти символы
  //пока наугад, потом, когда прикрутим графику, можно будет поиграть формой дерева/веток/прочего
  const [rule0, setRule0] = useState("F[&F++-][--F---]");
  const [rule1, setRule1] = useState("F[&+++F][-----F]");
  const [rule2, setRule2] = useState("[^^^^-F][&--&&F]");
  const [rule3, setRule3] = useState("F[&+++F][&&&++F]");
  //угол наклона веток к друг другу, должно быть <= 90
  const [angle, setAngle] = useState(10);

  //Параметры для рисования, в расчете формулы не используются (или почти не используются)
  //Длина ствола, по идее видимо при прорисовке ствола будет делиться и сокращаться
  const [segmentLength, setLength] = useState(3);
  //Толщина ствола, аналогично, при рисовании будет уменьшаться в диаметре
  const [segmentRadius, setRadius] = useState(0.18);
  //?
  const [lengthModifier, setLengthModifier] = useState(0.6);
  const [radialModifier, setRadialModifier] = useState(0.6);
  //Это настройки цветов в RGB
  //в данной реализации только веточки и только один цвет
  //TODO надо большего разнообразия цвета/оттенков
  //TODO надо добавить листочки
  const [color, setColor] = useState([100, 85, 75]);
  //?
  const [texture, setTexture] = useState(false);
  const [trigger, setTrigger] = useState(true);
  // console.log("DATA", data);

  //переменные для формирования формулы дерева
  // let curSentence = axiom

  //собираем формулу дерева по аксиоме и по заданным правилам

  let curSentence = sentence;
  let newSentence = "";

  //при изменении кошелька, меняем аксиому и формулу дерева
  useEffect(() => {
    setAxiom(metamaskAddress);
    setSentence(metamaskAddress);
  }, [metamaskAddress]);

  useEffect(() => {
    for (let i = 1; i <= n; i++) {
      for (let j = 0; j < sentence.length; j++) {
        switch (curSentence[j]) {
          case "F":
          case "f":
          case "4":
          case "5":
            newSentence += rule0;
            break;
          case "0":
          case "1":
          case "2":
          case "3":
            newSentence += rule1;
            break;
          case "6":
          case "7":
          case "8":
          case "9":
            newSentence += rule2;
            break;
          case "A":
          case "a":
          case "C":
          case "c":
            newSentence += rule3;
          case "b":
          case "B":
          case "d":
          case "D":
            newSentence += rule3;
            break;
          default:
            newSentence += curSentence[j];
        }
      }
      curSentence = newSentence;
      newSentence = "";
    }
    setSentence(curSentence);
    setTrigger(true);
  }, [axiom]);

  return [
    { axiom: axiom },
    { n: n },
    { sentence: sentence },
    { numIterations: numIterations },
    { rule0: rule0 },
    { rule1: rule1 },
    { rule2: rule2 },
    { rule3: rule3 },
    { angle: angle },
    { segmentLength: segmentLength },
    { segmentRadius: segmentRadius },
    { lengthModifier: lengthModifier },
    { radialModifier: radialModifier },
    { color: color },
    { texture: texture },
    { trigger: trigger },
  ];
}
