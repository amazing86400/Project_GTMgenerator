var inputNo = 2;  //input태그 번호
// const eventParameter = document.getElementById('event_parameter')   //이벤트 매개변수 태그
// const userParameter = document.getElementById('user_property')      //사용자 속성 태그
// const editor = document.querySelector('.editor');    //editor
// const editor_backgroud = document.querySelector('.editor_background');  // editor_background
const tag = [];         //태그 배열 선언
const variable = [];    //변수 배열 선언
const trigger = [];     //트리거 배열 선언
var triggerId = 70;     //트리거Id 초기 값

const globalVal =  (function(){
    const eventParameter = document.getElementById('event_parameter');   //이벤트 매개변수 태그
    const userParameter = document.getElementById('user_property')      //사용자 속성 태그
    const editor = document.querySelector('.editor');    //editor
    const editor_backgroud = document.querySelector('.editor_background');  // editor_background
    var inputNo = 2;  //input태그 번호
    // const tag = [];         //태그 배열 선언
    // const variable = [];    //변수 배열 선언
    // const trigger = [];     //트리거 배열 선언

    const arrays = {
        tag: [],
        variable: [],
        trigger: []
    }

    function push(arrayName, value){
        arrays[arrayName].push(value);
    }

    function getArray(arrayName){
        return arrays[arrayName];
    }
    function plus(value){
        value++
    }

    return {
        getEventParameter: function(){
            return eventParameter;
        },
        getUserParameter: function(){
            return userParameter;
        },
        getEditor: function(){
            return editor;
        },
        getEditor_backgroud: function(){
            return editor_backgroud;
        }, 
        plus: function(){
            inputNo++;
        },
        plus:plus,
        getArray: getArray,
        push: push
    };

})();


//editor창 밖 영역(editor_background) 클릭 시 editorClose함수 호출
document.addEventListener('click', (e) => {
    e.target === globalVal.getEditor_backgroud() ? openDialog("noSave") : false;
});

//excelData값으로 이벤트 매개변수 input태그 생성함수
function addEvent() {
    const eventParameter = document.getElementById('event_parameter');
    const data = document.getElementById('event_excelData').value;
    const rows = data.split('\n');
    for (i of rows){
        inputNo += 1
        eventParameter.insertAdjacentHTML('beforeend',`<div id='test${inputNo}'><input type='text' name='ep_key' class='form_input' value='${i}'><input type='text' name="ep_value" class='form_input' value='${i}'><i class='remove_button' onclick='deleteInput(${inputNo})'></i></div>`)
    }
    document.getElementById('event_excelData').value = '';
}

//excelData값으로 사용자 속성 input태그 생성함수
function addUser() {
    const userParameter = document.getElementById('user_property')
    const data = document.getElementById('user_excelData').value;
    const rows = data.split('\n');
    for (i of rows){
        inputNo += 1
        userParameter.insertAdjacentHTML('beforeend',`<div id='test${inputNo}'><input type='text' name="up_key" class='form_input' value='${i}'><input type='text' name="up_value" class='form_input' value='${i}'><i class='remove_button' onclick='deleteInput(${inputNo})'></i></div>`)
    }
    document.getElementById('user_excelData').value = '';
}

//행 추가 버튼 클릭 시 이벤트 매개변수 input태그 생성함수
function addEventInput(){
    const eventParameter = document.getElementById('event_parameter');
    inputNo += 1
    eventParameter.insertAdjacentHTML('beforeend',`<div id='test${inputNo}'><input type='text' name="ep_key" class='form_input'><input type='text' name="ep_value" class='form_input'><i class='remove_button' onclick='deleteInput(${inputNo})'></i></div>`)
}

//행 추가 버튼 클릭 시 사용자 속성 input태그 생성함수
function addUserInput(){
    const userParameter = document.getElementById('user_property')
    inputNo += 1
    userParameter.insertAdjacentHTML('beforeend',`<div id='test${inputNo}'><input type='text' name="up_key" class='form_input'><input type='text' name="up_value" class='form_input'><i class='remove_button' onclick='deleteInput(${inputNo})'></i></div>`)
}

//-버튼 클릭 시 해당 input태그 삭제 해주는 함수
function deleteInput(num){
    document.getElementById('test'+num).remove();
}

