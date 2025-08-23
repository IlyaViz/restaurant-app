import ActionControls from "./ActionControls";

const RestaurantList = ({
  restaurants,
  tables,
  getRestaurantControls,
  getTableControls,
}) => {
  const getRestaurantTables = (restaurant) => {
    return tables.filter((table) => table.restaurant === restaurant.id);
  };

  return (
    <div className="flex flex-col gap-8">
      {restaurants.map((restaurant) => (
        <div
          key={restaurant.id}
          className="flex flex-col gap-4 bg-blue-200 rounded-2xl p-4"
        >
          <h1 className="text-2xl font-bold">{restaurant.name}</h1>

          {getRestaurantControls && (
            <ActionControls controls={getRestaurantControls(restaurant)} />
          )}

          <hr />

          <div className="grid md:grid-cols-2 2xl:grid-cols-4 gap-4">
            {getRestaurantTables(restaurant).map((table) => (
              <div key={table.id}>
                <div>{table.number}</div>

                <ActionControls controls={getTableControls(table)} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RestaurantList;
