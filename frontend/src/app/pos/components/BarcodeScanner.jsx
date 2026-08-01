"use client";


import { useState } from "react";


export default function BarcodeScanner({

addToCart

}){


const [barcode,setBarcode]=useState("");



const scanProduct=()=>{


const product={

id:Date.now(),

name:`Barcode Product ${barcode}`,

price:500,

stock:5

};


addToCart(product);


setBarcode("");

}



return(

<div className="flex gap-3 mb-4">


<input

value={barcode}

onChange={(e)=>setBarcode(e.target.value)}

placeholder="Scan Barcode"

className="border p-3 rounded flex-1"

/>


<button

onClick={scanProduct}

className="bg-gray-800 text-white px-5 rounded"

>

Scan

</button>


</div>

)


}