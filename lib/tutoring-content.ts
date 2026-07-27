import type { TutoringPage } from "@/lib/tutoring-pages";
import { withJosa } from "@/lib/korean-text";

type GradeKey = "elementary" | "middle" | "high";
type SubjectKey =
  | "korean"
  | "english"
  | "math"
  | "social"
  | "science"
  | "koreanHistory";

type LessonStep = {
  title: string;
  description: string;
};

type ConsultCheck = {
  title: string;
  description: string;
};

type DetailFaq = {
  question: string;
  answer: string;
};

export type LocalTutoringDetailContent = {
  opening: string;
  mainCaption: string;
  studentLead: string;
  priorityBody: string;
  middleImageAlt: string;
  middleCaption: string;
  lessonIntro: string;
  lessonDifference: string;
  steps: LessonStep[];
  consultIntro: string;
  consultChecks: ConsultCheck[];
  faqs: DetailFaq[];
  closingSentence: string;
};

const gradeLabels: Record<GradeKey, string> = {
  elementary: "초등",
  middle: "중등",
  high: "고등",
};

const subjectLabels: Record<SubjectKey, string> = {
  korean: "국어",
  english: "영어",
  math: "수학",
  social: "사회",
  science: "과학",
  koreanHistory: "한국사",
};

const gradeContent: Record<
  GradeKey,
  {
    openings: string[];
    studentLeads: string[];
    priorityBodies: string[];
    captions: string[];
    consultIntros: string[];
    closingSentences: string[];
    stepSets: LessonStep[][];
    consultChecks: ConsultCheck[][];
  }
