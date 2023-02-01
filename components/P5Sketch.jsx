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
import dynamic from "next/dynamic";
// Will only import `react-p5` on client-side
const Sketch = dynamic(() => import("react-p5").then((mod) => mod.default), {
  ssr: false,
});

export default function P5Sketch({ props }) {
  // console.log("props", props);
  const [
    { Trigger },
    { BackgroundColor },

    { GlobalIterations },

    { TreeFormula },
    { TreeIterations },
    { TreeTrunkColor },
    { TreeCrownColor },
    { TreeAngle },
    { TreeLength },
    { TreeLengthModifier },
    { TreeStrokeWeight },
    { TreeScale },
    { TreePosition },

    { PatternFormula },
    { PatternIterations },
    { PatternColor },
    { PatternAngle },
    { PatternLength },
    { PatternLengthModifier },
    { PatternStrokeWeight },
    { PatternScale },
    { PatternPosition },
  ] = props;

  const resRect = 350; // размер канваса

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(resRect, resRect).parent(canvasParentRef);
    p5.angleMode(p5.DEGREES);
    p5.noLoop();
    // use parent to render canvas in this ref (without that p5 render this canvas outside your component)
  };

  const draw = (p5) => {
    p5.background(BackgroundColor);

    //! отрисовка паттерна
    const patternTurtle = () => {
      const PatternModifiedLength = PatternLength * PatternLengthModifier; // модификатор на длинну сегмента на каждую итерацию рендера рендер

      p5.resetMatrix();
      // выравнивание обьекта
      p5.translate(resRect - PatternPosition[0], resRect - PatternPosition[1]);
      p5.scale(PatternScale);
      p5.strokeWeight(PatternStrokeWeight);

      
      for (let i = 0; i < PatternFormula.length; i++) {
        let current = PatternFormula.charAt(i);
        if (current === "F") {
          p5.stroke(PatternColor);
          p5.line(0, 0, 0, -PatternModifiedLength);
          p5.translate(0, -PatternModifiedLength);
        }
        if (current === "X") {
          p5.stroke(PatternColor);
          p5.line(0, 0, 0, -PatternModifiedLength);
          p5.translate(0, -PatternModifiedLength);
        }
        if (current === "Y") {
          //random color
          p5.stroke(
            p5.random(0, 250),
            p5.random(0, 250),
            p5.random(0, 250),
            p5.random(100, 200)
          );
          p5.line(0, 0, 0, -PatternModifiedLength);
          p5.translate(0, -PatternModifiedLength);
        }
        if (current === "L") {
          //random color
          p5.stroke(p5.random(0, 250), p5.random(0, 250), p5.random(0, 250));
          p5.line(0, 0, 0, -PatternModifiedLength);
          p5.translate(0, -PatternModifiedLength);
        }
        if (current === "R") {
          //random color
          p5.stroke(p5.random(0, 250), p5.random(0, 250), p5.random(0, 250));
          p5.line(0, 0, 0, -PatternModifiedLength);
          p5.translate(0, -PatternModifiedLength);
        }
        if (current === "A") {
          //random color
          p5.stroke(p5.random(0, 250), p5.random(0, 250), p5.random(0, 250));
          p5.line(0, 0, 0, -PatternModifiedLength);
          p5.translate(0, -PatternModifiedLength);
        }
        if (current === "B") {
          //random color
          p5.stroke(p5.random(0, 250), p5.random(0, 250), p5.random(0, 250));
          p5.line(0, 0, 0, -PatternModifiedLength);
          p5.translate(0, -PatternModifiedLength);
        } 
        if (current === "C") {
          //random color
          p5.stroke(p5.random(0, 250), p5.random(0, 250), p5.random(0, 250));
          p5.line(0, 0, 0, -PatternModifiedLength);
          p5.translate(0, -PatternModifiedLength);
          p5.rotate(PatternAngle);
        }
        if (current === "D") {
          //random color
          p5.stroke(p5.random(0, 250), p5.random(0, 250), p5.random(0, 250));
          p5.line(0, 0, 0, -PatternModifiedLength);
          p5.translate(0, -PatternModifiedLength);
          p5.rotate(-PatternAngle);
        }
        else if (current === "+") {
          p5.rotate(PatternAngle);
        } 
        else if (current === "-") {
          p5.rotate(-PatternAngle);
        } 
        else if (current === "[") {
          p5.push();
        } 
        else if (current === "]") {
          p5.pop();
        }
      }
    };

    patternTurtle();

    //! отриcовка Дерева
    const treeTurtle = () => {
      const TreeModefiedLength = TreeLength * TreeLengthModifier; // модификатор на длинну сегмента на каждую итерацию рендера рендер
      p5.resetMatrix();
      // выравнивание обьекта
      p5.translate(resRect - TreePosition[0], resRect - TreePosition[1]);
      p5.scale(TreeScale);
      p5.strokeWeight(TreeStrokeWeight);

      //рандомный угол
      //TreeAngle = Math.floor((p5.random(0,100)/100 + 1) * TreeAngle);


      for (let i = 0; i < TreeFormula.length; i++) {
        let current = TreeFormula.charAt(i);
        if (current === "F") {
          p5.stroke(TreeTrunkColor); // коричневый
          p5.line(0, 0, 0, -TreeModefiedLength);
          p5.translate(0, -TreeModefiedLength);
        }
        if (current === "X") {
          p5.stroke(TreeCrownColor); // зеленый
          p5.line(0, 0, 0, -TreeModefiedLength);
          p5.translate(0, -TreeModefiedLength);
        }
        if (current === "L") {
          //random color
          p5.stroke("p5.random(0, 250), p5.random(0, 250), p5.random(0, 250)");
          p5.line(0, 0, 0, -TreeModefiedLength);
          p5.translate(0, -TreeModefiedLength);
        }
        if (current === "R") {
          //random color
          p5.stroke(p5.random(0, 250), p5.random(0, 250), p5.random(0, 250));
          p5.line(0, 0, 0, -TreeModefiedLength);
          p5.translate(0, -TreeModefiedLength);
        }
        if (current === "A") {
          //random color
          p5.stroke(p5.random(0, 250), p5.random(0, 250), p5.random(0, 250));
          p5.line(0, 0, 0, -TreeModefiedLength);
          p5.translate(0, -TreeModefiedLength);
        }
        if (current === "B") {
          //random color
          p5.stroke(p5.random(0, 250), p5.random(0, 250), p5.random(0, 250));
          p5.line(0, 0, 0, -TreeModefiedLength);
          p5.translate(0, -TreeModefiedLength);
        } 
         if (current === "+") {
          p5.rotate(TreeAngle);
        } 
        else if (current === "-") {
          p5.rotate(-TreeAngle);
        } 
        else if (current === "[") {
          p5.push();
        } 
        else if (current === "]") {
          p5.pop();
        }
      }
    };
    treeTurtle();
  };

  return <>{props ? <Sketch setup={setup} draw={draw} /> : null} </>;
}
