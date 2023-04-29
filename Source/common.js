// 태그 생성 함수 정의
function createTag(args) {
  let fingerprint = Date.now(); // fingerprint 초기값 설정: 현재 시간 밀리초
  const array = args.map((arg) => {
    fingerprint += 1; // 변수마다 고유값을 가지기 위해 변수 추가 시 1씩 증가하도록 함
    variableId += 1;
    return {
      accountId: "6064990558",
      containerId: "115156524",
      tagId: String(variableId),
      name: arg.tagName,
      type: arg.type, // 구성태그: gaawc, 이벤트태그: gaawe
      parameter: setParameter(arg),
      fingerprint: String(fingerprint),
      firingTriggerId: ["2147479553"],
      tagFiringOption: "ONCE_PER_EVENT",
      monitoringMetadata: {
        type: "MAP",
      },
      consentSettings: {
        consentStatus: "NOT_SET",
      },
    };
  });

  return array;
}

// 20230429 생성_기범
// 태그 내 parameter 반환 함수 정의
// 구성 태그, 이벤트 태그 구분하여 설정
function setParameter(args) {
  const array = args.map((arg) => {
    // 구성 태그
    if (arg.type === "config") {
      return [
        {
          type: "LIST",
          key: "fieldsToSet",
          list: setVariable(arg.VAR_Array),
        },
        {
          type: "LIST",
          key: "userProperties",
          list: setVariable(arg.user_Array),
        },
        {
          type: "BOOLEAN",
          key: "sendPageView",
          value: "true",
        },
        {
          type: "BOOLEAN",
          key: "enableSendToServerContainer",
          value: "false",
        },
        {
          type: "TEMPLATE",
          key: "measurementId",
          value: arg.measurementId,
        },
      ];
    } else {
      const ecommerceData = {
        type: "BOOLEAN",
        key: "sendEcommerceData",
        value: arg.isEcommerce ? "true" : "false",
      };

      const eventParameters = {
        type: "LIST",
        key: "eventParameters",
        list: setVariable(arg.VAR_Array),
      };

      const measurementId = {
        type: "TAG_REFERENCE",
        key: "measurementId",
        value: args.configTag,
      };

      const eventName = {
        type: "TEMPLATE",
        key: "eventName",
        value: args.eventName,
      };

      // ecommerce가 설정된 경우
      if (arg.isEcommerce) {
        return [
          ecommerceData,
          eventParameters,
          measurementId,
          eventName,
          { type: "TEMPLATE", key: "getEcommerceDataFrom", value: "dataLayer" },
        ];
      }

      // ecommerce가 설정되지 않은 경우
      return [ecommerceData, eventParameters, measurementId, eventName];
    }
  });

  return array;
}

// 20230429 key, value 설정 변경_기범
// 태그 내 변수 설정 함수 정의
function setVariable(arrs) {
  const list = arrs.map((arr) => {
    return {
      type: "MAP",
      map: [
        {
          type: "TEMPLATE",
          key: "name",
          value: arr.name,
        },
        {
          type: "TEMPLATE",
          key: "value",
          value: "{{" + arr.variable + "}}",
        },
      ],
    };
  });

  return list;
}

// 트리거 생성 함수 정의
function createTrigger(args) {
  let fingerprint = Date.now(); // fingerprint 초기값 설정: 현재 시간 밀리초
  const array = args.map((arg) => {
    variableId += 1;
    fingerprint += 1; // 변수마다 고유값을 가지기 위해 변수 추가 시 1씩 증가하도록 함
    return {
      accountId: "6064990558",
      containerId: "115156524",
      triggerId: String(variableId),
      name: arg.name,
      type: "CUSTOM_EVENT",
      customEventFilter: [
        {
          type: "EQUALS",
          parameter: [
            {
              type: "TEMPLATE",
              key: "arg0",
              value: "{{_event}}",
            },
            {
              type: "TEMPLATE",
              key: "arg1",
              value: arg.variable,
            },
          ],
        },
      ],
      fingerprint: String(fingerprint),
    };
  });

  return array;
}

// 변수 생성 함수 정의
function createVariable(args) {
  // let variableId = 2; // 변수 ID 초기값 설정
  let fingerprint = Date.now(); // fingerprint 초기값 설정: 현재 시간 밀리초
  const array = args.map((arg) => {
    variableId += 1;
    fingerprint += 1; // 변수마다 고유값을 가지기 위해 변수 추가 시 1씩 증가하도록 함
    return {
      accountId: "6006787882", // 고정값
      containerId: "115641829", // 고정값
      variableId: String(variableId), // 변수 추가될 때마다 1씩 증가
      name: arg, // 변수명
      type: "v",
      parameter: [
        {
          type: "INTEGER",
          key: "dataLayerVersion",
          value: "2",
        },
        {
          type: "BOOLEAN",
          key: "setDefaultValue",
          value: "false",
        },
        {
          type: "TEMPLATE",
          key: "name",
          value: arg, // 변수명
        },
      ],
      fingerprint: String(fingerprint), // fingerprint 문자열 변환
      formatValue: {},
    };
  });

  return array;
}

// 컨테이너 데이터 설정 함수 정의
function setData(tag, trigger, variable) {
  const now = new Date().toISOString().replace("T", " ").substr(0, 19); // 내보내기 시간 추출

  // GTM 컨테이너 설정
  const gtmContainer = {
    exportFormatVersion: 2, // 내보내기 버전
    exportTime: now, // 현재 시간
    containerVersion: {
      path: "accounts/6006787882/containers/115641829/versions/0", // 고정값
      accountId: "6006787882", // 고정값
      containerId: "115641829", // 고정값
      containerVersionId: "0", // 컨테이너 버전
      container: {
        path: "accounts/6006787882/containers/115641829", // 고정값
        accountId: "6006787882", // 고정값
        containerId: "115641829", // 고정값
        name: "json",
        publicId: "GTM-1234567", // 컨테이너 ID
        usageContext: ["WEB"], // 컨테이너 플랫폼
        fingerprint: "1682579928362",
        tagManagerUrl:
          "https://tagmanager.google.com/#/container/accounts/6006787882/containers/115641829/workspaces?apiLink=container",
        features: {
          supportUserPermissions: true,
          supportEnvironments: true,
          supportWorkspaces: true,
          supportGtagConfigs: false,
          supportBuiltInVariables: true,
          supportClients: false,
          supportFolders: true,
          supportTags: true,
          supportTemplates: true,
          supportTriggers: true,
          supportVariables: true,
          supportVersions: true,
          supportZones: true,
          supportTransformations: false,
        },
        tagIds: ["GTM-1234567"],
      },
      tag: createTag(tag), // 변수 설정
      trigger: createTrigger(trigger), // 변수 설정
      variable: createVariable(variable), // 변수 설정
      fingerprint: Date.now().toString(),
      tagManagerUrl:
        "https://tagmanager.google.com/#/versions/accounts/6006787882/containers/115641829/versions/0?apiLink=version",
    },
  };

  return gtmContainer;
}

// json 파일 다운로드 함수 정의
function json(tag, trigger, variable) {
  // JSON 파일로 저장
  const jsonString = JSON.stringify(setData(tag, trigger, variable));
  const blob = new Blob([jsonString], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  // 파일 다운로드
  const a = document.createElement("a");
  a.download = "gtm-container.json";
  a.href = url;
  a.click();
}
