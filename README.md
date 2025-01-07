# GTM Generator

**GTM Generator**는 Google Tag Manager(GTM) 초기 설정을 간편화하기 위해 개발된 서비스입니다. 이 도구를 통해 개발 경험이 없는 사용자도 손쉽게 태그, 트리거, 변수를 설정할 수 있으며, 기존 설정 방식보다 효율적인 작업 환경을 제공합니다.

사용자는 GTM Generator에 필요한 정보를 입력하면, 해당 데이터를 기반으로 **GTM 컨테이너 JSON 파일**을 생성할 수 있습니다. 이 파일은 GTM의 "가져오기" 기능을 사용하여 손쉽게 초기 설정을 완료할 수 있습니다. 직관적이고 효율적인 설정 경험을 제공하여 업무 생산성을 향상시킵니다.

---

## 프로젝트 소개

- **프로젝트명**: GTM Generator
- **개발 기간**: 2023. 04. 27 ~ 2023. 12. 06 (약 7개월)
- **사용 기술**: HTML, CSS, JavaScript
- **개발 멤버**: 신기범, 홍성호  
- **프로젝트 배포 URL**: [GTM Generator](http://210.114.9.23/GA_part/shhong/workspace/TechProject/GTMgenerator/Source/main.html)

---

## 주요 기능

![메인 화면](https://github.com/amazing86400/Project_GTMgenerator/assets/96508771/8d34cd22-a659-47da-9051-56635467b415)

GTM Generator는 GTM 초기 설정을 위한 태그, 트리거, 변수 설정을 제공합니다. 모든 설정 완료 후 JSON 파일을 다운로드하여 GTM의 "가져오기" 기능으로 간편하게 설정을 적용할 수 있습니다.

### 핵심 기능
1. 태그, 트리거, 변수 설정
2. JSON 파일 생성 및 다운로드
3. GTM "가져오기"를 통한 설정 적용
4. 태그 삭제 기능

---

## 세부 구현 내용

### 1. 태그 설정

![태그 설정](https://github.com/amazing86400/Project_GTMgenerator/assets/96508771/8a252af6-dde2-403e-a4fb-5ede4c9f5d91)

- **GA4: Google 태그**와 **GA4: 이벤트 태그**로 나뉘며, 각 태그별 UI와 기능을 차별화했습니다.
- 사용자는 **GA4 측정 ID**를 직접 입력하거나, 참조 태그를 활용하여 입력 과정을 간소화할 수 있습니다.
- **전자상거래 설정** 여부를 명시하여 관련 태그 설정을 지원합니다.

---

### 2. 트리거 설정

![트리거 설정](https://github.com/amazing86400/Project_GTMgenerator/assets/96508771/e1d1c365-1427-4853-8019-72da011b9049)

- **페이지뷰 트리거**와 **맞춤 이벤트 트리거**로 분류되어 가장 자주 사용하는 트리거 유형을 제공합니다.
- 기본적으로 "All Pages" 페이지뷰 트리거가 포함되며, 맞춤 이벤트 트리거는 이름과 이벤트를 사용자가 직접 정의할 수 있습니다.

---

### 3. 변수 설정

![변수 설정](https://github.com/amazing86400/Project_GTMgenerator/assets/96508771/2c857b30-590c-4904-885f-049f4706170a)

- **GA4 이벤트 변수**를 지원하며, 사용자가 매개변수를 직관적으로 설정할 수 있도록 설계되었습니다.
- **행 추가/제거** 기능을 통해 매개변수를 유연하게 관리할 수 있습니다.
- Client ID 설정 시 특수 기호 `##`을 추가하면 **맞춤 자바스크립트 변수**를 자동 생성하여 GTM 내 설정 과정을 단축시킵니다.

---

### 4. JSON 파일 저장

![JSON 저장](https://github.com/amazing86400/Project_GTMgenerator/assets/96508771/4fa894a0-7b7f-44ae-852c-9cfc9a90df6d)

- 사용자가 설정한 태그, 트리거, 변수 정보를 기반으로 **JSON 파일**을 생성합니다.
- "내보내기" 버튼을 통해 해당 파일을 다운로드할 수 있습니다.

---

### 5. GTM 가져오기

![GTM 가져오기](https://github.com/amazing86400/Project_GTMgenerator/assets/96508771/91447a07-b6dc-4dc4-a505-a00d002f368d)

- 생성된 JSON 파일을 GTM 작업 공간의 "가져오기" 기능을 사용하여 적용할 수 있습니다.
- 이 기능을 통해 설정 과정을 간소화하고 오류를 줄일 수 있습니다.

---

### 6. 태그 삭제

![태그 삭제](https://github.com/amazing86400/Project_GTMgenerator/assets/96508771/ecc19603-bd06-46a1-9490-fa13de86465e)

- 필요 없는 태그를 선택적으로 삭제할 수 있습니다.
- **전체 선택** 또는 **개별 선택** 기능을 지원하여 편리하게 태그를 관리할 수 있습니다.

---

**GTM Generator**는 사용자 친화적인 설계와 직관적인 인터페이스로 GTM 초기 설정을 더욱 빠르고 효율적으로 만듭니다.  
