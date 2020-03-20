// 随机推荐
$.ajax({
  type: 'get',
  url: '/posts/random',
  success: function (res) {
    // console.log(res);
    let tpl = `
        {{each data}}
         <li>
        <a href="detail.html?id={{@$value._id}}">
          <p class="title">{{$value.title.substr(0,23)}}</p>
          <p class="reading">阅读({{$value.meta.views}})</p>
          <div class="pic">
            <img src="{{$value.thumbnail}}" alt="">
          </div>
        </a>
      </li>
      {{/each}}
      `
    let html = template.render(tpl, { data: res })
    $('.random').html(html)
  }
})
// 导航栏分类显示
$.ajax({
  type: 'get',
  url: '/categories',
  success: function (res) {
    // console.log(res);
    let tpl =
      `
        {{each data}}
        <li><a href="list.html?id={{@$value._id}}"><i class="fa {{$value.className}}"></i>{{$value.title}}</a></li>
        {{/each}}
        `
    let html = template.render(tpl, { data: res })
    $('.nav_data').html(html)
  }
})
// 搜索功能
$('.search form').on('submit', function () {
  // 获取到用户输入的值
 location.href="/search.html?key="+$(this).find('.keys').val()
  return false;
})