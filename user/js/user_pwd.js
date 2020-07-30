$(function () {
    var form = layui.form
    var layer = layui.layer
    // 为密码框添加三个自定义校验规则
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        samePwd: function (value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新旧密码不能相同！'
            }
        },
        rePwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次密码不一致'
            }
        }
    })
    // 设置监听事件实现重置密码的功能
    $('.layui-form').on('submit', function (e) {
        //阻止表单默认行为
        e.preventDefault()
        // 发送ajax请求
        $.ajax({
            method: 'post',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('重置密码失败！')
                }
                layer.msg('重置密码成功！')
                // 重置表单
                $('.layui-form')[0].reset()
            }
        })
    })
})