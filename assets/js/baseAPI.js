//每次调用ajax请求的时候，会先调用这个函数
//在这个函数中，可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    //在发起真正的ajax请求之前，同意拼接请求的根路径
    options.url = 'http://ajax.frontend.itheima.net' + options.url

    // 统一为有权限的接口设置请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    //全局统一挂载complete回调函数
    options.complete = function (res) {
        // console.log(res);
        if (res.responseJSON.status === 1 && res.responseJSON.message == '身份认证失败！') {
            // 1.强制清空token
            localStorage.removeItem('token')
            // 2.强制跳转到登录页面
            location.href = '/login.html'
        }
    }
})