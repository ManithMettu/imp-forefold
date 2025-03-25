import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/index/index.tsx"),
  route("signup", "routes/auth/signup.tsx"),
  route("login", "routes/auth/login.tsx"),
  route("forgot-password", "routes/auth/forgot-password.tsx"),
  
  // Dashboard with nested routes
  route("dashboard", "routes/dashboard/index.tsx", [
    index("pages/dashboard-pages/home.tsx"),
    route("staffbook", "pages/dashboard-pages/staffbook.tsx"), 
    route("attendance", "pages/dashboard-pages/attendance.tsx"),
    route("payments", "pages/dashboard-pages/payments.tsx"),
    route("customer", "pages/dashboard-pages/customer.tsx"),
    // Employee onboarding routes
    route("add-employee", "components/main/emp-onboarding/employee-onboarding.tsx", [
      index("pages/emp-onboarding-forms/basic-Info-forms.tsx"),
      route("employment-details-form", "pages/emp-onboarding-forms/employment-details-form.tsx"),
      route("bank-kyc-details-forms", "pages/emp-onboarding-forms/bank-kyc-details-forms.tsx"),
      route("contract-agreement-form", "pages/emp-onboarding-forms/contract-agreement-form.tsx"),
    ]),
  ])
] satisfies RouteConfig;
