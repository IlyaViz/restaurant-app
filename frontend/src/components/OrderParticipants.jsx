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
    <div>
      <SearchUser
        label="Search participants"
        onChange={onSearchChange}
        status={searchStatus}
        users={possibleParticipants}
        getUserControls={getUserControls}
      />

      {participants.length !== 0 && (
        <div>
          <h1 className="text-xl">Order Participants</h1>

          <UserList
            users={participants}
            getUserControls={getOrderParticipantControls}
          />
        </div>
      )}
    </div>
  );
};

export default OrderParticipants;