// editor창 여는 함수
function editorOpen() {
    document.querySelector('.editor').insertAdjacentHTML('beforeend',
    `<div class="editor_wrapper">
        <div class="editor_title">
            <i class="editor_close" onclick="openDialog('noSave')"></i>
            <div class="tag_name">
                <input class="input_tag_name" id="tag_name" type="text" placeholder="태그이름을 입력하세요">
            </div>
            <button class="create_button" onclick="setData()">저장</button>
        </div>
        <div class="form_card">
            <div class="content">
                <div class="tag_conf">
                    <div class="conf_title">
                        <div>태그 구성</div>
                    </div>
                    <div class="form_tagType">
                        <div class="caption">태그 유형</div>
                        <div class="radio">
                            <input class="tagType" id="conf" type="radio" name="tagType" onclick="changeTagType()" value="gaawc" checked="checked">
                            <label for="conf" class="radio_label conf">
                                    <div class="radio_img">
                                        <img class="conf_img" src="gaImg.svg">
                                    </div>
                                    <div class="radio_caption">
                                        <div>Google 애널리틱스: GA4 구성</div>
                                        <div>Google Marketing Platform</div>
                                    </div>
                            </label>
                            <input class="tagType" id="event" type="radio" name="tagType" onclick="changeTagType()" value="gaawe">
                            <label for="event" class="radio_label">
                                <div class="radio_img">
                                    <img class="conf_img" src="gaImg.svg">
                                </div>
                                <div class="radio_caption">
                                    <div>Google 애널리틱스: GA4 이벤트</div>
                                    <div>Google Marketing Platform</div>
                                </div>
                            </label>
                        </div>
                    </div>
                    <div id="form_mid">
                        <div id="change_tagType">
                            <div id="form_measurementId">
                                <div class="caption">측정 ID</div>
                                <input type="text" class="form_input" id="measurementId">
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="field_title">설정할 필드</div>
                        <div class="input_area">
                            <div>
                                <div id="event_parameter">
                                    <div class="input_title">
                                        <div class="field_name">필드 이름</div><div class="field_name">값</div>
                                    </div>
                                    <div id="test1"><input type="text" name="ep_key" class="form_input" value="page_title"><input type="text" name="ep_value" class="form_input" value="title"><i class="remove_button" onclick='deleteInput(1)'></i></div>
                                </div>
                                <button class="add_input" onclick="addEventInput();">행 추가</button>
                            </div>
                            <div class="textarea">
                                <textarea class="textarea_box" id="event_excelData"></textarea><br><button class="add_input" type="button" onclick="addEvent()">입력</button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="field_title">사용자 속성</div>
                        <div class="input_area">
                            <div>
                                <div id="user_property">
                                    <div class="input_title">
                                        <div class="field_name">속성 이름</div><div class="field_name">값</div>
                                    </div>
                                    <div id="test2"><input type="text" name="up_key" class="form_input" value="up_cid"><input type="text" name="up_value" class="form_input" value="up_cid"><i class="remove_button" onclick='deleteInput(2)'></i></div>
                                </div>
                                <button class="add_input" onclick="addUserInput();">행 추가</button>
                            </div>
                            <div class="textarea">
                                <textarea class="textarea_box" id="user_excelData"></textarea><br><button class="add_input" type="button" onclick="addUser()">입력</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="set_trigger">
                    <div class="conf_title">
                        <div>트리거</div>
                    </div>
                    <div class="form_tagType">
                        <div class="caption">트리거 유형</div>
                        <div class="radio">
                            <input class="triggerType" id="pageview" type="radio" name="triggerType" value="pageview" onclick="changeTriType()" checked="checked"><label class="radio_label">페이지뷰</label>
                            <input class="triggerType" type="radio" name="triggerType" value="event" onclick="changeTriType()"><label class="radio_label">맞춤 이벤트</label>
                        </div>
                    </div>
                    <div class="caption">트리거 실행</div>
                    <div id="form_trigger">
                        <div id="change_trigger">
                            <div class="trigger_card">
                                <i class="pageview_icon"></i>
                                <div class="trigger_icon_caption">
                                    <div>All Pages</div>
                                    <div>페이지뷰</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`
    )
    globalVal.getEditor().classList.toggle('open');
    globalVal.getEditor_backgroud().classList.toggle('open');
    document.body.style.overflow = "hidden";
}

