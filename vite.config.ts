import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'
import legacyPlugin from '@vitejs/plugin-legacy'
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
        }),
        legacyPlugin({ // 不在服务器部署，直接双击启动插件
            targets: ['Android > 39', 'Chrome >= 60', 'Safari >= 10.1', 'iOS >= 10.3', 'Firefox >= 54', 'Edge >= 15'],
        })
    ],
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src')
        }
    }
})
