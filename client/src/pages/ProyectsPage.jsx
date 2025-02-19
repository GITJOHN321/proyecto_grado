import { usePublication } from "../context/PublicationsContext.jsx";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import filterAtribute from "../config/filter.js";
import { WORD_LIST } from "../config/config.js";
import CardProyect from "../components/CardProyect.jsx";
function PublicationPage() {
  const [proyects, setProyects] = useState([]);
  const [list_proyects, setListProyects] = useState([]);
  const { getAllProyects } = usePublication();

  /////////////////////////////////////////////

  const wordList = WORD_LIST;

  const [inputValue, setInputValue] = useState("");
  const [filteredWords, setFilteredWords] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1); // Índice de la opción seleccionada con el teclado

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value) {
      const suggestions = wordList.filter((word) =>
        word.toLowerCase().startsWith(value.toLowerCase())
      );
      setFilteredWords(suggestions);
      setSelectedIndex(-1); // Resetear la selección al escribir
    } else {
      setFilteredWords([]);
    }
  };

  const handleSelect = (word) => {
    setInputValue(word);
    setFilteredWords([]);
    setSelectedIndex(-1);
    setListProyects(filterAtribute(proyects, word));
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      // Mover hacia abajo
      setSelectedIndex((prev) =>
        prev < filteredWords.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      // Mover hacia arriba
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === "Enter" && selectedIndex !== -1) {
      // Seleccionar con Enter
      handleSelect(filteredWords[selectedIndex]);
    }
  };

  const resetSearch = () => {
    setListJacs(proyects);
    setInputValue("");
  };
  ///////////////////////////////////////////

  useEffect(() => {
    async function loadProyects() {
      const res = await getAllProyects();
      console.log(res);
      setProyects(res);
      setListProyects(res);
    }

    loadProyects();
  }, []);

  return (
    <div className="">
      <div className="relative w-80 mx-auto mt-10">
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Escribe aquí..."
        />
        {filteredWords.length > 0 && (
          <ul className="absolute w-full bg-white border rounded-lg mt-1 shadow-lg">
            {filteredWords.map((word, index) => (
              <li
                key={index}
                onClick={() => handleSelect(word)}
                className={`px-4 py-2 cursor-pointer ${
                  index === selectedIndex
                    ? "bg-blue-300 text-white"
                    : "hover:bg-blue-100"
                }`}
              >
                {word}
              </li>
            ))}
          </ul>
        )}
        <Link
          className="link"
          onClick={(evt) => {
            resetSearch();
          }}
        >
          resetear busqueda
        </Link>
      </div>
      <div className="flex my-4 justify-center">
        <div className="row-span-2 overflow-auto touch-pan-y px-20">
          {list_proyects.length < 1 ? (
            <p>No hay coincidencias</p>
          ) : (
            <>
              {list_proyects.map((proyect, i) => (
                <CardProyect key={i} proyect={proyect}></CardProyect>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
export default PublicationPage;
