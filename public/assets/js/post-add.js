// 获取文章分类数据
$.ajax({
    type:'get',
    url:'/categories',
    success:function(res){
        let html=template('ptml',{data:res})
        $('#category').html(html);
    }
})
// 文件上传功能
$('#feature').on('change',function(){
    let file=this.files[0];
    var formData=new FormData();
    formData.append('cover',file);
    $.ajax({
        type:'post',
        url:'/upload',
        data:formData,
        contentType:false,
        processData: false,
        success:function(res){
            $('.thumbnail').show().attr('src',res[0].cover);
            $('#hidden').val(res[0].cover)
        }
    })
});
// 文章编辑功能
$('#btnAdd').on('click',function(){
    var data = $('form').serialize();
    $.ajax({
        type:'POST',
        url:'/posts',
        data:data,
        success:function(){
            location.href='posts.html'
           
        }
    })
})