let cgetAry=[]
// 添加功能
$('#btnAdd').on('click',function(){
    if($('input[name="title"]').val().trim().length==0) return alert('请输出分类名称');
    if($('input[name="className"]').val().trim().length==0) return alert('请输出分类图标类名');
    $.ajax({
        type:'post',
        url:'/categories',
        data:{
            title:$('input[name="title"]').val().trim(),
            className:$('input[name="className"]').val().trim()
        },
        success:function(res){
            cgetAry.push(res)
            render();
            $('input[name="title"]').val('');
            $('input[name="className"]').val('')
        }
    })
});
function render(){
    let html=template('ctml',{data:cgetAry});
    $('tbody').html(html);
}
// 从数据库渲染数据
$.ajax({
    type:'get',
    url:'/categories',
    success:function(res){
        cgetAry=res;
        render()
    }
})
// 编辑功能
var  userId
$('tbody').on('click','.cedit',function(){
    userId=$(this).parent().attr('data-id')
    $('h2').html('编辑分类');
    $('input[name="title"]').val($(this).parents('tr').children().eq(1).text());
    $('input[name="className"]').val($(this).parents('tr').children().eq(2).text())
    $('#btnAdd').hide()
    $('#btnEdit').show()
});
// 给修改注册点击事件
$('#btnEdit').on('click',function(){
    $.ajax({
        type:'put',
        url:'/categories/'+userId,
        data:{
            title: $('input[name="title"]').val().trim(),
            className:$('input[name="className"]').val().trim(),
        },
        success:function(res){
        let index=cgetAry.findIndex(item=>item._id==res._id)
            cgetAry[index]=res;
            render();
            $('input[name="title"]').val('');
            $('input[name="className"]').val('')
        }    
    })    
})
// 单个删除事件
$('tbody').on('click','.cdel',function(){
   if(confirm('确定删除吗')){
    $.ajax({
        type:'delete',
        url:'/categories/'+userId,
        success:function(res){
            let index=cgetAry.findIndex(item=>item._id==res._id)
            cgetAry.splice(index,1)
            render()
        }
    })
   }
})
// 多个删除事件
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
    //  找到所有选中的input获取id
    $('input:checked').each(function (index, val) {
        ids.push($(val).attr('data-id'))   
    })  
    if(confirm('确认删除吗')){
        $.ajax({
            type: 'delete',
            url: '/categories/' + ids.join('-'),
            success: function (res) {
                res.forEach(itme => {
                    let index = cgetAry.findIndex(val => val._id == itme._id);
                    cgetAry.splice(index, 1)
                });
                render(); //最后渲染 要放在success的根域内 
            }
        })
    }
    
})