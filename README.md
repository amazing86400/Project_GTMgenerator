# GTM Generator

'GTM Generator'는 Google Tag Manager 초기 설정을 간편하게 수행하기 위해 개발된 서비스입니다. 이 도구를 활용하면 개발자가 아닌 기획자도 손쉽게 태그, 트리거, 변수를 설정할 수 있습니다. 더 나아가, 기존 설정보다 더 편리한 작업 환경을 제공합니다.

GTM Generator를 통해 사용자는 원하는 태그, 트리거, 변수 정보를 입력하면 해당 정보를 기반으로 GTM 컨테이너 Json 파일을 생성할 수 있습니다. 이를 GTM 내 '가져오기' 기능을 이용하여 빠르게 초기 설정을 완료할 수 있습니다. 이 서비스는 사용자에게 직관적이고 효율적인 GTM 초기 설정 경험을 제공하여 업무를 원활하게 진행할 수 있도록 지원합니다.
<br>
<br>
<br>

## 프로젝트 소개

- 프로젝트명: GTM Generator
- 기간: 2023. 04. 27 ~ 2023. 12. 06
- 기술: HTML, CSS, JavaScript
- 멤버: 신기범, 홍성호
- 프로젝트 배포 주소(URL): http://210.114.9.23/GA_part/shhong/workspace/TechProject/GTMgenerator/Source/main.html
  <br>

## 프로젝트 기능
![main](https://github.com/amazing86400/Project_GTMgenerator/assets/96508771/8d34cd22-a659-47da-9051-56635467b415)
GTM Generator는 GTM 초기 설정 서비스인만큼 태그, 트리거, 변수 모두 설정해야 합니다. 모두 설정을 마친 뒤 json 파일을 저장하여 GTM 컨테이너 작업공간에 "가져오기" 기능을 사용하여 GTM 설정을 마칩니다.

1. 태그, 트리거, 변수 설정하기
2. json 파일 다운받기
3. GTM 가져오기 진행
   <br>

## 세부 구현 기능

**1. 태그 설정**

<p align="center">
  <img src="https://github.com/amazing86400/Project_GTMgenerator/assets/96508771/8a252af6-dde2-403e-a4fb-5ede4c9f5d91" width="70%" height="70%" />
</p>

태그 설정의 경우 "GA4: 구글 태그"와 "GA4: 이벤트 태그"로 구분하여 태그별 UI와 기능 설정을 다르게 구성하였습니다. 각 태그들은 라벨 버튼 클릭을 통해 쉽게 구분하여 작업할 수 있습니다.

Google 태그의 경우 GA4 측정 ID를 사용자가 직접 입력하여 설정할 수 있도록 했습니다. GA4 이벤트 태그의 경우 구글 태그를 참조할 수 있도록 하여 측정 ID를 재입력 해야 하는 번거로움을 덜었습니다. 또한 전자상거래 설정 여부도 표시하여 해당 설정 통해 전자상거래 기능도 사용할 수 있도록 했습니다.
<br>
<br>

**2. 트리거 설정**

<p align="center">
  <img src="https://github.com/amazing86400/Project_GTMgenerator/assets/96508771/e1d1c365-1427-4853-8019-72da011b9049" width="70%" height="70%" />
</p>

트리거의 설정의 경우 가장 많이 활용하는 "페이지뷰 트리거"와 "맞춤 이벤트 트리거" 유형으로 구분하였고, 버튼 선택을 통해 쉽게 설정하도록 UI를 구성하였습니다.
페이지뷰 트리거인 "All Pages"를 기본 설정에 포함하여 사용자가 직접 입력하지 않더라도 쉽게 설정할 수 있도록 했으며, 맞춤 이벤트 트리거의 경우 트리거 이름과 이벤트 이름을 직접 설정하여 사용자가 원하는 값으로 설정할 수 있습니다.
<br>
<br>

**3. 변수 설정**

<p align="center">
  <img src="https://github.com/amazing86400/Project_GTMgenerator/assets/96508771/2c857b30-590c-4904-885f-049f4706170a" width="70%" height="70%" />
</p>

변수 설정의 경우 가장 최근 업데이트 사항인 "GA4 이벤트 변수" 기능을 추가했습니다. 그리고 사용자가 매개변수를 쉽게 설정할 수 있도록 input 박스에 매개변수를 붙여 넣으면 자동으로 key와 value가 설정되도록 구현했으며, 행 추가와 행 제거 버튼을 통해 매개변수를 추가하고 삭제할 수 있습니다.

또한 client ID 매개변수에 특수기호 "##"을 추가하면 WEB의 Client ID인 "\_ga" 쿠키 값을 가져오는 "맞춤 자바스크립트 변수"를 생성하여 사용자가 GTM에서 직접 맞춤 자바스크립트 변수를 설정하는 수고를 덜도록 했습니다.
<br>
<br>

**4. json 파일 저장**

<p align="center">
  <img src="https://github.com/amazing86400/Project_GTMgenerator/assets/96508771/4fa894a0-7b7f-44ae-852c-9cfc9a90df6d" width="70%" height="70%" />
</p>

태그, 트리거, 변수 설정까지 모두 마친 다음, "내보내기" 버튼을 누르면 사용자가 설정한 내용을 토대로 json 파일을 생성하여 사용자가 다운로드할 수 있도록 구현했습니다.
<br>
<br>

**5. GTM 가져오기**

<p align="center">
  <img src="https://github.com/amazing86400/Project_GTMgenerator/assets/96508771/91447a07-b6dc-4dc4-a505-a00d002f368d" width="70%" height="70%" />
</p>

GTM 작업 공간 내 "가져오기" 기능을 통해 GTM Generator에서 설정한 태그를 그대로 설정할 수 있습니다. 해당 기능을 통해 손쉽게 초기 설정을 마무리할 수 있습니다.
