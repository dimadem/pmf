// MIT License

// Copyright (c) 2023 Dima Dem, Maria Kudryashova

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

import React, { Component } from "react";
import Sketch from "react-p5";

//TODO
//1 Сделать, чтобы масштаб можно было или задавать, или центрировать, чтобы не слетала картинка в облака
//2 Сделать разные цвета на разных итерациях
//3 Добавить разбор кошелька в алгоритм

//4 Придумать соответствие char кошелька к правилу (какие char на какую отрисовку - ветки, листья, разветвления)
//5 Разбить итерация ==> char и так свое разбиение на уровень
//6 Углы по char выбор соответствия
//7 рандомайз по углу в секторе

// 64 цифры в кошельке
// 1 цвет фона
// 1 толщина линии
// набор символов для правил генеративного паттерна фона
// набор символо для правил генеративного дерева

// settings default
// let angle = 0; //(60 * Math.PI) / 180; // угол
// let axiom = ""; // аксиома
// let sentence = ""; // первая точка построения
// let mod = 0.03; //модификатор масштаба
// let len = 100; // длинна сегмента
// let iteration = 3; // итерации
// let strWeight = 1; // толщина линии
// let scl = 1; // масштаб
// let rules = []; // массив правил
let resRect = 350; // размер Canvas
// let posX = 0; // позиция по X
// let posY = 0; // позиция по Y
// let bgColor; // цвет фона
// // let strColor; // цвет линии

// // правила по умолчанию
// rules[0] = {
//   a: "",
//   b: "",
// };

// //снежинка
// angle = 60;
// axiom = "F++F++F";
// rules[0] = {
//   a: "F",
//   b: "F-F++F-F",
// };
// // settings
// mod = 0.01;
// iteration = 1;
// strWeight = 1;
// scl = 10;
// posX = 200;
// posY = 80;
// bgColor = "#8BC78B";

// //Серпинский
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
// // settings
// mod = 0.02;
// iteration = 10;
// strWeight = 1;
// scl = 0.8;
// posX = 350;
// posY = -40;
// bgColor = "#8BC78B";

//дракон
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
// //settings
// mod = 0.1;
// iteration = 12;
// scl = 1;
// posX = 260;
// posY = 100;
// strWeight = 2;
// bgColor = "#8BC78B";

// //побеги
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
// // settings
// mod = 0.08;
// iteration = 6;
// scl = 4;
// strWeight = 2;
// posX = 180;
// posY = 20;
// bgColor = "#8BC78B";

export default class P5Sketch extends Component {
  setup = (p5, canvasParentRef) => {
    p5.createCanvas(resRect, resRect).parent(canvasParentRef);
    p5.angleMode(p5.DEGREES);
    // p5.background(200);
    p5.noLoop();
    // use parent to render canvas in this ref (without that p5 render this canvas outside your component)
  };

  draw = (p5) => {
    // отриовка
    const turtle = () => {
      len *= mod; // модификатор на длинну сегмента на каждую итерацию рендера рендер

      p5.background(bgColor);
      p5.resetMatrix();
      // выравнивание обьекта
      p5.translate(resRect - posX, resRect - posY);
      p5.scale(scl);
      p5.strokeWeight(strWeight);
      for (let i = 0; i < sentence.length; i++) {
        let current = sentence.charAt(i);
        if (current === "F") {
          p5.stroke("brown"); // коричневый
          p5.line(0, 0, 0, -len);
          p5.translate(0, -len);
        }
        if (current === "X") {
          p5.stroke("green"); // зеленый
          p5.line(0, 0, 0, -len);
          p5.translate(0, -len);
        }
        if (current === "L") {
          //random color
          p5.stroke("p5.random(0, 250), p5.random(0, 250), p5.random(0, 250)");
          p5.line(0, 0, 0, -len);
          p5.translate(0, -len);
        }
        if (current === "R") {
          //random color
          p5.stroke(p5.random(0, 250), p5.random(0, 250), p5.random(0, 250));
          p5.line(0, 0, 0, -len);
          p5.translate(0, -len);
        }
        if (current === "A") {
          //random color
          p5.stroke(p5.random(0, 250), p5.random(0, 250), p5.random(0, 250));
          p5.line(0, 0, 0, -len);
          p5.translate(0, -len);
        }
        if (current === "B") {
          //random color
          p5.stroke(p5.random(0, 250), p5.random(0, 250), p5.random(0, 250));
          p5.line(0, 0, 0, -len);
          p5.translate(0, -len);
        } else if (current === "+") {
          p5.rotate(angle);
        } else if (current === "-") {
          p5.rotate(-angle);
        } else if (current === "[") {
          p5.push();
        } else if (current === "]") {
          p5.pop();
        }
      }
    };

    // // generate sentence for tree
    // const generate = () => {
    //   let temp = axiom; //что перебираем
    //   let temp_sent = ""; //темп формулы дерева

    //   for (let k = 0; k < iteration; k++) {
    //     temp_sent = "";
    //     // подобрать правило
    //     for (let i = 0; i < temp.length; i++) {
    //       let ch = temp.charAt(i);
    //       var checked = false;
    //       // если ни одно из правил не подошло
    //       for (let j = 0; j < rules.length; j++) {
    //         if (ch === rules[j].a) {
    //           temp_sent += rules[j].b;
    //           checked = true;
    //           break;
    //         }
    //       }
    //       // переносим символ из аксиомы
    //       if (checked === false) {
    //         temp_sent += ch;
    //       }
    //     }
    //     //перекладываем
    //     temp = temp_sent;
    //   }
    //   //готовая формула дерева
    //   sentence = temp;

    //   turtle();
    // };
    // generate();
  };

  render() {
    return <Sketch setup={this.setup} draw={this.draw} />;
  }
}
