import { useState, useEffect } from "react";

export default function ConnectMetamask(props) {
  // state for metamask address
  const [address, setAddress] = useState("");

  // update address in context when metamask address changes
  useEffect(() => {
    props.onSetMetamaskAddress(address);
  }, [address]);

  // update TreeContext with address
  const connect = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Metamask not detected");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setAddress(accounts[0]); //!
    } catch (error) {
      console.log("Error connecting to metamask", error);
    }
  };

  return (
    <>
      <button className="p-2 bg-slate-300 rounded-sm" onClick={connect}>
        Connect Metamask
      </button>
      <div className="flex flex-row justify-center p-4">Adress {address}</div>
    </>
  );
}
