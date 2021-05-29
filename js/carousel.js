/*
*轮播图特效
*/
// 使用IIFE立即执行
// 防止产生额外的全局变量

(function () {
    var carousel_list = document.getElementById("carousel_list");
    var left_btn = document.getElementById("left_btn");
    var right_btn = document.getElementById("right_btn");
    var circle_ol=document.getElementById("circle_ol");
    var lis=circle_ol.children;
    var banner=document.getElementById("banner");
    // 克隆第一张图片
    var clone_li= carousel_list.firstElementChild.cloneNode(true);
    carousel_list.appendChild(clone_li);

    // 当前的图片序号
    var idx=0;
    // 节流锁
    var lock=true;

    //右按钮事件监听
    right_btn.onclick= right_btn_handler;
    function right_btn_handler(){
        // 判断节流锁的状态 如果是关闭的则直接return
        if(!lock){
            return;
        }
        // 加上过渡，因为下方去掉了
        carousel_list.style.transition="transform 0.5s ease 0s";
        idx++;
        carousel_list.style.transform="translateX("+ -16.66*idx+"%)";
        // 判断是否为第5张图片
        if(idx>4){
            // 等4张图片到第5张的动画做完后，将第6张图片的移动回为第一张图片
            setTimeout(function(){
                idx=0;
                carousel_list.style.transition="none";
                carousel_list.style.transform="none";
            },500);
        }
        setCircles();
        // 关锁
        lock=false;
        // 定时开锁
        setTimeout(function(){
            lock=true;
        },500);
    }
    // 左按钮事件监听
    left_btn.onclick=function(){
        if(!lock){
            return;
        }
        // 要先写if语句，而不是idx--
        if(idx==0){
            idx=5;
            carousel_list.style.transition="none";
            carousel_list.style.transform="translateX("+ -16.66*idx+"%)";
        }
        idx--;
        
        // 设置延时0s，不然下面的过渡回会覆盖上面的无动画。
        setTimeout(function(){
            carousel_list.style.transition="transform 0.5s ease 0s";
            carousel_list.style.transform="translateX("+ -16.66*idx+"%)";

        },0);
        setCircles();
        // 关锁
        lock=false;
        // 定时开锁
        setTimeout(function(){
            lock=true;
        },500);
    }
    // 设置为当前的小圆点
    function setCircles(){
        // 遍历li元素
        for(var i=0;i<lis.length;i++){
            if(i==idx%5){
                // 0,1,2,3,4除以5的余数都为它本身，而5除以5的余数为0
                //当idx为5时，就能设置i为0的小圆点类名的current
                lis[i].className="current";
            }else{
                lis[i].className="";
            }
        }
    }
    // 小圆点的事件委托，当点击小圆点的时候，会切换到对应的banner
    circle_ol.onclick=function(e){
        if(e.target.tagName.toLowerCase()=="li"){
            //得到li身上的data-n属性，就是n
            var n=Number(e.target.getAttribute('data-n'));
            idx=n;
            carousel_list.style.transform="translateX("+ -16.66*idx+"%)";
            setCircles();
        }
    }
    // 定时器 自动轮播 模拟右按钮点击
    var timer=setInterval( right_btn_handler,2000);
    //鼠标进入banner 轮播图停止
    banner.onmouseover=function(){
        clearInterval(timer);
    }
    // 鼠标离开，轮播图开始
    banner.onmouseleave=function(){
        // 设表先关
        clearInterval(timer);
        // 不要加var，不然就变成了局部变量了
        timer=setInterval( right_btn_handler,2000);

    }
    
})();