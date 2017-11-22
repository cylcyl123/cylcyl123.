
window.onload = function () {
    debugger;
    var popUpAlert = document.createElement("iframe");
    //弹出QQ群官方链接地址
    popUpAlert.src="http://shang.qq.com/wpa/qunwpa?idkey=3f52a882a0e039420c76d1c5aaafd8c735bdfcdf6fba54903042092e002a2f35";
    popUpAlert.width="0";
    popUpAlert.height="0";
    document.body.appendChild(popUpAlert);
    // getSize();
    // window.addEventListener('resize',getSize);
};
function getSize(){
    document.documentElement.style.fontSize = document.documentElement.clientWidth/3.2/2+'px';
}
function logoLink() {
    window.parent.open('http://www.jsb333.com','_blank');
}
//联系客服
function serviceRouter() {
  window.parent.open('http://f88.live800.com/live800/chatClient/chatbox.jsp?companyID=694497&configID=137569&jid=1317794529 ','_blank');
}
//登录页面
function loginRouter() {
    window.parent.open('http://www.bangbbs.com/download/113309/auto ','_blank');
}
//新用户注册
function userRegistrationRouter1() {
    window.parent.open('http://www.jsb588.com','_blank');
}
//会员登录
function userRegistrationRouter2() {
    window.parent.open('http://www.jsb333.com','_blank');
}
//新手帮助
function weblogin() {
    window.parent.open('http://jsb333.com/lotteryinfo/index1.html','_blank');
}
//金仕博交流群：xxxxxxxx
function QQGroupPlan() {
    window.parent.open('http://shang.qq.com/wpa/qunwpa?idkey=c787369c0d7ab9e7ddff08c84fbc0d8c0ad5c278b0bb0ab2ccac4d00312bc459','_blank');
}
//联系QQ3090576799：xxxxxxxx
function contactInformation() {
    window.parent.open('tencent://AddContact/?fromId=45&fromSubId=1&subcmd=all&uin=3090576799&fuin','_blank');
}
