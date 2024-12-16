import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { useState, useEffect, useRef } from "react";

import { Link } from "react-router-dom";
function FormMember(f) {
  const { rol, listRoles } = f;
  
  const {
    addRolUser,
    errors: RegisterErrors,
    setReload,
    reload,
    resetErrors
  } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();
  const [rolUser, setRolUser] = useState({rolname: "roles"});
  const [isOpen, setIsOpen] = useState(false);


  const openDropdown = (evt) => {
    evt.preventDefault();
    setIsOpen((prev) => !prev);
  };

  const selectRolUser = (evt, e) => {
    console.log(e)
    setRolUser(e);
  };

  const onSubmit = handleSubmit(async (data) => {
    rolUser.dni = data.dni;
   
    const res = await addRolUser(rolUser);
    if(res){
      resetErrors()
      reset()
    }
    setReload(!reload);
  });


  return (
    <div className="pt-10">
      <h1 className="text-2xl font-bold flex justify-center">
        {rol ? (`Actualizar ${rol.rolname}`) : ("Añadir o Actualizar Rol") }
      </h1>
      {RegisterErrors.map((error, i) => (
        <div className="bg-red-500 p-2 text-white" key={i}>
          {error}
        </div>
      ))}
      <br />
   
      <form className="grid grid-cols-2" onSubmit={onSubmit}>
        <div className="relative  items-center px-5">
          <button
            onClick={(e) => openDropdown(e)}
            className="bg-[#001336] hover:text-sky-300 border-2  hover:border-sky-500  px-5 py-2  rounded-md text-white w-full"
          >
            {rol ? rol.rolname : rolUser.rolname }
            <ul className={`Dropdown-menu ${isOpen ? "active" : "inactive"}`}>
              {listRoles.map((field, i) => (
                <DropdownItem
                  onClick={(evt) => {
                    selectRolUser(evt, field);
                  }}
                  key={i}
                  text={field.rolname}
                />
              ))}
            </ul>
          </button>
        </div>
        <input
          type="text"
          {...register("dni", { required: true })}
          className="input"
          placeholder="Documento"
          defaultValue={rol ? rol.dni : ""}
         
        />
        <br></br>
        <button type="submit" className="button col-span-2">
          Guardar
        </button>
      </form>
    </div>
  );
}
export default FormMember;

function DropdownItem(props) {
  return (
    <Link onClick={props.onClick} to={props.url}>
      <li className="Dropdown-item">
        {props.favicon}&nbsp;{props.text}
      </li>
    </Link>
  );
}
