let isFirst = true;

setInterval(function () {
    let timeElement = document.querySelectorAll("div.video-episode-card .video-episode-card__info-duration");
    let finalTime = 0;
    let isStart = false;
    timeElement.forEach(function (element, index) {
        {
            if (element.parentElement.querySelector("img").getAttribute("style") === "") {
                isStart = true;
            }
            if (isStart) {
                let timeGroup = element.innerText.split(":");
                let singleTime = 0;
                for (let i = 0; i < timeGroup.length; i++) {
                    singleTime = singleTime * 60 + parseInt(timeGroup[i]);
                }
                finalTime += singleTime;
            }
        }
    })
    let hour, minute, second;
    hour = Math.floor(finalTime / 3600);
    minute = Math.floor(finalTime / 60) % 60;
    second = finalTime % 60;
    if(minute < 10){
        minute = "0" + minute;
    }
    if(second < 10){
        second = "0" + second;
    }
    let finalTimeString = hour + ":" + minute + ":" + second;
    let element = document.createElement("div");
    element.innerText = "剩余时长:" + finalTimeString;
    element.className = "remainTime";
    element.style = "margin-right: 8px";
    if(!document.querySelector("div.remainTime")){
        //isFirst = false;
        document.querySelector(".play-num").after(element);
    }else{
        document.querySelector("div.remainTime").innerText = element.innerText;
    }
}, 1000);


