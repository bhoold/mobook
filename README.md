��¼			login.html		
��ҳ&����ҳ		index.html		
����			talk.html		
ͼ������		book-detail.html	
д����			comment.html		*
ɨ��ͼ��		scan-result.html	
��������		personal.html		
����			book-back.html		*
��Ϣ�б�		message.html		
�黹��Ϣ		message-repay.html	
������Ϣ		message-other.html	[ͬ���黹��Ϣ��]
�ҵ�ͼ��		book.html		



ע�⣺
appcan�ķ��������������Ч��
�Դ���js�⣺zepto,Backbone,underscore



��̨json���ݺ���
    status  1�ɹ�/0ʧ��
    msg ��Ϣ


�ӿڣ�

��½ҳ		http://ip/bookapp/Api/Public/login           ��¼[post��ʽ] pram:username(�ֻ���),password(����)

��ҳ		http://ip/bookapp/Api/Page/index         ͼ���б�ͷ����б�
		http://ip/bookapp/Api/Book/index         ͼ���б�
		http://ip/bookapp/Api/Book/cate          �����б�
		http://ip/bookapp/Api/Book/index/cate/1      ����1��ͼ���б�
		http://ip/bookapp/Api/Book/index/page/2      �ڶ�ҳͼ���б�
		http://ip/bookapp/Api/Book/index/cate/1/page/2   ����1�ĵڶ�ҳͼ���б�
		http://ip/bookapp/Api/Book/search/str/xxx        �����ؼ���xxx
		http://ip/bookapp/Api/Book/search/str/xxx/page/2 �����ؼ���xxx�ĵڶ�ҳ���

�ϴ�ͼ��	http://ip/bookapp/Api/Page/scanResult        �����б���Ķ�ʱ���б�
		http://ip/bookapp/Api/Book/upload            �ϴ�ͼ��[post��ʽ] pram:title(����),thumb(����url),isbn,level(����),cate_id(����id),deadline(�Ķ�ʱ��),summary(���)

��������	http://ip/bookapp/Api/Page/personal/uid/1        �û�1��ͳ������

�ҵ�ͼ��	http://ip/bookapp/Api/Page/book/uid/1        �û�1��ͼ���б�
		http://ip/bookapp/Api/Page/book/uid/1/page/2     �ڶ�ҳ�û�1��ͼ���б�

ͼ������	http://ip/bookapp/Api/Page/bookDetail/bookID/1   ͼ��1����Ϣ�������б�

����		http://ip/bookapp/Api/Page/bookBack/uid/1        �û�1�Ļ����б�
		http://ip/bookapp/Api/Page/bookBack/uid/1/page/2 �ڶ�ҳ�û�1�Ļ����б�

����		http://ip/bookapp/Api/Page/bookComment/uid/1/bookID/1 �û�1����1��������[post��ʽ] pram:context(������Ϣ),bookBack(1��������/0���ǻ�������)

���		http://ip/bookapp/Api/Page/bookLend/uid/1        �û�1�Ľ���б�
		http://ip/bookapp/Api/Page/bookLend/uid/1/page/2 �ڶ�ҳ�û�1�Ľ���б�
        
�ҵ���Ϣ	http://ip/bookapp/Api/Page/message/uid/1     �û�1����Ϣ�б�

�߻���Ϣ	http://ip/bookapp/Api/Page/message/cate/urge/uid/1
		http://ip/bookapp/Api/Page/message/cate/urge/uid/1/page/2

������Ϣ	http://ip/bookapp/Api/Page/message/cate/comment/uid/1
		http://ip/bookapp/Api/Page/message/cate/comment/uid/1/page/2

������Ϣ	http://ip/bookapp/Api/Page/message/cate/lend/uid/1
		http://ip/bookapp/Api/Page/message/cate/lend/uid/1/page/2

�黹��Ϣ	http://ip/bookapp/Api/Page/message/cate/return/uid/1
		http://ip/bookapp/Api/Page/message/cate/return/uid/1/page/2

����		http://ip/bookapp/Api/Page/talk/uid/1,2      �û�1���û�2��������Ϣ
		http://ip/bookapp/Api/Page/talk/uid/1,2/page/2   �ڶ�ҳ������Ϣ












����Ƭ�Σ�



���ݴ洢:
appcan.locStorage.setVal('name', 'value');//����һ������
appcan.locStorage.getVal('name');//��ȡһ������



json����:
JSON.parse(data);//���ַ���dataת�ɶ���
JSON.stringify(data);//�Ѷ���dataת���ַ���



���л���:
$('form').serialize();



������ҳ:
���з�����ҳ����ͳһ��Ϊ
$("#back-btn").click(function(){
    location.href = appcan.locStorage.getVal('pageReferer');
})
����תҳ��ʱ����
$(document).on('click', 'li', function(){
    appcan.locStorage.setVal('pageReferer', '��ǰҳ�ļ���');
    location.href = 'Ҫ��ת���ļ���';
})



��ȡ�û���Ϣ:
userInfo = appcan.locStorage.getVal('userInfo');
if(userInfo){//����ÿ��ҳ�涼��Ҫ�õ��û���Ϣ������жϾ�������js��һ�С�
    userInfo = JSON.parse(userInfo);
}else{
    appcan.locStorage.setVal('pageReferer', '��ǰҳ�ļ���');
    location.href = 'index.html';
}



ajax����:
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
        console.log("�޷����ӷ�����");         
    },
    complete : function(){}
})



������ʾ(��������):
 <!--������ʾ����-->
<div class="ub-pc ub-ac ub tips-bar false" id="fail-tips">
    <p class="icon_p ulev0"><span class="iconfont">&#xe616;</span><span class="icon-txt">����������ʾ����</span></p>
</div>
 <!--������ʾ����-->


�ɹ���ʾ(��������):
<!--������ʾ����-->
   <div class="ub-pc ub-ac ub tips-bar true" id="comment-win">
        <p class="icon_p ulev0"><span class="iconfont">&#xe60b;</span><span class="icon-txt">���۳ɹ�</span></p>
   </div>
<!--������ʾ����-->


ajax loading:



ҳ��û����ʱ:



