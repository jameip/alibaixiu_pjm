 // 退出按钮   
 $('#logout').on('click',function(){
    var isComfirm=  confirm('确认退出？')
      if(isComfirm){
        $.ajax({
      type:'post',
      url:'/logout',
      success:function(){
        location.href='login.html'
      },
      error:function(){
        alert('退出失败')
      }
    })
  }
  })