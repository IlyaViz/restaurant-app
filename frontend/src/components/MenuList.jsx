import Product from "./Product";
import ActionControls from "./ActionControls";

const MenuList = ({
  products,
  categories,
  getProductControls,
  getCategoryControls,
}) => {
  const categoryProducts = (category) => {
    return products.filter((product) => product.category === category.id);
  };

  return (
    <div className="flex flex-col gap-8 bg-blue-100 p-4 rounded">
      <h1 className="text-2xl text-gray-900 font-bold">Menu</h1>

      {categories.map(
        (category) =>
          categoryProducts(category).length > 0 && (
            <div
              key={category.id}
              className="flex flex-col gap-4 bg-blue-200 p-4 rounded-2xl"
            >
              <h1 className="text-2xl text-gray-900 font-bold mb-4">
                {category.name}
              </h1>

              {getCategoryControls && (
                <ActionControls controls={getCategoryControls(category)} />
              )}

              <div className="grid md:grid-cols-2 2xl:grid-cols-4 gap-4">
                {categoryProducts(category).map((product) => (
                  <div key={product.id} className="flex flex-col gap-2">
                    <Product {...product} imageClassName="h-36" />

                    <ActionControls controls={getProductControls(product)} />
                  </div>
                ))}
              </div>
            </div>
          )
      )}

      {products.some((product) => !product.category) && (
        <div className="flex flex-col gap-4 bg-blue-200 p-4 rounded-2xl">
          <h1 className="text-2xl text-gray-900 font-bold mb-4">Other</h1>

          <div className="grid md:grid-cols-2 2xl:grid-cols-4 gap-4">
            {products
              .filter((product) => !product.category)
              .map((product) => (
                <div key={product.id} className="flex flex-col gap-2">
                  <Product {...product} imageClassName="h-36" />

                  <ActionControls controls={getProductControls(product)} />
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuList;
