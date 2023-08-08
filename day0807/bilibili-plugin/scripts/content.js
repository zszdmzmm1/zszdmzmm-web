const pageType1 = ["div.video-section-list", "div.video-episode-card__info-duration", ".play-num"];
const pageType2 = ["ul.list-box", "ul.list-box div.duration", "div.head-left"];
let pageType = [pageType1, pageType2,  pageType3];
let selectorStringSet;
let isVideoListPage = false;
let isFlag = true;
for (let i = 0; i < pageType.length; i++){
    if(document.querySelector(pageType[i][0])){
        selectorStringSet = pageType[i];
        isVideoListPage = true;
    }
}



if(isVideoListPage || isFlag){
    //每秒执行一次
    setInterval(function () {

        //爬取集合中包含视频时间的元素
        let timeElement = document.querySelectorAll(selectorStringSet[1]);
        //let timeElement = pageElementsAdapter("div.video-episode-card__info-duration", "ul.list-box div.duration");
        //集合视频总时长
        let videoTimeSum = 0;
        //开始计算剩余时间标志
        let isStart = false;
        //循环每一个时间元素
        timeElement.forEach(function (element) {
            {
                let imgStyle = element.parentElement.querySelector("img");
                //判断正在播放的视频，改变开始计算的标志的状态
                if ( !(imgStyle.hasAttribute("style")) || imgStyle.getAttribute("style") === "") {
                    isStart = true;
                }
                //计算每个视频的时长，相加
                if (isStart) {
                    let singleTime = getSeconds(element.innerText);
                    videoTimeSum += singleTime;
                }
            }
        })
        //装目前视频所在时间位置
        let currentVideoSeconds = 0;
        //获取相关元素并从总时长中减去已观看时间
        let currentVideoSecondsElement = document.querySelector("span.bpx-player-ctrl-time-current");
        if (currentVideoSecondsElement) {
            currentVideoSeconds = getSeconds(currentVideoSecondsElement.innerText);
            videoTimeSum -= currentVideoSeconds;
        }
        //对总时长的表现格式进行处理
        let hour, minute, second;
        hour = Math.floor(videoTimeSum / 3600);
        minute = Math.floor(videoTimeSum / 60) % 60;
        second = videoTimeSum % 60;
        minute = timePattenParse(minute);
        second = timePattenParse(second);
        let finalTimeString = hour + ":" + minute + ":" + second;
        //在网页中显示剩余时长
        let element = document.createElement("div");
        element.innerText = "剩余时长:" + finalTimeString;
        element.className = "remainTime";
        element.style = "margin-right: 8px";
        if (!document.querySelector("div.remainTime")) {
            document.querySelector(selectorStringSet[2]).after(element);
        } else {
            document.querySelector("div.remainTime").innerText = element.innerText;
        }
    }, 1000);

    function run(){

    }

//将时间正常表达形式转化为秒数并返回
    function getSeconds(timeString) {
        let timeArr = timeString.split(":");
        let timeSecond = 0;
        for (let i = 0; i < timeArr.length; i++) {
            timeSecond = timeSecond * 60 + parseInt(timeArr[i]);
        }
        return timeSecond;
    }

//将不规范的秒，分钟表达式整理规范
    function timePattenParse(timeNum) {
        if (timeNum < 10) {
            return "0" + timeNum;
        }
        return timeNum;
    }
}