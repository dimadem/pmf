import React, { useEffect, useState } from "react";

export default function Connect() {
    const [address, setAddress] = useState("")
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
            setAddress(accounts[0])
        } catch (error) {
            console.log("Error connecting to metamask", error);
        }
    };
    return (<>
        <button onClick={connect}>CONNECT</button>
        <div>{address}</div>
    </>)
}