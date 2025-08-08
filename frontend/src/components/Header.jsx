import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import Button from "./Button";

const Header = () => {
  const { username, token, role } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  return (
    <header>
      <nav className="flex gap-4 justify-center m-1 items-center">
        <NavLink to="/">
          <Button label="Home" className="btn-primary" />
        </NavLink>

        {token ? (
          <h1 className="text-2xl">Welcome, {username}</h1>
        ) : (
          <NavLink to="/login">
            <Button label="Login" className="btn-primary" />
          </NavLink>
        )}

        {token ? (
          <Button
            label="Logout"
            className="btn-primary"
            onClick={() => dispatch(logout())}
          />
        ) : (
          <NavLink to="/register">
            <Button label="Register" className="btn-primary" />
          </NavLink>
        )}

        {role && role !== "customer" && (
          <NavLink to="/staff-page">
            <Button label="Job Management" className="btn-primary" />
          </NavLink>
        )}
      </nav>
    </header>
  );
};

export default Header;
