import Image from "next/image";
import Data from "data.json";

function Card({ name, image, price, category }) {
  return (
    <div className=" w-[280px] rounded-md relative border-[1px] border-gray-300">
      <Image
        src={image}
        height={100}
        width={100}
        alt={name}
        className="w-full"
      ></Image>
      <h1 className="font-bold mt-4 text-lg">{name}</h1>
      <div className=" text-red-500 font-semibold mt-4 mb-10">{price} Rs.</div>

      <button className="border-[1px] absolute top-[375px] bg-white left-[75px] border-gray-300 text-red-400 p-3 rounded-lg">
        Add To Cart
      </button>
    </div>
  );
}

export default function Home() {
  const products = Data.map((product) => {
    return (
      <Card
        key={product.id}
        name={product.name}
        image={product.image}
        price={product.price}
        category={product.category}
      />
    );
  });

  // console.log(Data);

  return (
    <div>
      <div className=" text-center">
        <h1 className=" font-bold text-2xl mb-5 mt-5">New Products</h1>
        <div className="gap-10 gap-y-16 grid grid-cols-3 mx-auto w-5/6">
          {products}
        </div>
        <h1 className="my-[50px] font-semibold">
          Made by{" "}
          <a
            href="https://www.linkedin.com/in/rohit-jain28/"
            className=" underline text-blue-500"
          >
            Rohit Jain
          </a>
        </h1>
      </div>
    </div>
  );
}
