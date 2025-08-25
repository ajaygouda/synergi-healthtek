
import {ProductDetails} from './productDetails';
const PORT = process.env.NEXT_PUBLIC_STRAPI_API_URL;
const fetchData = async (id) => {
  try {
    const apiData = await fetch(`${PORT}/api/products?filters[id][$eq]=${id}&populate=*`);
    const jsonData = await apiData.json();
    return jsonData.data[0]
  }
  catch (err) {
    console.log(err)
  }
}

const Page = async ({ params }) => {
  const { slug } = params;
  const id = slug.split("_")[1];
  const data = await fetchData(id)

  return (
    <div>
      <ProductDetails product={data} />
    </div>
  )

}
export default Page;