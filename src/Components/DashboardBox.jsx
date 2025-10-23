import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard.jsx";
import SearchInput from "../Base/SearchInput.jsx";
import { useToast } from "../Context/ToastContext.jsx";
import ProjectConfiguration from "./ProjectConfiguration.jsx";
import Filter from "../Base/Filter.jsx";
import { FaFolder, FaExclamationTriangle, FaSpinner } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import {
  fetchProjects,
  createProject,
  deleteProject,
  duplicateProject,
} from "../Redux/Slices/projectsSlice.js";

function DashboardBox() {
  const dispatch = useDispatch();
  const { projects, loading, error } = useSelector((state) => state.projects);
  const { showError } = useToast();
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const user_id = useSelector((state) => state?.auth?.user?.id);

  const handleSearch = (query) => {
    setSearch(query);
  };

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const handleRetry = () => {
    dispatch(fetchProjects());
  };

  const handleCreateProject = async (projectData) => {
    try {
      await dispatch(createProject({ projectData })).unwrap();
    } catch (error) {
      showError("Error Creating Project, Try Again Later");
    }
  };

  const handleDeleteProject = async (projectId) => {
    try {
      await dispatch(deleteProject({ projectId })).unwrap();
    } catch (error) {
      showError("Error Deleting Project, Try Again Later");
    }
  };

  const handleDuplicateProject = async (project) => {
    try {
      await dispatch(duplicateProject({ project })).unwrap();
    } catch (error) {
      showError("Error Duplicating Project, Try Again Later");
    }
  };

  // Filter and sort projects based on search query and filter
  const filter = useSelector((state) => state.filter.filter);

  // First filter by search, then sort
  const filteredProjects = (projects || []).filter(
    (project) =>
      project?.title &&
      project.title.toLowerCase().includes(search.toLowerCase())
  );

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (filter === "Ascending") {
      return a.title.localeCompare(b.title);
    } else if (filter === "Descending") {
      return b.title.localeCompare(a.title);
    } else {
      return (
        new Date(b.metadata.lastModified) - new Date(a.metadata.lastModified)
      );
    }
  });

  return (
    <div className="w-full min-h-fit bg-gray-50 rounded-xl p-4 sm:p-6 shadow-sm transition-all duration-300 ease-in-out overflow-hidden">
      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20">
          <FaSpinner className="text-5xl text-[#5664F5] animate-spin mb-4" />
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            Loading Projects...
          </h3>
          <p className="text-sm text-gray-500">Please wait a moment</p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <FaExclamationTriangle className="text-3xl text-red-500" />
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">
            Failed to Load Projects
          </h3>
          <p className="text-sm text-gray-600 mb-6 text-center max-w-md">
            {error || "Something went wrong. Please try again."}
          </p>
          <button
            onClick={handleRetry}
            className="bg-[#5664F5] text-white px-6 py-2.5 rounded-lg hover:bg-[#4451d9] transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 font-semibold"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Content - Only show when not loading and no error */}
      {!loading && !error && (
        <>
          {/* Header Section */}
          <div className="w-full mb-6">
            {/* Title and Create Button Row */}
            <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div className="flex-1">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">
                  Your Projects
                </h2>
                <p className="text-sm sm:text-base text-gray-600">
                  Manage and view all your active projects
                </p>
              </div>
              <button
                className="bg-[#5664F5] text-white flex items-center justify-center gap-1 px-4 py-2.5 rounded-lg hover:-translate-y-0.5 hover:shadow-lg transition-all hover:bg-[#4451d9] duration-200 whitespace-nowrap"
                onClick={() => setIsModalOpen(true)}
              >
                <AddIcon fontSize="small" />
                <span className="font-semibold">Create Project</span>
              </button>
            </div>

            {/* Search and Filter Row */}
            <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <p className="text-sm font-medium text-gray-700 whitespace-nowrap">
                  Search for Projects
                </p>
                <SearchInput handleSearch={handleSearch} />
              </div>

              {/* Filter Placeholder */}
              <div className="bg-gray-200 rounded-lg border border-gray-300">
                <Filter />
              </div>
            </div>
          </div>

          {/* Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6 auto-rows-fr w-full">
            {sortedProjects.map((project) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                title={project.title}
                description={project.description}
                metadata={project.metadata}
                color={project.color}
                onDelete={handleDeleteProject}
                onDuplicate={() => handleDuplicateProject(project)}
              />
            ))}
          </div>

          {/* Empty State (if no projects) */}
          {projects && projects.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-gray-500">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                <FaFolder className="text-2xl" />
              </div>
              <h3 className="text-lg font-medium mb-2">No projects yet</h3>
              <p className="text-sm">
                Create your first project to get started
              </p>
            </div>
          )}
        </>
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
