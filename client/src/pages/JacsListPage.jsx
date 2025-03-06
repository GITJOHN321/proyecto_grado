import { useAuth } from "../context/AuthContext.jsx";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import filterAtribute from "../config/filter.js";
import { WORD_LIST } from "../config/config.js";

function JacsListPage() {
  const { getListJacs } = useAuth();
  const [jacs, setJacs] = useState([]);
  const [list_jacs, setListJacs] = useState([]);
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
    setListJacs(filterAtribute(jacs, word));
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
    setListJacs(jacs);
    setInputValue("");
  };
  ///////////////////////////////////////////

  useEffect(() => {
    async function loadJacs() {
      const res = await getListJacs();
      console.log;
      setJacs(res);
      setListJacs(res);
    }

    loadJacs();
  }, []);

  return (
    <div>
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
        <div className="row-span-2  touch-pan-y px-5">
          {list_jacs.length < 1 ? (
            <p>No hay Coincidencias</p>
          ) : (
            <>
              {list_jacs.map((jac, i) => (
                <div
                  className="bg-white border-2 border-slate-200 max-w-2xl w-full px-2 py-2 rounded-md shadow-lg"
                  key={i}
                >
                  <header className=" pb-2 border-b-2 mx-4">
                    <div className="grid grid-cols-3 ">
                      <div className="break-all col-span-2">
                        <h1 className="title ">{jac.username}</h1>
                        <div className="">
                          <h3 className="subtitle">
                            <p className="inline-block font-bold">Barrio: </p>{" "}
                            {jac.neighborhood}
                          </h3>
                          <h3 className="subtitle">
                            <p className="inline-block font-bold">Comuna: </p>{" "}
                            {jac.commune}
                          </h3>
                        </div>
                      </div>
                      <div className="self-center items-center  text-center pl-5">
                        <Link className="link" to={`/jacs/${jac.user_id}`}>
                          Ver Perfil
                        </Link>
                      </div>
                    </div>
                  </header>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
export default JacsListPage;
