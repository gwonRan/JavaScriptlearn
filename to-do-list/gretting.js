const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings");

const USER_LS = "gwonran",
SHOWING_CN = "showing";

function saveName(text) {
    localStorage.setItem(USER_LS, text);
}

function handleSumit(event) {
    event.preventDefault(); //event의 default행위를 막는다. (금지)
    const currentValue = input.value; //input에 작성한 값이
    // console.log(currentValue); console에 출력이 된다.
    paintGreeting(currentValue); //작성한 값 바로 불러오기
    saveName(currentValue) 
    /*누군가 submit을 했을 때 저장을 할거야! 새로고침을 해도 남아있다. gwonran에 입력한 value가 들어간다.*/
}

function askForName() {
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSumit);
}

function paintGreeting(text) {
    form.classList.remove(SHOWING_CN); //폼을 제거한다. form = input
    greeting.classList.add(SHOWING_CN); //h4가 보여지게 한다.
    greeting.innerText = `Hello ${text}`;
}

function loadName() { //단순히 불러오는 것이지 저장하는 것이 아니다. saveName()함수 만듬.
    const gwonran = localStorage.getItem(USER_LS);
    if(gwonran === null) {
        askForName();
        //gwonran이 없다면 user의 이름을 요청하기 위해 input박스가 다시 보인다.
    } else {
        paintGreeting(gwonran);
    }
}

function init() {
    loadName();
}

init();