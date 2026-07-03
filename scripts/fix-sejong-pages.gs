/**
 * 01_pages 탭의 sejong/ 18개 행만 보정한다.
 *
 * 실행 전 대상 행 수와 업종 구성을 검증하고, 실행 후에도 대상 수 및
 * "세종시" 잔존 여부를 다시 확인한다. 검증 실패 시 쓰기 전에 중단한다.
 */
function fixSejongPages() {
  const SHEET_NAME = '01_pages';
  const SLUG_PREFIX = 'sejong/';
  const EXPECTED_COUNT = 18;

  const differentiators = {
    '초등 국어과외': '세종 초등 국어과외는 글을 읽고 핵심 내용을 정리하는 힘부터 잡아야 하므로, 교과서 지문 이해와 어휘 정리, 짧은 글쓰기 연습을 함께 진행합니다',
    '초등 영어과외': '세종 초등 영어과외는 단어 암기보다 영어 문장에 익숙해지는 과정이 중요하므로, 파닉스와 기초 문장 읽기, 학교 진도 복습을 함께 관리합니다',
    '초등 수학과외': '세종 초등 수학과외는 계산 실수와 개념 혼동을 줄이는 것이 먼저이므로, 단원별 기본 개념 확인 후 유형 문제를 반복해 자신감을 쌓도록 돕습니다',
    '초등 사회과외': '세종 초등 사회과외는 용어와 흐름을 이해해야 점수가 오르므로, 지도·역사·생활 단원을 쉬운 예시로 연결해 기억에 남도록 수업합니다',
    '초등 과학과외': '세종 초등 과학과외는 실험 결과와 개념을 함께 이해해야 하므로, 교과서 그림과 핵심 용어를 정리하며 단원별 문제 적용력을 키웁니다',
    '초등 한국사과외': '세종 초등 한국사과외는 사건 이름을 외우기보다 시대 흐름을 이해하는 것이 중요하므로, 인물·사건·연표를 연결해 자연스럽게 익히도록 돕습니다',
    '중등 국어과외': '세종 중등 국어과외는 문학과 비문학을 구분해 읽는 힘이 필요하므로, 작품 해석과 중심 내용 정리, 서술형 답안 작성까지 함께 관리합니다',
    '중등 영어과외': '세종 중등 영어과외는 내신 문법과 독해 흐름을 함께 잡아야 하므로, 학교 시험 범위에 맞춰 단어·문법·본문 해석을 단계적으로 정리합니다',
    '중등 수학과외': '세종 중등 수학과외는 한 단원의 빈틈이 다음 단원까지 이어지기 쉬우므로, 개념 설명 후 대표 유형과 오답 문제를 반복해 실수를 줄입니다',
    '중등 사회과외': '세종 중등 사회과외는 개념 용어와 자료 해석이 함께 필요하므로, 교과서 핵심 내용 정리와 시험에 자주 나오는 문제 유형을 연결해 수업합니다',
    '중등 과학과외': '세종 중등 과학과외는 공식 암기보다 원리 이해가 중요하므로, 물리·화학·생명·지구과학 단원별 개념을 쉬운 예시로 풀어 설명합니다',
    '중등 한국사과외': '세종 중등 한국사과외는 시대별 흐름과 사건의 원인을 함께 이해해야 하므로, 연표 정리와 핵심 사건 비교를 통해 내신 대비를 돕습니다',
    '고등 국어과외': '세종 고등 국어과외는 독서와 문학 지문을 빠르게 파악하는 힘이 필요하므로, 지문 구조 분석과 선택지 판단 기준을 함께 훈련합니다',
    '고등 영어과외': '세종 고등 영어과외는 시험 범위 본문과 어법 포인트를 정확히 정리해야 하므로, 단어·구문·내신 변형 문제까지 연결해 대비합니다',
    '고등 수학과외': '세종 고등 수학과외는 개념 이해와 문제 접근 순서가 중요하므로, 학교 진도에 맞춰 기본 개념부터 심화 유형까지 단계적으로 관리합니다',
    '고등 사회과외': '세종 고등 사회과외는 과목별 개념과 자료 해석 능력이 함께 필요하므로, 시험 범위 핵심 정리와 기출형 문제 풀이를 병행합니다',
    '고등 과학과외': '세종 고등 과학과외는 단원별 공식과 개념 적용이 중요하므로, 자주 틀리는 유형을 기준으로 개념 정리와 문제풀이를 함께 진행합니다',
    '고등 한국사과외': '세종 고등 한국사과외는 시대 흐름과 세부 사건을 함께 기억해야 하므로, 연표 기반 정리와 내신 빈출 문제를 연결해 점수를 관리합니다',
  };

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  if (!sheet) throw new Error(`${SHEET_NAME} 탭을 찾을 수 없습니다.`);

  const range = sheet.getDataRange();
  const values = range.getValues();
  if (values.length < 2) throw new Error(`${SHEET_NAME} 탭에 데이터가 없습니다.`);

  const headers = values[0].map(String);
  const slugColumn = headers.indexOf('slug');
  const businessHeader = headers.includes('업종') ? '업종' : '업종키워드';
  const businessColumn = headers.indexOf(businessHeader);
  const differentiatorColumn = headers.indexOf('차별문장');

  const missingHeaders = [
    ['slug', slugColumn],
    ['업종 또는 업종키워드', businessColumn],
    ['차별문장', differentiatorColumn],
  ].filter(([, index]) => index === -1).map(([header]) => header);

  if (missingHeaders.length) {
    throw new Error(`필수 열을 찾을 수 없습니다: ${missingHeaders.join(', ')}`);
  }

  const targetRows = [];
  for (let rowIndex = 1; rowIndex < values.length; rowIndex += 1) {
    const slug = String(values[rowIndex][slugColumn] || '').trim();
    if (slug.startsWith(SLUG_PREFIX)) targetRows.push(rowIndex);
  }

  if (targetRows.length !== EXPECTED_COUNT) {
    throw new Error(`수정 중단: ${SLUG_PREFIX} 행이 ${targetRows.length}개입니다. 예상값은 ${EXPECTED_COUNT}개입니다.`);
  }

  const seenBusinesses = new Set();
  const updatedRows = targetRows.map((rowIndex) => {
    const updated = values[rowIndex].map((cell) =>
      typeof cell === 'string' ? cell.replace(/세종시/g, '세종') : cell
    );
    const business = String(updated[businessColumn] || '')
      .trim()
      .replace(/^세종\s+/, '');

    if (!Object.prototype.hasOwnProperty.call(differentiators, business)) {
      throw new Error(`수정 중단: ${rowIndex + 1}행의 업종 "${business}"에 대응하는 차별문장이 없습니다.`);
    }
    if (seenBusinesses.has(business)) {
      throw new Error(`수정 중단: 업종 "${business}"이 중복되어 있습니다.`);
    }

    seenBusinesses.add(business);
    updated[differentiatorColumn] = differentiators[business];
    return { rowIndex, values: updated };
  });

  const missingBusinesses = Object.keys(differentiators).filter(
    (business) => !seenBusinesses.has(business)
  );
  if (missingBusinesses.length) {
    throw new Error(`수정 중단: 세종 행에서 다음 업종을 찾지 못했습니다: ${missingBusinesses.join(', ')}`);
  }

  const stagedRemainders = updatedRows.filter(({ values: row }) =>
    row.some((cell) => typeof cell === 'string' && cell.includes('세종시'))
  );
  if (stagedRemainders.length) {
    throw new Error('수정 중단: 쓰기 전 데이터에 "세종시"가 남아 있습니다.');
  }

  updatedRows.forEach(({ rowIndex, values: row }) => {
    sheet.getRange(rowIndex + 1, 1, 1, row.length).setValues([row]);
  });
  SpreadsheetApp.flush();

  const verifiedValues = sheet.getDataRange().getValues();
  const verifiedTargets = verifiedValues.slice(1).filter((row) =>
    String(row[slugColumn] || '').trim().startsWith(SLUG_PREFIX)
  );
  const remainingSejongCity = verifiedTargets.some((row) =>
    row.some((cell) => typeof cell === 'string' && cell.includes('세종시'))
  );

  if (verifiedTargets.length !== EXPECTED_COUNT || remainingSejongCity) {
    throw new Error(
      `사후 검증 실패: ${SLUG_PREFIX} ${verifiedTargets.length}개, "세종시" 잔존 ${remainingSejongCity ? '있음' : '없음'}`
    );
  }

  console.log(`완료: ${SHEET_NAME}의 ${SLUG_PREFIX} ${verifiedTargets.length}개 행 보정, "세종시" 잔존 없음`);
}
