import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] || "";
const isGitHubActions = process.env.GITHUB_ACTIONS === "true";
const isUserOrOrgPages = repoName.endsWith(".github.io");
const base = isGitHubActions && repoName && !isUserOrOrgPages ? `/${repoName}/` : "/";

export default defineConfig({
  plugins: [react()],
  base
});
