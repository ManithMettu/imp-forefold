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
    <section id="pricing" className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg leading-relaxed text-gray-600">
            Choose the plan that's right for your business, with no hidden fees
            or surprises.
          </p>

          <div className="mt-8 flex items-center justify-center">
            <span
              className={cn(
                "mr-3 text-sm font-medium",
                selectedPlan === "monthly" ? "text-blue-600" : "text-gray-500",
              )}
            >
              Monthly
            </span>
            <button
              onClick={() =>
                setSelectedPlan(
                  selectedPlan === "monthly" ? "yearly" : "monthly",
                )
              }
              className="relative flex h-7 w-14 items-center rounded-full bg-blue-100 transition duration-300 focus:outline-none"
            >
              <span
                className={cn(
                  "h-5 w-5 transform rounded-full bg-blue-600 shadow-md transition-transform duration-300",
                  selectedPlan === "yearly" ? "translate-x-8" : "translate-x-1",
                )}
              />
            </button>
            <span
              className={cn(
                "ml-3 text-sm font-medium",
                selectedPlan === "yearly" ? "text-blue-600" : "text-gray-500",
              )}
            >
              Yearly&nbsp;
              <span className="text-xs font-medium text-green-500">
                (Save 20%)
              </span>
            </span>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={cn(
                "overflow-hidden rounded-2xl transition-all duration-300",
                plan.highlighted
                  ? "transform border-2 border-blue-500 shadow-xl hover:-translate-y-2"
                  : "transform border border-gray-200 shadow-lg hover:-translate-y-1 hover:shadow-xl",
              )}
            >
              {plan.highlighted && (
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 py-2 text-center text-sm font-medium text-white">
                  Most Popular
                </div>
              )}
              <div className="bg-white p-6 md:p-8">
                <h3 className="mb-2 text-xl font-bold">{plan.name}</h3>
                <p className="mb-6 h-12 text-gray-600">{plan.description}</p>
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

                <ul className="mb-8 space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check
                        size={18}
                        className="mt-0.5 mr-2 flex-shrink-0 text-green-500"
                      />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={cn(
                    "w-full rounded-lg py-3 text-base font-medium transition-all duration-300",
                    plan.ctaColor,
                  )}
                >
                  {plan.cta}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-2xl bg-gray-100 p-8 text-center shadow-inner">
          <h3 className="mb-3 text-xl font-bold">Need a custom solution?</h3>
          <p className="mb-6 text-gray-600">
            We offer tailored packages for enterprise businesses with specific
            requirements.
          </p>
          <button className="rounded-lg border border-gray-200 bg-white px-6 py-3 text-base font-medium text-gray-800 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
            Contact our Sales Team
          </button>
        </div>
      </div>
    </section>
  );
}
