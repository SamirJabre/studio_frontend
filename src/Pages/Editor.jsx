import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import LeftPanel from "../Components/LeftPanel";
import CenterCanvas from "../Components/CenterCanvas";

function Editor() {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isAuthenticated2 = JSON.parse(localStorage.getItem("isAuthenticated"));

  useEffect(() => {
    if (!isAuthenticated || !isAuthenticated2) {
      navigate("/login");
    }
  }, [isAuthenticated, isAuthenticated2, navigate]);

  return (
    <div className="w-screen h-screen flex justify-between items-center bg-red-500">
      <LeftPanel />
      <CenterCanvas />
    </div>
  );
}

export default Editor;
