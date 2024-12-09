
import { useEffect, useState } from "react";
import Account from "../components/account.jsx";


function SettingsPage() {
  const [activeIndex, setActiveIndex] = useState(null); // Índice del botón activo

  const buttons = ["Cuenta", "Integrantes", "hola"]; // Lista de botones

  const handleClick = (index) => {
    setActiveIndex(index); // Establecer el botón activo por su índice
  };

  useEffect(() => {
    return () => {
      handleClick(0);
    };
  }, []);

  return (
    <div>
      <div className="flex justify-center px-20 pt-5 pb-1 ">
        <div>
          {buttons.map((button, index) => (
            <button
              key={index}
              onClick={() => handleClick(index)}
              className={`button-list ${activeIndex === index ? "active" : ""}`}
            >
              {button}
            </button>
          ))}
        </div>
      </div>
      <div>
        {activeIndex === buttons.indexOf("Cuenta") && <Account></Account>}
      </div>
    </div>
  );
}
export default SettingsPage;
