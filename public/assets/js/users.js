// 显示用户列表
var getAry=[]
$.ajax({
    type:'get',
    url:'/users',
    success:function(res){
        getAry=res
        console.log(getAry);  
        render()
    }
});
// 渲染到页面函数
function render(){
    var html=template('tpl',{data:getAry});
        $('tbody').html(html)  
}
// 头像上传功能
$('#avatar').on('change',function(){
    let formData=new FormData();
    formData.append('avatar',this.files[0]);
    $.ajax({
        type:'post',
        url:'/upload',
        data:formData,
        // 只要通过jq的ajax来上传图片需要添加一下两个属性来阻止浏览器解析图片
        processData:false,
        contentType:false,
        success:function(res){
            // console.log(res[0].avatar);    
            $('#pic').attr('src',res[0].avatar);
            $('#hidden').val(res[0].avatar);
        }
    })
});
// 添加用户功能

$('#btnAdd').on('click',function(){
    let data = $("form").serialize();
    $.ajax({
        type:'post',
        url:'/users',
        data:data,
        success:function(res){
            getAry.push(res)
            render();
            // 将表单数据清空
            $('input[name="email"]').val('');
            $('input[name="nickName"]').val('');
            $('input[name="password"]').val('');
            $('#status0').prop('checked',false);
            $('#status1').prop('checked',false);
            $('#admin').prop('checked',false);
            $('#normal').prop('checked',false);
            $('#hidden').val('')
            $('#pic').attr('src','../assets/img/default.png')
        }
    })
})