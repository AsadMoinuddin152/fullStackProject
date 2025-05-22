import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "./Pages/AuthPage/AuthPage";
import DashboardPage from "./Pages/DashboardPage/DashboardPage.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./Components/ProtectedRoute.jsx";
import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
