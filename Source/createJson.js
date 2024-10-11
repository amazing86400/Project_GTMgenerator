// variableId 초기값 설정
let variableId = 0;
let fingerprint = Date.now();

// 태그 생성 함수 정의
function createTag(args) {
  const array = args.map((arg) => {
    fingerprint += 1; // 변수마다 고유값을 가지기 위해 변수 추가 시 1씩 증가하도록 함
    variableId += 1; // 변수마다 고유값을 가지기 위해 변수 추가 시 1씩 증가하도록 함
    return {
      accountId: '6064990558',
      containerId: '115641829',
      tagId: String(variableId),
      name: arg.tagName,
      type: arg.type, // 구글 태그: gaawc, 이벤트태그: gaawe
      parameter: setParameter(arg),
      fingerprint: String(fingerprint),
      firingTriggerId: arg.triggerType == 'pageview' ? ['2147479553'] : [String(arg.triggerId)],
      tagFiringOption: 'ONCE_PER_EVENT',
      monitoringMetadata: {
        type: 'MAP',
      },
      consentSettings: {
        consentStatus: 'NOT_SET',
      },
    };
  });

  return array;
}

// 태그 내 parameter 반환 함수 정의
// 구글 태그, 이벤트 태그 구분하여 설정
function setParameter(arg) {
  // 구글 태그 설정
  if (arg.type === 'googtag') {
    return [
      {
        type: 'TEMPLATE',
        key: 'tagId',
        value: arg.measurementId,
      },
      {
        type: 'TEMPLATE',
        key: 'eventSettingsVariable',
        value: '{{' + arg.eventVariable.eventVariableName + '}}',
      },
    ];
  }
  // 이벤트 태그 설정
  else {
    const ecommerceData = {
      type: 'BOOLEAN',
      key: 'sendEcommerceData',
      value: String(arg.isEcommerce),
    };

    const eventName = {
      type: 'TEMPLATE',
      key: 'eventName',
      value: arg.eventName,
    };

    const measurementId = {
      type: 'TEMPLATE',
      key: 'measurementIdOverride',
      value: arg.measurementId,
    };

    const eventParams = {
      type: "LIST",
      key: "eventSettingsTable",
      list: arg.dimensions.map((ep)=> {
        return {
          type: "MAP",
          map: [
            {
              type: "TEMPLATE",
              key: "parameter",
              value: ep.name
            },
            {
              type: "TEMPLATE",
              key: "parameterValue",
              value: '{{' + ep.variable + '}}'
            }
          ]
        }
      })
    }

    const userProperties = {
      type: "LIST",
      key: "userProperties",
      list: arg.userProperties.map((up)=> {
        return {
          type: "MAP",
          map: [
            {
              type: "TEMPLATE",
              key: "name",
              value: up.name
            },
            {
              type: "TEMPLATE",
              key: "value",
              value: '{{' + up.variable + '}}'
            }
          ]
        }
      })
    }

    const eventVariable = {
      type: 'TEMPLATE',
      key: 'eventSettingsVariable',
      value: '{{' + arg.eventVariable.eventVariableName + '}}',
    };

    const ecommerceDataForm = {
      type: 'TEMPLATE',
      key: 'getEcommerceDataFrom',
      value: 'dataLayer',
    };

    // ecommerce가 설정된 경우
    if (arg.isEcommerce) {
      return [ecommerceData, ecommerceDataForm, eventName, measurementId, eventVariable];
    }
    // 아닌 경우
    else {
      return [ecommerceData, eventName, measurementId, eventParams, userProperties, eventVariable];
    }
  }
}

