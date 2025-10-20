import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ReactFlowProvider } from "@xyflow/react";
import LeftPanel from "../Components/LeftPanel";
import CenterCanvas from "../Components/CenterCanvas";
import EditorBar from "../Components/EditorBar";
import { fetchProject } from "../APIS/editorApi";
import ConfigurationPanel from "../Components/ConfigurationPanel";

function Editor() {
  const projectId = useParams().id;
  const navigate = useNavigate();
  const [project, setProject] = useState([]);

  useEffect(() => {
    fetchProject(projectId, setProject, navigate);
  }, [navigate, projectId]);

  const handleProjectUpdate = (updatedProject) => {
    setProject(updatedProject);
  };

  return (
    <div className="w-screen h-screen flex justify-between items-center">
      <EditorBar
        project={project}
        projectId={projectId}
        onProjectUpdate={handleProjectUpdate}
      />
      <LeftPanel />
      <ReactFlowProvider>
        <CenterCanvas
          project={project}
          user_id={project.user_id}
          projectId={projectId}
        />
      </ReactFlowProvider>
      <ConfigurationPanel
        project={project}
        projectId={projectId}
        onProjectUpdate={handleProjectUpdate}
      />
    </div>
  );
}

export default Editor;
