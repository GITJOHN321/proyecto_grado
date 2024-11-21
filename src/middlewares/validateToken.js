import jwt from "jsonwebtoken";
import { TYPE_JAC } from "../config.js";

export const authRequired = (req, res, next) => {
  console.log("validing token");

  const { token } = req.cookies;
  if (!token)
    return res.status(401).json({ message: "No token, authorization denied" });

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });


    req.user = user;
    console.log(user)
  });

  next();
};

export const authUserJac = (req, res,next) =>{
  console.log("validing User Jac")
  const { id, type_user } = req.user;
 
    if (type_user !== TYPE_JAC)
      return res.status(400).json(["You don't have permissions"]);

    next();

}