> = {
  elementary: {
    openings: [
      "초등 시기에는 진도를 앞서가기보다 교과서 기본 개념과 공부 습관이 함께 자리 잡는지가 중요합니다. 수업에서는 아이가 읽고 쓰고 계산하는 과정을 살피며 문제를 끝까지 해결하는 힘을 기릅니다.",
      "초등 과외는 어려운 문제를 많이 푸는 수업보다 학교 수업을 자신 있게 따라갈 수 있는 기반을 만드는 데 초점을 둡니다. 개념을 말로 설명하고 손으로 풀어보는 과정을 반복해 학습 흐름을 잡습니다.",
      "초등 학생은 작은 막힘이 오래 쌓이면 과목에 대한 자신감이 쉽게 흔들릴 수 있습니다. 그래서 수업은 교과서 개념, 읽기와 쓰기, 연산 습관을 차근차근 확인하며 시작합니다.",
    ],
    studentLeads: [
      "초등 학습은 결과보다 과정에서 어려움이 드러나는 경우가 많습니다. 문제를 끝까지 읽는지, 풀이 과정을 적는지, 배운 내용을 다음 단원과 연결하는지를 함께 살핍니다.",
      "학교 수업을 따라가도 집에서 혼자 풀 때 막힌다면 기본 개념과 습관을 나누어 점검해야 합니다. 이 페이지에서는 아이가 부담 없이 다시 시작할 수 있는 학습 방향을 정리합니다.",
      "초등 단계에서는 한 단원을 놓쳤을 때 다음 단원까지 흔들리는 일이 잦습니다. 수업에서는 교과서 흐름과 아이의 풀이 습관을 함께 보며 필요한 보완 지점을 찾습니다.",
    ],
    priorityBodies: [
      "교과서 기본 개념부터 확인하고, 읽기·쓰기·연산 과정에서 자주 끊기는 부분을 작은 단위로 나누어 연습합니다.",
      "한 번에 많은 숙제를 주기보다 아이가 끝까지 해결할 수 있는 분량을 정하고, 성공 경험을 쌓으며 학교 수업 자신감을 회복합니다.",
      "이미 알고 있는 내용은 짧게 확인하고, 헷갈리는 개념과 풀이 습관을 반복해 다음 수업까지 이어지도록 관리합니다.",
    ],
    captions: [
      "아이의 풀이 과정과 교과서 개념 이해를 함께 확인합니다.",
      "읽기·쓰기·연산 습관이 수업 안에서 자연스럽게 이어지도록 살핍니다.",
      "학교 수업에서 자신감을 느낄 수 있도록 작은 성취를 쌓아갑니다.",
    ],
    consultIntros: [
      "초등 상담에서는 최근 단원, 숙제 습관, 문제를 끝까지 푸는 태도를 함께 확인하면 수업 방향을 더 정확히 잡을 수 있습니다.",
      "아이의 학교 수업 반응과 집에서 공부할 때 막히는 지점을 알려주시면 기본 개념과 습관 보완 계획을 세우기 좋습니다.",
    ],
    closingSentences: [
      "현재 학년과 과목, 학교 수업에서 어려워하는 부분을 알려주시면 아이에게 맞는 시작점을 함께 확인하겠습니다.",
      "기초 개념과 공부 습관 중 어디에서 도움이 필요한지 편하게 남겨주시면 상담 때 차근차근 살펴보겠습니다.",
      "아이의 자신감과 학습 흐름을 함께 볼 수 있도록 최근 단원과 고민을 적어주세요.",
    ],
    stepSets: [
      [
        { title: "교과서 개념 확인", description: "최근 배운 단원을 함께 읽고 아이가 말로 설명할 수 있는지 확인합니다." },
        { title: "풀이 습관 연습", description: "읽기, 쓰기, 연산 과정을 나누어 틀린 이유를 스스로 찾도록 돕습니다." },
        { title: "짧은 복습 연결", description: "다음 수업 전까지 해볼 수 있는 분량으로 복습을 정해 성취감을 이어갑니다." },
      ],
      [
        { title: "학교 진도 점검", description: "교과서와 숙제 범위를 기준으로 아이가 편하게 시작할 위치를 잡습니다." },
        { title: "기본 문제 적용", description: "개념 설명 뒤 바로 비슷한 문제를 풀며 이해가 실제 풀이로 이어지는지 봅니다." },
        { title: "습관 관리", description: "풀이를 끝까지 적고 다시 확인하는 과정을 반복해 공부 루틴을 만듭니다." },
      ],
    ],
    consultChecks: [
      [
        { title: "최근 단원", description: "학교에서 배우는 교과서 범위" },
        { title: "기본 습관", description: "숙제와 복습을 이어가는 정도" },
        { title: "풀이 과정", description: "끝까지 읽고 쓰는지 여부" },
        { title: "자신감", description: "수업 참여와 발표 부담" },
      ],
      [
        { title: "교과서 이해", description: "개념 설명을 따라가는 정도" },
        { title: "읽기·쓰기", description: "문제를 읽고 정리하는 습관" },
        { title: "연산·기초", description: "반복 실수가 나오는 부분" },
        { title: "학습 시간", description: "집중 가능한 요일과 시간대" },
      ],
    ],
  },
  middle: {
    openings: [
      "중등 시기에는 단원 간 개념이 이어지고 학교 시험과 서술형 비중도 커집니다. 수업은 현재 단원의 이해도와 오답 원인을 함께 분석해 고등 과정으로 이어질 기초를 다지는 방향으로 진행합니다.",
      "중등 과외는 단순히 문제 수를 늘리는 것보다 개념 연결과 내신 대비 흐름을 잡는 일이 중요합니다. 학교 시험, 수행평가, 서술형 답안까지 함께 보며 필요한 학습 순서를 정합니다.",
      "중등 학생은 아는 개념도 시험 문제로 바뀌면 적용이 흔들릴 수 있습니다. 그래서 수업에서는 단원별 핵심 개념과 오답 원인을 같이 확인해 내신 관리의 기준을 세웁니다.",
    ],
    studentLeads: [
      "중등 학습은 한 단원의 빈틈이 다음 단원과 학교 시험까지 이어지기 쉽습니다. 개념을 따로 외우기보다 서로 어떻게 연결되는지 확인해야 합니다.",
      "학교 시험에서 자주 틀리는 문제는 단순 실수처럼 보여도 개념 연결, 서술형 표현, 풀이 순서가 함께 얽혀 있는 경우가 많습니다.",
      "수행평가와 내신을 함께 준비하려면 평소 수업 이해도와 시험 직전 문제풀이가 분리되지 않아야 합니다. 수업에서는 이 두 흐름을 같이 점검합니다.",
    ],
    priorityBodies: [
      "단원 간 연결이 약한 부분을 먼저 찾고, 학교 시험과 서술형에서 반복되는 오답 원인을 기준으로 보완 순서를 정합니다.",
      "내신 범위 안에서 자주 출제되는 개념을 먼저 정리한 뒤 수행평가와 서술형 답안까지 이어지도록 연습합니다.",
      "고등 과정으로 이어질 기초를 놓치지 않도록 현재 단원의 이해도와 지난 단원의 빈틈을 함께 확인합니다.",
    ],
    captions: [
      "단원 연결, 서술형 답안, 오답 원인을 함께 확인합니다.",
      "학교 시험과 수행평가 흐름에 맞춰 필요한 개념을 정리합니다.",
      "고등 과정으로 이어질 기초가 흔들리지 않도록 학습 기록을 남깁니다.",
    ],
    consultIntros: [
      "중등 상담에서는 시험 범위, 최근 오답, 수행평가 일정을 함께 정리하면 내신 대비 방향을 더 구체적으로 잡을 수 있습니다.",
      "학교 시험에서 어려웠던 단원과 서술형 답안 습관을 알려주시면 개념 연결과 오답 관리 계획을 세우기 좋습니다.",
    ],
    closingSentences: [
      "최근 시험 범위와 자주 틀리는 유형을 알려주시면 내신과 서술형 대비 방향을 함께 확인하겠습니다.",
      "단원 이해도, 오답 원인, 수행평가 일정 중 걱정되는 부분을 남겨주시면 상담 때 구체적으로 살펴보겠습니다.",
      "고등 과정으로 이어질 기초까지 고려해 지금 필요한 보완 순서를 함께 정리하겠습니다.",
    ],
    stepSets: [
      [
        { title: "단원 연결 점검", description: "현재 단원과 이전 단원이 어떻게 이어지는지 확인해 빈틈을 찾습니다." },
        { title: "서술형 적용", description: "풀이 근거와 답안 표현을 함께 보며 학교 시험 방식에 맞춰 연습합니다." },
        { title: "오답 원인 정리", description: "틀린 문제를 유형별로 나누고 다음 시험 전 다시 확인할 기준을 만듭니다." },
      ],
      [
        { title: "내신 범위 확인", description: "학교 진도와 시험 범위를 기준으로 우선순위가 높은 단원을 정합니다." },
        { title: "핵심 유형 연습", description: "자주 나오는 유형을 풀며 개념이 문제에 적용되는 과정을 확인합니다." },
        { title: "수행평가 관리", description: "필요한 자료 정리와 답안 습관을 함께 점검해 평가 부담을 줄입니다." },
      ],
    ],
    consultChecks: [
      [
        { title: "시험 범위", description: "학교 내신 진도와 평가 일정" },
        { title: "서술형", description: "답안 작성에서 막히는 부분" },
        { title: "오답 유형", description: "반복해서 틀리는 단원과 문제" },
        { title: "수행평가", description: "준비 중인 과제와 발표 일정" },
      ],
      [
        { title: "개념 연결", description: "이전 단원에서 이어지는 빈틈" },
        { title: "학교 자료", description: "교과서, 프린트, 부교재" },
        { title: "시험 습관", description: "시간 배분과 검토 방식" },
        { title: "목표 점수", description: "이번 시험에서 필요한 변화" },
      ],
    ],
  },
  high: {
    openings: [
      "고등 학습은 과목별 핵심 개념을 정확히 잡고 내신과 모의고사 흐름을 함께 관리해야 합니다. 수업에서는 취약 단원을 분석해 고난도 문제 접근과 시간 관리까지 연결합니다.",
      "고등 과외는 단원별 이해만으로 끝나지 않고 시험에서 점수로 이어지는 전략이 필요합니다. 내신, 모의고사, 입시 목표를 함께 보며 지금 우선순위가 높은 학습 계획을 세웁니다.",
      "고등 학생은 같은 과목 안에서도 개념 부족, 시간 부족, 고난도 접근 어려움이 다르게 나타납니다. 수업은 취약 단원과 시험 목표를 기준으로 필요한 공부 순서를 조정합니다.",
    ],
    studentLeads: [
      "고등 학습은 시험 범위가 넓고 문제 난도가 빠르게 올라가기 때문에 약한 단원을 정확히 구분해야 합니다. 내신과 모의고사에서 반복되는 실수를 함께 봅니다.",
      "개념을 알고 있어도 시간 안에 풀지 못하거나 고난도 문항에서 접근이 막히면 점수 변동이 커질 수 있습니다. 수업에서는 원인과 우선순위를 분리해 확인합니다.",
      "입시 목표에 맞춘 학습 계획은 현재 등급, 학교 시험 방식, 모의고사 약점을 함께 볼 때 현실적으로 세울 수 있습니다.",
    ],
    priorityBodies: [
      "취약 단원을 먼저 분석하고 내신과 모의고사에서 점수로 이어질 핵심 개념, 문제 접근, 시간 관리 순서로 보완합니다.",
      "목표 등급과 남은 기간을 기준으로 반드시 잡아야 할 단원과 고난도까지 확장할 단원을 나누어 학습 계획을 세웁니다.",
      "반복 실수와 시간 부족의 원인을 구분해 기본 개념, 유형 적용, 실전 풀이를 단계적으로 연결합니다.",
    ],
    captions: [
      "내신과 모의고사 흐름을 함께 보며 취약 단원을 정리합니다.",
      "핵심 개념, 고난도 접근, 시간 관리까지 시험 상황에 맞춰 확인합니다.",
      "입시 목표에 맞는 학습 계획을 세우기 위해 현재 점수와 약점을 함께 봅니다.",
    ],
    consultIntros: [
      "고등 상담에서는 최근 내신 결과, 모의고사 등급, 목표 대학이나 계열을 함께 알려주시면 학습 우선순위를 더 정확히 잡을 수 있습니다.",
      "취약 단원과 시간 관리 문제를 미리 정리하면 내신 대비와 모의고사 대비 중 어디에 비중을 둘지 상담하기 좋습니다.",
    ],
    closingSentences: [
      "최근 내신과 모의고사 상황, 목표 등급을 알려주시면 지금 필요한 학습 계획을 함께 정리하겠습니다.",
      "취약 단원과 시험까지 남은 기간을 남겨주시면 내신과 모의고사 대비 비중을 상담 때 확인하겠습니다.",
      "입시 목표에 맞춰 어떤 단원부터 보완해야 할지 상담에서 현실적으로 짚어보겠습니다.",
    ],
    stepSets: [
      [
        { title: "취약 단원 분석", description: "최근 시험과 풀이 기록을 바탕으로 점수 손실이 큰 단원을 먼저 찾습니다." },
        { title: "핵심 개념 압축", description: "내신과 모의고사에 반복되는 개념을 정리하고 대표 유형에 적용합니다." },
        { title: "실전 시간 관리", description: "고난도 문항 접근 순서와 검토 시간을 조절해 시험 운영 방식을 점검합니다." },
      ],
      [
        { title: "목표 기준 설정", description: "현재 등급과 목표를 기준으로 수업에서 집중할 단원과 문제 난도를 정합니다." },
        { title: "유형 확장 훈련", description: "기본 유형에서 변형 문제까지 이어 풀며 막히는 사고 과정을 확인합니다." },
        { title: "시험 계획 조정", description: "내신 일정과 모의고사 흐름에 맞춰 복습량과 실전 연습 비중을 조절합니다." },
      ],
    ],
    consultChecks: [
      [
        { title: "최근 성적", description: "내신 등급과 모의고사 결과" },
        { title: "취약 단원", description: "점수 손실이 큰 개념과 유형" },
        { title: "시간 관리", description: "시험 중 막히는 구간" },
        { title: "입시 목표", description: "목표 등급과 희망 방향" },
      ],
      [
        { title: "학교 시험", description: "출제 방식과 부교재 범위" },
        { title: "모의고사", description: "등급 변동과 약한 영역" },
        { title: "고난도", description: "접근이 어려운 문항 유형" },
        { title: "학습 계획", description: "남은 기간과 가능한 학습량" },
      ],
    ],
  },
};

