import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate, Link } from "react-router-dom";
import { LIST_REGISTER_USER, LIST_REGISTER_JAC } from "../config/config.js";
function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
console.log(LIST_REGISTER_JAC)
  const { signup, signupJac, errors: RegisterErrors, resetErrors } = useAuth();
  const [activeForm, setActiveForm] = useState(false);
  const navigation = useNavigate();

  const changeForm = (e) => {
    e.preventDefault();
    resetErrors();
    setActiveForm((state) => !state);
  };
  const onSubmit = handleSubmit(async (values) => {
    values.telephone = Number(values.telephone);
    let data = {};
    if (!activeForm) {
      data = await signup(values);
    } else {
      values.comune = Number(values.comune);
      data = await signupJac(values);
      console.log(values);
    }
    if (data) {
      navigation("/login");
      resetErrors();
    }
  });

  return (
    <div className="container-form ">
      <div className="container-into-form w-1/2 ">
        <h1 className="head">{!activeForm ? "Registro de Usuario" : "Registro de JAC"}</h1>
        
        <div className="flex justify-center">
          
          <button onClick={(e) => changeForm(e)} className="button">
            {!activeForm ? "Registra la Junta de acción Comunal" : "Registrarse como Usuario"}
          </button>
        </div>
        <div className="px-5">
          {RegisterErrors.map((error, i) => (
            <div className="bg-red-500 p-2 text-white" key={i}>
              {error}
            </div>
          ))}
          {!activeForm ? (
            <form className="" onSubmit={onSubmit}>
              {LIST_REGISTER_USER.map((field) => (
                <div key={field.name}>
                  <input
                    type={field.type}
                    {...register(field.name, { required: true })}
                    className="inputFull"
                    placeholder={field.placeholder}
                  />
                  {Object.keys(errors).find((key) => key === field.name) && (
                    <span className="text-red-500">
                      {" "}
                      {field.name} is required{" "}
                    </span>
                  )}
                </div>
              ))}

              <button type="submit" className="button">
                Register
              </button>
            </form>
          ) : (
            <form className="" onSubmit={onSubmit}>
              {LIST_REGISTER_JAC.map((field) => (
                <div key={field.name}>
                  <input
                    type={field.type}
                    {...register(field.name, { required: true })}
                    className="inputFull"
                    placeholder={field.placeholder}
                  />
                  {Object.keys(errors).find((key) => key === field.name) && (
                    <span className="text-red-500">
                      {" "}
                      {field.name} is required{" "}
                    </span>
                  )}
                </div>
              ))}

              <button type="submit" className="button">
                Register
              </button>
            </form>
          )}
        </div>

        <br />
        <p className="flex gap-x-2 justify-between px-10">
          ¿Ya tienes una cuenta?{" "}
          <Link to="/login" className=" link">
            Inicia Sesion
          </Link>
        </p>
      </div>
    </div>
  );
}
export default RegisterPage;

