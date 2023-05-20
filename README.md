# GTM Generator

> 20230427~
> GTM Service Project

<br>

## Overview

> 'GTM Generator'는 GTM 초기 설정을 보다 더 쉽게 하기 위한 목적으로 시작되었습니다.
> GTM Generator를 사용하면 개발자가 아닌, 기획자도 태그 및 트리거, 변수 설정을 매우 쉽게 설정할 수 있습니다.
>
> GTM Generator는 페이지에 원하는 태그, 트리거, 변수를 입력하면, 입력한 정보를 기반으로 GTM 컨테이너 Json 파일을 만들어 줍니다.
> 사용자는 Json 파일을 GTM 내 '가져오기' 기능을 사용하여 GTM 초기 설정을 마칠 수 있습니다.

<br>

## Todo

<details><summary> <b>기능 구현</b> </summary>
  
* 각 input태그 값 추출하여 배열로 저장(05.11 완료) 
* 배열로 저장된 태그 정보 태그 리스트 출력(05.11 완료)
* 태그 생성 후 모달창 내 input태그 값 초기화(05.11 완료)
* 구성태그 input값으로 데이터 설정(05.11 완료)
* 맞춤 이벤트 디자인 및 기능 구현(05.13 완료)
* 이벤트 태그 데이터 디자인 설정(05.13 완료)
* 이벤트 태그 기능 구현(05.16 완료)
* 모달창 디자인 수정(05.21 완료)
* 트리거명 중복체크
* cid값 당사쿠키로 기본설정 or 체크했을 때 설정
* 전자상거래 구현
* 태그 생성 후 input태그 하나 제외하고 삭제
* 첫 화면에서 태그 선택 시 설정된 값 확인
* 명명 규칙 준수하여 변수명 수정
* 리펙토링
  
</details>
<br>

<details><summary> <b>예외처리</b></summary>
  
* 태그 생성 중에 input태그에 값 있는 경우 닫기 눌렀을 때 alert창 출력
* 이벤트 매개변수 동일한 변수명 있을 시 alert출력
* 태그명 없을 시 태그 저장X
* 새로고침 시 경고창 출력
* 측정ID 형식
  
</details>
<br>

## Development environment

> - HTML
> - CSS
> - JavaScript
