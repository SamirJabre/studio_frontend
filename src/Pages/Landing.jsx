import { useNavigate } from "react-router";
import logo from "../Assets/Logo/StudioLogo.png";
import { FiZap, FiLayers, FiCode, FiUsers, FiGitBranch } from "react-icons/fi";
import { BsArrowRight } from "react-icons/bs";

function Landing() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <FiGitBranch className="w-8 h-8" />,
      title: "Visual Workflow Builder",
      description:
        "Create complex workflows with an intuitive drag-and-drop interface",
    },
    {
      icon: <FiZap className="w-8 h-8" />,
      title: "Lightning Fast",
      description: "Build and deploy your projects in minutes, not hours",
    },
    {
      icon: <FiLayers className="w-8 h-8" />,
      title: "Modular Design",
      description: "Reusable components and nodes for maximum efficiency",
    },
    {
      icon: <FiCode className="w-8 h-8" />,
      title: "Developer Friendly",
      description: "Clean code generation and API integrations out of the box",
    },
    {
      icon: <FiUsers className="w-8 h-8" />,
      title: "Collaboration",
      description: "Work together with your team in real-time",
    },
    {
      icon: <FiLayers className="w-8 h-8" />,
      title: "Scalable",
      description: "From small projects to enterprise solutions",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="w-full bg-white/80 backdrop-blur-md shadow-sm fixed top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <div className="flex items-center gap-2">
              <img
                src={logo}
                alt="Studio Logo"
                className="h-10 w-10 sm:h-12 sm:w-12 object-contain"
              />
              <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Studio
              </span>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 text-sm sm:text-base font-medium text-blue-600 hover:text-blue-700 transition-colors"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                className="px-4 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-base font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 sm:pt-40 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6 animate-slideIn">
              <FiZap className="w-4 h-4" />
              <span>The Future of Workflow Automation</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Build Powerful Workflows
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Without Writing Code
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Studio empowers you to create, visualize, and deploy complex
              workflows with an intuitive drag-and-drop interface. Transform
              your ideas into reality faster than ever before.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <button
                onClick={() => navigate("/register")}
                className="w-full sm:w-auto px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                Get Started Free
                <BsArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => navigate("/login")}
                className="w-full sm:w-auto px-8 py-4 text-lg font-semibold text-gray-700 bg-white rounded-xl hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl border-2 border-gray-200"
              >
                Sign In
              </button>
            </div>

            {/* Hero Image Placeholder / Decorative Element */}
            <div className="relative max-w-5xl mx-auto">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-2xl p-1">
                <div className="bg-white rounded-xl p-8 sm:p-12">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                      <FiGitBranch className="w-12 h-12 text-blue-600" />
                    </div>
                    <div className="h-24 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg flex items-center justify-center">
                      <FiCode className="w-12 h-12 text-purple-600" />
                    </div>
                    <div className="h-24 bg-gradient-to-br from-blue-100 to-purple-200 rounded-lg flex items-center justify-center">
                      <FiZap className="w-12 h-12 text-blue-600" />
                    </div>
                  </div>
                  <div className="mt-4 h-32 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                    <span className="text-gray-400 font-medium">
                      Visual Workflow Canvas
                    </span>
                  </div>
                </div>
              </div>
              {/* Floating Elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
              <div
                className="absolute -bottom-4 -right-4 w-24 h-24 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"
                style={{ animationDelay: "1s" }}
              ></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Everything You Need
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Powerful features that make workflow automation simple and
              efficient
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-6 sm:p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200 transform hover:-translate-y-2"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center mb-4 text-blue-600 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl shadow-2xl p-8 sm:p-12 text-center relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
            </div>

            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Join thousands of developers and teams building amazing
                workflows with Studio
              </p>
              <button
                onClick={() => navigate("/register")}
                className="px-8 py-4 text-lg font-semibold text-blue-600 bg-white rounded-xl hover:bg-gray-50 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1 inline-flex items-center gap-2"
              >
                Create Free Account
                <BsArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 bg-white/80 backdrop-blur-md border-t border-gray-200">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <img
              src={logo}
              alt="Studio Logo"
              className="h-8 w-8 object-contain"
            />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Studio
            </span>
          </div>
          <p className="text-gray-600">
            © {new Date().getFullYear()} Studio. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