//editor창 닫는 함수
function editorClose() {
    globalVal.getEditor().classList.toggle('open');
    globalVal.getEditor_backgroud().classList.toggle('open');
    // setTimeout(function(){
        document.querySelector('.editor_wrapper').remove();  
    // },350)
    document.body.style.overflow = "unset";
}

//태그 유형 checkbox 변경 시 화면 래이아웃 변경해주는 함수
function changeTagType(){
    const checkValue = document.querySelector('input[name="tagType"]:checked').value;
    const divChange = document.getElementById('change_tagType')
    divChange.remove();
    //구성 태그인 경우
    if(checkValue == 'gaawc'){
        const configEle = document.createElement('div')
        configEle.innerHTML = 
            `<div id="change_tagType">
                <div id="form_measurementId">
                    <div class="caption">측정 ID</div>
                    <input type="text" class="form_input" id="measurementId">
                </div>
            </div>`;
        document.getElementById('form_mid').append(configEle);
        document.getElementsByClassName('field_title')[0].innerHTML = '설정할 필드'
        document.getElementsByClassName('field_name')[0].innerHTML = '필드 이름'
    //이벤트 태그인 경우
    }else{
        const eventEle = document.createElement('div')
        eventEle.innerHTML = 
            `<div id="change_tagType">
                <div id="form_aa">
                    <label class="caption" for="aa">구성태그</label><br>
                    <select class="select_box" name="aa" id="aa">
                        <option value="undefined">구성 태그 선택...</option>
                        <option value="none">없음-직접 ID 설정</option>
                    </select>
                </div>
                <div id="form_measurementId"></div>
                <div id="form_eventName">
                    <div class="caption">이벤트 이름</div>
                    <input type="text" class="form_input" id="event_name">
                </div>
            </div>`;
        document.getElementById('form_mid').append(eventEle);
        document.getElementsByClassName('field_title')[0].innerHTML = '이벤트 매개변수'
        document.getElementsByClassName('field_name')[0].innerHTML = '매개변수 이름'
        const selectTag = document.getElementById('aa');
        if(tag){
            for(i of tag){
                if(i.type == 'gaawc'){
                    selectTag.insertAdjacentHTML('beforeend',`<option value="${i.tagName}">${i.tagName}</option>`)
                }
            }
        }
        //직접 입력 선택 시 측정ID입력할 수 있는 input태그 생성해주는 함수
        selectTag.addEventListener('change',(e)=>{
            const selectUndefined = selectTag.options[selectTag.selectedIndex].value;
            const formMid = document.getElementById('form_measurementId');
            if(selectUndefined == 'none'){
                formMid.replaceChildren()
                formMid.insertAdjacentHTML('beforeend',`<div class="caption">측정 ID</div><input type="text" class="form_input" id="measurementId">`)
            }else{
                formMid.replaceChildren()
                formMid.insertAdjacentHTML('beforeend',`<input type="hidden" class="form_input" id="measurementId" value="${selectUndefined}">`)
            }
        });
    }
}
//트리거 유형 checkbox 변경 시 화면 래이아웃 변경해주는 함수
function changeTriType(){
    const checkValue = document.querySelector('input[name="triggerType"]:checked').value;
    const divChange = document.getElementById('change_trigger')
    divChange.remove();
    if(checkValue == 'pageview'){
        const configEle = document.createElement('div')
        configEle.innerHTML = 
            `<div id="change_trigger">
                <div class="trigger_card">
                    <i class="pageview_icon"></i>
                    <div class="trigger_icon_caption">
                        <div>All Pages</div>
                        <div>페이지뷰</div>
                    </div>
                </div>
            </div>`;
        document.getElementById('form_trigger').append(configEle);
    }else{
        const eventEle = document.createElement('div')
        eventEle.innerHTML = 
            `<div id="change_trigger">
                <div class="trigger_card">
                    <i class="event_icon"></i>
                    <div class="trigger_icon_caption">
                        <div><input type="text" id="trigger_name" placeholder="트리거 이름을 입력하세요"></div>
                        <div>맞춤 이벤트</div>
                    </div>
                </div>
                <div class="caption">이벤트 이름</div>
                <input type="text" id="trigger_value" class="form_input">
                <div class="last_div"></div>
            </div>`;
        document.getElementById('form_trigger').append(eventEle);
    }
}

