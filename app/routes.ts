import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/index/index.tsx"),
  route("signup", "routes/auth/signup.tsx"),
  route("login", "routes/auth/login.tsx"),
] satisfies RouteConfig;
