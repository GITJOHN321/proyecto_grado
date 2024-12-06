import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const {
    signin,
    errors: signinErrors,
    isAuthenticated,
    resetErrors,
  } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    const login = signin(data);
    if (login) {
      resetErrors();
    }
  });
  useEffect(() => {
    if (isAuthenticated) navigate("/");
    resetErrors();
  }, [isAuthenticated]);

  return (
    <div className="container-form-center">
      <div className="container-into-form">
        <h1 className="head">Login</h1>
        {signinErrors.map((error, i) => (
          <div className="bg-red-500 p-2 text-white text-center" key={i}>
            {error}
          </div>
        ))}

        <form className="px-10" onSubmit={onSubmit}>
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full input px-4 py-2 rounded-md my-2"
            placeholder="Email"
          />
          {errors.email && (
            <span className="text-red-500">email is required</span>
          )}
          <input
            type="password"
            {...register("password", { required: true })}
            className="w-full input px-4 py-2 rounded-md my-2"
            placeholder="Password"
          />
          {errors.password && (
            <span className="text-red-500">password is required</span>
          )}
          <button type="submit" className="button block">
            {" "}
            Login{" "}
          </button>
        </form>
        <p className="flex gap-x-2 justify-between px-10">
          Don't have an account?
          <Link to="/register" className="link">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
export default LoginPage;
