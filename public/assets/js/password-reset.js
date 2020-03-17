$('#modifybtn').on('click',function(){
    var data=$('form').serialize();
    if($('#old').val().trim().length==0) return alert('请输入原始密码');
    if($('#password').val().trim().length==0) return alert('请输入新密码');
    if($('#confirm').val().trim().length==0)return alert('请再次输入新密码');
    if($('#password').val().trim()!=$('#confirm').val().trim()) return alert('两次密码不一样')
    $.ajax({
        type:'PUT',
        url:'/users/password',
        data:data,
        success:function(){
            location.href='login.html'           
        }
    })
    
})