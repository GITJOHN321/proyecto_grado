import { TYPE_USER, TYPE_JAC, NAME_USER, NAME_JAC } from "../config.js";
export const verify_table = (type_users) => {
    var table = "";
    if (type_users == TYPE_USER) {
      table = NAME_USER;
    } else if (type_users === TYPE_JAC) {
      table = NAME_JAC;
    }
  
    return table;
  };