var no = 0;
var event_parameter = document.getElementById('event_parameter')
var user_parameter = document.getElementById('user_property')

function addEvent() {
    var data = document.getElementById('event_excelData').value;
    var rows = data.split('\n');
    for (i of rows){
        no += 1
        event_parameter.insertAdjacentHTML('beforeend',`<div id='test${no}'><input type='text' class='test' value='${i}'><input type='text' class='test' value='{{${i}}}'><button type='button' onclick='deleteInput(${no})'>-</button></div>`)
    }
    document.getElementById('event_excelData').value = '';
}

function addUser() {
    var data = document.getElementById('user_excelData').value;
    var rows = data.split('\n');
    for (i of rows){
        no += 1
        user_parameter.insertAdjacentHTML('beforeend',`<div id='test${no}'><input type='text' class='test' value='${i}'><input type='text' class='test' value='{{${i}}}'><button type='button' onclick='deleteInput(${no})'>-</button></div>`)
    }
    document.getElementById('user_excelData').value = '';
}
function addEventInput(){
    no += 1
    event_parameter.insertAdjacentHTML('beforeend',`<div id='test${no}'><input type='text' class='test'><input type='text' class='test'><button type='button' onclick='deleteInput(${no})'>-</button></div>`)
}

function addUserInput(){
    no += 1
    user_parameter.insertAdjacentHTML('beforeend',`<div id='test${no}'><input type='text' class='test'><input type='text' class='test'><button type='button' onclick='deleteInput(${no})'>-</button></div>`)
}

function deleteInput(num){
    document.getElementById('test'+num).remove();
}