const subjectContent: Record<
  SubjectKey,
  {
    focus: string;
    learningCore: string;
    lessonFocus: string;
    stepDescriptions: string[];
    faq: DetailFaq;
  }
> = {
  korean: {
    focus: "독해력, 어휘, 문법, 서술형 답안, 작품과 지문 분석",
    learningCore: "글의 중심 내용과 근거를 찾는 독해력, 어휘와 문법 이해, 서술형 표현을 함께 확인합니다.",
    lessonFocus: "작품과 지문을 읽는 순서, 선택지 근거, 문법 개념을 나누어 연습합니다.",
    stepDescriptions: [
      "지문을 읽으며 중심 문장과 근거 표현을 표시합니다.",
      "어휘와 문법 개념을 문제 안에서 어떻게 확인하는지 연습합니다.",
      "서술형 답안은 핵심어와 문장 구조를 함께 다듬습니다.",
    ],
    faq: {
      question: "국어는 어떤 부분부터 보완하나요?",
      answer: "독해 과정, 어휘 이해, 문법 개념, 서술형 답안을 먼저 나누어 보고 지문과 작품 분석에서 막히는 지점을 찾습니다.",
    },
  },
  english: {
    focus: "어휘, 문법, 독해, 듣기, 내신 본문 분석",
    learningCore: "어휘 암기 상태와 문법 이해, 독해 흐름, 듣기 습관, 내신 본문 분석 정도를 함께 살핍니다.",
    lessonFocus: "단어와 문법을 따로 외우는 데서 그치지 않고 본문 해석과 문제 근거 찾기로 연결합니다.",
    stepDescriptions: [
      "어휘와 표현을 확인하고 문장 안에서 쓰임을 익힙니다.",
      "문법 개념을 짧은 문장 해석과 내신 본문 분석에 적용합니다.",
      "독해와 듣기에서 놓치는 단서를 찾아 시험 대비 흐름을 만듭니다.",
    ],
    faq: {
      question: "영어 내신 본문 분석도 같이 하나요?",
      answer: "네. 어휘, 문법, 독해 흐름을 본문 안에서 확인하고 학교 시험에 자주 나오는 표현과 변형 문제까지 함께 봅니다.",
    },
  },
  math: {
    focus: "개념 이해, 연산 정확도, 유형 적용, 서술형 풀이, 오답 정리",
    learningCore: "개념을 알고 있는지와 실제 풀이에서 연산 정확도, 유형 적용, 서술형 풀이가 이어지는지를 확인합니다.",
    lessonFocus: "공식 암기보다 왜 그렇게 풀리는지 설명하고, 오답 풀이로 같은 실수를 줄이는 데 집중합니다.",
    stepDescriptions: [
      "개념의 뜻과 조건을 먼저 확인하고 대표 문제에 적용합니다.",
      "연산 과정과 풀이 순서를 살펴 실수가 나는 지점을 찾습니다.",
      "서술형 풀이와 오답 정리를 통해 다음 유형으로 연결합니다.",
    ],
    faq: {
      question: "수학 오답은 어떻게 관리하나요?",
      answer: "계산 실수, 개념 부족, 유형 적용 오류를 나누어 정리하고 비슷한 문제에서 같은 실수가 반복되는지 확인합니다.",
    },
  },
  social: {
    focus: "핵심 개념, 용어 정리, 자료 해석, 서술형, 학교 시험 대비",
    learningCore: "핵심 개념과 용어를 먼저 정리하고 지도, 표, 그래프 같은 자료 해석과 서술형 표현을 함께 봅니다.",
    lessonFocus: "넓은 범위를 무작정 암기하기보다 학교 시험에 자주 나오는 개념과 자료 해석 순서를 정리합니다.",
    stepDescriptions: [
      "단원별 핵심 개념과 용어를 짧게 정리합니다.",
      "지도, 표, 그래프 자료에서 먼저 봐야 할 단서를 확인합니다.",
      "서술형과 학교 시험 문제에 맞춰 답안 표현을 연습합니다.",
    ],
    faq: {
      question: "사회는 암기 위주로만 진행하나요?",
      answer: "아니요. 핵심 개념과 용어를 정리한 뒤 자료 해석, 서술형 표현, 학교 시험 대비 문제로 연결합니다.",
    },
  },
  science: {
    focus: "개념과 원리, 실험·탐구, 자료와 그래프 해석, 계산 문제, 단원별 오답",
    learningCore: "개념과 원리를 이해했는지, 실험·탐구 과정과 자료·그래프 해석, 계산 문제에서 어디가 막히는지 봅니다.",
    lessonFocus: "과학 용어를 외우는 데서 끝내지 않고 원리, 탐구 조건, 자료 해석을 문제 풀이와 연결합니다.",
    stepDescriptions: [
      "개념과 원리를 쉬운 예시로 정리하고 조건을 확인합니다.",
      "실험·탐구 자료와 그래프에서 변화와 관계를 읽는 순서를 연습합니다.",
      "계산 문제와 단원별 오답을 나누어 취약한 유형을 다시 풉니다.",
    ],
    faq: {
      question: "과학 계산 문제와 그래프도 같이 보나요?",
      answer: "네. 개념과 원리를 먼저 정리한 뒤 실험·탐구 자료, 그래프 해석, 계산 문제를 단원별 오답과 연결해 봅니다.",
    },
  },
  koreanHistory: {
    focus: "시대 흐름, 핵심 사건, 인물과 제도, 사료 분석, 시험 선지 판단",
    learningCore: "시대 흐름을 먼저 잡고 핵심 사건, 인물과 제도, 사료 분석, 시험 선지 판단을 단계적으로 확인합니다.",
    lessonFocus: "사건을 낱개로 외우기보다 시대의 흐름과 제도 변화를 연결해 선지 판단력을 키웁니다.",
    stepDescriptions: [
      "시대별 큰 흐름과 핵심 사건의 순서를 먼저 정리합니다.",
      "인물, 제도, 사료 표현을 연결해 시험 선지의 근거를 찾습니다.",
      "헷갈리는 사건과 선지를 오답으로 묶어 다시 판단하는 연습을 합니다.",
    ],
    faq: {
      question: "한국사는 연표 암기만 하면 되나요?",
      answer: "연표만 외우기보다 시대 흐름, 핵심 사건, 인물과 제도, 사료 표현을 연결해 시험 선지를 판단하는 연습이 필요합니다.",
    },
  },
};

