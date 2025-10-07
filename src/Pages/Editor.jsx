import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

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
    <div className="w-screen h-screen flex justify-center items-center bg-red-500">
      <h1>Hello Editor</h1>
    </div>
  );
}

export default Editor;
