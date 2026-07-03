"use client";

import Link from "next/link";
import { useState } from "react";

type RegionOption = {
  slug: string;
  name: string;
};

type ServiceOption = {
  slug: string;
  name: string;
};

type RegionSelectorProps = {
  regions: RegionOption[];
  services: ServiceOption[];
};

const provinces = [
  "서울", "경기", "인천", "부산", "대구", "대전", "광주", "울산", "세종",
  "강원", "충북", "충남", "전북", "전남", "경북", "경남", "제주",
] as const;

type ProvinceName = (typeof provinces)[number];

const provinceSlugPrefixes: Partial<Record<ProvinceName, string>> = {
  인천: "incheon-",
  부산: "busan-",
  대구: "daegu-",
  대전: "daejeon-",
  광주: "gwangju-",
  울산: "ulsan-",
  세종: "sejong-",
  강원: "gangwon-",
  충북: "chungbuk-",
  충남: "chungnam-",
  전북: "jeonbuk-",
  전남: "jeonnam-",
  경북: "gyeongbuk-",
  경남: "gyeongnam-",
  제주: "jeju-",
};

const gyeonggiRegionSlugs = new Set([
  "suwon", "seongnam", "goyang", "yongin", "bucheon", "ansan", "anyang",
  "namyangju", "hwaseong", "pyeongtaek", "uijeongbu", "siheung", "paju",
  "gimpo", "gwangmyeong", "gwangju-gyeonggi", "gunpo", "hanam", "osan",
  "icheon", "anseong", "uiwang", "yangju", "guri", "pocheon", "yeoju",
  "dongducheon", "gwacheon",
]);

const gangwonRegionSlugs: readonly string[] = [
  "chuncheon", "wonju", "gangneung", "donghae", "sokcho", "samcheok",
  "hongcheon", "hoengseong", "pyeongchang", "yanyang",
];

const gangwonRegionSlugSet = new Set(gangwonRegionSlugs);

const chungbukRegionSlugs: readonly string[] = [
  "cheongju", "chungju", "jecheon", "eumseong", "jincheon", "jeungpyeong",
  "okcheon", "yeongdong", "goesan", "danyang",
];

const chungbukRegionSlugSet = new Set(chungbukRegionSlugs);

const chungnamRegionSlugs: readonly string[] = [
  "cheonan", "asan", "gongju", "boryeong", "seosan", "nonsan", "gyeryong",
  "dangjin", "geumsan", "buyeo", "seocheon", "cheongyang", "hongseong",
  "yesan", "taean",
];

const chungnamRegionSlugSet = new Set(chungnamRegionSlugs);

const jeonbukRegionSlugs: readonly string[] = [
  "jeonju", "gunsan", "iksan", "jeongeup", "namwon", "gimje", "wanju",
  "jinan", "muju", "jangsu", "imsil", "sunchang", "gochang", "buan",
];

const jeonbukRegionSlugSet = new Set(jeonbukRegionSlugs);

const jeonnamRegionSlugs: readonly string[] = [
  "mokpo", "yeosu", "suncheon", "naju", "gwangyang", "damyang", "gokseong",
  "gurye", "goheung", "boseong", "hwasun", "jangheung", "gangjin", "haenam",
  "yeongam", "muan", "hampyeong", "yeonggwang", "jangseong", "wando", "jindo",
  "sinan",
];

const jeonnamRegionSlugSet = new Set(jeonnamRegionSlugs);

const upcomingProvinceRegionNames: Partial<Record<ProvinceName, readonly string[]>> = {
  전남: [
    "목포", "여수", "순천", "나주", "광양", "담양", "곡성", "구례", "고흥",
    "보성", "화순", "장흥", "강진", "해남", "영암", "무안", "함평", "영광",
    "장성", "완도", "진도", "신안",
  ],
  경북: [
    "포항", "경주", "김천", "안동", "구미", "영주", "영천", "상주", "문경",
    "경산", "의성", "청송", "영양", "영덕", "청도", "고령", "성주", "칠곡",
    "예천", "봉화", "울진", "울릉",
  ],
  경남: [
    "창원", "진주", "통영", "사천", "김해", "밀양", "거제", "양산", "의령",
    "함안", "창녕", "고성", "남해", "하동", "산청", "함양", "거창", "합천",
  ],
  제주: ["제주", "서귀포"],
};

