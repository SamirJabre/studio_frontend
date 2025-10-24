import {
  FaRocket,
  FaCode,
  FaPuzzlePiece,
  FaBolt,
  FaCheckCircle,
} from "react-icons/fa";
import { MdEmail, MdApi, MdAccountTree } from "react-icons/md";

function About() {
  const features = [
    {
      icon: <MdAccountTree className="text-3xl" />,
      title: "Visual Workflow Builder",
      description:
        "Create complex automation workflows with an intuitive drag-and-drop node-based editor. No coding required.",
    },
    {
      icon: <MdEmail className="text-3xl" />,
      title: "Email Automation",
      description:
        "Send automated emails based on triggers and conditions. Perfect for notifications, marketing, and customer communication.",
    },
    {
      icon: <MdApi className="text-3xl" />,
      title: "API Integration",
      description:
        "Connect to external APIs and services. Make HTTP requests, process responses, and integrate with any web service.",
    },
    {
      icon: <FaPuzzlePiece className="text-3xl" />,
      title: "Conditional Logic",
      description:
        "Add smart decision-making to your workflows with conditional nodes. Route data based on custom rules and conditions.",
    },
    {
      icon: <FaBolt className="text-3xl" />,
      title: "Form Processing",
      description:
        "Capture user input with customizable forms. Process submissions and trigger automated workflows instantly.",
    },
    {
      icon: <FaCode className="text-3xl" />,
      title: "Real-time Execution",
      description:
        "Test and run your workflows in real-time. See results instantly and debug with live feedback.",
    },
  ];

  return (
    <div className="w-full min-h-fit bg-gray-50 rounded-xl p-6 sm:p-8 shadow-sm space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="w-12 h-12 bg-gradient-to-br from-[#5664F5] to-[#4451d9] rounded-xl flex items-center justify-center">
            <FaRocket className="text-white text-2xl" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800">
            AI Workflow Studio
          </h1>
        </div>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Build powerful automated workflows with a visual node-based editor.
          Connect actions, add logic, and automate your processes without
          writing a single line of code.
        </p>
      </div>

      {/* What is it Section */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <FaCheckCircle className="text-[#5664F5]" />
          What is AI Workflow Studio?
        </h2>
        <div className="space-y-3 text-gray-700 leading-relaxed">
          <p>
            <strong>AI Workflow Studio</strong> is a visual automation platform
            that lets you design and execute complex workflows using an
            intuitive drag-and-drop interface. Think of it as a canvas where you
            connect different actions (nodes) together to create automated
            processes.
          </p>
          <p>
            Whether you're automating email campaigns, processing form
            submissions, integrating with external APIs, or building conditional
            logic flows - Studio provides all the building blocks you need.
          </p>
          <p className="font-medium text-[#5664F5]">
            Perfect for marketers, developers, business analysts, and anyone who
            wants to automate repetitive tasks efficiently.
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-[#5664F5] to-[#4451d9] rounded-lg flex items-center justify-center text-white mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-gradient-to-br from-[#5664F5] to-[#4451d9] rounded-xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-6 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
              1
            </div>
            <h3 className="font-semibold">Create Project</h3>
            <p className="text-sm text-white/80">
              Start by creating a new workflow project
            </p>
          </div>
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
              2
            </div>
            <h3 className="font-semibold">Drag & Drop Nodes</h3>
            <p className="text-sm text-white/80">
              Add nodes from the left panel to the canvas
            </p>
          </div>
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
              3
            </div>
            <h3 className="font-semibold">Connect & Configure</h3>
            <p className="text-sm text-white/80">
              Link nodes together and set up their properties
            </p>
          </div>
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
              4
            </div>
            <h3 className="font-semibold">Run & Automate</h3>
            <p className="text-sm text-white/80">
              Execute your workflow and let automation handle the rest
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
