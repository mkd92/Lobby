import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import userStore from "../app/userStore";

export default function Home() {
  const userData = userStore((state) => state.userData);
  const navigate = useNavigate();
  useEffect(() => {
    if (userData.user_id) navigate("/dashboard");
  }, [navigate, userData]);

  return <div>Home</div>;
}
