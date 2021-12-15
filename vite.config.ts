import type { UserConfigFn, UserConfig } from "vite";
import dts from 'vite-dts'
import path from 'path';
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import mkcert from "vite-plugin-mkcert";

const defineConfig: UserConfigFn = ({ command, mode }) => {
  const config: UserConfig = {
    server: {
      https: true,
    },
    plugins: [
      react(),
      tsconfigPaths(),
      mkcert({
        source: "coding",
      }),
      dts(),
    ],
    build: {
      lib: {
        entry: path.resolve(__dirname, 'src/index.ts'),
        name: 'EmbeddedBind',
        formats: [
          'cjs',
          'es',
          'iife',
          'umd'
        ],
      },
      rollupOptions: {
        external: ['react', 'react-dom'],
        output: {
          globals: {
            'react': 'react',
            'react-dom': 'react-dom'
          },
          // Since we publish our ./src folder, there's no point
          // in bloating sourcemaps with another copy of it.
          sourcemapExcludeSources: true,
        },
      },
      sourcemap: true,
      // Reduce bloat from legacy polyfills.
      target: 'esnext',
    },
  };
  return config;
};

export default defineConfig;
