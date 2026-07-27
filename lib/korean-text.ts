type JosaType = "은는" | "이가" | "을를" | "과와" | "으로로";

const HANGUL_START = 0xac00;
const HANGUL_END = 0xd7a3;
const JONGSEONG_COUNT = 28;
const RIEUL_JONGSEONG = 8;

const josaByType: Record<Exclude<JosaType, "으로로">, [string, string]> = {
  은는: ["은", "는"],
  이가: ["이", "가"],
  을를: ["을", "를"],
  과와: ["과", "와"],
};

function getLastHangulSyllableCode(word: string) {
  const characters = Array.from(word).reverse();

  for (const character of characters) {
    const code = character.charCodeAt(0);

    if (code >= HANGUL_START && code <= HANGUL_END) {
      return code;
    }
  }

  return null;
}

function getJongseongIndex(word: string) {
  const code = getLastHangulSyllableCode(word);
  return code === null ? 0 : (code - HANGUL_START) % JONGSEONG_COUNT;
}

export function hasBatchim(word: string) {
  return getJongseongIndex(word) !== 0;
}

export function withJosa(word: string, type: JosaType) {
  const value = String(word ?? "").trim();

  if (!value) {
    return "";
  }

  const jongseongIndex = getJongseongIndex(value);

  if (type === "으로로") {
    return `${value}${jongseongIndex !== 0 && jongseongIndex !== RIEUL_JONGSEONG ? "으로" : "로"}`;
  }

  const [withBatchim, withoutBatchim] = josaByType[type];
  return `${value}${jongseongIndex === 0 ? withoutBatchim : withBatchim}`;
}

export function normalizeKoreanSpacing(text: string) {
  return String(text ?? "")
    .replace(/\s+/g, " ")
    .replace(/(과목|학년|지역)\s+별/g, "$1별")
    .replace(/\s+(은|는|이|가|을|를|과|와|에게|에서|으로|로)(?=$|[\s,.!?])/g, "$1")
    .trim();
}

export function formatTutoringKeyword(text: string) {
  return normalizeKoreanSpacing(text)
    .replace(/(온라인|중졸|고졸)\s*검정고시/g, "$1 검정고시")
    .replace(/(초등|중등|고등|국어|영어|수학|사회|과학|한국사|검정고시)\s*과외/g, "$1 과외")
    .replace(/\s+/g, " ")
    .trim();
}

export function formatServiceName(serviceName: string) {
  const formatted = formatTutoringKeyword(serviceName);
  if (!formatted) {
    return "맞춤 과외";
  }

  return formatted.endsWith("과외") ? formatted : `${formatted} 과외`;
}

export function normalizeGeneratedText(text: string) {
  return formatTutoringKeyword(text)
    .replace(/(합니다|됩니다|좋습니다|중요합니다|필요합니다|돕습니다|줄입니다|만듭니다|정리합니다|진행합니다|확인합니다)\s+([가-힣])/g, "$1. $2")
    .replace(/\s+/g, " ")
    .trim();
}

export function toSentence(text: string) {
  const value = normalizeGeneratedText(text);
  return /[.!?]$/.test(value) ? value : `${value}.`;
}