function stableHash(text: string) {
  let hash = 0;

  for (let index = 0; index < text.length; index += 1) {
    hash = (hash * 31 + text.charCodeAt(index)) % 1000003;
  }

  return Math.abs(hash);
}

function pickStable<T>(items: T[], seed: string, salt: string) {
  return items[(stableHash(`${seed}:${salt}`) % items.length)];
}

function getGradeKey(serviceName: string): GradeKey | null {
  if (serviceName.includes("초등")) return "elementary";
  if (serviceName.includes("중등")) return "middle";
  if (serviceName.includes("고등")) return "high";
  return null;
}

function getSubjectKey(serviceName: string): SubjectKey | null {
  if (serviceName.includes("한국사")) return "koreanHistory";
  if (serviceName.includes("국어")) return "korean";
  if (serviceName.includes("영어")) return "english";
  if (serviceName.includes("수학")) return "math";
  if (serviceName.includes("사회")) return "social";
  if (serviceName.includes("과학")) return "science";
  return null;
}

function isRegionalLocalTutoringPage(page: TutoringPage) {
  return page.page_type === "local-tutoring" && !page.slug.startsWith("online/") && page.지역 !== "온라인";
}

export function isOnlineGradeSubjectTutoringPage(page: TutoringPage) {
  return page.page_type === "local-tutoring" && page.slug.startsWith("online/");
}

