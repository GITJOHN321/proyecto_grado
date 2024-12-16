import { useAuth } from "../context/AuthContext.jsx";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function JacsListPage() {
  const { getListJacs } = useAuth();
  const [jacs, setJacs] = useState([]);

  useEffect(() => {
    async function loadJacs() {
      const res = await getListJacs();
      setJacs(res);
    }

    loadJacs();
  }, []);

  return (
    <div>
        {jacs.map((jac) =>(
            <div key={jac.user_id}>
                <h1>{jac.username}</h1>
                <Link to={`/jacs/${jac.user_id}`} className="link">ver jac</Link>
            </div>
        ))}
    </div>
)
}
export default JacsListPage;
