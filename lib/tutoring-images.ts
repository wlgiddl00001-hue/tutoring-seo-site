import type { TutoringPage } from "@/lib/tutoring-pages";

const detailImages = [
  "detail-elementary-korean.webp",
  "detail-middle-english.webp",
  "detail-high-math.webp",
  "detail-science.webp",
  "detail-korean-writing.webp",
  "detail-online.webp",
  "detail-exam.webp",
  "detail-study-plan.webp",
  "detail-error-review.webp",
] as const;

function hashText(text: string) {
  let hash = 0;

  for (let index = 0; index < text.length; index += 1) {
    hash = (hash * 31 + text.charCodeAt(index)) % 100000;
  }

  return Math.abs(hash);
}

function getCoverImage(page: TutoringPage) {
  const pageText = `${page.slug} ${page.업종} ${page.메인키워드}`;

  if (page.page_type.includes("exam")) return "detail-exam.webp";
  if (page.slug.startsWith("online/") || pageText.includes("온라인")) return "detail-online.webp";
  if (pageText.includes("과학")) return "detail-science.webp";
  if (pageText.includes("국어")) {
    return pageText.includes("초등")
      ? "detail-elementary-korean.webp"
      : "detail-korean-writing.webp";
  }
  if (pageText.includes("영어")) return "detail-middle-english.webp";
  if (pageText.includes("수학")) return "detail-high-math.webp";

  return detailImages[hashText(page.slug) % detailImages.length];
}

function getMiddleImage(page: TutoringPage) {
  const focus = page.콘텐츠관점;

  if (/공부습관|자기주도|학습공백|학교진도|학생성향/.test(focus)) {
    return "detail-study-plan.webp";
  }

  if (/오답|문제풀이|시험|내신|성적향상|약한단원|반복학습/.test(focus)) {
    return "detail-error-review.webp";
  }

  return "detail-study-plan.webp";
}

export function getTutoringImage(page: TutoringPage, slot: "cover" | "middle" | "sub") {
  const coverImage = getCoverImage(page);
  const middleImage = getMiddleImage(page);

  if (slot === "cover") return `/images/tutoring/${coverImage}`;
  if (slot === "middle" && middleImage !== coverImage) {
    return `/images/tutoring/${middleImage}`;
  }

  const usedImages = new Set([coverImage, middleImage]);
  const availableImages = detailImages.filter((image) => !usedImages.has(image));
  const seed = `${page.slug}-${page.지역}-${page.업종}-${page.콘텐츠관점}-${slot}`;
  const selectedImage = availableImages[hashText(seed) % availableImages.length];

  return `/images/tutoring/${selectedImage}`;
}
