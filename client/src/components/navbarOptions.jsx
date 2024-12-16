import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { SETTINGS_JACS } from "../config/config";
function NavbarOptions() {
  const buttons = SETTINGS_JACS;
  const [activeIndex, setActiveIndex] = useState(null);
  const location = useLocation();

  const handleClick = (index) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    const currentIndex = buttons.findIndex(
      (item) => item.rute === location.pathname
    );
    setActiveIndex(currentIndex);
  }, []);
  return (
    <div className="flex justify-center px-20 pt-5 pb-1 ">
      <div>
        {buttons.map((button, index) => (
          <Link
            key={index}
            onClick={() => handleClick(index)}
            className={`button-list ${activeIndex === index ? "active" : ""}`}
            to={button.rute}
          >
            {button.text}
          </Link>
        ))}
       
      </div>
    </div>
  );
}
export default NavbarOptions;