export function getOnlineTutoringGuideIntro(page: TutoringPage, serviceName: string) {
  const gradeKey = getGradeKey(serviceName);
  const subjectKey = getSubjectKey(serviceName);

  if (!gradeKey || !subjectKey) {
    return "온라인 과외는 화면 공유와 실시간 필기를 활용해 학생의 풀이 과정과 질문을 바로 확인하며 진행합니다.";
  }

  const introBySubject: Record<SubjectKey, Record<GradeKey, string>> = {
    korean: {
      elementary: "초등 국어 온라인 과외는 화면 공유를 활용해 지문 읽기, 어휘 이해, 쓰기 습관을 실시간으로 확인합니다.",
      middle: "중등 국어 온라인 과외는 독해력, 문법, 서술형 답안과 학교 시험 범위를 실시간으로 확인하며 진행합니다.",
      high: "고등 국어 온라인 과외는 작품과 지문 분석, 문법, 내신·모의고사 문제 접근 과정을 화면으로 함께 확인합니다.",
    },
    english: {
      elementary: "초등 영어 온라인 과외는 어휘와 문장 읽기, 기초 문법, 듣기 반응을 실시간으로 살피며 진행합니다.",
      middle: "중등 영어 온라인 과외는 어휘·문법·독해와 학교 시험 범위를 실시간으로 확인하며 진행합니다.",
      high: "고등 영어 온라인 과외는 내신 본문 분석, 독해 유형, 어휘와 문법 적용 과정을 화면 공유로 점검합니다.",
    },
    math: {
      elementary: "초등 수학 온라인 과외는 화면 공유를 활용해 연산 과정과 문장제 풀이 습관을 실시간으로 확인합니다.",
      middle: "중등 수학 온라인 과외는 단원 간 개념 연결, 서술형 풀이, 오답 원인을 화면으로 함께 확인합니다.",
      high: "고등 수학 온라인 과외는 핵심 개념, 고난도 접근, 시간 관리와 오답 풀이 과정을 실시간으로 점검합니다.",
    },
    social: {
      elementary: "초등 사회 온라인 과외는 교과서 개념과 용어, 자료 읽기 습관을 화면 공유로 차근차근 확인합니다.",
      middle: "중등 사회 온라인 과외는 핵심 개념, 용어 정리, 자료 해석과 서술형 대비를 실시간으로 진행합니다.",
      high: "고등 사회 온라인 과외는 학교 시험 범위와 자료 해석, 개념 적용 문제를 화면으로 확인하며 정리합니다.",
    },
    science: {
      elementary: "초등 과학 온라인 과외는 개념과 탐구 내용을 학생이 직접 설명하고 문제에 적용하는 과정을 확인합니다.",
      middle: "중등 과학 온라인 과외는 실험·탐구 개념, 자료 해석, 계산 문제와 단원별 오답을 실시간으로 점검합니다.",
      high: "고등 과학 온라인 과외는 개념 설명과 함께 자료·그래프·계산 문제 풀이 과정을 화면으로 공유합니다.",
    },
    koreanHistory: {
      elementary: "초등 한국사 온라인 과외는 시대 흐름과 핵심 사건을 화면 자료로 정리하며 이해 과정을 확인합니다.",
      middle: "중등 한국사 온라인 과외는 시대 흐름, 인물과 제도, 사료 분석과 시험 선지 판단을 함께 연습합니다.",
      high: "고등 한국사 온라인 과외는 사료 분석, 시대별 쟁점, 내신 선지 판단 과정을 화면 공유로 점검합니다.",
    },
  };

  return introBySubject[subjectKey][gradeKey];
}

