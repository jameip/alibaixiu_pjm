// 获取文章数据
$.ajax({
    type: 'get',
    url: '/posts',
    data: {
        page: 1
    },
    success: function (res) {
        console.log(res);

        let html = template('ptpml', { data: res.records })
        $('tbody').html(html)
    }
})
// 时间处理格式
// function formateDate(date) {
// 	// 将日期时间字符串转换成日期对象
// 	date = new Date(date);
// 	return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
// }
//时间格式处理
function format(str) {
    let iota1 = str.split(".")[0];
    let iota2 = iota1.split("T");
    let newTime = iota2.join(" ");
    return newTime;
}