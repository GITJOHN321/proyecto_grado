import jwt from "jsonwebtoken";
//Cuando llamamos esta función debemos hacerlo de forma asincrona
//const token = await function name(payload)
export function createAccesToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload, //payload = query.id
      process.env.TOKEN_SECRET,
      {
        expiresIn: "1d",
      },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });
}
//create a promise that receive a token
export const getTokenData = (token) => {
  let data = null;
  jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
    if (err) {
      console.log("Error al obtener data del token", err);
      return { message: "Unauthorized" };
    } else {
      data = decoded;
    }
  });
  return data;
};
