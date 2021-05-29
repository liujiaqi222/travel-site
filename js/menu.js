(function(){
    var bannerNavUl=document.getElementById("banner-nav-ul");
    var menu_box=document.getElementById("menu-box");
    var banner_nav=document.getElementById("banner-nav");
    Lis=bannerNavUl.children;
    lis=menu_box.children;
    //事件委托
    bannerNavUl.onmouseover=function(e){
        // 使用onmouseover而是onmouseenter，因为onmouseover冒泡
        if(e.target.tagName.toLowerCase()=="li"){
            var t=e.target.getAttribute("data-t");
            //去除盒子的current类名
            for(var i=0;i<lis.length;i++){
                lis[i].className="menu";
                Lis[i].className=Lis[i].getAttribute("data-t");
            }
            // 寻找menu-box 中匹配的data-t
            var themenu =document.querySelector(".menu-box .menu[data-t="+t+"]");
            themenu.className="menu current";
            e.target.className+=" current";
        }
    }
    banner_nav.onmouseleave=function(e){
        for(var i=0;i<lis.length;i++){
            lis[i].className="menu";
            Lis[i].className=Lis[i].getAttribute("data-t");
        }
    }
})();