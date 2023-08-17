"use client";
import Image from "next/image";
import Data from "data.json";
import { Header } from "./header";
import { useState, useEffect } from "react";
import store from "@/store/store";
import * as ActionTypes from "../store/actionTypes";
import { useSelector } from "react-redux";

function Card({ id, name, image, price, category, description }) {
  const [index, setIndex] = useState(-1);

  // store subscribe called when store update
  store.subscribe(() => {
    // console.log(store.getState().commonReducer.addedProductList);
    const findIndex = store
      .getState()
      .commonReducer.addedProductList.findIndex((product) => product.id == id);
    setIndex(findIndex);
  });

  useEffect(() => {
    const findIndex = store
      .getState()
      .commonReducer.addedProductList.findIndex((product) => product.id == id);
    setIndex(findIndex);
  }, []);

  return (
    <div className=" w-[280px] rounded-md relative border-[1px] border-gray-300 mx-auto">
      <Image
        src={image}
        height={100}
        width={100}
        alt={name}
        className="w-full"
      ></Image>
      <h1 className="font-bold mt-4 text-lg">{name}</h1>
      <div className=" text-red-500 font-semibold mt-4 mb-10">{price} Rs.</div>
      <div className="hidden">{description}</div>

      <button
        className={`border-[1px] absolute top-[375px] bg-white left-[75px] border-gray-300 text-red-400 p-3 rounded-lg ${
          index == -1 ? "" : " bg-slate-400 text-black"
        }`}
        disabled={index == -1 ? false : true}
        onClick={() => {
          store.dispatch({
            type: ActionTypes.ADD_TO_CART,
            payload: { id: id },
          });
        }}
      >
        {index == -1 ? "Add To Cart" : "In the cart"}
      </button>
    </div>
  );
}

export default function Home() {
  const products = Data.map((product) => {
    return (
      <Card
        key={product.id}
        id={product.id}
        name={product.name}
        image={product.image}
        price={product.price}
        category={product.category}
        description={product.description}
      />
    );
  });

  // console.log(Data);

  return (
    <div>
      <Header />
      <div className=" text-center">
        <h1 className=" font-bold text-2xl mb-5 mt-5">New Products</h1>
        <div className="gap-10 gap-y-16 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 mx-auto w-5/6">
          {products}
        </div>
        <h1 className="my-[50px] font-semibold">
          Made by{" "}
          <a
            href="https://www.linkedin.com/in/rohit-jain28/"
            className=" underline text-blue-500"
            target="_blank"
          >
            Rohit Jain
          </a>
        </h1>
      </div>
    </div>
  );
}
