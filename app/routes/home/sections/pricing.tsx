import { Check } from "lucide-react";
import { useState } from "react";
import { cn } from "~/lib/utils";

export default function PricingSection() {
  const [selectedPlan, setSelectedPlan] = useState("monthly");
  const pricingPlans = [
    {
      name: "Starter",
      description: "Perfect for small businesses just getting started",
      monthlyPrice: 49,
      yearlyPrice: 470,
      features: [
        "Basic inventory management",
        "Up to 5 team members",
        "Client portal",
        "Email support",
        "1,000 monthly transactions",
      ],
      cta: "Start Free Trial",
      highlighted: false,
      ctaColor:
        "bg-white text-blue-600 border border-gray-200 hover:bg-gray-50",
    },
    {
      name: "Professional",
      description: "Ideal for growing businesses with expanding needs",
      monthlyPrice: 99,
      yearlyPrice: 950,
      features: [
        "Advanced inventory management",
        "Up to 20 team members",
        "Client & vendor portals",
        "Priority email support",
        "10,000 monthly transactions",
        "Custom reporting",
      ],
      cta: "Start Free Trial",
      highlighted: true,
      ctaColor:
        "bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:shadow-lg",
    },
    {
      name: "Enterprise",
      description: "For large organizations with complex requirements",
      monthlyPrice: 299,
      yearlyPrice: 2870,
      features: [
        "Complete management suite",
        "Unlimited team members",
        "Dedicated account manager",
        "24/7 phone & email support",
        "Unlimited transactions",
        "Advanced analytics",
        "Custom integrations",
      ],
      cta: "Contact Sales",
      highlighted: false,
      ctaColor:
        "bg-white text-blue-600 border border-gray-200 hover:bg-gray-50",
    },
  ];

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Choose the plan that's right for your business, with no hidden fees
            or surprises.
          </p>

          <div className="flex items-center justify-center mt-8">
            <span
              className={cn(
                "text-sm font-medium mr-3",
                selectedPlan === "monthly" ? "text-blue-600" : "text-gray-500"
              )}
            >
              Monthly
            </span>
            <button
              onClick={() =>
                setSelectedPlan(
                  selectedPlan === "monthly" ? "yearly" : "monthly"
                )
              }
              className="relative rounded-full w-14 h-7 bg-blue-100 flex items-center transition duration-300 focus:outline-none"
            >
              <span
                className={cn(
                  "w-5 h-5 rounded-full bg-blue-600 shadow-md transform transition-transform duration-300",
                  selectedPlan === "yearly" ? "translate-x-8" : "translate-x-1"
                )}
              />
            </button>
            <span
              className={cn(
                "text-sm font-medium ml-3",
                selectedPlan === "yearly" ? "text-blue-600" : "text-gray-500"
              )}
            >
              Yearly&nbsp;
              <span className="text-xs text-green-500 font-medium">
                (Save 20%)
              </span>
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={cn(
                "rounded-2xl overflow-hidden transition-all duration-300",
                plan.highlighted
                  ? "shadow-xl border-2 border-blue-500 transform hover:-translate-y-2"
                  : "shadow-lg border border-gray-200 hover:shadow-xl transform hover:-translate-y-1"
              )}
            >
              {plan.highlighted && (
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-center py-2 text-sm font-medium">
                  Most Popular
                </div>
              )}
              <div className="p-6 md:p-8 bg-white">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-6 h-12">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold">
                    $
                    {selectedPlan === "monthly"
                      ? plan.monthlyPrice
                      : plan.yearlyPrice}
                  </span>
                  <span className="text-gray-600">
                    /{selectedPlan === "monthly" ? "month" : "year"}
                  </span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check
                        size={18}
                        className="text-green-500 mr-2 flex-shrink-0 mt-0.5"
                      />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={cn(
                    "w-full py-3 rounded-lg text-base font-medium transition-all duration-300",
                    plan.ctaColor
                  )}
                >
                  {plan.cta}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center p-8 bg-gray-100 rounded-2xl shadow-inner">
          <h3 className="text-xl font-bold mb-3">Need a custom solution?</h3>
          <p className="text-gray-600 mb-6">
            We offer tailored packages for enterprise businesses with specific
            requirements.
          </p>
          <button className="px-6 py-3 rounded-lg text-base font-medium bg-white text-gray-800 border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
            Contact our Sales Team
          </button>
        </div>
      </div>
    </section>
  );
}
