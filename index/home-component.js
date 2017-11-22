
window.onload = function () {
    var type = 1;
    var param = "01010200010200041f0fcf20";
    var sid = 2;
    var rawuin = 521129760;
    var qsig = "tencent://groupwpa/?subcmd=all&param=7B2267726F757055696E223A3532313132393736302C2274696D655374616D70223A313434393733303033367D0A";
    var getUrlParam = function(name, href, noDecode) {
        var re = new RegExp("(?:\\?|#|&)" + name + "=([^&]*)(?:$|&|#)", "i"),
            m = re.exec(href);
        var ret = m ? m[1] : "";
        return ! noDecode ? decodeURIComponent(ret) : ret
    };
    console.log(location.href);
    var jump_from = getUrlParam("jump_from", location.href);
    var auth_key = getUrlParam("auth", location.href);


    var reportData = function(nvalue, error) {
        var img = new Image();
        var str = "http://cgi.pub.qq.com/report/bnl?data=" + 0 + "," + nvalue + "," + (error || 0) + "," + p;
        img.src = str
    };
//		var speed = {
//		    report: function(f1, f2, f3, f4, time) {
//		        var ISD_REPORT_URL = "http://isdspeed.qq.com/cgi-bin/r.cgi?";
//		        var isdTransport = new Image();
//		        var reportData = f4 + "=" + time;
//		        var url = ISD_REPORT_URL + "flag1=" + f1 + "&flag2=" + f2 + "&flag3=" + f3 + "&" + reportData;
//		        isdTransport.src = url
//		    }
//		};

    var ua = navigator.userAgent;
    var p;
    var REGEXP_IOS_QQ = /(iPad|iPhone|iPod).*? QQ\/([\d\.]+)/;
    var isiOSMQ = REGEXP_IOS_QQ.test(ua);
    var isSafari = ua.indexOf("Safari") > -1;

    var mobile_q_jump = {
        android:"http://mobile.qq.com/3g",
        ios:"itms-apps://itunes.apple.com/cn/app/qq-2011/id444934666?mt=8",
        winphone:"http://www.windowsphone.com/zh-cn/store/app/qq/b45f0a5f-13d8-422b-9be5-c750af531762",
        pc:"http://mobile.qq.com/index.html"
    };

    if(typeof type == "undefined") type = 1;

    if(ua.indexOf("Android")>-1){
        p = "android";
    }
    else if(ua.indexOf("iPhone")>-1 || ua.indexOf("iPad")>-1 || ua.indexOf("iPod")>-1){
        p = "ios";
    }
    else if(ua.indexOf("Windows Phone") > -1 || ua.indexOf("WPDesktop") > -1){
        p = "winphone";
    }
    else {
        p = "pc";
    }

    if(p == "ios"){
        //防止循环
        if(history.pushState && !isiOSMQ)
            history.pushState({},"t","#");
    }
    else if(p == "pc" && qsig != "undefined"){
        window.open(qsig,"_self");
    }
    if(type == 1){//手Q
        var isSuccess = true;
        var f = document.createElement("iframe");
        f.style.display = "none";
        document.body.appendChild(f);
        reportData(11780);
        f.onload = function(){
            isSuccess = false;
        };
        setTimeout(function(){
            if(p == "ios" && sid == 2){//ios并且为群名片
                var iosUrl = "mqqapi://card/show_pslcard?src_type=internal&version=1&uin="+ rawuin +"&card_type=group&source=qrcode&jump_from=" + jump_from + "&auth=" + auth_key;
                // ios9以上safari不能通过iframe唤起
                if(isSafari){
                    location.href = iosUrl;
                }
                else{
                    f.src = iosUrl;
                }

            }
            else if(p != "pc"){
                var url = window.location.href.split("&");
                var kParam = getUrlParam("k", location.href);
                f.src = "mqqopensdkapi://bizAgent/qm/qr?url=" + encodeURIComponent("http://qm.qq.com/cgi-bin/qm/qr?k=" + kParam+"&jump_from=" + jump_from + "&auth=" + auth_key) ;
            }
            //群
            if(sid == 2 && p != "pc"){
                document.title = "申请加入QQ群";
                document.getElementById("m_container").style.display = "block";
                document.getElementById("update_link").onclick = function(){
                    var jumpUrl = mobile_q_jump[p];
                    if(jumpUrl) window.open(jumpUrl,"_self");
                }
            }

            var now = Date.now();
            setTimeout( function(){
                debugger;
                if((p == "ios" && !isiOSMQ && Date.now() - now < 2000) || (p == "android" && !isSuccess) || ((p == "winphone" && Date.now() - now < 2000))){
                    var jumpUrl = mobile_q_jump[p];

                    reportData(11780, 1);

                    if(jumpUrl) {
                        setTimeout(function(){
                            window.open(jumpUrl,"_self");
                        },800);
                    }
                }
            } , 1500);
        },1500);

    }
    // debugger;
    // var browser = navigator.userAgent;
    // var isIos = false;
    // var rawuin = 521129760;
    // if(browser.indexOf("Android")>-1){
    //     isIos = false;
    // }
    // else if(browser.indexOf("iPhone")>-1 || browser.indexOf("iPad")>-1 || browser.indexOf("iPod")>-1){
    //     isIos = true;
    // }
    // else if(browser.indexOf("Windows Phone") > -1 || browser.indexOf("WPDesktop") > -1){
    //     isIos = true;
    // }
    // else {
    //     isIos = false;
    // }
    // var popUpAlert = document.createElement("iframe");
    // //弹出QQ群官方链接地址
    // popUpAlert.src="http://shang.qq.com/wpa/qunwpa?idkey=3f52a882a0e039420c76d1c5aaafd8c735bdfcdf6fba54903042092e002a2f35";
    // popUpAlert.style.display = "none";
    // popUpAlert.width="0";
    // popUpAlert.height="0";
    // document.body.appendChild(popUpAlert);
    // if(isIos){
    //     if(history.pushState) {
    //         history.pushState({},"t","#");
    //     }
    //     if(browser.indexOf("Safari") > -1) {
    //         popUpAlert.src = "mqqapi://card/show_pslcard?src_type=internal&version=1&uin=" + rawuin +"&card_type=group&source=qrcode";
    //     } else {
    //         popUpAlert.src = "http://shang.qq.com/wpa/qunwpa?idkey=3f52a882a0e039420c76d1c5aaafd8c735bdfcdf6fba54903042092e002a2f35";
    //     }
    // }
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
