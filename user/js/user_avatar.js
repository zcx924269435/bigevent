$(function () {
    var layer = layui.layer
    // 获取裁剪区域的DOM元素
    var $image = $('#image')
    // 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }
    // 创建裁剪区域
    $image.cropper(options)

    // 为上传按钮添加绑定事件
    $('#btnChooseImage').on('click', function () {
        $('#file').click()
    })
    // 实现裁剪区图片的替换
    $('#file').on('change', function (e) {
        // 获取用户选择的头像
        var filelist = e.target.files
        if (filelist.length === 0) {
            return layer.msg('请选择照片！')
        }
        // 拿到用户选择的文件
        var file = e.target.files[0]
        // 将文件转换路径
        var imgURL = URL.createObjectURL(file)
        // 重新初始化裁剪区域
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', imgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域

    })

    // 将裁剪后的头像上传至服务器
    $('#btnUpload').on('click', function () {
        // 拿到用户裁剪后的头像
        var dataURL = $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        // 发送ajax请求
        $.ajax({
            method: 'post',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更换头像失败！')
                }
                layer.msg('更换头像成功！')
                window.parent.getUserinfo()
            }
        })
    })
})