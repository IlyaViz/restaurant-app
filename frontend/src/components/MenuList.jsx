import Product from "./Product";
import ActionControls from "./ActionControls";

const MenuList = ({ products, getProductControls }) => {
  return (
    <div className="grid grid-cols-3 gap-16">
      {products.map((product) => (
        <div key={product.id} className="flex flex-col gap-2">
          <Product {...product} imageClassName="h-36" />

          <ActionControls controls={getProductControls(product)} />
        </div>
      ))}
    </div>
  );
};

export default MenuList;
