let getArry = []
// 文件上传
$('#image').on('change', function () {
    let file = this.files[0];
    var formData = new FormData();
    formData.append('cover', file);
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        contentType: false,
        processData: false,
        success: function (res) {
            console.log(res);

            $('.thumbnail').show().attr('src', res[0].cover);
            $('#hidden').val(res[0].cover)
        }
    })
});
// 展示页面数据
$.ajax({
    type: 'get',
    url: '/slides',
    success: function (res) {
        console.log(res);
        getArry = res
        render()
    }
});
function render() {
    let html = template('tmpl', { data: getArry });
    $('tbody').html(html)
}
// 添加轮播图功能
$('#btn').on('click', function () {
    let data = $('form').serialize();
    $.ajax({
        type: 'post',
        url: '/slides',
        data: data,
        success: function (res) {
            getArry.push(res);
            render();
            // 把对应的数据清空
            $('.thumbnail').hide().attr('src', '');
            $('#hidden').val('');
            $('input[name="title"]').val('');
            $('input[name="link"]').val('');
        }
    })
})
// 删除功能
$('tbody').on('click','.del',function(){
    let id=$(this).attr('data-id');
    $.ajax({
        type:'DELETE',
        url:'/slides/'+id,
        success:function(res){
         let index=getArry.findIndex(item=>item._id==res._id);
         getArry.splice(index,1);
         render();
        }
    })
})