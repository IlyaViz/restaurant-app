import debounce from "../utils/debounce";
import { DEBOUNCE_TIMEOUT } from "../constants/time";
import UserList from "./UserList";
import Input from "./Input";

const SearchUser = ({ label, onChange, status, users, getUserControls }) => {
  const debouncedOnChange = debounce(onChange, DEBOUNCE_TIMEOUT);

  return (
    <div>
      <Input label={label} onChange={debouncedOnChange} status={status} />

      <UserList users={users} getUserControls={getUserControls} />
    </div>
  );
};

export default SearchUser;
