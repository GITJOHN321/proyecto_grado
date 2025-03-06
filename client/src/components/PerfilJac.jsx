import { Link } from "react-router-dom";

function PerfilJac(field) {
  const jac = field.jac

  return (
    <div className="w-full bg-white">
            <div className="overflow-hidden min-h-24 lg:h-56">
              <img
                className="w-full h-full object-cover"
                src="https://tulua.gov.co/info/tulua_se/media/galeria7239.jpg"
                alt=""
              />
            </div>
            <div className=" pb-2 m-4">
              <h1 className="title border-b-2 pb-2">{jac.username}</h1>
              <div className="grid grid-rows-6 md:grid-rows-3 grid-flow-col pt-2">
                <h2 className="subtitle">
                  <p className="inline-block font-semibold">Barrio: </p>
                  &nbsp;
                  {jac.neighborhood}&nbsp;
                </h2>
                <h2 className="subtitle">
                  <p className="inline-block font-semibold">Comuna: </p>
                  &nbsp;
                  {jac.commune}
                </h2>

                <h2 className="subtitle">
                  <p className="inline-block font-semibold">Personeria: </p>
                  {jac.personery}
                </h2>
                <p className="font-bold">Datos de contacto</p>
                <p className="subtitle">{jac.email}</p>
                <p className="subtitle">{jac.telephone}</p>
            
              </div>
            </div>
          </div>
  );
}
export default PerfilJac;