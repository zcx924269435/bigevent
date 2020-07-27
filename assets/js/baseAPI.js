//每次调用ajax请求的时候，会先调用这个函数
//在这个函数中，可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    //在发起真正的ajax请求之前，同意拼接请求的根路径
    options.url = 'http://ajax.frontend.itheima.net'+options.url
})