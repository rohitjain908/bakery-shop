"use client";
import store from "@/store/store";
import Image from "next/image";
import Data from "data.json";
import { useEffect, useState } from "react";

import * as ActionTypes from "store/actionTypes";
export default function Cart() {
  const [orders, setOrders] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const updateState = () => {
    let toatalBill = 0;
    const cartOrders = store
      .getState()
      .commonReducer.addedProductList.map((product) => {
        const quantity = product.count;
        const orderedProduct = Data.filter((item) => item.id == product.id)[0];
        toatalBill += orderedProduct.price * quantity;
        return (
          <>
            <tr>
              <td>
                <Image
                  src={orderedProduct.image}
                  height={70}
                  width={70}
                  className=" mx-auto justify-center flex"
                  alt={orderedProduct.name}
                ></Image>
              </td>
              <td>{orderedProduct.name}</td>
              <td className="flex justify-center mt-5">
                <button
                  className=" text-white bg-[#6c757d] px-2 mr-2 rounded-md text-base"
                  onClick={() => {
                    store.dispatch({
                      type: ActionTypes.ADD_TO_CART,
                      payload: { id: orderedProduct.id },
                    });
                  }}
                >
                  +
                </button>
                <div className="">{quantity}</div>{" "}
                <button
                  className=" text-white bg-[#17a2b8] px-2 ml-2 rounded-md text-base"
                  onClick={() => {
                    store.dispatch({
                      type: ActionTypes.REMOVE_FROM_CART,
                      payload: { id: orderedProduct.id },
                    });
                  }}
                >
                  -
                </button>
              </td>
              <td>{orderedProduct.price * quantity}</td>
            </tr>
          </>
        );
      });

    setOrders(cartOrders);
    setTotalAmount(toatalBill);
  };

  store.subscribe(() => {
    updateState();
  });

  useEffect(() => {
    updateState();
  }, []);

  return (
    <div className="">
      <div className=" bg-slate-200 px-10 py-3 text-center rounded-lg mx-auto w-1/2 mt-5">
        My Cart
      </div>

      <table className="w-1/2 styled-table mx-auto mt-7 ">
        <thead>
          <tr>
            <td>Image</td>
            <td>Name</td>
            <td>Quantity</td>
            <td>Price</td>
          </tr>
        </thead>
        <tbody>{orders}</tbody>
      </table>

      {totalAmount > 0 ? (
        <div className=" w-full sm:w-1/2 mx-auto flex mt-5 relative">
          <button
            className=" bg-red-500 hover:text-black text-white rounded-lg p-3 ml-2 sm:ml-0 text-sm md:text-base"
            onClick={() => {
              store.dispatch({
                type: ActionTypes.CLEAR_CART,
                payload: {},
              });
            }}
          >
            Clear Cart
          </button>
          <button
            className=" bg-green-700 p-3 rounded-lg absolute right-2 text-white hover:text-black text-sm md:text-base"
            onClick={() => {
              alert("Your Order Placed Succesfully");
              window.location.href = "/";
            }}
          >
            Pay {totalAmount} Rs.
          </button>
        </div>
      ) : (
        <div className="w-1/2 mx-auto text-center mt-5 text-lg font-semibold">
          Your Cart is Empty
        </div>
      )}
    </div>
  );
}
