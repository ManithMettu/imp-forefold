import {
  Building,
  ChevronRight,
  ClipboardList,
  Home,
  Users,
} from "lucide-react";
import { cn } from "~/lib/utils";

export default function SolutionsSection() {
  const solutions = [
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
    <section id="solutions" className="reveal-element bg-gray-100 py-20">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="reveal-element mb-6 text-3xl font-bold md:text-4xl">
            Management Modules
          </h2>
          <p className="reveal-element text-lg leading-relaxed text-gray-600">
            Our comprehensive solution includes four specialized modules that
            work together to streamline your operations.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 md:gap-10">
          {solutions.map((solution, index) => (
            <div
              key={index}
              className="reveal-element group transform overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="overflow-hidden">
                <div
                  className={cn(
                    "flex h-48 w-full items-center justify-center bg-gradient-to-br p-6 transition-transform duration-500 group-hover:scale-105",
                    solution.cardGradient,
                  )}
                >
                  <div
                    className={cn(
                      "flex h-20 w-20 rotate-12 transform items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-0",
                      solution.iconGradient,
                    )}
                  >
                    <solution.icon size={36} className="text-white" />
                  </div>
                </div>
              </div>
              <div className="p-6 md:p-8">
                <h3 className="reveal-element mb-4 flex items-center text-xl font-bold md:text-2xl">
                  <span
                    className={cn(
                      "bg-gradient-to-r bg-clip-text text-transparent",
                      solution.iconGradient,
                    )}
                  >
                    {solution.title}
                  </span>
                </h3>
                <p className="reveal-element mb-6 leading-relaxed text-gray-600">
                  {solution.description}
                </p>
                <div className="mb-6 flex flex-wrap gap-2">
                  {solution.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href="#"
                  className={cn(
                    "inline-flex items-center font-medium transition-colors duration-300",
                    solution.linkColor,
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
          <button className="rounded-lg border border-gray-200 bg-white px-6 py-3 text-base font-medium text-gray-800 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
            Schedule a Custom Demo
          </button>
        </div>
      </div>
    </section>
  );
}
