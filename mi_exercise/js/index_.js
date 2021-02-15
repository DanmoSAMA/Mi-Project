window.onload = function(){
    let prev = document.getElementsByClassName("prev")[0];
    let next = document.getElementsByClassName("next")[0];
    let img = document.getElementsByClassName("banner-img")[0];
    let dots = document.getElementsByClassName("dot");
    let imgArr = ["img/banner1.jpg","img/banner2.jpg","img/banner3.jpg","img/banner4.jpg","img/banner5.jpg"];
    let index = 0;
    //let count = 0; 动画播放次数计时器
    dots[index].className = "dot active"//让第一个导航点选中
    //点击按钮切换图片，改变导航点，设置过渡
    prev.onclick = function(){
        index--;
        // count++;
        if(index < 0){
            index = imgArr.length - 1;
        }
        // if(img.className == "transition2" || img.className == "banner-img"){
        //     img.className = "transition1";
        // }
        // if(img.className == "transition1" || img.className == "banner-img"){
        //     img.className = "transition2";
        // } 
        //尝试双类名交替，让动画多次播放，失败

        //img.className = "transition";
        //img.style.animationIterationCount = count;
        //尝试增加播放次数，让动画多次播放，失败      

        img.className = "transition";//这一句必需，否则transition函数的第一句无法发挥作用，达不到预期效果
        transition();//必须在第一句的下面

        img.src = imgArr[index];
        dots[index].className = "dot active";//让当前导航点选中
        if(index+1 <= dots.length-1){
            dots[index+1].className = "dot";
        }
        else{
            dots[0].className = "dot";
        }
        clearInterval(timer);//关闭之前的定时器(每次点击按钮时要重新开始计时)
        timer = autoRun();//设置新的定时器
    }
    next.onclick = function(){
        index++;
        if(index > imgArr.length -1){
            index = 0;
        }
        img.className = "transition";
        transition();
        img.src = imgArr[index];
        dots[index].className = "dot active";//让当前导航点选中
        if(index-1 >= 0){
            dots[index-1].className = "dot"
        }
        else{
            dots[dots.length-1].className = "dot"
        }
        clearInterval(timer);//关闭之前的定时器
        timer = autoRun();//设置新的定时器
    }
    //点击导航点切换图片
    let tmp = 0;
    for(let i = 0;i < dots.length; i++){
        dots[i].onclick = function(){
            dots[index].className = "dot";
            //双变量方法：index是点击prev和next对应的图片编号，i是属于每个导航点的编号
            //不能在2个for循环内都用index，否则无法修改index，即最后一行的代码无法实现

            //先让index对应的导航点未选中
            dots[tmp].className = "dot";
            //tmp表示之前 通过点击导航点 而选中的导航点，让它未选中
            dots[i].className = "dot active";
            //让 最新一次点击的导航点 选中
            img.src = imgArr[i];
            img.className = "transition";
            transition();
            //改变图片
            tmp = i;
            //更新tmp
            index = i;
            //修改index，否则再次点击prev或next时会出问题

            clearInterval(timer);//关闭之前的定时器
            timer = autoRun();//设置新的定时器
        }
    }
    timer = autoRun();

    img.style.transitionDuration = "1s";
    //图片的自动轮播函数
    function autoRun(){
        let timer = setInterval(function(){
            index++;
            if(index >= imgArr.length){
                index = 0;
                dots[dots.length-1].className = "dot";
            }
            else{
                dots[index-1].className = "dot";
            }
            img.src = imgArr[index];
            img.className = "transition";
            transition();
            dots[index].className = "dot active";
        },5000);
        // let timer_ = transition();
        // img.style.opacity = 1;
        return timer;
        //timer封装在autoRun函数内，外层访问不到，必须返回timer，这样才能关闭定时器
    }

    //轮播的过渡效果
    function transition(){
        // img.style.opacity = 1;   默认值
        // let timer_ = setTimeout(() => {
        //     img.style.opacity = 0;
        // }, 4000);
        // img.style.opacity = 1;
        //如果像上边这样写，会先执行最后一行代码，再执行定时器，错误
        //setTimeOut定时器不可行，因为在点击按钮和导航点时是等不到4s的，会失去过渡效果，而且定时器的开关问题比较麻烦

        document.querySelector(".transition").className = "banner-img";
        //注意，需要先在prev,next和导航点的onclick回调函数中，将img的className设为transition
        window.requestAnimationFrame(function(time){
            window.requestAnimationFrame(function(time){
                document.querySelector(".banner-img").className = "transition";
            });
        });
    }
    //如果不在上方直接调用transition函数，写成这种绑定的形式也可以：
    // document.querySelector(".prev").addEventListener("click", transition, false);
    // document.querySelector(".next").addEventListener("click", transition, false);
    // for(let j = 0;j < dots.length;j++){
    //     dots[j].addEventListener("click", transition, false);
    // }
}