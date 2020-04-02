const clockContainer = document.querySelector(".js-clock"),
    clockTitle = clockContainer.querySelector(".js-title");

function getTime() {
    const date = new Date(); /*객체라고만 생각해*/
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();
    clockTitle.innerHTML = `
    ${hours<10?`0${hours}`:hours}:${minutes<10?`0${minutes}`:minutes}:${seconds<10?`0${seconds}`:seconds}`;
}

function init(){  
    getTime(); /*나눠서 문제를 해결하라는데 무슨 말일까?*/
    setInterval(getTime, 1000);
}

init(); /*모든기능초기화*/