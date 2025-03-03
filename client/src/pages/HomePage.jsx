import banner from "../assets/banner.png";
import junta1 from "../assets/junta1.jpg";
import junta2 from "../assets/junta2.jpeg";
import junta3 from "../assets/junta3.jpg";
function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Banner */}
      <div className="relative w-full h-96 bg-blue-700 flex items-center justify-center text-white text-3xl font-bold overflow-hidden">
        <img
          src={banner}
          alt="Banner"
          className="absolute inset-0 w-full md:object-fill object-cover h-full opacity-50 translate-y-10"
        />
        <h1 className="relative text-4xl">Junta de Acción Comunal</h1>
      </div>

      <div className="max-w-5xl mx-auto py-12 px-4">
        <div className="grid md:grid-cols-2 mb-5 text-xl">
          <div className="m-auto">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              ¿Qué es una Junta de Acción Comunal?
            </h2>
            <p className="text-gray-700 mb-6">
              Las Juntas de Acción Comunal (JAC) son organizaciones comunitarias
              que buscan mejorar la calidad de vida en los barrios y veredas. A
              través de la participación ciudadana, gestionan proyectos,
              organizan actividades y canalizan necesidades hacia las
              autoridades locales.
            </p>
          </div>

          <div className="w-full flex justify-center m-0">
            <img
              src={junta1}
              alt="JAC en acción"
              className="rounded-lg shadow-lg h-64 object-cover"
            />
          </div>
        </div>
        <div className="grid md:grid-cols-2 mb-5 text-xl">
          <div className="w-full flex justify-center m-0">
            <img
              src={junta2}
              alt="JAC en acción"
              className="rounded-lg shadow-lg h-64 object-cover"
            />
          </div>
          <div className="m-auto">
            <h2 className="text-2xl font-semibold text-gray-800 m-0">
              ¿Cómo funciona?
            </h2>
            <p className="text-gray-700 mb-6">
              Las JAC están conformadas por los vecinos de la comunidad, quienes
              eligen una directiva que representa sus intereses. A través de
              reuniones periódicas, se identifican problemas y se proponen
              soluciones, trabajando en conjunto con entidades gubernamentales y
              privadas.
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <div>
            <h2 className="text-4xl font-semibold text-gray-800 mb-4 text-center">
              Beneficios de conocer los proyectos de la JAC
            </h2>
            <div className="flex justify-center">
              <ul className="list-disc list-inside text-gray-700 mb-6 text-xl">
                <li>
                  Participación en la toma de decisiones para el bienestar de la
                  comunidad.
                </li>
                <li>
                  Acceso a información sobre proyectos en desarrollo y futuros
                  planes.
                </li>
                <li>
                  Oportunidad de proponer ideas y soluciones para problemas
                  locales.
                </li>
                <li>
                  Fortalecimiento del sentido de pertenencia y cooperación entre
                  vecinos.
                </li>
                <li>
                  Vigilancia de la correcta ejecución de los proyectos
                  comunitarios.
                </li>
              </ul>
              
            </div>
            <div className="w-full flex justify-center">
                <img
                  src={junta3}
                  alt="Reunión de la JAC"
                  className="rounded-lg shadow-lg"
                />
              </div>
          </div>
        </div>

        {/* Espacio para otra imagen */}
      </div>
    </div>
  );
}
export default HomePage;
