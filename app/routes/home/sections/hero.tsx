import { cn } from "~/lib/utils";

export default function HeroSection() {
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
    <section id="hero" className="relative pt-24 pb-20 md:pt-32 md:pb-32">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-center">
          <div className="mb-12 w-full md:mb-0 md:w-1/2 md:pr-12">
            <div className="max-w-xl">
              <h1 className="mb-6 text-4xl leading-tight font-bold tracking-tight md:text-5xl lg:text-6xl">
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Unified
                </span>
                <span> Business Operations Platform</span>
              </h1>
              <p className="mb-8 text-lg leading-relaxed text-gray-600 md:text-xl">
                Streamline your entire business workflow with our comprehensive
                management system. Track inventory, manage your workforce,
                maintain client relationships, and coordinate with vendors—all
                from one intuitive dashboard.
              </p>
              <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                <button className="rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-3 text-base font-medium text-white shadow-lg shadow-blue-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-500/30">
                  Start Free Trial
                </button>
                <button className="rounded-lg border border-gray-200 bg-white px-6 py-3 text-base font-medium text-gray-800 transition-all duration-300 hover:bg-gray-50">
                  Book a Demo
                </button>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <div className="relative rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-100 p-4 shadow-xl">
              <div className="aspect-[4/3] overflow-hidden rounded-lg bg-white shadow-lg">
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-500/10 to-indigo-500/10 p-6">
                  <div className="w-full max-w-md overflow-hidden rounded-lg bg-white shadow-lg">
                    <div className="flex h-12 items-center bg-blue-500 px-4">
                      <div className="flex space-x-2">
                        <div className="h-3 w-3 rounded-full bg-red-500"></div>
                        <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                        <div className="h-3 w-3 rounded-full bg-green-500"></div>
                      </div>
                      <div className="ml-4 text-sm text-white">
                        Payment Dashboard
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="mb-4 flex items-center justify-between">
                        <div className="h-6 w-2/3 rounded bg-gray-200"></div>
                        <div className="h-8 w-24 rounded-md bg-blue-500"></div>
                      </div>
                      <div className="mb-4 flex space-x-2">
                        <div className="h-8 w-32 rounded bg-blue-100"></div>
                        <div className="h-8 w-32 rounded bg-gray-200"></div>
                        <div className="h-8 w-32 rounded bg-gray-200"></div>
                      </div>
                      <div className="mb-4 grid grid-cols-2 gap-3">
                        <div className="h-24 rounded bg-blue-100 p-2">
                          <div className="mb-2 h-4 w-16 rounded bg-gray-300"></div>
                          <div className="mb-2 h-10 w-full rounded bg-white"></div>
                          <div className="h-4 w-full rounded bg-gray-200"></div>
                        </div>
                        <div className="h-24 rounded bg-indigo-100 p-2">
                          <div className="mb-2 h-4 w-16 rounded bg-gray-300"></div>
                          <div className="mb-2 h-10 w-full rounded bg-white"></div>
                          <div className="h-4 w-full rounded bg-gray-200"></div>
                        </div>
                        <div className="h-24 rounded bg-blue-100 p-2">
                          <div className="mb-2 h-4 w-16 rounded bg-gray-300"></div>
                          <div className="mb-2 h-10 w-full rounded bg-white"></div>
                          <div className="h-4 w-full rounded bg-gray-200"></div>
                        </div>
                        <div className="h-24 rounded bg-indigo-100 p-2">
                          <div className="mb-2 h-4 w-16 rounded bg-gray-300"></div>
                          <div className="mb-2 h-10 w-full rounded bg-white"></div>
                          <div className="h-4 w-full rounded bg-gray-200"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-6 -right-6 h-12 w-12 rotate-12 transform rounded-lg bg-yellow-500 shadow-lg"></div>
              <div className="absolute -bottom-4 -left-4 h-8 w-8 rounded-full bg-blue-500 shadow-lg"></div>
              <div className="absolute top-1/2 -right-2 h-12 w-4 -translate-y-1/2 transform rounded-full bg-indigo-500 shadow-lg"></div>
            </div>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="rounded-xl bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
            >
              <p className={cn("text-4xl font-bold", stat.color)}>
                {stat.value}
              </p>
              <p className="mt-2 text-sm text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
