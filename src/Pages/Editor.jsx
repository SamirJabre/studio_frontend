import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { ReactFlowProvider } from "@xyflow/react";
import LeftPanel from "../Components/LeftPanel";
import CenterCanvas from "../Components/CenterCanvas";
import EditorBar from "../Components/EditorBar";
import { useSelector, useDispatch } from "react-redux";
import { fetchProject, updateProject } from "../Redux/Slices/projectSlice.js";
import ConfigurationPanel from "../Components/ConfigurationPanel";
import LoadingSpinner from "../Components/LoadingSpinner.jsx";

function Editor() {
  const dispatch = useDispatch();
  const projectId = useParams().id;
  const navigate = useNavigate();
  const { currentProject, loading } = useSelector((state) => state.project);

  useEffect(() => {
    dispatch(fetchProject({ projectId, navigate })).unwrap();
  }, [dispatch, navigate, projectId]);

  const handleProjectUpdate = async (updatedProject) => {
    await dispatch(updateProject({ updatedProject })).unwrap();
  };

  return (
    <div className="w-screen h-screen flex justify-between items-center">
      {loading ? (
        <div className="w-full h-full flex justify-center items-center">
          <LoadingSpinner message="Loading Project..." />
        </div>
      ) : (
        <>
          <EditorBar
            project={currentProject}
            onProjectUpdate={handleProjectUpdate}
          />
          <LeftPanel />
          <ReactFlowProvider>
            <CenterCanvas
              project={currentProject}
              user_id={currentProject.user_id}
              projectId={projectId}
            />
          </ReactFlowProvider>
          <ConfigurationPanel
            project={currentProject}
            onProjectUpdate={handleProjectUpdate}
          />
        </>
      )}
    </div>
  );
}

export default Editor;
