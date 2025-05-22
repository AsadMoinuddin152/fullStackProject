import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/authSlice";

const DashboardPage = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const user = auth.user;

  return (
    <div>
      <h2>Welcome, {user?.name || "User"}! Dashboard</h2>
      {auth.isAuthenticated && (
        <button
          onClick={handleLogout}
          style={{ padding: "8px 16px", marginTop: "1rem" }}
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default DashboardPage;
