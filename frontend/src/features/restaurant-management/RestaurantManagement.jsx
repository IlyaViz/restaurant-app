import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchRestaurantsThunk,
  fetchTablesThunk,
  updateRestaurantThunk,
  updateTableThunk,
  deleteRestaurantThunk,
  deleteTableThunk,
  createRestaurantThunk,
  createTableThunk,
} from "./restaurantManagementThunk";
import CONTROL_TYPE from "../../enums/controlType";
import RestaurantList from "../../components/RestaurantList";
import Form from "../../components/Form";
import Button from "../../components/Button";

const RestaurantManagement = () => {
  const [restaurantValues, setRestaurantValues] = useState({});
  const [tableValues, setTableValues] = useState({});
  const [isEditingRestaurant, setIsEditingRestaurant] = useState(false);
  const [isEditingTable, setIsEditingTable] = useState(false);

  const {
    restaurants,
    tables,
    fetchRestaurantsStatus,
    fetchTablesStatus,
    updateRestaurantStatus,
    updateTableStatus,
    deleteRestaurantStatus,
    deleteTableStatus,
    createRestaurantStatus,
    createTableStatus,
  } = useSelector((state) => state.restaurantManagement);

  const dispatch = useDispatch();

  const restaurantFields = [
    {
      name: "name",
      type: "text",
      label: "Restaurant Name",
      value: restaurantValues.name || "",
      required: true,
    },
    {
      name: "location",
      type: "text",
      label: "Location",
      value: restaurantValues.location || "",
      required: true,
    },
    {
      name: "contact number",
      type: "text",
      label: "Contact Number",
      value: restaurantValues.contactNumber || "",
      required: true,
    },
    {
      name: "workday_open_hour",
      type: "time",
      label: "Workday Open Hour",
      value: restaurantValues.workdayOpenHour || "",
      required: false,
    },
    {
      name: "workday_close_hour",
      type: "time",
      label: "Workday Close Hour",
      value: restaurantValues.workdayCloseHour || "",
      required: false,
    },
    {
      name: "weekend_open_hour",
      type: "time",
      label: "Weekend Open Hour",
      value: restaurantValues.weekendOpenHour || "",
      required: false,
    },
    {
      name: "weekend_close_hour",
      type: "time",
      label: "Weekend Close Hour",
      value: restaurantValues.weekendCloseHour || "",
      required: false,
    },
  ];

  const tableFields = [
    {
      name: "number",
      type: "number",
      label: "Table Number",
      value: tableValues.number || "",
      required: true,
    },
  ];

  const tableSelectors = [
    {
      name: "restaurant",
      label: "Restaurant",
      options: [{ value: "", label: "Select a restaurant" }].concat(
        restaurants.map((restaurant) => ({
          value: restaurant.id,
          label: restaurant.name,
        }))
      ),
      required: true,
      selected: tableValues.restaurant || "",
    },
  ];

  const getRestaurantControls = (restaurant) => {
    return [
      {
        type: CONTROL_TYPE.BUTTON,
        label: "Edit Restaurant",
        onClick: () => {
          setRestaurantValues(restaurant);
          setIsEditingRestaurant(true);
        },
        className: "btn-warning",
        status: updateRestaurantStatus,
      },
      {
        type: CONTROL_TYPE.BUTTON,
        label: "Delete Restaurant",
        onClick: () => dispatch(deleteRestaurantThunk(restaurant.id)),
        className: "btn-danger",
        status: deleteRestaurantStatus,
      },
    ];
  };

  const getTableControls = (table) => {
    return [
      {
        type: CONTROL_TYPE.BUTTON,
        label: "Edit Table",
        onClick: () => {
          setTableValues(table);
          setIsEditingTable(true);
        },
        className: "btn-warning",
        status: updateTableStatus,
      },
      {
        type: CONTROL_TYPE.BUTTON,
        label: "Delete Table",
        onClick: () => dispatch(deleteTableThunk(table.id)),
        className: "btn-danger",
        status: deleteTableStatus,
      },
    ];
  };

  const onRestaurantFormSubmit = (data) => {
    const resultData = { ...data };

    [
      "workday_open_hour",
      "workday_close_hour",
      "weekend_open_hour",
      "weekend_close_hour",
    ].forEach((field) => {
      if (resultData[field] === "") {
        resultData[field] = null;
      }
    });

    if (isEditingRestaurant) {
      dispatch(
        updateRestaurantThunk({
          restaurantId: restaurantValues.id,
          restaurantData: resultData,
        })
      );

      setIsEditingRestaurant(false);
      setRestaurantValues({});
    } else {
      dispatch(createRestaurantThunk(resultData));
    }
  };

  const onTableFormSubmit = (data) => {
    if (isEditingTable) {
      dispatch(
        updateTableThunk({
          tableId: tableValues.id,
          tableData: data,
        })
      );

      setIsEditingTable(false);
      setTableValues({});
    } else {
      dispatch(createTableThunk(data));
    }
  };

  const onCancelRestaurantButtonClick = () => {
    setIsEditingRestaurant(false);
    setRestaurantValues({});
  };

  const onCancelTableButtonClick = () => {
    setIsEditingTable(false);
    setTableValues({});
  };

  useEffect(() => {
    dispatch(fetchRestaurantsThunk());
    dispatch(fetchTablesThunk());
  }, [dispatch]);

  return (
    <div className="flex flex-col gap-8 mt-4">
      <div className="flex gap-16 justify-center">
        <div>
          <Form
            fields={restaurantFields}
            onFormSubmit={onRestaurantFormSubmit}
            submitLabel={
              isEditingRestaurant
                ? `Update Restaurant (id ${restaurantValues.id})`
                : "Create Restaurant"
            }
            submitStatus={
              isEditingRestaurant
                ? updateRestaurantStatus
                : createRestaurantStatus
            }
          />

          {isEditingRestaurant && (
            <Button
              label="Cancel Editing"
              onClick={onCancelRestaurantButtonClick}
              className="btn-secondary"
            />
          )}
        </div>

        <div>
          <Form
            fields={tableFields}
            selectors={tableSelectors}
            onFormSubmit={onTableFormSubmit}
            submitLabel={
              isEditingTable
                ? `Update Table (id ${tableValues.id})`
                : "Create Table"
            }
            submitStatus={
              isEditingTable ? updateTableStatus : createTableStatus
            }
          />

          {isEditingTable && (
            <Button
              label="Cancel Editing"
              onClick={onCancelTableButtonClick}
              className="btn-secondary"
            />
          )}
        </div>
      </div>

      {(fetchRestaurantsStatus.loading || fetchTablesStatus.loading) && (
        <p>Loading restaurants and tables...</p>
      )}

      {(fetchRestaurantsStatus.error || fetchTablesStatus.error) && (
        <p>Error loading restaurants and tables</p>
      )}

      <RestaurantList
        restaurants={restaurants}
        tables={tables}
        getRestaurantControls={getRestaurantControls}
        getTableControls={getTableControls}
      />
    </div>
  );
};

export default RestaurantManagement;
