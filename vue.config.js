module.exports = {
    publicPath: '/',
    devServer: {
        host: '0.0.0.0',
        port: '80',
        hot: true,
        open: false,
        overlay: {
            warning: false,
            error: true
        },

        //跨域代理
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:8000',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api/': '/'
                }
            },
        },
    },
}