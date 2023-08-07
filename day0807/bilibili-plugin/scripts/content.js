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
                let singleTime = getSeconds(element.innerText);
                finalTime += singleTime;
            }
        }
    })
    let currentVideoSeconds = 0;
    let currentVideoSecondsElement = document.querySelector("span.bpx-player-ctrl-time-current");
    if (currentVideoSecondsElement) {
        currentVideoSeconds = getSeconds(currentVideoSecondsElement.innerText);
        finalTime -= currentVideoSeconds;
    }
    let hour, minute, second;
    hour = Math.floor(finalTime / 3600);
    minute = Math.floor(finalTime / 60) % 60;
    second = finalTime % 60;
    minute = timePattenParse(minute);
    second = timePattenParse(second);
    let finalTimeString = hour + ":" + minute + ":" + second;
    let element = document.createElement("div");
    element.innerText = "剩余时长:" + finalTimeString;
    element.className = "remainTime";
    element.style = "margin-right: 8px";
    if (!document.querySelector("div.remainTime")) {
        document.querySelector(".play-num").after(element);
    } else {
        document.querySelector("div.remainTime").innerText = element.innerText;
    }
}, 1000);

function getSeconds(timeString) {
    let timeArr = timeString.split(":");
    let timeSecond = 0;
    for (let i = 0; i < timeArr.length; i++) {
        timeSecond = timeSecond * 60 + parseInt(timeArr[i]);
    }
    return timeSecond;
}

function timePattenParse(timeNum) {
    if (timeNum < 10) {
        return "0" + timeNum;
    }
    return timeNum;
}