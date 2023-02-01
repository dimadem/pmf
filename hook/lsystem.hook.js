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
  //0x
  //f39Fd6e51aad88F6F4ce6aB8827279cffFb92266
  //fFdea
  //39651
  //0x70997970C51812dc3A010C7d01b50e0d17dc79C8
  //0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC
  //0x90F79bf6EB2c4f870365E785982E1f101E93b906

  // триггер чего нибудь
  const [trigger, setTrigger] = useState(true);

  ///////////////////////////
  //! цвет фона квадрата
  const [backgroundColor, setBackgroundColor] = useState("#8BC78B");
  // ! общее количество итераций
  const [globalIterations, setGlobalIterations] = useState(1);
  ///////////////////////////
  //! правила, задающие формулу дерева
  //axiom - аксиома, то есть начальное состояние дерева
  const [treeAxiom, setTreeAxiom] = useState("FX");
  const [treeRules, setTreeRules] = useState([
    {
      a: "F", //F == FF
      b: "F[+X][++X][+++X][++++X][-X][--F][+++F][--X][---X][----X]",
    },
    {
      a: "X",
      b: "F[+X]F[-X]+X", //"F[+X][++F]F[--F][---F][-X]+X",
    },
    {
      a: "b",
      b: "F[+X][++F]F[--F][---F][-X]+X",
    },
  ]);
  const [treeFormula, setTreeFormula] = useState("");
  console.log("treeFormula", treeFormula);
  // количество итераций в дереве
  const [treeIterations, setTreeIterations] = useState(treeAxiom.length);
  // цвет ствола дерева
  const [treeTrunkColor, setTreeTrunkColor] = useState([100, 85, 75]);
  // цвет кроны дерева
  const [treeCrownColor, setTreeCrownColor] = useState([40, 139, 34]);
  //угол наклона
  const [treeAngle, setTreeAngle] = useState(20);
  // длина сегмента
  const [treeLength, setTreeLength] = useState(20);
  // Толщина ствола при рисовании будет уменьшаться в длине
  const [treeLengthModifier, setTreeLengthModifier] = useState(0.08);
  // толщина линии
  const [treeStrokeWeight, setTreeStrokeWeight] = useState(0.2);
  // масштаб дерева
  const [treeScale, setTreeScale] = useState(5);
  // позиционирование на экране
  const [treePosition, setTreePosition] = useState([180, 20]);
  ///////////////////////////
  //!правила, задающие формулу паттерна
  const [patternAxiom, setPatternAxiom] = useState("CCC");
  const [patternRules, setPatternRules] = useState([
    {
      a: "C",
      b: "D",
    },
    {
      a: "D",
      b: "CD",
    },
  ]);

  const [patternFormula, setPatternFormula] = useState("");
  // количество итераций в паттерне
  const [patternIterations, setPatternIterations] = useState(
    patternAxiom.length + 16
  );
  // цвет паттерна фона
  const [patternColor, setPatternColor] = useState([250, 0, 0, 100]);
  // угол паттерна
  const [patternAngle, setPatternAngle] = useState(60);
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

  //! апдейт настроек после итераций
  useEffect(() => {
    // апдейт итерации дерева
    setTreeIterations(treeIterations + globalIterations);
    // апдейт итерации паттерна
    setPatternIterations(patternIterations + globalIterations);
    // апдейт масштаба дерева
    setTreeScale(treeScale - globalIterations);
    // апдейт масштаба паттерна
    setPatternScale(patternScale - globalIterations);
  }, [globalIterations]);

  // //! задаем аксиому проекта
  // useEffect(() => {
  //   setTreeAxiom("X"); // меняем на Metamask Address или что то еще
  //   setPatternAxiom("C"); // меняем на Metamask Address или что то еще
  // }, [metamaskAddress]);

  //! генерируем формулу ДЕРЕВА
  useEffect(() => {
    let temp = treeAxiom; //что перебираем
    let temp_sent = ""; //темп формулы дерева

    for (let k = 0; k < treeIterations; k++) {
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

    for (let k = 0; k < patternIterations; k++) {
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
    //готовая формула паттерна
    console.log("pattern", temp);
    setPatternFormula(temp);
    setTrigger(true);
  }, [patternAxiom]);

  return [
    { Trigger: trigger },

    { BackgroundColor: backgroundColor },

    { GlobalIterations: globalIterations },

    { TreeFormula: treeFormula },
    { TreeIterations: treeIterations },
    { TreeTrunkColor: treeTrunkColor },
    { TreeCrownColor: treeCrownColor },
    { TreeAngle: treeAngle },
    { TreeLength: treeLength },
    { TreeLengthModifier: treeLengthModifier },
    { TreeStrokeWeight: treeStrokeWeight },
    { TreeScale: treeScale },
    { TreePosition: treePosition },

    { PatternFormula: patternFormula },
    { PatternIterations: patternIterations },
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

////
/* //mikka's https://codepen.io/mikkamikka/pen/DrdzVK?editors=0010
      angle = 20;
      axiom = "F";
      rules[0] = {
        a: "F",
        b: "F[+X][++X][+++X][++++X][-X][--F][+++F][--X][---X][----X]",
      };
      rules[1] = {
        a: "F",
        b: "FF",
      };
      // settings
      mod = 0.7;
      iteration = 3;
      scl = 0.3;
      strWeight = 6;
      posX = 180;
      posY = 20;
      */

/*
      //соты
      angle = 60;
      axiom = "C";
      rules[0] = {
        a: "C",
        b: "D",
      };
      rules[1] = {
        a: "D",
        b: "CD",
      };
      // settings
      mod = 0.5;
      iteration = 10;
      scl = 0.15;
      strWeight = 30;
      posX = 180;
      posY = 150;*/
