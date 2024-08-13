import { NavLink } from "react-router-dom";

function NavBarItem({ to, onClick, disabled, children }) {
  const commonStyle = `w-full h-full flex justify-center items-center
	hover:border-2 hover:border-white
	active:border-2 active:border-neutral-400`;

  const commonTextStyle = `text-neutral-200 hover:text-white active:text-neutral-400 invalid:text-neutral-600`;

  const navLink = (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${commonStyle} ${disabled ? "pointer-events-none text-neutral-600" : ""} ${isActive ? "text-blue-400" : commonTextStyle}`
      }
    >
      {children}
    </NavLink>
  );

  const button = (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${commonStyle} ${commonTextStyle}`}
    >
      {children}
    </button>
  );

  return (
    <li className="w-full h-12 flex justify-center items-center">
      {to ? navLink : button}
    </li>
  );
}

export default NavBarItem;
