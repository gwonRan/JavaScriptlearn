const body = document.querySelector("body");

const IMG_NUMBER = 3;

function paintImage(imgNumber){
    const image = new Image();
    image.src = `img/${imgNumber+1}.jpg`
    // 내가 등장시키고 싶은 이미지가 든 폴더의 소스 +1하는 이유는 함수가 0을 줄 수도 있기에
    image.classList.add("bgImage");
    body.prepend(image);
    // appendChild에 대해서는 03.21-23을 참고하기
}

function genRandom(){
    const number = Math.floor(Math.random()*IMG_NUMBER);
    return number;
}

function init(){
    const randomNumber = genRandom();
    paintImage(randomNumber)
}

init();