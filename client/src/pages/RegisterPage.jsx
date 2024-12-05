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

  const {
    signup,
    isAuthenticated,
    errors: RegisterErrors,
    resetErrors,
  } = useAuth();
  const [activeForm, setActiveForm] = useState(false);
  const navigation = useNavigate();

 const changeForm = (e) =>{
    e.preventDefault();
    resetErrors()
    setActiveForm((state) => !state)
 }
  const onSubmit = handleSubmit(async (values) => {
    values.telephone = Number(values.telephone);
    const data = await signup(values);
    if (data) {
      // navigation("/login");
      resetErrors();
    }
  });

  return (
    <div className="container-form">
      <div className="container-into-form">
        <h1 className="head ">Registrate </h1>
        <div className="flex justify-center">
        <button onClick={(e) => changeForm(e)} className="button">{!activeForm ? ("Registrarse como JAC") : ("Registrarse como Usuario")}</button>
        </div>
        {!activeForm ? (
            <form className="px-10" onSubmit={onSubmit}>
            {RegisterErrors.map((error, i) => (
              <div className="bg-red-500 p-2 text-white" key={i}>
                {error}
              </div>
            ))}
            {LIST_REGISTER_USER.map((field) => (
              <span key={field.name}>
                <input
                  type={field.type}
                  {...register(field.name, { required: true })}
                  className="inputFull"
                  placeholder={field.name}
                />
                {Object.keys(errors).find((key) => key === field.name) && (
                  <span className="text-red-500"> {field.name} is required </span>
                )}
              </span>
            ))}
  
            <button type="submit" className="button block">
              Register
            </button>
          </form>
        ): (<form className="px-10" onSubmit={onSubmit}>
            {RegisterErrors.map((error, i) => (
              <div className="bg-red-500 p-2 text-white" key={i}>
                {error}
              </div>
            ))}
            {LIST_REGISTER_JAC.map((field) => (
              <span key={field.name}>
                <input
                  type={field.type}
                  {...register(field.name, { required: true })}
                  className="inputFull"
                  placeholder={field.name}
                />
                {Object.keys(errors).find((key) => key === field.name) && (
                  <span className="text-red-500"> {field.name} is required </span>
                )}
              </span>
            ))}
  
            <button type="submit" className="button block">
              Register
            </button>
          </form>)}
      </div>
    </div>
  );
}
export default RegisterPage;
