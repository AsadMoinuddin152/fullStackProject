import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import NotificationModal from "./NotificationModal";
import dayjs from "dayjs";
import { logout } from "../redux/authSlice";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const { token, isAuthenticated, user } = useSelector((state) => state.auth);

  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    title: "",
    message: "",
    show: false,
  });

  useEffect(() => {
    if (!token || !isAuthenticated) {
      setModalConfig({
        title: "Session Verification Needed",
        message: "Please log in to access the requested page securely.",
        show: true,
      });
      return;
    }

    if (user?.lastLogin) {
      const lastLoginDate = dayjs(user.lastLogin);
      const now = dayjs();
      const diff = now.diff(lastLoginDate, "day");

      if (diff >= 1) {
        setModalConfig({
          title: "Session Expired",
          message:
            "Your session expired due to inactivity. Redirecting to login...",
          show: true,
        });
      }
    }
  }, [token, isAuthenticated, user]);

  const handleTimeout = () => {
    setModalConfig((prev) => ({ ...prev, show: false }));
    dispatch(logout());
    setShouldRedirect(true);
  };

  if (shouldRedirect) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      {modalConfig.show && (
        <NotificationModal
          open={modalConfig.show}
          title={modalConfig.title}
          message={modalConfig.message}
          duration={5000}
          onTimeout={handleTimeout}
        />
      )}
      {children}
    </>
  );
};

export default ProtectedRoute;
