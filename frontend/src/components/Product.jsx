const Product = ({ name, price, image, imageClassName }) => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-xl font-semibold">${price}</h1>

      {image ? (
        <img src={image} className={`${imageClassName}`} />
      ) : (
        <img
          src="https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg"
          className={`${imageClassName}`}
        />
      )}

      <h1 className="text-lg font-medium">{name}</h1>
    </div>
  );
};

export default Product;
