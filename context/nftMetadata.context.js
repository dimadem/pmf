import { createContext, useState } from "react";
//create context
export const NftMetadataContext = createContext();
// create provider and put data
export const NftMetadataProvider = ({ children }) => {
  //  tree state
  const [nftMetadataState, setnftMetadataState] = useState([
    { NameCollection: "" },
    { TokenId: 0 },
    { BackgroundColor: "" },
    { TreeFormula: "" },
    { TreeIterations: 0 },
    { TreeTrunkColor: "" },
    { TreeCrownColor: "" },
    { PatternFormula: "" },
    { PatternIterations: "" },
    { PatternColor: "" },
  ]);

  const setNft = (data) => {
    setnftMetadataState(data);
  };

  return (
    <NftMetadataContext.Provider value={{ nft: nftMetadataState, setNft }}>
      {children}
    </NftMetadataContext.Provider>
  );
};
