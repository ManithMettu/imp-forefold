export default function CTA() {
  return (
    <section className="py-20 bg-gray-100">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl overflow-hidden shadow-xl">
          <div className="px-6 py-12 md:p-12 lg:p-16 relative">
            <div className="max-w-3xl mx-auto text-center relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to revolutionize your payment processes?
              </h2>
              <p className="text-blue-100 text-lg mb-8">
                Join leading businesses who trust Payments360° to manage their
                operations more efficiently.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button className="px-6 py-3 rounded-lg text-base font-medium bg-white text-blue-600 hover:bg-blue-50 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                  Start Free Trial
                </button>
                <button className="px-6 py-3 rounded-lg text-base font-medium bg-blue-400/20 text-white hover:bg-blue-400/30 transition-all duration-300 backdrop-blur-sm">
                  Schedule Demo
                </button>
              </div>
            </div>

            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
              <div className="absolute -top-16 -left-16 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
