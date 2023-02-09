import { useEffect } from "react";

const apiPenyata = () => {
    
    useEffect(() => {
        fetch("https://api.pinata.cloud/")
        .then(response=>response.json())
        .then(json=>console.log(json))
    }[])
    
    return ( 

     );
}
 
export default apiPenyata;