function getExamLevel(serviceName: string) {
  if (serviceName.includes("중졸")) return "중졸";
  if (serviceName.includes("고졸")) return "고졸";
  return "검정고시";
}

const localAssignmentFocus: Record<GradeKey, Record<SubjectKey, string>> = {
  elementary: {
    korean: "읽기·쓰기·독해 지도 경험과 학생의 학습 습관",
    english: "기초 어휘·문장 읽기 지도 경험과 학생의 학습 흥미",
    math: "연산 과정과 문장제 풀이 지도 경험, 교과서 개념 이해도",
    social: "교과서 핵심 개념과 용어 정리 지도 경험, 자료 읽기 습관",
    science: "개념과 탐구 활동 지도 경험, 학생의 관찰·정리 습관",
    koreanHistory: "시대 흐름과 핵심 사건 지도 경험, 학생의 이야기 이해 방식",
  },
  middle: {
    korean: "독해·문법·서술형 지도 경험과 학교 시험 준비 상황",
    english: "어휘·문법·독해 지도 경험과 학교 시험 범위",
    math: "학생의 현재 개념 수준과 학교 시험 준비 상황",
    social: "핵심 개념·자료 해석 지도 경험과 내신 대비 흐름",
    science: "실험·탐구·계산 문제 지도 경험과 단원별 오답 원인",
    koreanHistory: "시대 흐름·사료 분석 지도 경험과 시험 선지 판단 습관",
  },
  high: {
    korean: "내신과 모의고사 지문 분석 경험, 학생의 취약 유형과 학습 목표",
    english: "내신과 모의고사 지도 경험, 학생의 취약 유형과 학습 목표",
    math: "핵심 개념·고난도 문제 지도 경험과 학생의 취약 단원",
    social: "학교 시험 자료 해석과 서술형 지도 경험, 목표 등급",
    science: "개념·자료·그래프·계산 문제 지도 경험과 취약 단원",
    koreanHistory: "시대별 쟁점과 사료 분석 지도 경험, 내신 선지 판단력",
  },
};

