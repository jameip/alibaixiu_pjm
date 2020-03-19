// 退出按钮   
$('#logout').on('click', function () {
  var isComfirm = confirm('确认退出？')
  if (isComfirm) {
    $.ajax({
      type: 'post',
      url: '/logout',
      success: function () {
        location.href = 'login.html'
      },
      error: function () {
        alert('退出失败')
      }
    })
  }
})
//时间格式处理
function format(str) {
  let iota1 = str.split(".")[0];
  let iota2 = iota1.split("T");
  let newTime = iota2.join(" ");
  return newTime;
};
// 显示用户名称和头像
$.ajax({
  type: 'get',
  url: '/users/' + userId,
  success: function (res) {
    // console.log(res);
    $('.avatar').attr('src', res.avatar);
    $('h3').text(res.nickName)
  }
})
