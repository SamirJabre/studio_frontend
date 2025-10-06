import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard.jsx";
import ProjectConfiguration from "./ProjectConfiguration.jsx";
import { FaFolder } from "react-icons/fa";
import { useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:4000";

function DashboardBox({ search }) {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user_id = useSelector((state) => state?.auth?.user?.id);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("/projects", {
          params: { user_id },
        });
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, [user_id, projects]);

  const handleCreateProject = async (projectData) => {
    try {
      const newProject = { ...projectData, user_id };
      const response = await axios.post("/projects", newProject);
      setProjects([...projects, response.data]);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  // Filter projects based on search query
  const sortOrder = useSelector((state) => state.sort.sort);
  const sortedProjects = [...projects].sort((a, b) => {
    if (sortOrder === "Ascending") {
      return a.title.localeCompare(b.title);
    }
    return b.title.localeCompare(a.title);
  });
  // If there's a search query, filter projects
  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full min-h-fit bg-gray-50 rounded-xl p-4 sm:p-6 shadow-sm transition-all duration-300 ease-in-out overflow-hidden">
      {/* Header */}
      <div className="ww-full h-fit flex justify-between items-center">
        <div className="mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
            Your Projects
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            Manage and view all your active projects
          </p>
        </div>
        <button
          className="bg-[#5664F5] text-white flex items-center justify-center pl-1 pr-2 py-2 rounded-md hover:-translate-y-1 hover:scale-105 transition-all hover:bg-[#4451d9] duration-200"
          onClick={() => setIsModalOpen(true)}
        >
          <span>
            <AddIcon />
          </span>
          <span className="font-semibold ">Create Project</span>
        </button>
      </div>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6 auto-rows-fr w-full">
        {search
          ? filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                description={project.description}
                metadata={project.metadata}
                color={project.color}
              />
            ))
          : sortedProjects.map((project) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                description={project.description}
                metadata={project.metadata}
                color={project.color}
              />
            ))}
      </div>

      {/* Empty State (if no projects) */}
      {projects.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-gray-500">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
            <FaFolder className="text-2xl" />
          </div>
          <h3 className="text-lg font-medium mb-2">No projects yet</h3>
          <p className="text-sm">Create your first project to get started</p>
        </div>
      )}

      {/* Project Configuration Modal */}
      <ProjectConfiguration
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleCreateProject}
      />
    </div>
  );
}

export default DashboardBox;
