window.onload = function(){
    //Tab栏切换1
    let TabArr = document.getElementsByClassName("Tab");
    let showArr1 = document.getElementsByClassName("tab-show1");
    let ulArr1 = TabArr[0].getElementsByTagName("ul");
    for(let i = 0; i < ulArr1.length; i++){
        showArr1[i].index = i;
        showArr1[i].onmouseover = function () {
            for(let i = 0; i < ulArr1.length; i++){
                ulArr1[i].className = "w";
            }
            ulArr1[this.index].className = "w show";
        }
    }
    //Tab栏切换2
    let ulArr2 = TabArr[1].getElementsByTagName("ul");
    let showArr2 = document.getElementsByClassName("tab-show2");
    for(let i = 0; i < ulArr2.length; i++){
        showArr2[i].index = i;
        showArr2[i].onmouseover = function () {
            TabArr[1].style.display = "flex";   
            //因为Tab栏和左侧的条目没写在一个容器里，不构成子元素或兄弟元素的关系，所以用JS实现hover效果
            for(let i = 0; i < ulArr2.length; i++){
                ulArr2[i].className = "";
            }
            ulArr2[this.index].className = "show";

            //修改ul和外层容器的宽度
            let itemArr = ulArr2[this.index].getElementsByTagName("a");
            let col = Math.ceil((itemArr.length)/6);
            //一开始，这里忘了加单位px，只用加一次
            ulArr2[this.index].style.width = (itemArr[0].clientWidth) * col + "px";
            TabArr[1].style.width = parseInt(ulArr2[this.index].style.width) + 1 + "px";
        }
        //暂时容忍了"回调地狱"的出现(懒得试验Promise和Generator...)
        showArr2[i].onmouseout = function(){
            let itemArr = ulArr2[this.index].getElementsByTagName("a");
            for(i = 0; i < itemArr.length; i++){
                itemArr[i].onmouseover = function(){
                    TabArr[1].style.display = "flex";
                    //防止鼠标移动到a上后tab栏关闭
                }
                TabArr[1].onmouseover = function(){
                    TabArr[1].style.display = "flex";
                }
                TabArr[1].onmouseout = function(){
                    TabArr[1].style.display = "none";
                }
            }
        }
        showArr2[i].addEventListener("mouseout",leave);
        function leave(){
            TabArr[1].style.display = "none";
        }
    }
    
    //轮播图1
    let prev = document.getElementsByClassName("prev")[0];
    let next = document.getElementsByClassName("next")[0];
    let imgs = document.getElementsByClassName("banner-img");
    let dots = document.getElementsByClassName("dot");
    let index = 0;
    imgs[index].style.opacity = 1;
    dots[index].className = "dot active"
    prev.addEventListener("click",click1);
    next.addEventListener("click",click2);
    function click1(){
        index--;
        if(index >= 0){
            imgs[index].style.opacity = 1;
            imgs[index + 1].style.opacity = 0;  
            dots[index].className = "dot active";
            dots[index + 1].className = "dot";        
        }
        else{
            index = imgs.length - 1;
            imgs[index].style.opacity = 1;
            imgs[0].style.opacity = 0;
            dots[0].className = "dot";
            dots[dots.length - 1].className = "dot active";
        }
        clearInterval(timer01);
        timer01 = autoRun01();
        prev.removeEventListener("click",click1);
        setTimeout(function(){
            prev.addEventListener("click",click1);
            //每隔一段时间才可以点击(a标签无disabled属性，故采用绑定和解绑事件的方式)
        },800); 
    }
    function click2(){
        index++;
        if(index < imgs.length){
            imgs[index - 1].style.opacity = 0;
            imgs[index].style.opacity = 1;
            dots[index].className = "dot active";
            dots[index - 1].className = "dot";   
        }
        else{
            index = 0;
            imgs[imgs.length - 1].style.opacity = 0;
            imgs[index].style.opacity = 1; 
            dots[dots.length - 1].className = "dot";
            dots[0].className = "dot active";          
        }
        clearInterval(timer01);
        timer01 = autoRun01();
        next.removeEventListener("click",click2);
        setTimeout(function(){
            next.addEventListener("click",click2);
            //每隔一段时间才可以点击(a标签无disabled属性，故采用绑定和解绑事件的方式)
        },800); 
    }

    for(let i = 0; i < dots.length; i++){
        dots[i].onclick = function(){
            imgs[index].style.opacity = 0;
            dots[index].className = "dot";
            imgs[i].style.opacity = 1;
            dots[i].className = "dot active";
            index = i;
            clearInterval(timer01);
            timer01 = autoRun01();
        }
    }
    function autoRun01(){
        let timer = setInterval(function(){
            index++;
            if(index < imgs.length){
                imgs[index - 1].style.opacity = 0;
                imgs[index].style.opacity = 1;
                dots[index].className = "dot active";
                dots[index - 1].className = "dot";   
            }
            else{
                index = 0;
                imgs[imgs.length - 1].style.opacity = 0;
                imgs[index].style.opacity = 1; 
                dots[dots.length - 1].className = "dot";
                dots[0].className = "dot active";          
            }            
        },5000);
        return timer;
    }
    let timer01 = autoRun01();

    //倒计时
    let timer02 = setInterval(function(){
        //放入定时器内，反复获取时间就可达到刷新效果
        let d1 = new Date("2/19/2021 18:00:00");
        let d2 = Date.now();
        let cha = (d1 - d2)/1000;   //时间戳单位改为秒
        let second = parseInt(cha % 60);
        let minute = parseInt((cha / 60) % 60);
        let hour = parseInt(cha / 3600);
        if(second == 0 && minute == 0 && hour == 0){
            clearInterval(timer02);
            //到点后停止倒计时，否则会出现负数
        }
        if(second < 0 || minute < 0 || hour < 0){
            second = 0; minute = 0; hour = 0;
            clearInterval(timer02);
        }
        let boxes = document.getElementsByClassName("box");
        boxes[0].innerHTML = hour;
        boxes[1].innerHTML = minute;
        boxes[2].innerHTML = second;
    },1000);

    //轮播图2
    //逻辑比之前复杂，包括按钮的无效化，按钮的变色，判定什么时候移动4格，什么时候移动3格
    //关于移动几个商品格的问题，应该会有更好的解决策略，不过暂且这样吧
    //对于按钮的变色，我是靠添加和去除a标签实现的(详情请看CSS中按钮的部分)，但这样无法实现过渡效果
    let btn01 = document.getElementsByClassName("btn01")[0];
    let btn02 = document.getElementsByClassName("btn02")[0];
    let goodslist = document.getElementsByClassName("goods-list")[0];
    let Allli = document.getElementsByClassName("gl");
    for(let i = 0; i < Allli.length; i++){
        Allli[i].style.left += 0;  //每个商品元素的left初始值都为0，而不是越往右left越大
    }
    btn01.onclick = function(){
        btn02.disabled = false;
        btn02.innerHTML = `<a href="javascript:;"><i class="fas fa-angle-right"></i></a>`;
        clearInterval(timer03);
        timer03 = autoRun02();
        // console.log(Allli[Allli.length - 1].style.left); 在测试的时候，应该看移动前的left值
        for(let i = 0; i < Allli.length; i++){   
            if(parseInt(Allli[Allli.length - 1].style.left) == -744){
                Allli[i].style.left = parseInt(Allli[i].style.left) + 744 + "px";
                btn01.disabled = true;
                btn01.innerHTML = `<i class="fas fa-angle-left"></i>`;
            }
            else if(parseInt(Allli[Allli.length - 1].style.left) == -992){
                Allli[i].style.left = parseInt(Allli[i].style.left) + 992 + "px";
                btn01.disabled = true;
                btn01.innerHTML = `<i class="fas fa-angle-left"></i>`; 
            }
            else{
                Allli[i].style.left = parseInt(Allli[i].style.left) + 992 + "px";
            }    
        }
    }
    btn02.onclick = function(){
        btn01.disabled = false;
        btn01.innerHTML = `<a href="javascript:;"><i class="fas fa-angle-left"></i></a>`;
        clearInterval(timer03);
        timer03 = autoRun02();
        // console.log(Allli[Allli.length - 1].style.left);  在测试的时候，应该看移动前的left值
        for(let i = 0; i < Allli.length; i++){
            if(parseInt(Allli[Allli.length - 1].style.left) == -992){
                //因为for循环是一遍一遍执行的，第一次for循环后就满足该if的条件，导致后边的li只移动744px
                //所以这里的条件，应该是用最后一个li
                Allli[i].style.left = parseInt(Allli[i].style.left) - 744 + "px";
                btn02.disabled = true;
                btn02.innerHTML = `<i class="fas fa-angle-right"></i>`;
            }
            else if(parseInt(Allli[Allli.length - 1].style.left) == -744){
                Allli[i].style.left = parseInt(Allli[i].style.left) - 992 + "px";
                btn02.disabled = true;
                btn02.innerHTML = `<i class="fas fa-angle-right"></i>`;
            }
            else{
                Allli[i].style.left = parseInt(Allli[i].style.left) - 992 + "px";
            }
        }
    }
    function autoRun02(){
        let timer = setInterval(function(){
            for(let i = 0; i < Allli.length; i++){
                if(parseInt(Allli[Allli.length - 1].style.left) == -992){
                    Allli[i].style.left = parseInt(Allli[i].style.left) - 744 + "px";
                           
                    btn02.disabled = true;
                    btn02.innerHTML = `<i class="fas fa-angle-right"></i>`;
                }
                else if(parseInt(Allli[Allli.length - 1].style.left) == -1736){
                    Allli[i].style.left = 0;

                    btn02.disabled = false;
                    btn02.innerHTML = `<a href="javascript:;"><i class="fas fa-angle-right"></i></a>`;
                    
                    btn01.disabled = true;
                    btn01.innerHTML = `<i class="fas fa-angle-left"></i>`;
                }
                else if(parseInt(Allli[Allli.length - 1].style.left) == 0){
                    Allli[i].style.left = parseInt(Allli[i].style.left) - 992 + "px";
                    btn01.disabled = false;
                    btn01.innerHTML = `<a href="javascript:;"><i class="fas fa-angle-left"></i></a>`;
                }
            }
        },5500);
        return timer;
    }
    let timer03 = autoRun02();

    //控制"回到顶部"出现
    let lastone = document.getElementById("lastone");
    let height = parseInt(document.documentElement.scrollTop);
    let timer04 = setInterval(() => {
        height = parseInt(document.documentElement.scrollTop);
        if(height > 850){
            lastone.style.display = "block";
        }
        if(height <= 850){
            lastone.style.display = "none";
        }
    }, 100);
}
