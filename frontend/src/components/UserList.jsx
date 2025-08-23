import ActionControls from "./ActionControls";
import User from "./User";

const UserList = ({ users, getUserControls }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-4 p-2">
      {users.map((user) => (
        <div
          key={user.id}
          className="flex flex-col gap-2 border shadow shadow-black rounded-lg"
        >
          <User name={user.username} role={user.role} />

          <ActionControls controls={getUserControls(user)} />
        </div>
      ))}
    </div>
  );
};

export default UserList;
