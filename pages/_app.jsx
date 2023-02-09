import "../styles/globals.css";
import { TreeContextProvider } from "../context/tree.context";
import { NftMetadataProvider } from "../context/nftMetadata.context";

export default function App({ Component, pageProps }) {
  return (
    <TreeContextProvider {...pageProps}>
      <NftMetadataProvider {...pageProps}>
        <Component {...pageProps} />
      </NftMetadataProvider>
    </TreeContextProvider>
  );
}
