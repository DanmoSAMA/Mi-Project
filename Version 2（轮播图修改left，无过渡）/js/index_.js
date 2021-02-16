window.onload = function(){
    //点击按钮切换图片
    let prev = document.getElementsByClassName("prev")[0];
    let next = document.getElementsByClassName("next")[0];
    let imgwrapper = document.getElementsByClassName("img")[0];
    let imgs = document.getElementsByTagName("img");
    let dots = document.getElementsByClassName("dot");
    let index = 0;
    dots[0].className = "dot active";
    imgwrapper.style.left += 0;//必须有这一句，否则一开始imgwrapper.style.left的值为空，最初的parseInt会转化为NaN

    prev.onclick = function(){
        if(parseInt(imgwrapper.style.left) < 0){
            imgwrapper.style.left = parseInt(imgwrapper.style.left) + 1226 + "px"; 
            index --;
            dots[index + 1].className = "dot";
            dots[index].className = "dot active";
        }
        else{
            imgwrapper.style.left = "-4904px";
            index = 4;
            dots[0].className = "dot";           
            dots[index].className = "dot active";
        }      
        clearInterval(timer);
        timer = autoRun();
    }
    next.onclick = function(){
        if(parseInt(imgwrapper.style.left) > -4904){
            imgwrapper.style.left = parseInt(imgwrapper.style.left) - 1226 + "px";
            index ++;
            dots[index - 1].className = "dot";
            dots[index].className = "dot active";            
        }
        else{
            imgwrapper.style.left = "0px";
            index = 0;
            dots[4].className = "dot";           
            dots[index].className = "dot active";            
        }    
        clearInterval(timer);
        timer = autoRun();  
    }
    for(let i = 0 ; i < dots.length ; i++){
        dots[i].onclick = function(){
            imgwrapper.style.left = -1226 * i + "px";
            dots[index].className = "dot";
            dots[i].className = "dot active";
            index = i;
            clearInterval(timer);
            timer = autoRun();
        }
    }
    function autoRun(){
        //此处的代码逻辑和next一样
        let timer = setInterval(function(){
            if(parseInt(imgwrapper.style.left) > -4904){
                imgwrapper.style.left = parseInt(imgwrapper.style.left) - 1226 + "px";
                index ++;
                dots[index - 1].className = "dot";
                dots[index].className = "dot active";            
            }
            else{
                imgwrapper.style.left = "0px";
                index = 0;
                dots[4].className = "dot";           
                dots[index].className = "dot active";            
            }
        },5000);
        return timer;
    }
    let timer = autoRun();
}