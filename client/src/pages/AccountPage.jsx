import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { LIST_PERFIL_JAC } from "../config/config";
import NavbarOptions from "../components/navbarOptions";
import { SETTINGS_JACS } from "../config/config";
import { SETTINGS_USERS } from "../config/config";

function AccountPage() {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors }, 
  } = useForm();
  let LIST_PERFIL = [];
  if (user.user_type === "user_jac") {
    LIST_PERFIL_JAC.map((jac) => {
      jac.field = user[jac.name];
    });
    LIST_PERFIL = LIST_PERFIL_JAC;
  }
  const onSubmit = handleSubmit(async (values) => {
    delete values.username;
    delete values.commune;
    delete values.neighborhood;
    if (values.password === "" || values.password2 === "") {
      delete values.password;
      delete values.password2;
      console.log(values);
    } else {
      console.log(values);
    }
  });
  return (
    <div className="px-20">
       <NavbarOptions buttons={user.user_type === "user_jac" ? SETTINGS_JACS : SETTINGS_USERS}></NavbarOptions>
      <div className="container-form">
        <div className="container-into-form">
          <h1 className="head ">Actualizar Datos </h1>
          <form className="px-5 pt-5" onSubmit={onSubmit}>
            {LIST_PERFIL.map((jac, i) => (
              <div className="grid grid-cols-2 py-1" key={i}>
                <label className="font-bold">{jac.label} </label>
                <input
                  className={`input ${jac.disabled && "disabled"}`}
                  defaultValue={jac.field}
                  disabled={jac.disabled}
                  placeholder={jac.placeholder}
                  {...register(jac.name)}
                />
              </div>
            ))}

            <button type="submit" className="button block">
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AccountPage;