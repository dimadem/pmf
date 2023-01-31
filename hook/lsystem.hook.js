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
  //аксиома для дерева - наш кошелек
  //если при создании графики будет слишком сложное дерево, можно обрезать аксиому - оставить 3-5 символов
  //еще кошельки для примеров
  //0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
  //0x70997970C51812dc3A010C7d01b50e0d17dc79C8
  //0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC
  //0x90F79bf6EB2c4f870365E785982E1f101E93b906

  // триггер чего нибудь
  const [trigger, setTrigger] = useState(true);

  ///////////////////////////
  //! цвет фона квадрата
  const [backgroundColor, setBackgroundColor] = useState("#8BC78B");
  // ! количество итераций
  const [numIterations, setIterations] = useState(4);
  ///////////////////////////
  //! правила, задающие формулу дерева
  //axiom - аксиома, то есть начальное состояние дерева
  const [treeAxiom, setTreeAxiom] = useState("");
  const [treeRules, setTreeRules] = useState([
    {
      a: "F",
      b: "FF",
    },
    {
      a: "X",
      b: "F[+X]F[-X]+X",
    },
  ]);
  const [treeFormula, setTreeFormula] = useState("");
  // цвет ствола дерева
  const [treeTrunkColor, setTreeTrunkColor] = useState([100, 85, 75]);
  // цвет кроны дерева
  const [treeCrownColor, setTreeCrownColor] = useState([40, 139, 34]);
  //угол наклона
  const [treeAngle, setTreeAngle] = useState(50);
  // длина сегмента
  const [treeLength, setTreeLength] = useState(20);
  // Толщина ствола при рисовании будет уменьшаться в длинне
  const [treeLengthModifier, setTreeLengthModifier] = useState(0.08);
  // толщина линии
  const [treeStrokeWeight, setTreeStrokeWeight] = useState(2);
  // масштаб дерева
  const [treeScale, setTreeScale] = useState(5);
  // позиционирование на экране
  const [treePosition, setTreePosition] = useState([180, 20]);
  ///////////////////////////

  //!правила, задающие формулу паттерна
  const [patternAxiom, setPatternAxiom] = useState("FX");
  const [patternRules, setPatternRules] = useState([
    {
      a: "X",
      b: "X+YF",
    },
    {
      a: "Y",
      b: "FX-Y",
    },
  ]);
  const [patternFormula, setPatternFormula] = useState("");
  // цвет паттерна фона
  const [patternColor, setPatternColor] = useState([250, 0, 0, 100]);
  // угол паттерна
  const [patternAngle, setPatternAngle] = useState(90);
  // длина сегмента
  const [patternLength, setPatternLength] = useState(200);
  // Толщина ствола при рисовании будет уменьшаться в длинне
  const [patternLengthModifier, setPatternLengthModifier] = useState(0.01);
  // толщина линии
  const [patternStrokeWeight, setPatternStrokeWeight] = useState(0.5);
  // масштаб паттерна
  const [patternScale, setPatternScale] = useState(20);
  // позиционирование на экране
  const [patternPosition, setPatternPosition] = useState([200, 260]);

  //при изменении кошелька, меняем аксиому -> формулы дерева и паттерна
  //7893d 0bcfD 93A44 28443326c083ff23F935Df001

  useEffect(() => {
    setTreeAxiom("X"); // меняем на Metamask Address или что то еще
    setPatternAxiom("FX"); // меняем на Metamask Address или что то еще
  }, [metamaskAddress]);

  //! генерируем формулу ДЕРЕВА
  useEffect(() => {
    let temp = treeAxiom; //что перебираем
    let temp_sent = ""; //темп формулы дерева

    for (let k = 0; k < numIterations; k++) {
      temp_sent = ""; // обнуляем переменную сегмента
      // подобрать правило
      for (let i = 0; i < temp.length; i++) {
        let ch = temp.charAt(i);
        let checked = false;
        // если ни одно из правил не подошло
        for (let j = 0; j < treeRules.length; j++) {
          if (ch === treeRules[j].a) {
            temp_sent += treeRules[j].b;
            checked = true;
            break;
          }
        }
        // переносим символ из аксиомы
        if (checked === false) {
          temp_sent += ch;
        }
      }
      //перекладываем
      temp = temp_sent;
    }
    //готовая формула дерева
    setTreeFormula(temp);
    setTrigger(true);
  }, [treeAxiom]);
  ///////////////////////////
  //! генерируем формулу ПАТТЕРНА
  useEffect(() => {
    let temp = patternAxiom; //что перебираем
    let temp_sent = ""; //темп формулы дерева

    for (let k = 0; k < numIterations; k++) {
      temp_sent = ""; // обнуляем переменную сегмента
      // подобрать правило
      for (let i = 0; i < temp.length; i++) {
        let ch = temp.charAt(i);
        let checked = false;
        // если ни одно из правил не подошло
        for (let j = 0; j < patternRules.length; j++) {
          if (ch === patternRules[j].a) {
            temp_sent += patternRules[j].b;
            checked = true;
            break;
          }
        }
        // переносим символ из аксиомы
        if (checked === false) {
          temp_sent += ch;
        }
      }
      //перекладываем
      temp = temp_sent;
    }
    //готовая формула дерева
    setPatternFormula(temp);
    setTrigger(true);
  }, [patternAxiom]);

  return [
    { Trigger: trigger },

    { BackgroundColor: backgroundColor },

    { numIterations: numIterations },

    { TreeFormula: treeFormula },
    { TreeTrunkColor: treeTrunkColor },
    { TreeCrownColor: treeCrownColor },
    { TreeAngle: treeAngle },
    { TreeLength: treeLength },
    { TreeLengthModifier: treeLengthModifier },
    { TreeStrokeWeight: treeStrokeWeight },
    { TreeScale: treeScale },
    { TreePosition: treePosition },

    { PatternFormula: patternFormula },
    { PatternColor: patternColor },
    { PatternAngle: patternAngle },
    { PatternLength: patternLength },
    { PatternLengthModifier: patternLengthModifier },
    { PatternStrokeWeight: patternStrokeWeight },
    { PatternScale: patternScale },
    { PatternPosition: patternPosition },
  ];
}
///////////////////////////////////////////

