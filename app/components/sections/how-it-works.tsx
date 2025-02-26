export default function HowItWorks() {
  return (
    <section className="py-20 bg-gray-100">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">How It Works</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Our platform is designed to simplify management across the entire
            payment lifecycle.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xl font-bold mx-auto mb-4">
              1
            </div>
            <h3 className="text-xl font-bold mb-3">Configure Your Account</h3>
            <p className="text-gray-600">
              Set up your payment settings, integration options, and user
              permissions with our guided setup process.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xl font-bold mx-auto mb-4">
              2
            </div>
            <h3 className="text-xl font-bold mb-3">Access Modules</h3>
            <p className="text-gray-600">
              Navigate to the specific module you need - inventory, worker,
              client management, or vendor management.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xl font-bold mx-auto mb-4">
              3
            </div>
            <h3 className="text-xl font-bold mb-3">Track & Optimize</h3>
            <p className="text-gray-600">
              Monitor operations, make data-driven decisions, and optimize your
              processes for maximum efficiency.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
