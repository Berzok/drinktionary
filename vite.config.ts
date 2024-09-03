import legacy from '@vitejs/plugin-legacy';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

process.env = {...process.env, ...loadEnv('development', process.cwd())};

// https://vitejs.dev/config/
export default defineConfig({
    define: {
        'process.env': process.env,
        'APP_VERSION': JSON.stringify(process.env.npm_package_version),
    },
    plugins: [
        vue(),
        legacy()
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    test: {
        globals: true,
        environment: 'jsdom'
    }
})
