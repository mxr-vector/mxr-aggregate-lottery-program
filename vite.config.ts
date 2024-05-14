import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'
import {resolve} from 'path'
// https://vitejs.dev/config/
export default defineConfig({
    base: './',
    build: {
        outDir: "dist",
        assetsDir: "assets", //指定静态资源存放路径
        sourcemap: true, //是否构建source map 文件
        terserOptions: {
            // 生产环境移除console
            compress: {
                drop_console: true,
                drop_debugger: true,
            },
        }
    },
    plugins: [
        vue(),
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        })],
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src')
        }
    }
})
