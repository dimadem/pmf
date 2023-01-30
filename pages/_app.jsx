import "../styles/globals.css";
import { LSystemContextProvider } from "../context/lsystem.context";

export default function App({ Component, pageProps }) {
  return (
    <LSystemContextProvider {...pageProps}>
      <Component {...pageProps} />
    </LSystemContextProvider>
  );
}
