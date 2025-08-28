export const dynamic = "force-dynamic";
import { ProductsClient } from './productsClient';
const PORT = process.env.STRAPI_API_URL;

const fetchData = async () => {
  try {
    let [apiProductsPage, apiProducts, apiCategories] = await Promise.all([
      fetch(`${PORT}/api/products-page?populate=*`, { cache: "no-store" }),
      fetch(`${PORT}/api/products?populate=*`, { cache: "no-store" }),
      fetch(`${PORT}/api/categories?populate=*`, { cache: "no-store" }),
    ]);

    let [productsPage, products, categories] = await Promise.all([
      apiProductsPage.json(),
      apiProducts.json(),
      apiCategories.json(),
    ]);

    return [productsPage.data, products.data, categories.data];
  } catch (err) {
    console.log(err);
  }
};

export const Products = async () => {
    const [productsPage, products, categories] = await fetchData();
    return (
        <div>
            <div className="bg-gray-100 dark:bg-gray-700">
                <div className="container-1256 py-10 px-4 md:px-0">
                    <div className="w-full md:w-[80%]">
                        <h5 className="uppercase tracking-widest text-[16px] font-medium mb-4">{productsPage?.pageName}</h5>
                        <h1 className="font-goodTime leading-[36px] text-[28px] md:leading-[72px] md:text-[56px] mb-2">{productsPage?.title}</h1>
                        <p className="text-gray-500 dark:text-gray-200">{productsPage?.subTitle}</p>
                    </div>
                </div>
            </div>
            <ProductsClient products={products} categories={categories} />
        </div>
    )
}
export default Products;