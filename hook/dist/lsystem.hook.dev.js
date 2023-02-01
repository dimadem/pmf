"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = useLsystem;

var _react = require("react");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function useLsystem(metamaskAddress) {
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
  var _useState = (0, _react.useState)(true),
      _useState2 = _slicedToArray(_useState, 2),
      trigger = _useState2[0],
      setTrigger = _useState2[1]; ///////////////////////////
  //! цвет фона квадрата


  var _useState3 = (0, _react.useState)("#8BC78B"),
      _useState4 = _slicedToArray(_useState3, 2),
      backgroundColor = _useState4[0],
      setBackgroundColor = _useState4[1]; // ! общее количество итераций


  var _useState5 = (0, _react.useState)(0),
      _useState6 = _slicedToArray(_useState5, 2),
      globalIterations = _useState6[0],
      setGlobalIterations = _useState6[1]; ///////////////////////////
  //! правила, задающие формулу дерева
  //axiom - аксиома, то есть начальное состояние дерева


  var _useState7 = (0, _react.useState)("XFFF"),
      _useState8 = _slicedToArray(_useState7, 2),
      treeAxiom = _useState8[0],
      setTreeAxiom = _useState8[1];

  var _useState9 = (0, _react.useState)([{
    a: "F",
    //F == FF
    b: "FF"
  }, {
    a: "X",
    b: "F[+X]F[-X]+X" //"F[+X][++F]F[--F][---F][-X]+X",

  }, {
    a: "b",
    b: "F[+X][++F]F[--F][---F][-X]+X",
    c: 'white'
  }]),
      _useState10 = _slicedToArray(_useState9, 2),
      treeRules = _useState10[0],
      setTreeRules = _useState10[1];

  var _useState11 = (0, _react.useState)(""),
      _useState12 = _slicedToArray(_useState11, 2),
      treeFormula = _useState12[0],
      setTreeFormula = _useState12[1]; // количество итераций в дереве


  var _useState13 = (0, _react.useState)(1),
      _useState14 = _slicedToArray(_useState13, 2),
      treeIterations = _useState14[0],
      setTreeIterations = _useState14[1]; // цвет ствола дерева


  var _useState15 = (0, _react.useState)([100, 85, 75]),
      _useState16 = _slicedToArray(_useState15, 2),
      treeTrunkColor = _useState16[0],
      setTreeTrunkColor = _useState16[1]; // цвет кроны дерева


  var _useState17 = (0, _react.useState)([40, 139, 34]),
      _useState18 = _slicedToArray(_useState17, 2),
      treeCrownColor = _useState18[0],
      setTreeCrownColor = _useState18[1]; //угол наклона


  var _useState19 = (0, _react.useState)(20),
      _useState20 = _slicedToArray(_useState19, 2),
      treeAngle = _useState20[0],
      setTreeAngle = _useState20[1]; // длина сегмента


  var _useState21 = (0, _react.useState)(20),
      _useState22 = _slicedToArray(_useState21, 2),
      treeLength = _useState22[0],
      setTreeLength = _useState22[1]; // Толщина ствола при рисовании будет уменьшаться в длине


  var _useState23 = (0, _react.useState)(0.08),
      _useState24 = _slicedToArray(_useState23, 2),
      treeLengthModifier = _useState24[0],
      setTreeLengthModifier = _useState24[1]; // толщина линии


  var _useState25 = (0, _react.useState)(0.2),
      _useState26 = _slicedToArray(_useState25, 2),
      treeStrokeWeight = _useState26[0],
      setTreeStrokeWeight = _useState26[1]; // масштаб дерева


  var _useState27 = (0, _react.useState)(25),
      _useState28 = _slicedToArray(_useState27, 2),
      treeScale = _useState28[0],
      setTreeScale = _useState28[1]; // позиционирование на экране


  var _useState29 = (0, _react.useState)([180, 20]),
      _useState30 = _slicedToArray(_useState29, 2),
      treePosition = _useState30[0],
      setTreePosition = _useState30[1]; ///////////////////////////
  //!правила, задающие формулу паттерна


  var _useState31 = (0, _react.useState)("C"),
      _useState32 = _slicedToArray(_useState31, 2),
      patternAxiom = _useState32[0],
      setPatternAxiom = _useState32[1];

  var _useState33 = (0, _react.useState)([{
    a: "C",
    b: "D"
  }, {
    a: "D",
    b: "CD"
  }]),
      _useState34 = _slicedToArray(_useState33, 2),
      patternRules = _useState34[0],
      setPatternRules = _useState34[1];

  var _useState35 = (0, _react.useState)(""),
      _useState36 = _slicedToArray(_useState35, 2),
      patternFormula = _useState36[0],
      setPatternFormula = _useState36[1]; // количество итераций в паттерне


  var _useState37 = (0, _react.useState)(17),
      _useState38 = _slicedToArray(_useState37, 2),
      patternIterations = _useState38[0],
      setPatternIterations = _useState38[1]; // цвет паттерна фона


  var _useState39 = (0, _react.useState)([250, 0, 0, 100]),
      _useState40 = _slicedToArray(_useState39, 2),
      patternColor = _useState40[0],
      setPatternColor = _useState40[1]; // угол паттерна


  var _useState41 = (0, _react.useState)(60),
      _useState42 = _slicedToArray(_useState41, 2),
      patternAngle = _useState42[0],
      setPatternAngle = _useState42[1]; // длина сегмента


  var _useState43 = (0, _react.useState)(200),
      _useState44 = _slicedToArray(_useState43, 2),
      patternLength = _useState44[0],
      setPatternLength = _useState44[1]; // Толщина ствола при рисовании будет уменьшаться в длинне


  var _useState45 = (0, _react.useState)(0.01),
      _useState46 = _slicedToArray(_useState45, 2),
      patternLengthModifier = _useState46[0],
      setPatternLengthModifier = _useState46[1]; // толщина линии


  var _useState47 = (0, _react.useState)(0.5),
      _useState48 = _slicedToArray(_useState47, 2),
      patternStrokeWeight = _useState48[0],
      setPatternStrokeWeight = _useState48[1]; // масштаб паттерна


  var _useState49 = (0, _react.useState)(20),
      _useState50 = _slicedToArray(_useState49, 2),
      patternScale = _useState50[0],
      setPatternScale = _useState50[1]; // позиционирование на экране


  var _useState51 = (0, _react.useState)([200, 260]),
      _useState52 = _slicedToArray(_useState51, 2),
      patternPosition = _useState52[0],
      setPatternPosition = _useState52[1]; //при изменении кошелька, меняем аксиому -> формулы дерева и паттерна
  //7893d 0bcfD 93A44 28443326c083ff23F935Df001
  //! апдейт настроек после итераций


  (0, _react.useEffect)(function () {
    // апдейт итерации дерева
    setTreeIterations(treeIterations + globalIterations); // апдейт итерации паттерна

    setPatternIterations(patternIterations + globalIterations); // апдейт масштаба дерева

    setTreeScale(treeScale - globalIterations); // апдейт масштаба паттерна

    setPatternScale(patternScale - globalIterations);
  }, [globalIterations]); //! задаем аксиому проекта

  (0, _react.useEffect)(function () {
    setTreeAxiom("X"); // меняем на Metamask Address или что то еще

    setPatternAxiom("C"); // меняем на Metamask Address или что то еще
  }, [metamaskAddress]); //! генерируем формулу ДЕРЕВА

  (0, _react.useEffect)(function () {
    var temp = treeAxiom; //что перебираем

    var temp_sent = ""; //темп формулы дерева

    for (var k = 0; k < treeIterations; k++) {
      temp_sent = ""; // обнуляем переменную сегмента
      // подобрать правило

      for (var i = 0; i < temp.length; i++) {
        var ch = temp.charAt(i);
        var checked = false; // если ни одно из правил не подошло

        for (var j = 0; j < treeRules.length; j++) {
          if (ch === treeRules[j].a) {
            temp_sent += treeRules[j].b;
            checked = true;
            break;
          }
        } // переносим символ из аксиомы


        if (checked === false) {
          temp_sent += ch;
        }
      } //перекладываем


      temp = temp_sent;
    } //готовая формула дерева


    setTreeFormula(temp);
    setTrigger(true);
  }, [treeAxiom]); ///////////////////////////
  //! генерируем формулу ПАТТЕРНА

  (0, _react.useEffect)(function () {
    var temp = patternAxiom; //что перебираем

    var temp_sent = ""; //темп формулы дерева

    for (var k = 0; k < patternIterations; k++) {
      temp_sent = ""; // обнуляем переменную сегмента
      // подобрать правило

      for (var i = 0; i < temp.length; i++) {
        var ch = temp.charAt(i);
        var checked = false; // если ни одно из правил не подошло

        for (var j = 0; j < patternRules.length; j++) {
          if (ch === patternRules[j].a) {
            temp_sent += patternRules[j].b;
            checked = true;
            break;
          }
        } // переносим символ из аксиомы


        if (checked === false) {
          temp_sent += ch;
        }
      } //перекладываем


      temp = temp_sent;
    } //готовая формула паттерна


    console.log("pattern", temp);
    setPatternFormula(temp);
    setTrigger(true);
  }, [patternAxiom]);
  return [{
    Trigger: trigger
  }, {
    BackgroundColor: backgroundColor
  }, {
    GlobalIterations: globalIterations
  }, {
    TreeFormula: treeFormula
  }, {
    TreeIterations: treeIterations
  }, {
    TreeTrunkColor: treeTrunkColor
  }, {
    TreeCrownColor: treeCrownColor
  }, {
    TreeAngle: treeAngle
  }, {
    TreeLength: treeLength
  }, {
    TreeLengthModifier: treeLengthModifier
  }, {
    TreeStrokeWeight: treeStrokeWeight
  }, {
    TreeScale: treeScale
  }, {
    TreePosition: treePosition
  }, {
    PatternFormula: patternFormula
  }, {
    PatternIterations: patternIterations
  }, {
    PatternColor: patternColor
  }, {
    PatternAngle: patternAngle
  }, {
    PatternLength: patternLength
  }, {
    PatternLengthModifier: patternLengthModifier
  }, {
    PatternStrokeWeight: patternStrokeWeight
  }, {
    PatternScale: patternScale
  }, {
    PatternPosition: patternPosition
  }];
} ///////////////////////////////////////////
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