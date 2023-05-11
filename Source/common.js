var inputNo = 2;  //input태그 번호
const eventParameter = document.getElementById('event_parameter')   //이벤트 매개변수 태그
const userParameter = document.getElementById('user_property')      //사용자 속성 태그

// excelData값 이벤트 매개변수 input태그 생성함수
function addEvent() {
    const data = document.getElementById('event_excelData').value;
    const rows = data.split('\n');
    for (i of rows){
        inputNo += 1
        eventParameter.insertAdjacentHTML('beforeend',`<div id='test${inputNo}'><input type='text' class='form_input' value='${i}'><input type='text' class='form_input' value='${i}'><button type='button' onclick='deleteInput(${inputNo})'>-</button></div>`)
    }
    document.getElementById('event_excelData').value = '';
}

// excelData값 사용자 속성 input태그 생성함수
function addUser() {
    const data = document.getElementById('user_excelData').value;
    const rows = data.split('\n');
    for (i of rows){
        inputNo += 1
        userParameter.insertAdjacentHTML('beforeend',`<div id='test${inputNo}'><input type='text' class='form_input' value='${i}'><input type='text' class='form_input' value='${i}'><button type='button' onclick='deleteInput(${inputNo})'>-</button></div>`)
    }
    document.getElementById('user_excelData').value = '';
}
// 버튼 이벤트 매개변수 input태그 생성함수
function addEventInput(){
    inputNo += 1
    eventParameter.insertAdjacentHTML('beforeend',`<div id='test${inputNo}'><input type='text' name="ep_key" class='form_input'><input type='text' name="ep_value" class='form_input'><button type='button' onclick='deleteInput(${inputNo})'>-</button></div>`)
}

// 버튼 사용자 속성 input태그 생성함수
function addUserInput(){
    inputNo += 1
    userParameter.insertAdjacentHTML('beforeend',`<div id='test${inputNo}'><input type='text' name="up_key" class='form_input'><input type='text' name="up_value" class='form_input'><button type='button' onclick='deleteInput(${inputNo})'>-</button></div>`)
}

// input태그 삭제 함수
function deleteInput(num){
    document.getElementById('test'+num).remove();
}

const ediotr = document.querySelector('.editor');    //editor
const editor_backgroud = document.querySelector('.editor_background');  // editor_background

// editor창 열기
function editorOpen() {
    ediotr.style.display = 'block';
    editor_backgroud.style.display = 'block';
}
// editor창 닫기
function editorClose() {
    ediotr.style.display = 'none';
    editor_backgroud.style.display = 'none';
}
// editor창 밖 영역(editor_background) 클릭 시 닫기
document.addEventListener('click', (e) => {
    e.target === editor_backgroud ? editorClose() : false;
})

document.querySelector('.create_button').addEventListener('click', editorOpen); //editorOpen함수 호출
document.querySelector('.editor_close').addEventListener('click', editorClose);   //editorClose함수 호출