//저장 버튼 클릭 시 데이터 설정해주는 함수
function setData(){
    if(validation()){
        const ep_key = document.getElementsByName('ep_key');
        const ep_value = document.getElementsByName('ep_value');
        const up_key = document.getElementsByName('up_key');
        const up_value = document.getElementsByName('up_value');
        const eventArr = [];
        const userArr = [];
    
        //이벤트 매개변수 값 설정
        for(var i=0; i < ep_key.length; i++){
            eventArr.push({
                name: ep_key[i].value,
                variable: ep_value[i].value
            });
        }
    
        //사용자 속성 매개변수 설정
        for(var i=0; i < up_key.length; i++){
            userArr.push({
                name: up_key[i].value,
                variable: up_value[i].value
            });
        }
        
        //데이터 영역변수 설정
        const testInputs = eventArr.concat(userArr)
        for(i in testInputs){
            if(variable.indexOf(testInputs[i].variable) == -1){
                variable.push(testInputs[i].variable);
            }
        }
    
        //태그 설정
        const tagType = document.querySelector('input[name="tagType"]:checked').value;
        let setTag = {
            tagName:document.getElementById('tag_name').value,
            type: document.querySelector('input[name="tagType"]:checked').value,
            measurementId: document.getElementById('measurementId').value,
            triggerType: document.querySelector('input[name="triggerType"]:checked').value,
            triggerId: triggerId,
            VAR_Array: eventArr,
            user_Array: userArr
        };
    
        //이벤트 태그 일 경우
        if(tagType == 'gaawe'){
            const eventName = document.getElementById('event_name').value;
            setTag.eventName = eventName;
            for(i in variable){
                if(variable.indexOf(eventName) == -1){
                    variable.push(eventName);
                }
            }
        };
        tag.push(setTag);
        
        //트리거 설정
        const triggerType = document.querySelector('input[name="triggerType"]:checked').value;
        if(triggerType == 'event'){
            let setTrigger = {
                name: document.getElementById('trigger_name').value,
                variable: document.getElementById('trigger_value').value,
                triggerId: setTag.triggerId
            }
            trigger.push(setTrigger);
            ++triggerId
            //중복 체크 해야함.
        }
    
        //editor 창 닫기
        // globalVal.getEditor().style.display = 'none';
        // globalVal.getEditor_backgroud().style.display = 'none';
        // globalVal.getEditor().classList.toggle('open');
        // globalVal.getEditor_backgroud().classList.toggle('open');
        document.querySelector('.export_data').style.display = 'block';
        
        //설정 완료 되면 setDataList함수 호출
        setDataList(setTag);
    }
    
}

//태그 생성하면 메인 화면에 리스트로 출력해주는 함수
function setDataList(setTag){
    const tagName = setTag.tagName;
    const tagType = (setTag.type == 'gaawc') ? 'Google 애널리틱스: GA4 구성' : 'Google 애널리틱스: GA4 이벤트';
    const tagTri = (setTag.triggerType == 'pageview') ? 'All Pages' : document.getElementById('trigger_name').value;
    const iconClass = (setTag.triggerType == 'pageview') ? 'list_icon pageview' : 'list_icon event';
    const div_empty_table = document.getElementById('empty_table');
    if(div_empty_table){
        div_empty_table.remove();
        const tableEle = document.createElement('table');
        tableEle.innerHTML =  
            `<table>
                <thead>
                    <tr>
                        <th>이름</th>
                        <th>유형</th>
                        <th>트리거 실행</th>
                    </tr>
                </thead>
                <tbody id='tbody'>
                </tbody>
            </table>`;
        document.querySelector('.table').append(tableEle);
    }
    const tbody = document.getElementById('tbody');
    tbody.insertAdjacentHTML('beforeend',
        `<tr>
            <td>${tagName}</td>
            <td>${tagType}</td>
            <td>
                <div class="list_trigger"><i class="${iconClass}"></i>${tagTri}</div>
            </td>
        </tr>`
    )

    //리스트로 저장 되면 resetEditor함수 호출

    //만약 모달폼을 지웠다 다시 불러오는 거면 editorClose함수 사용
    //첫 구현방식이면resetEditor함수 사용
    editorClose()
    // resetEditor();
}

