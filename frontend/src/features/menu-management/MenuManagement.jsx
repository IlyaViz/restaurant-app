import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProductsThunk,
  updateProductThunk,
  deleteProductThunk,
  createProductThunk,
  fetchCategoriesThunk,
} from "./menuManagementThunk";
import CONTROL_TYPE from "../../enums/controlType";
import MenuList from "../../components/MenuList";
import Form from "../../components/Form";
import Button from "../../components/Button";

const MenuManagement = () => {
  const [values, setValues] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const {
    products,
    categories,
    fetchProductsStatus,
    updateProductStatus,
    deleteProductStatus,
    createProductStatus,
  } = useSelector((state) => state.menuManagement);

  const dispatch = useDispatch();

  const fields = [
    {
      name: "name",
      type: "text",
      value: values.name || "",
      label: "Product Name",
      required: true,
    },
    {
      name: "price",
      type: "number",
      value: values.price || "",
      label: "Product Price",
      required: true,
    },
    {
      name: "description",
      type: "text",
      value: values.description || "",
      label: "Product Description",
    },
    {
      name: "image",
      type: "file",
      label: "Product Image",
    },
  ];

  const selectors =
    categories.length > 0
      ? [
          {
            name: "category",
            options: [{ value: "", label: "Select Category" }].concat(
              categories.map((category) => ({
                value: category.id,
                label: category.name,
              }))
            ),
            selected: values.category || "",
          },
        ]
      : [];

  const getProductControls = (product) => {
    return [
      {
        type: CONTROL_TYPE.BUTTON,
        label: "Edit",
        className: "btn-warning",
        onClick: () => {
          setValues(product);
          setIsEditing(true);
        },
        status: updateProductStatus,
      },
      {
        type: CONTROL_TYPE.BUTTON,
        label: "Delete",
        className: "btn-danger",
        onClick: () => dispatch(deleteProductThunk(product.id)),
        status: deleteProductStatus,
      },
    ];
  };

  const onCancelButtonClick = () => {
    setIsEditing(false);

    setValues({});
  };

  const onFormSubmit = async (formData) => {
    if (isEditing) {
      dispatch(
        updateProductThunk({
          productId: values.id,
          productFormData: formData,
        })
      );

      setIsEditing(false);
      setValues({});
    } else {
      dispatch(createProductThunk(formData));
    }
  };

  useEffect(() => {
    dispatch(fetchProductsThunk());
    dispatch(fetchCategoriesThunk());
  }, [dispatch]);

  return (
    <div className="flex flex-col gap-16">
      <div className="flex flex-col items-center">
        <Form
          fields={fields}
          selectors={selectors}
          onFormSubmit={onFormSubmit}
          submitLabel={
            isEditing ? `Update product (id ${values.id})` : "Create"
          }
          submitStatus={isEditing ? updateProductStatus : createProductStatus}
        />

        {isEditing && (
          <Button
            label="Cancel editing"
            onClick={onCancelButtonClick}
            className="btn-secondary"
          />
        )}
      </div>

      {fetchProductsStatus.loading && <div>Loading products...</div>}

      {fetchProductsStatus.error && (
        <div>Error fetching products: {fetchProductsStatus.error}</div>
      )}

      <MenuList products={products} getProductControls={getProductControls} />
    </div>
  );
};

export default MenuManagement;
