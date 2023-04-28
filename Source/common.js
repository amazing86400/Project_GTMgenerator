// 변수 생성 함수
function createVariable(...args) {
  let variableId = 2; // 변수 ID 초기값 설정
  let fingerprint = Date.now(); // fingerprint 초기값 설정: 현재 시간 밀리초
  const array = args.map((arg) => {
    fingerprint += 1; // 변수마다 고유값을 가지기 위해 변수 추가 시 1씩 증가하도록 함
    return {
      accountId: '6006787882', // 고정값
      containerId: '115641829', // 고정값
      variableId: String(++variableId), // 변수 추가될 때마다 1씩 증가
      name: arg, // 변수명
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
          value: arg, // 변수명
        },
      ],
      fingerprint: String(fingerprint), // fingerprint 문자열 변환
      formatValue: {},
    };
  });

  return array;
}

// 컨테이너 데이터 설정
function setData(containerID, ...variable) {
  const now = new Date().toISOString().replace('T', ' ').substr(0, 19); // 내보내기 시간 추출

  // GTM 컨테이너 설정
  const gtmContainer = {
    exportFormatVersion: 2, // 내보내기 버전
    exportTime: now, // 현재 시간
    containerVersion: {
      path: 'accounts/6006787882/containers/115641829/versions/0', // 고정값
      accountId: '6006787882', // 고정값
      containerId: '115641829', // 고정값
      containerVersionId: '0', // 컨테이너 버전
      container: {
        path: 'accounts/6006787882/containers/115641829', // 고정값
        accountId: '6006787882', // 고정값
        containerId: '115641829', // 고정값
        name: 'json',
        publicId: containerID, // 컨테이너 ID
        usageContext: ['WEB'], // 컨테이너 플랫폼
        fingerprint: '1682579928362',
        tagManagerUrl: 'https://tagmanager.google.com/#/container/accounts/6006787882/containers/115641829/workspaces?apiLink=container',
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
        tagIds: [containerID],
      },
      variable: createVariable(...variable), // 변수 설정
      fingerprint: Date.now().toString(),
      tagManagerUrl: 'https://tagmanager.google.com/#/versions/accounts/6006787882/containers/115641829/versions/0?apiLink=version',
    },
  };

  return gtmContainer;
}

function json(containerID, ...variable) {
  // JSON 파일로 저장
  const jsonString = JSON.stringify(setData(containerID, ...variable));
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  // 파일 다운로드
  const a = document.createElement('a');
  a.download = 'gtm-container.json';
  a.href = url;
  a.click();
}
