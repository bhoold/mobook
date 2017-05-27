登录			login.html		
主页&搜索页		index.html		
聊天			talk.html		
图书详情		book-detail.html	
写书评			comment.html		*
扫描图书		scan-result.html	
个人中心		personal.html		
还书			book-back.html		*
消息列表		message.html		
归还信息		message-repay.html	
其它消息		message-other.html	[同‘归还信息’]
我的图书		book.html		



注意：
appcan的方法在浏览器中无效；
自带的js库：zepto,Backbone,underscore



后台json数据含义
    status  1成功/0失败
    msg 信息


接口：

登陆页		http://ip/bookapp/Api/Public/login           登录[post方式] pram:username(手机号),password(密码)

首页		http://ip/bookapp/Api/Page/index         图书列表和分类列表
		http://ip/bookapp/Api/Book/index         图书列表
		http://ip/bookapp/Api/Book/cate          分类列表
		http://ip/bookapp/Api/Book/index/cate/1      分类1的图书列表
		http://ip/bookapp/Api/Book/index/page/2      第二页图书列表
		http://ip/bookapp/Api/Book/index/cate/1/page/2   分类1的第二页图书列表
		http://ip/bookapp/Api/Book/search/str/xxx        搜索关键字xxx
		http://ip/bookapp/Api/Book/search/str/xxx/page/2 搜索关键字xxx的第二页结果

上传图书	http://ip/bookapp/Api/Page/scanResult        分类列表和阅读时间列表
		http://ip/bookapp/Api/Book/upload            上传图书[post方式] pram:title(书名),thumb(封面url),isbn,level(评星),cate_id(分类id),deadline(阅读时间),summary(简介)

个人中心	http://ip/bookapp/Api/Page/personal/uid/1        用户1的统计数据

我的图书	http://ip/bookapp/Api/Page/book/uid/1        用户1的图书列表
		http://ip/bookapp/Api/Page/book/uid/1/page/2     第二页用户1的图书列表

图书详情	http://ip/bookapp/Api/Page/bookDetail/bookID/1   图书1的信息和评论列表

还书		http://ip/bookapp/Api/Page/bookBack/uid/1        用户1的还书列表
		http://ip/bookapp/Api/Page/bookBack/uid/1/page/2 第二页用户1的还书列表

书评		http://ip/bookapp/Api/Page/bookComment/uid/1/bookID/1 用户1对书1进行评价[post方式] pram:context(评论信息),bookBack(1还书评论/0不是还书评论)

借出		http://ip/bookapp/Api/Page/bookLend/uid/1        用户1的借出列表
		http://ip/bookapp/Api/Page/bookLend/uid/1/page/2 第二页用户1的借出列表
        
我的消息	http://ip/bookapp/Api/Page/message/uid/1     用户1的消息列表

催还消息	http://ip/bookapp/Api/Page/message/cate/urge/uid/1
		http://ip/bookapp/Api/Page/message/cate/urge/uid/1/page/2

书评消息	http://ip/bookapp/Api/Page/message/cate/comment/uid/1
		http://ip/bookapp/Api/Page/message/cate/comment/uid/1/page/2

借书消息	http://ip/bookapp/Api/Page/message/cate/lend/uid/1
		http://ip/bookapp/Api/Page/message/cate/lend/uid/1/page/2

归还消息	http://ip/bookapp/Api/Page/message/cate/return/uid/1
		http://ip/bookapp/Api/Page/message/cate/return/uid/1/page/2

聊天		http://ip/bookapp/Api/Page/talk/uid/1,2      用户1和用户2的聊天信息
		http://ip/bookapp/Api/Page/talk/uid/1,2/page/2   第二页聊天信息












代码片段：



数据存储:
appcan.locStorage.setVal('name', 'value');//保存一个数据
appcan.locStorage.getVal('name');//获取一个数据



json操作:
JSON.parse(data);//把字符串data转成对象
JSON.stringify(data);//把对象data转成字符串



序列化表单:
$('form').serialize();



返回上页:
所有返回上页代码统一设为
$("#back-btn").click(function(){
    location.href = appcan.locStorage.getVal('pageReferer');
})
在跳转页面时设置
$(document).on('click', 'li', function(){
    appcan.locStorage.setVal('pageReferer', '当前页文件名');
    location.href = '要跳转的文件名';
})



获取用户信息:
userInfo = appcan.locStorage.getVal('userInfo');
if(userInfo){//由于每个页面都需要用到用户信息，这个判断尽量放在js第一行。
    userInfo = JSON.parse(userInfo);
}else{
    appcan.locStorage.setVal('pageReferer', '当前页文件名');
    location.href = 'index.html';
}



ajax请求:
$.ajax({
    beforeSend : function(){},
    url : url,
    data : '', 
    type : 'get',
    success : function(data){
        if(typeof data !== 'object'){data = JSON.parse(data);}
        if(data.status){

        }else{
            console.log(data.msg);  
        }
    },
    error : function(){
        console.log("无法连接服务器");         
    },
    complete : function(){}
})



错误提示(顶部红条):
 <!--顶部提示红条-->
<div class="ub-pc ub-ac ub tips-bar false" id="fail-tips">
    <p class="icon_p ulev0"><span class="iconfont">&#xe616;</span><span class="icon-txt">这里输入提示文字</span></p>
</div>
 <!--顶部提示红条-->


成功提示(顶部蓝条):
<!--顶部提示蓝条-->
   <div class="ub-pc ub-ac ub tips-bar true" id="comment-win">
        <p class="icon_p ulev0"><span class="iconfont">&#xe60b;</span><span class="icon-txt">评论成功</span></p>
   </div>
<!--顶部提示蓝条-->


ajax loading:



页面没数据时:



