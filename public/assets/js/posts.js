var cid = $('#allfl').val();
var state = $('#category').val();
// 获取文章数据,英文都是查询文章列表请求，所以将请求封装成了一个函数
render(cid,state)
// 封装文章请求函数 es6新增的参数默认值page=1，如果不传page，默认就是1
function render(cid,state,page=1){
    $.ajax({
        type: 'get',
        url: '/posts',
        data: {
            page: page,
            category: cid,
            state: state
        },
        success: function (res) {
            // console.log(res);
            let html = template('ptpml', { data: res.records })
            $('tbody').html(html);
            let pagehtml = template('pagetpl', res)
            $('#pageall').html(pagehtml)
        }
    })
}
// 分页功能
var currentpage=1
function changepage(page) {
    currentpage=page
    // console.log(currentpage);
    render(cid,state,page)
}
// 所有分类数据
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (res) {
        let html = template('ftmp', { data: res })
        // console.log(html);
        $('#allfl').append(html)
    }
})
// 筛选功能
$('#search').on('click',function(){
    cid = $('#allfl').val();
    state = $('#category').val();
    render(cid,state)
})
// 删除功能
$('tbody').on('click','.delta',function(){
    // alert(1)
    let id=$(this).attr('data-id');
   if(confirm('确认删除吗')){
    $.ajax({
        type:'delete',
        url:'/posts/'+id,
        success:function(res){
            // 页面跳转功能优化
           if($('tbody tr').length==1) {
            if(currentpage==1){
                render(cid, state, currentpage);
            }else{
                render(cid, state, --currentpage)
            }
           }else{
            render(cid,state,currentpage)
           }
            
        }
    })
   }
})