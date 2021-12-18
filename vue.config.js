module.exports = {//扩展配置
    configureWebpack: {
        //vue-cli3.0 里面的 vue.config.js做配置
        devServer: {
            proxy: {
                '/api': {     
                    target: 'http://82.156.28.204:8081',  // 后台接口域名
                    ws: true,        //如果要代理 websockets，配置这个参数
                    secure: false,  // 如果是https接口，需要配置这个参数
                    changeOrigin: true,  //是否跨域
                    pathRewrite: {
                        '^/api': ''
                    }
                }
            }  
        }
    }
}
