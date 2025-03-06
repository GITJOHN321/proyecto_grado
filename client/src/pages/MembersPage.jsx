import { useAuth } from "../context/AuthContext.jsx";
import FormMember from "../components/FormMember.jsx";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import NavbarOptions from "../components/navbarOptions.jsx";
import { SETTINGS_JACS } from "../config/config.js";
import { LIST_ROLES } from "../config/config.js";

function MembersPage() {
  const {
    user,
    getListRoles,
    getListRolesUser,
    reload,
    removeRolUser,
    resetErrors,
  } = useAuth();
  const [rolesUser, setRolesUser] = useState([]);
  const [rolUser, setRolUser] = useState("");
  const [listRoles, setlistRoles] = useState([]);
  const deleteRolUser = async (e, index) => {
    await removeRolUser(e);
    let data = [...rolesUser];
    data.splice(index, 1);
    setRolesUser(data);
  };
  const selectRolUser = (evt) => {
    evt.preventDefault();
    console.log(evt);
    setRolUser(null);
    resetErrors();
  };
  useEffect(() => {
    async function loadRoles() {
      const res = await getListRoles();
      const res2 = await getListRolesUser(user.user_id);
      setRolesUser(res2);
      setlistRoles(res);
    }

    loadRoles();
  }, [reload]);

  return (
    <div className="px-20">
      <NavbarOptions buttons={SETTINGS_JACS}></NavbarOptions>
      <section className="container-form" id="cuenta">
        <div className="container-into-form">
          <h1 className="head ">Miembros JAC </h1>

          <div className="px-5 pt-5">
            <table>
              <thead className="border-b-4">
                <tr>
                  <th>Rol</th>
                  <th>Miembro</th>
                  <th>Dni</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {rolesUser.map((rol, i) => (
                  <tr className="py-1" key={i}>
                    <td className="font-bold">{rol.rolname}</td>
                    <td>
                      {rol.username}&nbsp;{rol.lastname}
                    </td>
                    <td>{rol.dni}</td>
                    <td>
                      <Link
                        onClick={(evt) => {
                          deleteRolUser(rol, i);
                        }}
                        className="pl-2 text-cyan-600"
                      >
                        Eliminar
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <FormMember listRoles={listRoles} ></FormMember>
           
          </div>
        </div>
      </section>
    </div>
  );
}

export default MembersPage;