const provinceByUpcomingRegionName = new Map<string, ProvinceName>();
for (const [province, regionNames] of Object.entries(upcomingProvinceRegionNames) as [
  ProvinceName,
  readonly string[],
][]) {
  regionNames.forEach((regionName) => provinceByUpcomingRegionName.set(regionName, province));
}

const gyeonggiLifestyleRegionSlugs: readonly string[] = [
  "gwanggyo", "dongtan", "pangyo", "bundang", "ilsan", "pyeongchon",
  "wirye", "misa", "dasan", "byeollae", "unjeong", "gimpo-hangang",
  "suji", "jukjeon", "yeongtong",
];

const incheonLifestyleRegionSlugs: readonly string[] = [
  "songdo", "cheongna", "geomdan", "yeongjong", "guwol", "nonhyeon",
  "bupyeong-life", "luwon-city", "juan",
];

const gyeonggiLifestyleRegionSlugSet = new Set(gyeonggiLifestyleRegionSlugs);
const incheonLifestyleRegionSlugSet = new Set(incheonLifestyleRegionSlugs);

function getLifestyleRegionSlugs(province: ProvinceName): readonly string[] {
  if (province === "경기") return gyeonggiLifestyleRegionSlugs;
  if (province === "인천") return incheonLifestyleRegionSlugs;
  return [];
}

function getOrderedAdministrativeRegionSlugs(province: ProvinceName): readonly string[] {
  if (province === "강원") return gangwonRegionSlugs;
  if (province === "충북") return chungbukRegionSlugs;
  if (province === "충남") return chungnamRegionSlugs;
  if (province === "전북") return jeonbukRegionSlugs;
  if (province === "전남") return jeonnamRegionSlugs;
  return [];
}

function normalizeRegionName(regionName: string) {
  return regionName
    .trim()
    .replace(/^(전라남도|경상북도|경상남도|제주특별자치도)\s*/, "")
    .replace(/^(전남|경북|경남)\s*/, "")
    .replace(/[시군]$/, "");
}

function getRegionProvince(region: RegionOption): ProvinceName | null {
  const provinceFromName = provinces.find((province) => region.name.startsWith(province));

  if (provinceFromName) {
    return provinceFromName;
  }

  const provinceFromSlug = provinces.find((province) => {
    const prefix = provinceSlugPrefixes[province];
    return prefix ? region.slug.startsWith(prefix) : false;
  });

  if (provinceFromSlug) {
    return provinceFromSlug;
  }

  if (region.slug.endsWith("-gu")) {
    return "서울";
  }

  if (gyeonggiRegionSlugs.has(region.slug)) {
    return "경기";
  }

  if (gyeonggiLifestyleRegionSlugSet.has(region.slug)) {
    return "경기";
  }

  if (incheonLifestyleRegionSlugSet.has(region.slug)) {
    return "인천";
  }

  if (gangwonRegionSlugSet.has(region.slug)) {
    return "강원";
  }

  if (chungbukRegionSlugSet.has(region.slug)) {
    return "충북";
  }

  if (chungnamRegionSlugSet.has(region.slug)) {
    return "충남";
  }

  if (jeonbukRegionSlugSet.has(region.slug)) {
    return "전북";
  }

  if (jeonnamRegionSlugSet.has(region.slug)) {
    return "전남";
  }

  const provinceFromRegionName = provinceByUpcomingRegionName.get(
    normalizeRegionName(region.name),
  );

  if (provinceFromRegionName) {
    return provinceFromRegionName;
  }

  return null;
}

const grades = [
  { key: "elementary", name: "초등" },
  { key: "middle", name: "중등" },
  { key: "high", name: "고등" },
] as const;

