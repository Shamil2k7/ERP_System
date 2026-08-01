"use client";


export default function ProductGrid({

products,

addToCart

}){


return(

<div className="grid grid-cols-3 gap-4">


{
products.map(product=>(


<div

key={product.id}

className="border rounded p-4 shadow"

>


<h3 className="font-bold">

{product.name}

</h3>


<p>

₹{product.price}

</p>


<p>

Stock : {product.stock}

</p>



<button

onClick={()=>addToCart(product)}

className="bg-blue-600 text-white px-4 py-2 mt-3 rounded"

>

Add

</button>


</div>


))

}


</div>


)

}