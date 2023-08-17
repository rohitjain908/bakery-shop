import store from "@/store/store";
import Image from "next/image";
import { useEffect, useState } from "react";
import Data from "../data";
import Link from "next/link";
export function Header() {
  const [count, setCount] = useState(0);
  const [price, setPrice] = useState(0);
  store.subscribe(() => {
    // console.log("in Header");
    // console.log(store.getState().commonReducer.addedProductList);
    const totalCount = store
      .getState()
      .commonReducer.addedProductList.map((product) => product.count)
      .reduce((result, current) => {
        return result + current;
      }, 0);

    // console.log("count ", totalCount);
    let newPrice = 0;
    store.getState().commonReducer.addedProductList.map((product) => {
      let value = Data.filter((item) => item.id == product.id)[0].price;
      newPrice += value * product.count;
    });
    setPrice(newPrice);
    setCount(totalCount);
  });

  useEffect(() => {
    const totalCount = store
      .getState()
      .commonReducer.addedProductList.map((product) => product.count)
      .reduce((result, current) => {
        return result + current;
      }, 0);

    // console.log("count ", totalCount);
    let newPrice = 0;
    store.getState().commonReducer.addedProductList.map((product) => {
      let value = Data.filter((item) => item.id == product.id)[0].price;
      newPrice += value * product.count;
    });
    setPrice(newPrice);
    setCount(totalCount);
  }, []);
  return (
    <div className="w-full h-16 sm:h-20 bg-[#0029cd] flex sm:justify-center">
      <div className="font-bold mt-5 text-lg sm:text-3xl ml-3 sm:ml-9 text-[#ffffff]">
        Bakery Shop
      </div>
      <div className="flex p-2 bg-green-700 rounded-lg h-12 sm:h-14 mt-2 sm:mt-3 absolute right-5">
        <Image
          src="/images/shopping-cart.png"
          height={30}
          width={30}
          alt="Cart Image"
          //   className=" w-1/2"
        ></Image>
        <button className=" ml-2 text-xs sm:text-sm font-semibold">
          <Link href="/cart">
            {count == 0 ? (
              <div className="text-white">My Cart</div>
            ) : (
              <>
                <div className=" text-white">{count} items</div>
                <div className=" text-white">{price} Rs</div>
              </>
            )}
          </Link>
        </button>
      </div>
    </div>
  );
}
