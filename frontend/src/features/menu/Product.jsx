const Product = ({ name, price, image }) => {
  return (
    <div className="flex flex-col items-center bg-blue-50 border rounded-2xl">
      <p>${price}</p>
      <img src={image} alt={name} className="w-64" />
      <h3>{name}</h3>
    </div>
  );
};

export default Product;
