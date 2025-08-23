import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProductsThunk,
  fetchCategoriesThunk,
  updateProductThunk,
  updateCategoryThunk,
  deleteProductThunk,
  deleteCategoryThunk,
  createProductThunk,
  createCategoryThunk,
} from "./menuManagementThunk";
import CONTROL_TYPE from "../../enums/controlType";
import FIELD_TYPE from "../../enums/fieldType";
import MenuList from "../../components/MenuList";
import Form from "../../components/Form";
import Button from "../../components/Button";

const MenuManagement = () => {
  const [productValues, setProductValues] = useState({});
  const [categoryValues, setCategoryValues] = useState({});
  const [isEditingProduct, setIsEditingProduct] = useState(false);
  const [isEditingCategory, setIsEditingCategory] = useState(false);

  const {
    products,
    categories,
    fetchProductsStatus,
    fetchCategoriesStatus,
    updateProductStatus,
    updateCategoryStatus,
    deleteProductStatus,
    deleteCategoryStatus,
    createProductStatus,
    createCategoryStatus,
  } = useSelector((state) => state.menuManagement);

  const dispatch = useDispatch();

  const productFields = [
    {
      type: FIELD_TYPE.INPUT,
      name: "name",
      inputType: "text",
      value: productValues.name || "",
      label: "Product Name",
      required: true,
    },
    {
      name: "price",
      type: FIELD_TYPE.INPUT,
      inputType: "number",
      value: productValues.price || "",
      label: "Product Price",
      required: true,
    },
    {
      type: FIELD_TYPE.INPUT,
      name: "description",
      inputType: "text",
      value: productValues.description || "",
      label: "Product Description",
    },
    {
      type: FIELD_TYPE.INPUT,
      name: "image",
      inputType: "file",
      label: "Product Image",
    },
    {
      type: FIELD_TYPE.SELECT,
      name: "category",
      options: [{ value: "", label: "Select Category" }].concat(
        categories.map((category) => ({
          value: category.id,
          label: category.name,
        }))
      ),
      selected: productValues.category || "",
    },
  ];

  const categoryFields = [
    {
      type: FIELD_TYPE.INPUT,
      name: "name",
      inputType: "text",
      value: categoryValues.name || "",
      label: "Category Name",
      required: true,
    },
    {
      type: FIELD_TYPE.INPUT,
      name: "description",
      inputType: "text",
      value: categoryValues.description || "",
      label: "Category Description",
    },
  ];

  const getProductControls = (product) => {
    return [
      {
        type: CONTROL_TYPE.BUTTON,
        label: "Edit",
        className: "btn-warning",
        onClick: () => {
          setProductValues(product);
          setIsEditingProduct(true);
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

  const getCategoryControls = (category) => {
    return [
      {
        type: CONTROL_TYPE.BUTTON,
        label: "Edit",
        className: "btn-warning",
        onClick: () => {
          setCategoryValues(category);
          setIsEditingCategory(true);
        },
        status: updateCategoryStatus,
      },
      {
        type: CONTROL_TYPE.BUTTON,
        label: "Delete",
        className: "btn-danger",
        onClick: () => dispatch(deleteCategoryThunk(category.id)),
        status: deleteCategoryStatus,
      },
    ];
  };

  const onProductFormSubmit = async (formData) => {
    if (isEditingProduct) {
      dispatch(
        updateProductThunk({
          productId: productValues.id,
          productFormData: formData,
        })
      );

      setIsEditingProduct(false);
      setProductValues({});
    } else {
      dispatch(createProductThunk(formData));
    }
  };

  const onCategoryFormSubmit = async (data) => {
    if (isEditingCategory) {
      dispatch(
        updateCategoryThunk({
          categoryId: categoryValues.id,
          categoryData: data,
        })
      );

      setIsEditingCategory(false);
      setCategoryValues({});
    } else {
      dispatch(createCategoryThunk(data));
    }
  };

  const onCancelProductButtonClick = () => {
    setIsEditingProduct(false);
    setProductValues({});
  };

  const onCancelCategoryButtonClick = () => {
    setIsEditingCategory(false);
    setCategoryValues({});
  };

  useEffect(() => {
    dispatch(fetchProductsThunk());

    dispatch(fetchCategoriesThunk());
  }, [dispatch]);

  return (
    <div className="flex flex-col gap-16 mt-8">
      <div className="flex flex-col justify-center gap-16 md:flex-row">
        <div className="flex flex-col gap-1">
          <Form
            label="Product"
            fields={productFields}
            onFormSubmit={onProductFormSubmit}
            submitLabel={
              isEditingProduct
                ? `Update product (id ${productValues.id})`
                : "Create"
            }
            submitStatus={
              isEditingProduct ? updateProductStatus : createProductStatus
            }
          />

          {isEditingProduct && (
            <Button
              label="Cancel editing"
              onClick={onCancelProductButtonClick}
              className="btn-secondary"
            />
          )}
        </div>

        <div className="flex flex-col gap-1">
          <Form
            label="Category"
            fields={categoryFields}
            onFormSubmit={onCategoryFormSubmit}
            submitLabel={
              isEditingCategory
                ? `Update category (id ${categoryValues.id})`
                : "Create"
            }
            submitStatus={
              isEditingCategory ? updateCategoryStatus : createCategoryStatus
            }
          />

          {isEditingCategory && (
            <Button
              label="Cancel editing"
              onClick={onCancelCategoryButtonClick}
              className="btn-secondary"
            />
          )}
        </div>
      </div>

      {(fetchProductsStatus.loading || fetchCategoriesStatus.loading) && (
        <div>Loading products and categories...</div>
      )}

      {(fetchProductsStatus.error || fetchCategoriesStatus.error) && (
        <p>Error loading products and categories</p>
      )}

      <MenuList
        products={products}
        categories={categories}
        getProductControls={getProductControls}
        getCategoryControls={getCategoryControls}
      />
    </div>
  );
};

export default MenuManagement;