const onlineAssignmentFocus: Record<GradeKey, Record<SubjectKey, string>> = {
  elementary: {
    korean: "지문 읽기와 쓰기 습관 지도 방식, 화면 공유 수업 적응도",
    english: "기초 어휘·문장 읽기 지도 방식, 듣기 반응 확인 능력",
    math: "연산 과정과 문장제 풀이 확인 방식, 실시간 필기 활용 능력",
    social: "교과서 개념과 자료 읽기 지도 방식, 화면 자료 활용 능력",
    science: "개념·탐구 내용 설명 방식, 학생 반응 확인 능력",
    koreanHistory: "시대 흐름 정리 방식과 화면 자료 활용 능력",
  },
  middle: {
    korean: "독해·문법·서술형 지도 방식, 화면 공유 수업 적응도",
    english: "어휘·문법·독해 지도 방식, 화면 공유 수업 적응도",
    math: "개념 연결과 서술형 풀이 확인 방식, 실시간 필기 활용 능력",
    social: "핵심 개념·자료 해석 지도 방식, 온라인 답안 확인 능력",
    science: "실험·탐구·계산 문제 지도 방식, 풀이 과정 확인 능력",
    koreanHistory: "사료 분석과 선지 판단 지도 방식, 화면 자료 활용 능력",
  },
  high: {
    korean: "지문 분석과 내신·모의고사 지도 방식, 온라인 수업 운영 능력",
    english: "내신 본문 분석과 독해 유형 지도 방식, 온라인 수업 운영 능력",
    math: "고난도 풀이와 시간 관리 지도 방식, 실시간 온라인 수업 운영 능력",
    social: "자료 해석과 서술형 지도 방식, 온라인 과제 관리 능력",
    science: "개념·자료·그래프·계산 문제 지도 경험과 실시간 온라인 수업 운영 능력",
    koreanHistory: "사료 분석과 시대별 쟁점 지도 방식, 온라인 수업 운영 능력",
  },
};

const examAssignmentFocus: Record<SubjectKey, string> = {
  korean: "출제 범위와 독해·어휘 학습 공백",
  english: "출제 범위와 어휘·문법·독해 학습 공백",
  math: "출제 범위와 학생의 학습 공백",
  social: "출제 범위와 핵심 개념·용어 정리 상태",
  science: "출제 범위와 개념·자료 해석 학습 공백",
  koreanHistory: "출제 범위와 시대 흐름·사료 이해도",
};

