var inputNo = 0;  //input태그 번호
const eventParameter = document.getElementById('event_parameter')   //이벤트 매개변수 태그
const userParameter = document.getElementById('user_property')      //사용자 속성 태그

// excelData값 이벤트 매개변수 input태그 생성함수
function addEvent() {
    const data = document.getElementById('event_excelData').value;
    const rows = data.split('\n');
    for (i of rows){
        inputNo += 1
        eventParameter.insertAdjacentHTML('beforeend',`<div id='test${inputNo}'><input type='text' class='form_input' value='${i}'><input type='text' class='form_input' value='{{${i}}}'><button type='button' onclick='deleteInput(${inputNo})'>-</button></div>`)
    }
    document.getElementById('event_excelData').value = '';
}

// excelData값 사용자 속성 input태그 생성함수
function addUser() {
    const data = document.getElementById('user_excelData').value;
    const rows = data.split('\n');
    for (i of rows){
        inputNo += 1
        userParameter.insertAdjacentHTML('beforeend',`<div id='test${inputNo}'><input type='text' class='form_input' value='${i}'><input type='text' class='form_input' value='{{${i}}}'><button type='button' onclick='deleteInput(${inputNo})'>-</button></div>`)
    }
    document.getElementById('user_excelData').value = '';
}
// 버튼 이벤트 매개변수 input태그 생성함수
function addEventInput(){
    inputNo += 1
    eventParameter.insertAdjacentHTML('beforeend',`<div id='test${inputNo}'><input type='text' class='form_input'><input type='text' class='form_input'><button type='button' onclick='deleteInput(${inputNo})'>-</button></div>`)
}

// 버튼 사용자 속성 input태그 생성함수
function addUserInput(){
    inputNo += 1
    userParameter.insertAdjacentHTML('beforeend',`<div id='test${inputNo}'><input type='text' class='form_input'><input type='text' class='form_input'><button type='button' onclick='deleteInput(${inputNo})'>-</button></div>`)
}

// input태그 삭제 함수
function deleteInput(num){
    document.getElementById('test'+num).remove();
}