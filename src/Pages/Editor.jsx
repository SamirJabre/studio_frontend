import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import LeftPanel from "../Components/LeftPanel";
import CenterCanvas from "../Components/CenterCanvas";
import EditorBar from "../Components/EditorBar";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:4000";

function Editor() {
  const projectId = useParams().id;
  const navigate = useNavigate();
  const [project, setProject] = useState([]);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isAuthenticated2 = JSON.parse(localStorage.getItem("isAuthenticated"));

  useEffect(() => {
    if (!isAuthenticated || !isAuthenticated2) {
      navigate("/login");
    }
  }, [isAuthenticated, isAuthenticated2, navigate]);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`/projects/${projectId}`);
        setProject(response.data);
      } catch {
        navigate("/404");
      }
    };

    fetchProject();
  }, [navigate, projectId]);

  return (
    <div className="w-screen h-screen flex justify-between items-center">
      <EditorBar project={project} projectId={projectId} />
      <LeftPanel />
      <CenterCanvas
        project={project}
        user_id={project.user_id}
        projectId={projectId}
      />
    </div>
  );
}

export default Editor;