// //!снежинка
// angle = 60;
// axiom = "F++F++F";
// rules[0] = {
//   a: "F",
//   b: "F-F++F-F",
// };
// //? settings
// mod = 0.01;
// iteration = 1;
// strWeight = 1;
// scl = 10;
// posX = 200;
// posY = 80;
// bgColor = "#8BC78B";
///////////////////////////////////////////
// //!Серпинский
// angle = 60;
// axiom = "A";
// rules[0] = {
//   a: "A",
//   b: "B-A-B",
// };
// rules[1] = {
//   a: "B",
//   b: "A+B+A",
// };
// //? settings
// mod = 0.02;
// iteration = 10;
// strWeight = 1;
// scl = 0.8;
// posX = 350;
// posY = -40;
// bgColor = "#8BC78B";
///////////////////////////////////////////
//!дракон
// angle = 90;
// axiom = "FX";
// rules[0] = {
//   a: "X",
//   b: "X+YF",
// };
// rules[1] = {
//   a: "Y",
//   b: "FX-Y",
// };
// //?settings
// mod = 0.1;
// iteration = 12;
// scl = 1;
// posX = 260;
// posY = 100;
// strWeight = 2;
// bgColor = "#8BC78B";
///////////////////////////////////////////
// //!побеги
// angle = 50;
// axiom = "X";
// rules[0] = {
//   a: "F",
//   b: "FF",
// };
// rules[1] = {
//   a: "X",
//   b: "F[+X]F[-X]+X",
// };
// //? settings
// mod = 0.08;
// iteration = 6;
// scl = 4;
// strWeight = 2;
// posX = 180;
// posY = 20;
// bgColor = "#8BC78B";
