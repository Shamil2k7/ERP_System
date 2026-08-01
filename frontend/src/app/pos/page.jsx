"use client";

import { useState } from "react";

import ProductSearch from "./components/ProductSearch";
import ProductGrid from "./components/ProductGrid";
import Cart from "./components/Cart";
import PaymentModal from "./components/PaymentModal";
import BarcodeScanner from "./components/BarcodeScanner";


export default function POSPage() {

  const [cart, setCart] = useState([]);
  const [showPayment, setShowPayment] = useState(false);


  const products = [
    {
      id: 1,
      name: "Nivia Football",
      price: 1200,
      stock: 20,
      category: "Sports"
    },
    {
      id: 2,
      name: "Nike Shoes",
      price: 3500,
      stock: 15,
      category: "Footwear"
    },
    {
      id: 3,
      name: "Adidas Jersey",
      price: 1800,
      stock: 10,
      category: "Sports"
    }
  ];


  const addToCart = (product) => {

    const exist = cart.find(
      item => item.id === product.id
    );


    if(exist){

      setCart(
        cart.map(item =>
          item.id === product.id
          ?
          {
            ...item,
            quantity:item.quantity + 1
          }
          :
          item
        )
      );

    }
    else{

      setCart([
        ...cart,
        {
          ...product,
          quantity:1
        }
      ]);

    }

  };


  const removeItem = (id)=>{

    setCart(
      cart.filter(
        item=>item.id !== id
      )
    );

  };


  const updateQuantity=(id,type)=>{


    setCart(

      cart.map(item=>{

        if(item.id===id){

          return{

            ...item,

            quantity:
            type==="increase"
            ?
            item.quantity+1
            :
            item.quantity-1

          }

        }

        return item;

      })
      .filter(item=>item.quantity>0)

    );

  }



  const total = cart.reduce(

    (sum,item)=>

    sum + item.price * item.quantity,

    0

  );



  return (

    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        POS Billing System
      </h1>


      <div className="grid grid-cols-12 gap-5">


        {/* Left Side */}

        <div className="col-span-8">


          <BarcodeScanner
            addToCart={addToCart}
          />


          <ProductSearch/>


          <ProductGrid

            products={products}

            addToCart={addToCart}

          />


        </div>




        {/* Right Side */}

        <div className="col-span-4">


          <Cart

            cart={cart}

            removeItem={removeItem}

            updateQuantity={updateQuantity}

          />


          <div className="mt-5 p-4 border rounded">


            <h2 className="text-xl font-bold">

              Total : ₹{total}

            </h2>



            <button

              onClick={()=>setShowPayment(true)}

              className="bg-black text-white w-full mt-4 p-3 rounded"

            >

              Checkout

            </button>


          </div>



        </div>


      </div>




      {
        showPayment &&

        <PaymentModal

          total={total}

          close={()=>setShowPayment(false)}

        />

      }


    </div>

  );

}