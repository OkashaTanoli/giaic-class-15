import { client } from "@/sanity/lib/client";
import AddProduct from "./Addproduct";

interface IData {
  title: string;
  price: number;
  quantity: number
}

export default async function Home() {
  const data: IData[] = await client.fetch(`*[_type == "product"]{title,price,quantity}`, {}, { cache: 'no-store' })
  console.log("data ==>> ", data);

  return (
    <div className="p-5">
      <div className="grid grid-cols-4 gap-5">
        {
          data.map((product, i) => {
            return (
              <div key={i} className="shadow-lg border-2 rounded-lg p-5 !text-white">
                <h1 className="text-xl font-bold">{product.title}</h1>
                <p>Price : {product.price}</p>
                <p>{product.quantity}</p>
              </div>
            )
          })
        }
      </div>
      <AddProduct />
    </div>
  );
}