export function RegionSelector({ regions, services }: RegionSelectorProps) {
  const regionsWithProvince = regions.flatMap((region) => {
    const parent = getRegionProvince(region);
    return parent ? [{ ...region, parent }] : [];
  });
  const availableProvinces = provinces.filter((province) =>
    regionsWithProvince.some((region) => region.parent === province),
  );
  const [selectedProvince, setSelectedProvince] = useState<ProvinceName>("서울");
  const [selectedRegionSlug, setSelectedRegionSlug] = useState<string | null>(null);
  const provinceRegions = regionsWithProvince.filter((region) => region.parent === selectedProvince);
  const lifestyleRegionSlugs = getLifestyleRegionSlugs(selectedProvince);
  const lifestyleRegionSlugSet = new Set(lifestyleRegionSlugs);
  const unsortedAdministrativeRegions = provinceRegions.filter(
    (region) => !lifestyleRegionSlugSet.has(region.slug),
  );
  const orderedAdministrativeRegionSlugs = getOrderedAdministrativeRegionSlugs(selectedProvince);
  const administrativeRegions = orderedAdministrativeRegionSlugs.length > 0
    ? orderedAdministrativeRegionSlugs.flatMap((slug) => {
        const region = unsortedAdministrativeRegions.find((candidate) => candidate.slug === slug);
        return region ? [region] : [];
      })
    : unsortedAdministrativeRegions;
  const lifestyleRegions = lifestyleRegionSlugs.flatMap((slug) => {
    const region = provinceRegions.find((candidate) => candidate.slug === slug);
    return region ? [region] : [];
  });
  const selectedRegion = provinceRegions.find((region) => region.slug === selectedRegionSlug);

  const selectProvince = (province: ProvinceName) => {
    setSelectedProvince(province);
    setSelectedRegionSlug(null);
  };

  return (
    <div className="region-selector">
      <div className="province-list" aria-label="시·도 선택">
        {provinces.map((province) => {
          const isAvailable = availableProvinces.includes(province);
          const isSelected = selectedProvince === province;

          return (
            <button
              className={isSelected ? "province-active" : "province-available"}
              type="button"
              aria-pressed={isSelected}
              onClick={() => selectProvince(province)}
              key={province}
            >
              {province}
            </button>
          );
        })}
      </div>

      <div className="seoul-panel">
        <div className="seoul-panel-header">
          <div>
            <span>지역별 맞춤 과외 안내</span>
            <h3>원하는 지역을 선택해 주세요</h3>
          </div>
          <p className="region-panel-guide">
  초등·중등·고등 과목별 과외를 지역에 맞춰 확인할 수 있어요. 가까운 방문 수업이 어렵다면 온라인 과외도 함께 상담할 수 있습니다.
</p>
        </div>
        <div className="seoul-districts" aria-label={`${selectedProvince} 지역 선택`}>
          {administrativeRegions.map((region) => (
            <button
              className={selectedRegionSlug === region.slug ? "is-selected" : ""}
              type="button"
              aria-pressed={selectedRegionSlug === region.slug}
              onClick={() => setSelectedRegionSlug(region.slug)}
              key={region.slug}
            >
              {region.name}<span aria-hidden="true">＋</span>
            </button>
          ))}
        </div>

        {lifestyleRegions.length > 0 && (
          <section className="lifestyle-region-section" aria-labelledby="lifestyle-region-heading">
            <h4 id="lifestyle-region-heading">{selectedProvince} 주요 생활권·신도시</h4>
            <div className="seoul-districts" aria-label={`${selectedProvince} 주요 생활권·신도시 선택`}>
              {lifestyleRegions.map((region) => (
                <button
                  className={selectedRegionSlug === region.slug ? "is-selected" : ""}
                  type="button"
                  aria-pressed={selectedRegionSlug === region.slug}
                  onClick={() => setSelectedRegionSlug(region.slug)}
                  key={region.slug}
                >
                  {region.name}<span aria-hidden="true">＋</span>
                </button>
              ))}
            </div>
          </section>
        )}

        {selectedRegion ? (
        
  <div className="selected-grade-groups">
    {grades.map((grade) => (
      <section key={grade.key}>
        <h5>{grade.name}</h5>
        <div>
          {services
            .filter((service) => service.slug.startsWith(grade.key))
            .map((service) => (
              <Link
                href={`/${selectedRegion.slug}/${service.slug}`}
                key={service.slug}
              >
                {service.name}
                <span aria-hidden="true">↗</span>
              </Link>
            ))}
        </div>
      </section>
    ))}
  </div>
) : provinceRegions.length === 0 ? (
  <div className="region-selection-help" aria-live="polite">
    <span aria-hidden="true">＋</span>
    <div>
      <strong>지역별 과외 페이지를 준비 중입니다.</strong>
      <p>
        방문 가능 지역과 온라인 과외 상담을 함께 안내할 수 있도록 준비하고 있습니다.
      </p>
    </div>
  </div>
) : (
  <div className="region-selection-help" aria-live="polite">
    <span aria-hidden="true">＋</span>
    <div>
      <strong>원하는 지역을 선택해 주세요.</strong>
      <p>
        초등·중등·고등 과목별 과외를 지역에 맞춰 확인할 수 있어요.
        가까운 방문 수업이 어렵다면 온라인 과외도 함께 상담할 수 있습니다.
      </p>
    </div>
  </div>
)}
      </div>
    </div>
  );
}
