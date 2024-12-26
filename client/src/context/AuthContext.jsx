import { createContext, useContext, useEffect, useState } from "react";
import {
  registerRequest,
  registerJacRequest,
  loginRequest,
  verifyTokenRequest,
  getRoles,
  getRolesUser,
  asingRolUser,
  deleteRolUser,
  getJacs,
  getJac
} from "../api/auth";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [reload, setReload] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  const resetErrors = () => {
    setErrors([]);
  };
  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      console.log(res.data);
      return res.data;
      //setUser(res.data);
      //setIsAuthenticated(true);
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  const signupJac = async (user) => {
    try {
      const res = await registerJacRequest(user);
      return res.data;
      //setUser(res.data);
      //setIsAuthenticated(true);
    } catch (error) {
      setErrors(error.response.data);
    }
  };
  const signin = async (user) => {
    try {
      const res = await loginRequest(user);

      setIsAuthenticated(true);
      //console.log(res, isAuthenticated);
      setUser(res.data);
    } catch (error) {
      setErrors(error.response.data);
    }
  };
  const logout = () => {
    Cookies.remove("token", { path: "/" });
    setIsAuthenticated(false);
    setUser(null);
  };

  const addRolUser = async (user) =>{
    try {
      const res = await asingRolUser(user);
      return res.data;
    } catch (error) {
      setErrors(error.response.data);
    }
  }

  const getListRoles = async () => {
    try {
      const res = await getRoles();
      return res.data;
    } catch (error) {
      setErrors(error.response.data);
    }
  };
  const getListRolesUser = async (id) => {
    try {
      const res = await getRolesUser(id);
      return res.data;
    } catch (error) {
      setErrors(error.response.data);
    }
  };
  const removeRolUser = async (id) => {
    try {
      const res = await deleteRolUser(id);
      return res.data;
    } catch (error) {
      setErrors(error.response.data);
    }
  };
  const getListJacs = async () => {
    try {
      const res = await getJacs();
      return res.data;
    } catch (error) {
      setErrors(error.response.data);
    }
  };
  const getDetailJac = async (id) => {
    try {
      const res = await getJac(id);
      return res.data;
    } catch (error) {
      setErrors(error.response.data);
    }
  };
  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get();

      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return setUser(null);
      }

      try {
        const res = await verifyTokenRequest(cookies.token);
        console.log(res.data);
        if (!res.data) {
          setIsAuthenticated(false);
          setLoading(false);
          setUser(null);
          return;
        }
        setIsAuthenticated(true);
        setLoading(false);
        setUser(res.data);
      } catch (error) {
        console.log(error);
        setIsAuthenticated(false);
        setLoading(false);
        setUser(null);
      }
    }
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signup,
        signupJac,
        signin,
        logout,
        user,
        loading,
        isAuthenticated,
        errors,
        resetErrors,
        getListRoles,
        getListRolesUser,
        getListJacs,
        getDetailJac,
        addRolUser,
        reload, 
        setReload,
        removeRolUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
