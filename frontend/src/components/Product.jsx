const Product = ({ name, price, image, imageClassName }) => {
  return (
    <div className="flex flex-col items-center bg-blue-50 border rounded-2xl">
      <p>${price}</p>

      {image ? (
        <img src={image} className={`${imageClassName}`} />
      ) : (
        <img
          src="https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg"
          className={`${imageClassName}`}
        />
      )}

      <h3>{name}</h3>
    </div>
  );
};

export default Product;
