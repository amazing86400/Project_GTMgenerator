var no = 0;
const eventParameter = document.getElementById('event_parameter')
const userParameter = document.getElementById('user_property')

function addEvent() {
    const data = document.getElementById('event_excelData').value;
    const rows = data.split('\n');
    for (i of rows){
        no += 1
        eventParameter.insertAdjacentHTML('beforeend',`<div id='test${no}'><input type='text' class='test' value='${i}'><input type='text' class='test' value='{{${i}}}'><button type='button' onclick='deleteInput(${no})'>-</button></div>`)
    }
    document.getElementById('event_excelData').value = '';
}

function addUser() {
    const data = document.getElementById('user_excelData').value;
    const rows = data.split('\n');
    for (i of rows){
        no += 1
        userParameter.insertAdjacentHTML('beforeend',`<div id='test${no}'><input type='text' class='test' value='${i}'><input type='text' class='test' value='{{${i}}}'><button type='button' onclick='deleteInput(${no})'>-</button></div>`)
    }
    document.getElementById('user_excelData').value = '';
}
function addEventInput(){
    no += 1
    eventParameter.insertAdjacentHTML('beforeend',`<div id='test${no}'><input type='text' class='test'><input type='text' class='test'><button type='button' onclick='deleteInput(${no})'>-</button></div>`)
}

function addUserInput(){
    no += 1
    userParameter.insertAdjacentHTML('beforeend',`<div id='test${no}'><input type='text' class='test'><input type='text' class='test'><button type='button' onclick='deleteInput(${no})'>-</button></div>`)
}

function deleteInput(num){
    document.getElementById('test'+num).remove();
}