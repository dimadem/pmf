import { createContext, useState } from "react";
//create context
export const TreeContext = createContext();
// create provider and put data
export const TreeContextProvider = ({ children }) => {
  //  tree state
  const [treeState, setTreeState] = useState([
    { axiom: "" },
    { n: 0 },
    { sentence: "" },
    { numIterations: 0 },
    { rule0: "" },
    { rule1: "" },
    { rule2: "" },
    { rule3: "" },
    { angle: 0 },
    { segmentLength: 0 },
    { segmentRadius: 0 },
    { lengthModifier: 0 },
    { radialModifier: 0 },
    { color: [0, 0, 0] },
    { texture: false },
    { trigger: true },
  ]);

  // set tree state
  const setTree = (data) => {
    setTreeState(data);
  };

  return (
    <TreeContext.Provider value={{ tree: treeState, setTree }}>
      {children}
    </TreeContext.Provider>
  );
};
