import SearchUser from "./SearchUser";
import UserList from "./UserList";

const OrderParticipants = ({
  possibleParticipants,
  participants,
  onSearchChange,
  getUserControls,
  searchStatus,
  getOrderParticipantControls,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl text-gray-900 font-semibold">
        Search Participants
      </h1>

      <SearchUser
        label="Customer ID"
        onChange={onSearchChange}
        status={searchStatus}
        users={possibleParticipants}
        getUserControls={getUserControls}
      />

      {participants.length !== 0 && (
        <>
          <hr />

          <div>
            <h1 className="text-2xl text-gray-900 font-semibold">
              Order Participants
            </h1>

            <UserList
              users={participants}
              getUserControls={getOrderParticipantControls}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default OrderParticipants;
