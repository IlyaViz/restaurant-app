import { DEBOUNCE_TIMEOUT } from "../constants/time";
import debounce from "../utils/debounce";
import UserList from "./UserList";
import Input from "./Input";

const SearchUser = ({ label, onChange, status, users, getUserControls }) => {
  const debouncedOnChange = debounce(onChange, DEBOUNCE_TIMEOUT);

  return (
    <div className="flex flex-col gap-8">
      <Input label={label} onChange={debouncedOnChange} status={status} />

      {users.length === 0 && <p>No users found</p>}

      <UserList users={users} getUserControls={getUserControls} />
    </div>
  );
};

export default SearchUser;
