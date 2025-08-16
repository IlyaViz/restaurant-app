import ActionControls from "./ActionControls";
import User from "./User";

const UserList = ({ users, getUserControls }) => {
  return (
    <div className="grid grid-cols-4 gap-4">
      {users.map((user) => (
        <div key={user.id} className="flex flex-col gap-2">
          <User name={user.username} role={user.role} />

          <ActionControls controls={getUserControls(user)} />
        </div>
      ))}
    </div>
  );
};

export default UserList;
