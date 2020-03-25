const API_KEY = "770dea10016d52f0dab1abb097067f91";
const COORDS = 'coords';

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

// 좌표를 가져오는데 성공했을 때 처리하는 함수
function handleGeoSucced(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj =  {
        // latiude: latiude,
        // longitude: longitude
        // 객체의 key의 이름을 같게 저장할 때는
        latitude,
        longitude
    };
    saveCoords(coordsObj);
}

function handleGeoError(){
    console.log('Cant access geo location');
}

// 좌표를 요청하는 함수 만들기
function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucced, handleGeoError);
    // geolocation은 함수이다.
}

function loadCoords(){
    const loadCoords = localStorage.getItem(COORDS);
    if(loadCoords === null){
        askForCoords();
    } else {

    }
}

function init(){
    loadCoords();
}

init();