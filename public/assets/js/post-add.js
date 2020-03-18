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
// 封装函数获取跳转携带的id值
function getUserId(id){
    let parmas=location.search.substr(1).split('&')
    for(i=0;i<parmas.length;i++){
        let temp=parmas[i].split('=')
        if(temp[0]==id){
            return temp[1]
        }
    }
    return -1
}
let id=getUserId('id');
if(id!=-1){
    $.ajax({
        type:'get',
        url:'/posts/'+id,
        success:function(res){
            console.log(res);
            $('h1').html('编辑文章')
            $('#title').val(res.title);
            $('#content').val(res.content);
            $('#created').val(res.createAt.substr(0,16));
            $('#btnEdit').show();
            $('#btnAdd').hide();
            $('.thumbnail').show().attr('src',res.thumbnail);
            $('#hidden').val(res.thumbnail);
            $('#category option').each(function(index,item){
                if($(item).attr('value')==res.category._id){
                    $(item).prop('selected',true);
                }
            })
            $('#status option').each(function(index,item){
                if($(item).attr('value')==res.state){
                    $(item).prop('selected',true);
                }
            })
        }
    })
}
$('#btnEdit').on('click',function(){
    let data=$('form').serialize();
    $.ajax({
        type:'put',
        url:'/posts/'+id,
        data:data,
        success:function(){
            location.href = 'posts.html';
        }
    })
})



