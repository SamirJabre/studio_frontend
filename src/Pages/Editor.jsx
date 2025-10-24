import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { ReactFlowProvider } from "@xyflow/react";
import LeftPanel from "../Components/LeftPanel";
import CenterCanvas from "../Components/CenterCanvas";
import EditorBar from "../Components/EditorBar";
import { useSelector, useDispatch } from "react-redux";
import { fetchProject, updateProject } from "../Redux/Slices/projectSlice.js";
import ConfigurationPanel from "../Components/ConfigurationPanel";

function Editor() {
  const dispatch = useDispatch();
  const projectId = useParams().id;
  const navigate = useNavigate();
  const project = useSelector((state) => state.project.currentProject);

  useEffect(() => {
    dispatch(fetchProject({ projectId, navigate })).unwrap();
  }, [dispatch, navigate, projectId]);

  const handleProjectUpdate = async (updatedProject) => {
    await dispatch(updateProject({ updatedProject })).unwrap();
  };

  return (
    <div className="w-screen h-screen flex justify-between items-center">
      <EditorBar project={project} onProjectUpdate={handleProjectUpdate} />
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
        onProjectUpdate={handleProjectUpdate}
      />
    </div>
  );
}

export default Editor;
