const todoForm = document.querySelector(".js-todoForm"),
    todoInput = todoForm.querySelector("input"),
    todoList = document.querySelector(".js-todoList");

const TODOS_LS = 'toDos';

function filterFn(toDo) {
    return toDo.id===1
}

let toDos = [];
//해야할 일 생성시 그것이 toDos에 추가되도록 해야한다.

function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    todoList.removeChild(li);
    //todo를 깨끗하게 만들자!
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
        //모든 toDos가 li의 id와 같지 않을 때
    });
    toDos = cleanToDos
    saveToDos()
;}

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
} //saveToDos는 toDos를 가져와서 로컬에 저장하는 일을 한다.

function paintTodo(text){
    const li = document.createElement("li"); //element를 생성한다.
    const delBtn = document.createElement("button");
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteToDo);
    const span = document.createElement("span");
    const newId =  toDos.length + 1;
    span.innerHTML = text
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;
    //appendChild는 뭔가를 그의 fater element안에 넣는 것.
    todoList.appendChild(li);
    /*enter를 눌렀을 때 li생성하고 delete버튼과 span을 생성해야한다. span과 delete버튼을
    li안에 append하고 마지막으로 li를 ul에 append하는 것.*/
    const toDoObj = {
        text: text,
        id: newId
    }
    toDos.push(toDoObj); //push를 사용해서 array안에 element하나를 넣어줄 수 있다.
    saveToDos() //push한 이후에 호출을 해야해 만약 push 하기 전 호출하면 toDos는 비어있다.
}

function handleSubmit(event){
    event.preventDefault(); //이게 뭔데?
    const gwonranValue = todoInput.value;
    paintTodo(gwonranValue);
    todoInput.value = ""; //input에 작성하고 enter치면 창에 text가 console로만 출력
}

function somethign(toDo){
    console.log(toDo.text);
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos);
        console.log(parsedToDos);
        parsedToDos.forEach(function(toDo){
            //함수를 바로 만들어서 바로 실행시키기!
            paintTodo(toDo.text);
        })
    } 
}

 function init(){
     loadToDos();
     todoForm.addEventListener("submit", handleSubmit);
 }

 init();