export const LIST_REGISTER_USER = [
  { name: "username", type: "text" },
  { name: "user_last_name", type: "text" },
  { name: "email", type: "email" },
  { name: "password", type: "password" },
  { name: "password2", type: "password" },
  { name: "telephone", type: "tel" },
  { name: "birthdate", type: "date" },
  { name: "dni", type: "text" },
];

export const LIST_REGISTER_JAC = [
  { name: "username", type: "text" },
  { name: "email", type: "email" },
  { name: "password", type: "password" },
  { name: "password2", type: "password" },
  { name: "personery", type: "text" },
  { name: "telephone", type: "tel" },
  { name: "commune", type: "number" },
  { name: "neighborhood", type: "text" },
];

export const LIST_PERFIL_JAC = [
  {
    name: "username",
    type: "text",
    disabled: true,
    field: "",
    label: "Nombre:",
  },
  { name: "email", type: "email", field: "", label: "Correo electrónico:" },
  { name: "personery", type: "text", field: "", label: "Personeria:" },
  { name: "telephone", type: "tel", field: "", label: "Teléfono:" },
  {
    name: "commune",
    type: "number",
    disabled: true,
    field: "",
    label: "Comuna:",
  },
  {
    name: "neighborhood",
    type: "text",
    disabled: true,
    field: "",
    label: "Barrio:",
  },
  {
    name: "password",
    type: "password",
    field: "",
    placeholder: "*********",
    label: "Nueva Contraseña:",
  },
  {
    name: "password2",
    type: "password",
    field: "",
    placeholder: "*********",
    label: "Comprobar Contraseña:",
  },
];

export const SETTINGS_JAC = ["cuenta", "integrantes"];

export const SETTINGS_JACS = [
  { text: "cuenta", rute: "/settings/cuenta" },
  { text: "integrantes", rute: "/settings/integrantes" },
];

export const FIELDS_PROYECT = [
  {text: "Proyecto", rute: "#"},
  {text: "Proyectos", rute: "#proyectos"},
]