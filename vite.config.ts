import dotenv from "dotenv";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import path from "path";

const envPath = path.resolve(__dirname, '.env.local');
const envConfig = dotenv.config({ path: envPath }).parsed;
const viteEnv = Object.fromEntries(
  Object.entries(envConfig || {}).filter(([key]) => key.startsWith('VITE_'))
);



const root = path.resolve(__dirname, "./packages/app/canalMap");
const src = path.resolve(root, "src");
const publicDir = path.resolve(root, "public");

// https://vitejs.dev/config/
export default defineConfig({
  root: src,
  publicDir,
  plugins: [svgr(), react()],
  build: {
    chunkSizeWarningLimit: 10000,
    outDir: path.resolve(__dirname, "dist"),
  },
    define: {
    'import.meta.env': {
      ...viteEnv,
      ...Object.fromEntries(
        Object.entries(process.env).filter(([key]) => key.startsWith('VITE_'))
      ),
    },
  },
});
