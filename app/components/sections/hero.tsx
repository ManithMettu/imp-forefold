import { cn } from "~/lib/utils";

export default function Hero() {
  const stats = [
    {
      value: "10M+",
      label: "Tasks Managed",
      color: "text-blue-600",
    },
    {
      value: "99.9%",
      label: "Uptime Guarantee",
      color: "text-indigo-600",
    },
    {
      value: "85%",
      label: "Efficiency Increase",
      color: "text-blue-600",
    },
    {
      value: "24/7",
      label: "Support",
      color: "text-indigo-600",
    },
  ];

  return (
    <section id="home" className="relative pt-24 pb-20 md:pt-32 md:pb-32">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-center">
          <div className="w-full md:w-1/2 mb-12 md:mb-0 md:pr-12">
            <div className="max-w-xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                  Unified
                </span>
                <span> Business Operations Platform</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
                Streamline your entire business workflow with our comprehensive
                management system. Track inventory, manage your workforce,
                maintain client relationships, and coordinate with vendors—all
                from one intuitive dashboard.
              </p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <button className="px-6 py-3 rounded-lg text-base font-medium bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-0.5 transition-all duration-300">
                  Start Free Trial
                </button>
                <button className="px-6 py-3 rounded-lg text-base font-medium bg-white text-gray-800 border border-gray-200 hover:bg-gray-50 transition-all duration-300">
                  Book a Demo
                </button>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <div className="relative bg-gradient-to-br from-blue-100 to-indigo-100 p-4 rounded-2xl shadow-xl">
              <div className="aspect-[4/3] rounded-lg overflow-hidden bg-white shadow-lg">
                <div className="w-full h-full bg-gradient-to-br from-blue-500/10 to-indigo-500/10 flex items-center justify-center p-6">
                  <div className="w-full max-w-md bg-white rounded-lg overflow-hidden shadow-lg">
                    <div className="h-12 bg-blue-500 flex items-center px-4">
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      </div>
                      <div className="text-white text-sm ml-4">
                        Payment Dashboard
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-4">
                        <div className="h-6 w-2/3 bg-gray-200 rounded"></div>
                        <div className="h-8 w-24 bg-blue-500 rounded-md"></div>
                      </div>
                      <div className="flex space-x-2 mb-4">
                        <div className="h-8 w-32 bg-blue-100 rounded"></div>
                        <div className="h-8 w-32 bg-gray-200 rounded"></div>
                        <div className="h-8 w-32 bg-gray-200 rounded"></div>
                      </div>
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="h-24 bg-blue-100 rounded p-2">
                          <div className="h-4 w-16 bg-gray-300 rounded mb-2"></div>
                          <div className="h-10 w-full bg-white rounded mb-2"></div>
                          <div className="h-4 w-full bg-gray-200 rounded"></div>
                        </div>
                        <div className="h-24 bg-indigo-100 rounded p-2">
                          <div className="h-4 w-16 bg-gray-300 rounded mb-2"></div>
                          <div className="h-10 w-full bg-white rounded mb-2"></div>
                          <div className="h-4 w-full bg-gray-200 rounded"></div>
                        </div>
                        <div className="h-24 bg-blue-100 rounded p-2">
                          <div className="h-4 w-16 bg-gray-300 rounded mb-2"></div>
                          <div className="h-10 w-full bg-white rounded mb-2"></div>
                          <div className="h-4 w-full bg-gray-200 rounded"></div>
                        </div>
                        <div className="h-24 bg-indigo-100 rounded p-2">
                          <div className="h-4 w-16 bg-gray-300 rounded mb-2"></div>
                          <div className="h-10 w-full bg-white rounded mb-2"></div>
                          <div className="h-4 w-full bg-gray-200 rounded"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-6 -right-6 w-12 h-12 bg-yellow-500 rounded-lg shadow-lg transform rotate-12"></div>
              <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-blue-500 rounded-full shadow-lg"></div>
              <div className="absolute top-1/2 -right-2 w-4 h-12 bg-indigo-500 rounded-full shadow-lg transform -translate-y-1/2"></div>
            </div>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <p className={cn("text-4xl font-bold", stat.color)}>
                {stat.value}
              </p>
              <p className="text-sm text-gray-600 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
