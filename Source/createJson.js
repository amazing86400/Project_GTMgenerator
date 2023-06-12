// variableId 초기값 설정
let variableId = 0;
// 태그 생성 함수 정의
function createTag(args) {
  let fingerprint = Date.now(); // fingerprint 초기값 설정: 현재 시간 밀리초
  const array = args.map((arg) => {
    fingerprint += 1; // 변수마다 고유값을 가지기 위해 변수 추가 시 1씩 증가하도록 함
    variableId += 1; // 변수마다 고유값을 가지기 위해 변수 추가 시 1씩 증가하도록 함
    return {
      accountId: "6064990558",
      containerId: "115156524",
      tagId: String(variableId),
      name: arg.tagName,
      type: arg.type, // 구성태그: gaawc, 이벤트태그: gaawe
      parameter: setParameter(arg),
      fingerprint: String(fingerprint),
      firingTriggerId: (arg.triggerType == 'pageview') ? ["2147479553"]: [String(arg.triggerId)],
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

// 태그 내 parameter 반환 함수 정의
// 구성 태그, 이벤트 태그 구분하여 설정
function setParameter(arg) {
  // 구성 태그
  if (arg.type === "gaawc") {
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
    const measurementId = setMeasurementId();
    function setMeasurementId(){
      if(arg.measurementId.includes('G-')){
        return { 
          "type": "TEMPLATE",
          "key": "measurementId",
          "value": "none"
        }
      }else{
        return {
          "type": "TAG_REFERENCE",
          "key": "measurementId",
          "value": arg.measurementId
        }
      }
    }
    
    const measurementIdOverride = {
      "type": "TEMPLATE",
      "key": "measurementIdOverride",
      "value": arg.measurementId
    };

    const ecommerceData = {
      type: "BOOLEAN",
      key: "sendEcommerceData",
      value: arg.isEcommerce
      // value: arg.isEcommerce ? "true" : "false",
    };

    const eventParameters = {
      type: "LIST",
      key: "eventParameters",
      list: setVariable(arg.VAR_Array),
    };

    const userProperties = {
      type: "LIST",
      key: "userProperties",
      list: setVariable(arg.user_Array),
    };

    const eventName = {
      type: "TEMPLATE",
      key: "eventName",
      value: "{{"+arg.eventName+"}}",
    };

    // ecommerce가 설정된 경우
    if(arg.measurementId.includes('G-')){
      if(arg.isEcommerce){
        return [
          ecommerceData,
          eventParameters,
          measurementId,
          measurementIdOverride,
          eventName,
          userProperties,
          { type: "TEMPLATE", key: "getEcommerceDataFrom", value: "dataLayer" }
        ]
      }else{
        return [
          ecommerceData,
          eventParameters,
          measurementId,
          measurementIdOverride,
          eventName,
          userProperties
        ];
      }
    }else{
      if(arg.isEcommerce){
        return [
          ecommerceData,
          eventParameters,
          measurementId,
          eventName,
          userProperties,
          { type: "TEMPLATE", key: "getEcommerceDataFrom", value: "dataLayer" }
        ]
      }else{
        return [
          ecommerceData,
          eventParameters,
          measurementId,
          eventName,
          userProperties
        ]
      }
      
    }
  }
}

// 태그 내 변수 설정 함수 정의
function setVariable(arrs) {
  const list = arrs.map((arr) => {
    if (arr.variable.includes('##')) {
      return {
        type: 'MAP',
        map: [
          {
            type: 'TEMPLATE',
            key: 'name',
            value: arr.name, // 변수 이름
          },
          {
            type: 'TEMPLATE',
            key: 'value',
            value: '{{' + arr.variable.split('##')[1] + '}}', // 변수 값
          },
        ],
      };
    } else {
      return {
        type: 'MAP',
        map: [
          {
            type: 'TEMPLATE',
            key: 'name',
            value: arr.name, // 변수 이름
          },
          {
            type: 'TEMPLATE',
            key: 'value',
            value: '{{' + arr.variable + '}}', // 변수 값
          },
        ],
      };
    }
  });

  return list;
}

// 트리거 생성 함수 정의
function createTrigger(args) {
  let fingerprint = Date.now(); // fingerprint 초기값 설정: 현재 시간 밀리초
  const array = args.map((arg) => {
    fingerprint += 1; // 변수마다 고유값을 가지기 위해 변수 추가 시 1씩 증가하도록 함
    return {
      accountId: "6064990558",
      containerId: "115156524",
      triggerId: String(arg.triggerId),
      name: arg.name, // 트리거 이름
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
              value: arg.variable, // 트리거 변수 값
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
  let fingerprint = Date.now(); // fingerprint 초기값 설정: 현재 시간 밀리초
  const array = args.map((arg) => {
    variableId += 1; // 변수마다 고유값을 가지기 위해 변수 추가 시 1씩 증가하도록 함
    fingerprint += 1; // 변수마다 고유값을 가지기 위해 변수 추가 시 1씩 증가하도록 함
    if (arg.includes('##')) {
      return [
        {
          accountId: '6006787882',
          containerId: '115641829',
          variableId: String(variableId),
          name: 'GA_Cookie',
          type: 'k',
          parameter: [
            {
              type: 'BOOLEAN',
              key: 'decodeCookie',
              value: 'false',
            },
            {
              type: 'TEMPLATE',
              key: 'name',
              value: '_ga',
            },
          ],
          fingerprint: String(fingerprint),
          formatValue: {},
        },
        {
          accountId: '6006787882',
          containerId: '115641829',
          variableId: String(++variableId),
          name: arg.split('##')[1],
          type: 'jsm',
          parameter: [
            {
              type: 'TEMPLATE',
              key: 'javascript',
              value: 'function() {\n  return {{GA_Cookie}}.substring(6);\n}',
            },
          ],
          fingerprint: String(fingerprint),
          formatValue: {},
        },
      ];
    } else {
      return {
        accountId: '6006787882',
        containerId: '115641829',
        variableId: String(variableId),
        name: arg, // 변수 이름
        type: 'v',
        parameter: [
          {
            type: 'INTEGER',
            key: 'dataLayerVersion',
            value: '2',
          },
          {
            type: 'BOOLEAN',
            key: 'setDefaultValue',
            value: 'false',
          },
          {
            type: 'TEMPLATE',
            key: 'name',
            value: arg, // 변수 값
          },
        ],
        fingerprint: String(fingerprint),
        formatValue: {},
      };
    }
  });

  return array.flat();
}

// 컨테이너 데이터 설정 함수 정의
function setContainer(tag, trigger, variable) {
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
      tag: createTag(tag), // 태그 설정
      trigger: createTrigger(trigger), // 트리거 설정
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
  const jsonString = JSON.stringify(setContainer(tag, trigger, variable));
  const blob = new Blob([jsonString], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  // 파일 다운로드
  const a = document.createElement("a");
  a.download = "gtm-container.json";
  a.href = url;
  a.click();
}
