import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import { useSelector, useDispatch } from "react-redux";
import { toggleLeftPanel } from "../Redux/Slices/leftPanelSlice.js";
function LeftPanel() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.leftPanel.isOpen);

  const handleToggle = () => {
    dispatch(toggleLeftPanel());
  };

  return (
    <div
      className={`h-full ${
        isOpen ? "w-72" : "w-16"
      } bg-blue-50 flex flex-col justify-start p-5 items-center transition-all ease-in-out`}
    >
      <button
        onClick={handleToggle}
        className={`border rounded-md p-2 transition-all hover:bg-[#5664F5] mb-4 ${
          isOpen ? "self-end" : ""
        }`}
      >
        <OpenInFullIcon color="action" />
      </button>
      {isOpen && <h1 className="text-2xl font-bold">Left Panel</h1>}
    </div>
  );
}

export default LeftPanel;
