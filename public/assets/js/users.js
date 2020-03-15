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
function clear(){
    $('input[name="email"]').prop('disabled',false).val('');
    $('input[name="nickName"]').val('');
    $('input[name="password"]').prop('disabled',false).val('');
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
    usrId=$(this).attr('data-id')
    $('h2').html('编辑用户');
    let tr = $(this).parents('tr');
    $('#pic').attr('src', tr.find('img').attr('src'))
    $('#hidden').val(tr.find('img').attr('src'));
    $('input[name="email"]').prop('disabled',true).val(tr.children().eq(2).text());
    $('input[name="nickName"]').val(tr.children().eq(3).text());
    $('input[name="password"]').prop('disabled',true);
    if(tr.children().eq(4).text()=='激活'){
        $('#status1').prop('checked',true);
    }else{
        $('#status0').prop('checked',true);
    }
    if(tr.children().eq(5).text()=='超级管理员'){
        $('#admin').prop('checked',true);
    }else{
        $('#normal').prop('checked',true);
    }
    $('#btnAdd').hide()
    $('#btnedit').show()
    // getAry.find(function(item){
    //     // console.log(item);
        
    // })
    // console.log();    
})
// 修改用户信息功能
$('#btnedit').on('click',function(){
    let data=$('form').serialize();
    $.ajax({
        type:'PUT',
        url:'/users/'+usrId,
        data:data,
        success:function(res){
            // console.log(res);
            let index=getAry.findIndex(itme=>itme._id==res._id)
            getAry[index]=res
            render();
            clear();
            $('h2').text('添加新用户');
            $('#btnAdd').show();
            $('#btnedit').hide();
        }
    })
})