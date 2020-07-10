function getIPAdress(){
  var interfaces = require('os').networkInterfaces();
  for(var devName in interfaces){
    var iface = interfaces[devName];
    for(var i=0;i<iface.length;i++){
      var alias = iface[i];
      if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){
        return alias.address;
      }
    }
  }
}

module.exports = {
  // baseUrl: process.env.NODE_ENV === 'production' ? '/online/' : '/',
	publicPath:'./',//vue-cli3.3+新版本使用
	// eslint-loader 是否在保存的时候检查
	lintOnSave: true,
	//放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
	assetsDir: 'static',
  // outputDir: 在npm run build时 生成文件的目录 type:string, default:'dist'
  outputDir: 'blogDist',
  // pages:{ type:Object,Default:undfind }
	//生产环境是否生成 sourceMap 文件，一般情况不建议打开
  productionSourceMap: false,
  css:{
		// 是否使用css分离插件
		extract: true,
		// 开启 CSS source maps，一般不建议开启
    sourceMap: false,
	},
  devServer: {
    port: 1818, // 端口号
    // host: getIPAdress(),
    host: 'localhost',
    https: false, // https:{type:Boolean}
    open: false, //配置自动启动浏览器
    hot:true,//配置热更新
    compress: true,
    // index:'/backgroundPage.html',//启动项目默认跳转页面地址
    index:'/showPage.html',//启动项目默认跳转页面地址
    // proxy: {        //跨域代理
    //   '/api': {
    //     target: 'http://127.0.0.1:3000/',        //baseURL
    //     changeOrigin: true,               //是否开启跨域
    //     pathRewrite: {
    //       '^/api': ''          //让路径以/api开头的字段为空
    //     }
    //   }
    // }
  },
  pages:{
    index: {
      // 应用入口配置，相当于单页面应用的main.js，必需项
      entry: 'src/page_config/index/main.js',
  
      // 应用的模版，相当于单页面应用的public/index.html，可选项，省略时默认与模块名一致
      template: 'public/index.html',
  
      // 编译后在dist目录的输出文件名，可选项，省略时默认与模块名一致
      filename: 'index.html',
    },
    backgroundPage: {
      // page 的入口
      entry: 'src/page_config/backgroundPage/main.js',
  
      // 应用的模版，相当于单页面应用的public/index.html，可选项，省略时默认与模块名一致
      template: 'public/backgroundPage.html',
  
      // 编译后在dist目录的输出文件名，可选项，省略时默认与模块名一致
      filename: 'backgroundPage.html',
    },
    showPage: {
      // page 的入口
      entry: 'src/page_config/showPage/main.js',
  
      // 应用的模版，相当于单页面应用的public/index.html，可选项，省略时默认与模块名一致
      template: 'public/showPage.html',
  
      // 编译后在dist目录的输出文件名，可选项，省略时默认与模块名一致
      filename: 'showPage.html',
    },
  },
  
}