//editor초기화 함수
function resetEditor(){
    const inp = document.getElementsByClassName('form_input');
    const testInputs = document.querySelectorAll('[id^=test]');
    const trigger_name = document.getElementById('trigger_name');

    //input태그 빈 값으로 초기화
    for(i of inp){
        i.value = null;
    }

    //트리거 이름 빈 값으로 초기화
    if(trigger_name){
        trigger_name.value = null;
    }

    //input태그 하나 남기고 삭제
    for(i of testInputs){
        if(i.getAttribute('id') != 'test1' && i.getAttribute('id') != 'test2'){
            i.remove();
        }
    }

    //태그 이름 빈 값으로 초기화, 구성 태그로 선택, 트리거 pageview로 설정(초기값으로)
    document.getElementById('tag_name').value = null;
    document.getElementById('conf').checked = true;
    document.getElementById('pageview').checked = true;

    //구성태그, pageview 트리거로 레이아웃 변경되도록 changeTagType, changeTriType함수 호출
    changeTagType();
    changeTriType();
}

//예외처리
function validation(){
    if(!document.getElementById('tag_name').value){
        openDialog("noValue", "태그 이름");
        return false;
    }
    if(document.getElementById('aa')){
        if(document.getElementById('aa').value == 'undefined'){
            errorLabel();
            return false;
        }
    }
    if(!document.getElementById('measurementId').value){
        errorLabel();
        return false;
    }
    document.querySelectorAll('[name^=ep]').forEach((e)=>{
        if(!e.value){
            openDialog("noValue2", "필드");
            return false;
        }
    })
    document.querySelectorAll('[name^=up]').forEach((e)=>{
        if(!e.value){
            openDialog("noValue2", "사용자 속성");
            return false;
        }
    })
    return true;
}

//dialog 열때 파라미터 값으로 dialog title, content값 변경 or 열려 있을 때 닫는 함수
function openDialog(errorType, value){
    var errorMsg = {};
    switch(errorType){
        case 'noSave':
            errorMsg = {
                title: '저장되지 않은 변경사항',
                content: '이 페이지를 닫으시겠습니까? 변경사항을 저장하지 않았습니다. 페이지를 닫으면 변경사항이 손실됩니다.'
            };
            break;
        case 'noValue':
            errorMsg = {
                title: '입력되지 않은 값이 있음',
                content: '이 태그에 ' + value + ' 값이 없습니다. 해당 값을 입력하지 않으면 태그를 저장할 수 없습니다.'
            };
        break;
        case 'noValue2':
            errorMsg = {
                title: '입력되지 않은 값이 있음',
                content: '이 태그에 입력되지 않은' + value + ' 값이 있습니다. 해당 값을 입력하지 않으면 태그를 저장할 수 없습니다.'
            };
        break;
        case 'dupValue':
            errorMsg = {
                title: '중복된 값이 있음',
                content: '컨테이너에 같은 이름의 ' + value + ' 값이 이미 있습니다. 다른 ' + value + '값을 입력하세요.'
            };
        break;
    }
    document.getElementById('dialog_header').innerHTML = errorMsg.title;
    document.getElementById('p').innerHTML = errorMsg.content;
    document.getElementById('dialog_wrapper').classList.toggle('opening');
    document.getElementById('dialog_background').classList.toggle('opening');
}

function errorLabel(){
    const tagType = document.getElementById('form_aa')
    const measurementId = document.getElementById('form_measurementId')
    if(document.getElementById('measurementId')){
        if(!document.getElementById('measurementId').value){
            if(measurementId.lastChild.className != 'errorLabel'){
                measurementId.insertAdjacentHTML('beforeend',`<div class="errorLabel">값을 입력해야 합니다.</div>`)
            }
        }
    }
    
    if(tagType){
        if(tagType.lastChild.className != 'errorLabel'){
            tagType.insertAdjacentHTML('beforeend',`<div class="errorLabel">값을 입력해야 합니다.</div>`)
        }
    }

}

document.querySelectorAll('.form_input').forEach((e)=>{
    e.addEventListener('change',function(){
        console.log('aa')
    })
})
// dialog창에서 변경사항 삭제 클릭 시 editor창 초기화 해주는 함수
function reset(){
    document.getElementById('dialog_wrapper').classList.toggle('opening');
    document.getElementById('dialog_background').classList.toggle('opening');
    resetEditor();
    editorClose();
}