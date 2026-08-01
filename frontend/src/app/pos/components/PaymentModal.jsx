"use client";


export default function PaymentModal({

total,

close

}){


return(

<div className="fixed inset-0 bg-black/40 flex items-center justify-center">


<div className="bg-white p-6 rounded w-96">


<h2 className="text-2xl font-bold">

Payment

</h2>


<p className="my-4">

Amount : ₹{total}

</p>



<select className="border p-2 w-full">

<option>
Cash
</option>

<option>
Card
</option>

<option>
UPI
</option>

</select>



<button

className="bg-green-600 text-white p-3 w-full mt-4 rounded"

>

Complete Payment

</button>



<button

onClick={close}

className="mt-3 w-full"

>

Cancel

</button>



</div>


</div>

)

}