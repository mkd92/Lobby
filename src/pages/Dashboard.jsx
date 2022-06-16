import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import userStore from "../app/userStore";

export default function Dashboard() {
  const userData = userStore((state) => state.userData);
  const navigate = useNavigate();
  useEffect(() => {
    if (!userData.user_id) {
      navigate("/login");
    }
  }, [navigate, userData]);

  return <div>Dashboard</div>;
}
