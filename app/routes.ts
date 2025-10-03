import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("editor", "routes/editor.tsx"),
  route("articles/new", "routes/articles.new.tsx"),
  route("articles/:id", "routes/articles.$id.tsx"),
  route("articles/:id/delete", "routes/articles.$id.delete.tsx"),
] satisfies RouteConfig;
