import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import AccountPage from "./pages/AccountPage.jsx";
import MembersPage from "./pages/MembersPage.jsx";
import ProyectsPage from "./pages/ProyectsPage.jsx";
import JacsListPage from "./pages/JacsListPage.jsx";
import JacDetailPage from "./pages/JacDetailPage.jsx";
import ProyectDetailPage from "./pages/proyectDetailPage.jsx";
import FloatPubliCard from "./components/FloatPubliCard.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { PubliProvider } from "./context/PublicationsContext.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import Navbar from "./components/navbar.jsx";

function App() {
  return (
    <AuthProvider>
      <PubliProvider>
        <BrowserRouter>
          <Navbar></Navbar>
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/register" element={<RegisterPage />}></Route>
            <Route path="/proyects" element={<ProyectsPage />}></Route>
            <Route path="/proyects/:id" element={<ProyectDetailPage />}></Route>
            <Route path="/jacs" element={<JacsListPage />}></Route>
            <Route path="/jacs/:id" element={<JacDetailPage />}></Route>
            <Route path="/jacs/:id/:p_id" element={<FloatPubliCard />}></Route>
            <Route element={<ProtectedRoute />}>
              <Route path="/settings/cuenta" element={<AccountPage />}></Route>
              <Route
                path="/settings/integrantes"
                element={<MembersPage />}
              ></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </PubliProvider>
    </AuthProvider>
  );
}
export default App;
