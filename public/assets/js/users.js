
// 显示用户列表
var getAry = []
$.ajax({
    type: 'get',
    url: '/users',
    success: function (res) {
        getAry = res
        // console.log(getAry);
        render()
    }
});
// 渲染到页面函数
function render() {
    var html = template('tpl', { data: getAry });
    $('tbody').html(html)
}
// 头像上传功能
$('#avatar').on('change', function () {
    let formData = new FormData();
    formData.append('avatar', this.files[0]);
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        // 只要通过jq的ajax来上传图片需要添加一下两个属性来阻止浏览器解析图片
        processData: false,
        contentType: false,
        success: function (res) {
            // console.log(res[0].avatar);    
            $('#pic').attr('src', res[0].avatar);
            $('#hidden').val(res[0].avatar);
        }
    })
});
// 添加用户功能

$('#btnAdd').on('click', function () {
    let data = $("form").serialize();
    $.ajax({
        type: 'post',
        url: '/users',
        data: data,
        success: function (res) {
            getAry.unshift(res)
            render();
            // 将表单数据清空
            clear()
        }
    })
})
// 清空表单数据
function clear() {
    $('input[name="email"]').prop('disabled', false).val('');
    $('input[name="nickName"]').val('');
    $('input[name="password"]').prop('disabled', false).val('');
    $('#status0').prop('checked', false);
    $('#status1').prop('checked', false);
    $('#admin').prop('checked', false);
    $('#normal').prop('checked', false);
    $('#hidden').val('')
    $('#pic').attr('src', '../assets/img/default.png')
}
// 点击编辑按钮获取信息显示到左边信息栏
// 英文按钮是后面添加的所以需要用到事件委托
var usrId
$('tbody').on('click', '.edit', function () {
    usrId = $(this).attr('data-id')
    $('h2').html('编辑用户');
    let tr = $(this).parents('tr');
    $('#pic').attr('src', tr.find('img').attr('src'))
    $('#hidden').val(tr.find('img').attr('src'));
    $('input[name="email"]').prop('disabled', true).val(tr.children().eq(2).text());
    $('input[name="nickName"]').val(tr.children().eq(3).text());
    $('input[name="password"]').prop('disabled', true);
    if (tr.children().eq(4).text() == '激活') {
        $('#status1').prop('checked', true);
    } else {
        $('#status0').prop('checked', true);
    }
    if (tr.children().eq(5).text() == '超级管理员') {
        $('#admin').prop('checked', true);
    } else {
        $('#normal').prop('checked', true);
    }
    $('#btnAdd').hide()
    $('#btnedit').show()
    // getAry.find(function(item){
    //     // console.log(item);

    // })
    // console.log();    
})
// 修改用户信息功能
$('#btnedit').on('click', function () {
    let data = $('form').serialize();
    $.ajax({
        type: 'PUT',
        url: '/users/' + usrId,
        data: data,
        success: function (res) {
            // console.log(res);
            let index = getAry.findIndex(itme => itme._id == res._id)
            getAry[index] = res
            render();
            clear();
            $('h2').text('添加新用户');
            $('#btnAdd').show();
            $('#btnedit').hide();
        }
    })
})
// 单个删除功能
$('tbody').on('click', '.del', function () {
    let id = $(this).siblings('.edit').attr('data-id')
    // console.log(id);
    if (confirm('确实删除此用户吗？')) {
        $.ajax({
            type: 'delete',
            url: '/users/' + id,
            success: function (res) {
                let index = getAry.findIndex(itme => itme._id == res._id)
                getAry.splice(index, 1);
                render()
            }
        })
    }
})
// 多个删除功能
$('#checkAll').on('change', function () {
    // 获取复选框按钮的状态
    let status = $(this).prop('checked');
    // 找到所有小的复选框状态跟随总复选框的状态发生变化
    $('tbody').find('input').prop('checked', status);
    //    如果是选中状态就显示批量删除按钮，否则就隐藏
    if (status) {
        $('#delmany').show()
    } else {
        $('#delmany').hide()
    }
});
// 给小的复选框注册状态改变事件，需要委托
$('tbody').on('change', '.checkOne', function () {
    // 根据被选中的框的多少来判断总复选框的状态
    $('#checkAll').prop('checked', $('tbody').find('input').length == $('.checkOne:checked').length)
    // 如果选中的复选的大于1，就显示批量删除按钮
    if ($('.checkOne:checked').length > 1) {
        $('#delmany').show()
    } else {
        $('#delmany').hide()
    }
})
// 完成批量删除操作
$('#delmany').on('click', function () {
    let ids = [];
    let inputs = $('tbody').find('input:checked')
    inputs.each(function (index, val) {
        ids.push($(val).attr('data-id'))
    })
    if(confirm('确认删除吗')){
        $.ajax({
            type: 'delete',
            url: '/users/' + ids.join('-'),
            success: function (res) {
                // for (let value of res) {//遍历删除的元素
                //     for (let index in getAry) {//遍历包含所有元素的数组
                //         if (value._id == getAry[index]._id) {//比对对象的ele._id 如果id一样那就说明这个元素需要删除,索引是index
                //             getAry.splice(index, 1) //删除元素
                //         }
                //     }
                // }
                res.forEach(itme => {
                    let index = getAry.findIndex(val => val._id == itme._id);
                    getAry.splice(index, 1)
                });
                render(); //最后渲染 要放在success的根域内 
            }
        })
    }



})