export default function CtaSection() {
  return (
    <section id="cta" className="bg-gray-100 py-20">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-xl">
          <div className="relative px-6 py-12 md:p-12 lg:p-16">
            <div className="relative z-10 mx-auto max-w-3xl text-center">
              <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
                Ready to revolutionize your payment processes?
              </h2>
              <p className="mb-8 text-lg text-blue-100">
                Join leading businesses who trust Payments360° to manage their
                operations more efficiently.
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <button className="rounded-lg bg-white px-6 py-3 text-base font-medium text-blue-600 shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-50 hover:shadow-xl">
                  Start Free Trial
                </button>
                <button className="rounded-lg bg-blue-400/20 px-6 py-3 text-base font-medium text-white backdrop-blur-sm transition-all duration-300 hover:bg-blue-400/30">
                  Schedule Demo
                </button>
              </div>
            </div>

            <div className="pointer-events-none absolute top-0 left-0 h-full w-full overflow-hidden">
              <div className="absolute -top-16 -left-16 h-64 w-64 rounded-full bg-blue-600/20 blur-3xl"></div>
              <div className="absolute -right-32 -bottom-32 h-80 w-80 rounded-full bg-indigo-600/20 blur-3xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
