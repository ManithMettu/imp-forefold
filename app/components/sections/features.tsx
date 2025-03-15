import {
  Building,
  ChevronRight,
  ClipboardList,
  Home,
  Users,
} from "lucide-react";
import { cn } from "~/lib/utils";

export default function Features() {
  const modules = [
    {
      title: "Inventory Management",
      description:
        "Track and manage all materials, equipment, and resources related to your business. Monitor stock levels, automate purchase orders, and reduce waste.",
      tags: ["Material tracking", "Stock alerts", "Vendor management"],
      icon: ClipboardList,
      cardGradient: "from-blue-500/20 to-cyan-500/20",
      iconGradient: "from-blue-500 to-cyan-500",
      linkColor: "text-blue-600 hover:text-blue-800",
    },
    {
      title: "Worker Management",
      description:
        "Efficiently manage your workforce with digital timesheets, attendance tracking, and performance monitoring. Ensure optimal resource allocation across projects.",
      tags: ["Timesheets", "Attendance tracking", "Skill management"],
      icon: Users,
      cardGradient: "from-indigo-500/20 to-purple-500/20",
      iconGradient: "from-indigo-500 to-purple-500",
      linkColor: "text-indigo-600 hover:text-indigo-800",
    },
    {
      title: "Client Management",
      description:
        "Manage clients with a robust CRM system. Track leads, manage communications, and streamline the sales process for improved customer relationships.",
      tags: ["Lead tracking", "Document management", "Sales pipeline"],
      icon: Home,
      cardGradient: "from-blue-500/20 to-indigo-500/20",
      iconGradient: "from-blue-500 to-indigo-500",
      linkColor: "text-blue-600 hover:text-blue-800",
    },
    {
      title: "Vendor Management",
      description:
        "Streamline your procurement process with comprehensive vendor management. Track suppliers, manage purchase orders, and ensure timely delivery of materials.",
      tags: ["Supplier database", "Purchase orders", "Material procurement"],
      icon: Building,
      cardGradient: "from-green-500/20 to-teal-500/20",
      iconGradient: "from-green-500 to-teal-500",
      linkColor: "text-green-600 hover:text-green-800",
    },
  ];

  return (
    <section id="solutions" className="py-20 bg-gray-100 reveal-element">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 reveal-element">
            Management Modules
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed reveal-element">
            Our comprehensive solution includes four specialized modules that
            work together to streamline your operations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-10">
          {modules.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 reveal-element group"
            >
              <div className="overflow-hidden">
                <div
                  className={cn(
                    "w-full h-48 bg-gradient-to-br flex items-center justify-center p-6 group-hover:scale-105 transition-transform duration-500",
                    feature.cardGradient,
                  )}
                >
                  <div
                    className={cn(
                      "w-20 h-20 bg-gradient-to-br rounded-2xl shadow-lg flex items-center justify-center text-white transform rotate-12 group-hover:rotate-0 group-hover:scale-110 transition-all duration-500",
                      feature.iconGradient,
                    )}
                  >
                    <feature.icon size={36} className="text-white" />
                  </div>
                </div>
              </div>
              <div className="p-6 md:p-8">
                <h3 className="text-xl md:text-2xl font-bold mb-4 flex items-center reveal-element">
                  <span
                    className={cn(
                      "bg-clip-text text-transparent bg-gradient-to-r",
                      feature.iconGradient,
                    )}
                  >
                    {feature.title}
                  </span>
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6 reveal-element">
                  {feature.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {feature.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href="#"
                  className={cn(
                    "inline-flex items-center font-medium transition-colors duration-300",
                    feature.linkColor,
                  )}
                >
                  Learn more
                  <ChevronRight size={16} className="ml-1" />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="px-6 py-3 rounded-lg text-base font-medium bg-white text-gray-800 border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
            Schedule a Custom Demo
          </button>
        </div>
      </div>
    </section>
  );
}