export function getTeacherAssignmentGuideIntro(page: TutoringPage, serviceName: string) {
  const gradeKey = getGradeKey(serviceName);
  const subjectKey = getSubjectKey(serviceName);
  const gradeLabel = gradeKey ? gradeLabels[gradeKey] : "";
  const subjectLabel = subjectKey ? subjectLabels[subjectKey] : "";

  if (
    page.page_type === "exam-tutoring" ||
    page.page_type === "online-exam-tutoring"
  ) {
    const examLevel = getExamLevel(serviceName);
    const examName = examLevel === "검정고시" ? "검정고시" : `${examLevel} 검정고시`;
    const examFocus = subjectKey
      ? examAssignmentFocus[subjectKey]
      : "과목별 출제 범위와 학생의 학습 공백";
    const onlineContext =
      page.page_type === "online-exam-tutoring"
        ? "온라인 과제·복습·오답 관리와 실시간 수업 운영 경험"
        : "시험 일정에 맞는 진도 관리 경험";

    return `${examName} ${subjectLabel || "과목"} ${examFocus}, 학습 기간과 응시 목표를 고려해 선생님을 배정합니다. ${onlineContext}도 함께 확인합니다.`;
  }

  if (gradeKey && subjectKey && isOnlineGradeSubjectTutoringPage(page)) {
    return `${gradeLabel} ${subjectLabel} 온라인 수업 경험, ${withJosa(onlineAssignmentFocus[gradeKey][subjectKey], "을를")} 고려해 선생님을 배정합니다. 학생 반응과 풀이 과정을 화면으로 확인하고 온라인 과제·복습·오답 관리가 이어지는지도 함께 봅니다.`;
  }

  if (gradeKey && subjectKey && isRegionalLocalTutoringPage(page)) {
    return `${page.지역} ${gradeLabel} ${subjectLabel} 수업 경험, ${withJosa(localAssignmentFocus[gradeKey][subjectKey], "을를")} 고려해 선생님을 배정합니다. 현재 수준과 수업 목표, 학습 성향을 함께 확인해 1:1 수업 방향을 정합니다.`;
  }

  return "학생의 학년과 과목만으로 선생님을 정하지 않고, 현재 수준과 학습 성향, 수업 목표를 함께 확인해 1:1로 배정합니다.";
}

export function getLocalTutoringDetailContent(
  page: TutoringPage,
  focusLabel: string,
  serviceName: string,
): LocalTutoringDetailContent | null {
  if (!isRegionalLocalTutoringPage(page)) {
    return null;
  }

  const gradeKey = getGradeKey(serviceName);
  const subjectKey = getSubjectKey(serviceName);

  if (!gradeKey || !subjectKey) {
    return null;
  }

  const grade = gradeContent[gradeKey];
  const subject = subjectContent[subjectKey];
  const gradeLabel = gradeLabels[gradeKey];
  const subjectLabel = subjectLabels[subjectKey];
  const seed = page.slug;
  const steps = pickStable(grade.stepSets, seed, "steps").map((step, index) => ({
    title: step.title,
    description: `${step.description} ${subject.stepDescriptions[index]}`,
  }));

  return {
    opening: pickStable(grade.openings, seed, "opening"),
    mainCaption: `${page.지역} ${gradeLabel} ${subjectLabel} 수업은 학생의 현재 학습 흐름과 과목별 핵심을 함께 확인합니다.`,
    studentLead: `${pickStable(grade.studentLeads, seed, "student")} ${subject.learningCore} 이 페이지에서 중심으로 살펴볼 방향은 ${focusLabel}입니다.`,
    priorityBody: `${pickStable(grade.priorityBodies, seed, "priority")} ${subject.lessonFocus}`,
    middleImageAlt: `${withJosa(focusLabel, "과와")} ${subjectLabel} 학습 핵심을 정리하는 과외 자료 이미지`,
    middleCaption: pickStable(grade.captions, seed, "caption"),
    lessonIntro: `${withJosa(page.수업방식, "은는")} ${gradeLabel} 학습 단계와 ${withJosa(subject.focus, "을를")} 함께 고려해 진행합니다. 학생이 설명을 듣는 데서 끝나지 않고 직접 적용하고 점검하는 과정까지 확인합니다.`,
    lessonDifference: `${page.지역} ${gradeLabel} ${subjectLabel} 과외에서는 ${pickStable(grade.priorityBodies, seed, "difference")} ${subject.lessonFocus}`,
    steps,
    consultIntro: pickStable(grade.consultIntros, seed, "consult"),
    consultChecks: pickStable(grade.consultChecks, seed, "checks"),
    faqs: [
      subject.faq,
      {
        question: `${gradeLabel} ${subjectLabel} 수업은 학교 진도와 어떻게 맞추나요?`,
        answer: `${gradeLabel} 과정에 맞춰 학교 진도와 평가 일정을 먼저 확인하고, ${subjectLabel}에서 중요한 학습 요소를 수업과 복습에 나누어 반영합니다.`,
      },
      {
        question: "상담 전에 어떤 내용을 알려주면 좋나요?",
        answer: pickStable(grade.consultIntros, seed, "faq-consult"),
      },
    ],
    closingSentence: pickStable(grade.closingSentences, seed, "closing"),
  };
}
