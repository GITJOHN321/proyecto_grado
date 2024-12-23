import { Link, useParams } from "react-router-dom";
function ProyectGeneralInfo(f) {
  const { proyect } = f;
  console.log(proyect);
  return (
  
            <div className="grid grid-flow-row-dense grid-cols-1 pt-5 lg:grid-cols-3 grid-row-2 px-10 sm:px-32 xl:px-52 gap-x-4">
          <div className="lg:col-span-2 child-grid">
          <div>
          <h1 className="font-bold text-2xl ">{proyect.name_proyect}</h1>
          </div>
            <h1>{proyect.author}</h1>
            <h1>{proyect.created_at}</h1>
            <h1>{proyect.description}</h1>
            <h1>{proyect.initial_budget}</h1>
            <h1>{proyect.location}</h1>
            
            <h1>{proyect.start_date}</h1>
            <h1>{proyect.state}</h1>
            <h1>{proyect.stimated_time}</h1>
            <h1>{proyect.object}</h1>
          </div>
          <div className="lg:col-span-1 child-grid">
                <h1>Historial de informes</h1>
          </div>
          <div className="lg:col-span-2 child-grid">
                <h1>Notas del Proyecto</h1>
          </div>
        </div>
  
  );
}

export default ProyectGeneralInfo;
