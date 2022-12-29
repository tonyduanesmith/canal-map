import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import path from "path";

const root = path.resolve(__dirname, "./packages/app/canalMap");
const src = path.resolve(root, "src");
const publicDir = path.resolve(root, "public");

// https://vitejs.dev/config/
export default defineConfig({
  root: src,
  publicDir,
  plugins: [svgr(), react()],
});
