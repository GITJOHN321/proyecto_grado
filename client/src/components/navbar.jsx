import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";
import { useAuth } from "../context/AuthContext";
import { MdLogout } from "react-icons/md";

function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  let menuRef = useRef();
  const onsubmit = (evt) => {
    evt.preventDefault();
    setIsOpen((prev) => !prev);
  };

  const clicker = () => {
    if (isAuthenticated) {
      let handler = (e) => {
        if (!menuRef.current.contains(e.target)) {
          console.log(menuRef.current.contains(e.target));
          return setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handler);

      return () => {
        document.removeEventListener("mousedown", handler);
      };
    }
  };
  clicker();

  return (
    <nav className="nav px-50 pb-5 pt-1 ">
      {isAuthenticated && (
        <Link
          to="/"
          className="flex justify-center text-xl font-bold hover:text-sky-500 "
        >
          Bienvenido <b>{user.username}</b>
        </Link>
      )}

      <ul className="grid grid-cols-3">
        <li className="flex justify-center">
          <Link
            to="/"
            className="text-2xl font-bold hover:text-sky-500 text-nowrap"
          >
            Proyecto JAC
          </Link>
        </li>
        <li className="flex justify-center">
          <Link className="px-2" to="/">
            INICIO
          </Link>
          <Link className="px-2" to="/Proyects">
            PROYECTOS
          </Link>
          <Link className="px-2" to="/jacs">
            JACS
          </Link>
        </li>
        <li className="flex justify-center">
          {isAuthenticated ? (
            <div className="relative flex flex-col items-center" ref={menuRef}>
              <button
                onClick={(e) => onsubmit(e)}
                className="bg-[#001336] hover:text-sky-300 border-2 flex hover:border-sky-500  px-4 py-2  rounded-md w-full"
              >
                <IoMdMenu />
                <ul
                  className={`Dropdown-menu ${isOpen ? "active" : "inactive"}`}
                >
                  <DropdownItem
                    favicon={<MdLogout />}
                    url={"#"}
                    text={"Mi Perfil"}
                  />
                  <DropdownItem
                    favicon={<MdLogout />}
                    url={"/settings/my-projects"}
                    text={"Mis Proyectos"}
                  />
                  <DropdownItem
                    favicon={<MdLogout />}
                    url={"#"}
                    text={"Mis Publicaciones"}
                  />
                  <DropdownItem
                    favicon={<MdLogout />}
                    url={user.user_type === "user_jac" ? "/settings/cuenta" : "/"}
                    text={"Settings"}
                  />
                  <DropdownItem
                    onClick={() => {
                      setIsOpen(false);
                      logout();
                    }}
                    favicon={<MdLogout />}
                    url={"/"}
                    text={"Logout"}
                  />
                </ul>
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="hover:text-sky-500 px-1">
                Login
              </Link>

              <Link to="/register" className="hover:text-sky-500 px-1">
                Register
              </Link>
            </>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;

function DropdownItem(props) {
  return (
    <Link onClick={props.onClick} to={props.url}>
      <li className="Dropdown-item">
        {props.favicon}&nbsp;{props.text}
      </li>
    </Link>
  );
}