// 트리거 생성 함수 정의
function createTrigger(args) {
  const array = args.map((arg) => {
    fingerprint += 1;
    return {
      accountId: '6064990558',
      containerId: '115641829',
      triggerId: String(arg.triggerId),
      name: arg.name, // 트리거 이름
      type: 'CUSTOM_EVENT',
      customEventFilter: [
        {
          type: 'EQUALS',
          parameter: [
            {
              type: 'TEMPLATE',
              key: 'arg0',
              value: '{{_event}}',
            },
            {
              type: 'TEMPLATE',
              key: 'arg1',
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
function createVariable(eventVariable, variable) {
  // 최종 반환할 배열
  let variableArr = [];

  // 데이터 영역 변수 및 CID 설정
  variableArr.push(...setVariable(variable));

  // 구글이벤트 변수 설정
  for (let param of eventVariable) {
    variableId += 1;
    fingerprint += 1;
    variableArr.push(...setGoogleEvent(param));
  }

  return variableArr;
}

// 데이터 영역 변수 및 CID 설정 함수 정의
function setVariable(arrs) {
  return arrs.flatMap((arg) => {
    variableId += 1;
    fingerprint += 1;
    // CID 설정
    if (arg.includes('##')) {
      const gaCookie = createGoogleVariable('GA_Cookie', 'k', [
        { type: 'BOOLEAN', key: 'decodeCookie', value: 'false' },
        { type: 'TEMPLATE', key: 'name', value: '_ga' },
      ]);
      variableId += 1;
      fingerprint += 1;
      const gaCid = createGoogleVariable(arg.split('##')[1], 'jsm', [
        {
          type: 'TEMPLATE',
          key: 'javascript',
          value: 'function() { return {{GA_Cookie}}.substring(6); }',
        },
      ]);

      return [gaCookie, gaCid];
    }
    // 데이터 영역 변수
    else {
      return [
        createGoogleVariable(arg, 'v', [
          { type: 'INTEGER', key: 'dataLayerVersion', value: '2' },
          { type: 'BOOLEAN', key: 'setDefaultValue', value: 'false' },
          { type: 'TEMPLATE', key: 'name', value: arg },
        ]),
      ];
    }
  });

  // 변수 구조 설정 함수 정의
  function createGoogleVariable(name, type, parameters) {
    return {
      accountId: '6064990558',
      containerId: '115641829',
      variableId: String(variableId),
      name: name,
      type: type,
      parameter: parameters,
      fingerprint: String(fingerprint),
      formatValue: {},
    };
  }
}

// 구글 이벤트 변수 설정 함수 정의
function setGoogleEvent(args) {
  let setEventParam = createList('eventSettingsTable', args.eventSetting, 'parameter', 'parameterValue');
  let setUserParam = createList('userProperties', args.userSetting, 'name', 'value');

  return [createGoogleEvent(args.eventVariableName, 'gtes', [setEventParam, setUserParam])];

  function createList(key1, listItems, key2, key3) {
    return {
      type: 'LIST',
      key: key1,
      list: listItems.map((param) => {
        const value = param.variable.includes('##') ? param.variable.split('##')[1] : param.variable;

        return {
          type: 'MAP',
          map: [
            { type: 'TEMPLATE', key: key2, value: param.name },
            { type: 'TEMPLATE', key: key3, value: `{{${value}}}` },
          ],
        };
      }),
    };
  }

  // 구글이벤트 변수 구조 설정 함수 정의
  function createGoogleEvent(name, type, parameters) {
    return {
      accountId: '6064990558',
      containerId: '115641829',
      variableId: String(variableId),
      name: name,
      type: type,
      parameter: parameters,
      fingerprint: String(fingerprint),
    };
  }
}

// 컨테이너 데이터 설정 함수 정의
function setContainer(tag, trigger, eventVariable, variable) {
  const now = new Date().toISOString().replace('T', ' ').substr(0, 19); // 내보내기 시간 추출

  // GTM 컨테이너 설정
  const gtmContainer = {
    exportFormatVersion: 2, // 내보내기 버전
    exportTime: now, // 현재 시간
    containerVersion: {
      path: 'accounts/6064990558/containers/115641829/versions/0', // 고정값
      accountId: '6064990558', // 고정값
      containerId: '115641829', // 고정값
      containerVersionId: '0', // 컨테이너 버전
      container: {
        path: 'accounts/6064990558/containers/115641829', // 고정값
        accountId: '6064990558', // 고정값
        containerId: '115641829', // 고정값
        name: 'json',
        publicId: 'GTM-1234567', // 컨테이너 ID
        usageContext: ['WEB'], // 컨테이너 플랫폼
        fingerprint: '1682579928362',
        tagManagerUrl: 'https://tagmanager.google.com/#/container/accounts/6064990558/containers/115641829/workspaces?apiLink=container',
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
        tagIds: ['GTM-12345678'],
      },
      tag: createTag(tag), // 태그 설정
      trigger: createTrigger(trigger), // 트리거 설정
      variable: createVariable(eventVariable, variable), // 변수 설정
      fingerprint: Date.now().toString(),
      tagManagerUrl: 'https://tagmanager.google.com/#/versions/accounts/6064990558/containers/115641829/versions/0?apiLink=version',
    },
  };

  return gtmContainer;
}

// json 파일 다운로드 함수 정의
function json(tag, trigger, eventVariable, variable) {
  // JSON 파일로 저장
  const jsonString = JSON.stringify(setContainer(tag, trigger, eventVariable, variable));
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  // 파일 다운로드
  const a = document.createElement('a');
  a.download = 'GTM-GENERATOR.json';
  a.href = url;
  a.click();
}
