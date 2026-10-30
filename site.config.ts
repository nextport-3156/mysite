/* ==========================================================================
   ★ 사이트 내용 설정 파일 (우드앤모어)
   --------------------------------------------------------------------------
   사이트에 보이는 글자(이름, 소개, 메뉴, 연락처 등)는 대부분 여기에 있습니다.
   따옴표 " " 안의 글자만 바꾸고 저장하면 화면에 바로 반영됩니다.
   (따옴표, 쉼표, 중괄호 { } 는 지우지 않도록 조심!)
   ========================================================================== */

import type { Item } from "@/lib/types";

/* 스마트스토어 주소 — 여러 곳(상단 버튼, 제품 카드, 문의)에서 같이 씁니다 */
const STORE_URL = "https://smartstore.naver.com/nextport";

export const siteConfig = {
  /* 브라우저 탭 제목과 검색 결과에 보이는 정보 */
  name: "WOOD & MORE",
  tagline: "EVERYDAY WOOD GOODS",
  since: "SINCE 2021",
  title: "우드앤모어 WOOD & MORE | 원목 도마와 생활소품",
  description:
    "우드앤모어는 원목으로 엔드그레인 도마와 생활소품을 만드는 브랜드입니다. 주문은 네이버 스마트스토어에서 받습니다.",

  /* 상단 오른쪽 버튼 (스마트스토어로 이동) */
  store: { label: "스마트스토어", href: STORE_URL },

  /* 상단 메뉴 (href 의 #이름 은 아래 섹션의 id 와 같아야 해당 위치로 이동) */
  nav: [
    { label: "이야기", href: "#about" },
    { label: "제품", href: "#features" },
    { label: "만드는 과정", href: "#process" },
    { label: "문의", href: "#contact" },
  ],

  /* 첫 화면(히어로) */
  hero: {
    title: "매일 손에 닿는\n나무 물건을 만듭니다",
    description:
      "우드앤모어는 원목으로 도마와 생활소품을 만듭니다. 나이테 면을 세워 이어 붙인 엔드그레인 도마부터 작은 수납장, 행운을 비는 액막이 명태까지, 집에서 오래 쓰는 물건을 만듭니다.",
    primaryCta: { label: "스마트스토어에서 보기", href: STORE_URL },
    secondaryCta: { label: "제품 둘러보기", href: "#features" },
    /* 오른쪽 도마 그림 아래 작은 설명 */
    caption: "엔드그레인 도마는 나무 조각을 세워 붙여서, 조각마다 나이테가 보입니다.",
  },

  /* 이야기(소개) 섹션 */
  about: {
    title: "결을 세워 만든 도마",
    paragraphs: [
      "나무를 가로로 자르면 나이테가 보이는 면이 나옵니다. 이 면이 위로 오도록 조각을 세워 이어 붙인 것이 엔드그레인 도마입니다.",
      "칼날이 나무 섬유를 끊지 않고 섬유 사이로 들어가기 때문에, 칼자국이 덜 남고 칼도 덜 무뎌집니다.",
      "조각마다 나무 색과 나이테가 달라서 같은 무늬의 도마는 하나도 없습니다.",
    ],
    /* 오른쪽 비교 그림의 설명 */
    compare: {
      flat: { title: "누운 결 (일반 도마)", text: "칼날이 나무 섬유를 끊어서 자국이 남기 쉽습니다." },
      end: { title: "세운 결 (엔드그레인)", text: "칼날이 섬유 사이로 들어가 자국이 덜 남습니다." },
    },
  },

  /* 제품 섹션의 제목 — 카드 목록 자체는 관리자 페이지(/admin)에서 관리 */
  features: {
    title: "지금 판매 중인 물건",
    description:
      "카드를 누르면 스마트스토어 상품 화면으로 이동합니다. 가격은 스마트스토어 기준이며 바뀔 수 있습니다.",
  },

  /* 만드는 과정 섹션 (순서대로 보여 줌) */
  process: {
    title: "도마가 만들어지는 과정",
    description: "엔드그레인 도마 하나에 나무 조각 수십 개가 들어갑니다.",
    steps: [
      { title: "나무 고르기", text: "도마로 쓸 원목을 고르고 크기에 맞게 자릅니다." },
      { title: "세워 자르기", text: "나이테 면이 위로 오도록 같은 두께의 조각으로 자릅니다." },
      { title: "이어 붙이기", text: "색이 다른 조각을 엇갈려 붙여 바둑판 무늬를 만듭니다." },
      { title: "다듬고 마감하기", text: "표면을 고르게 갈아 내고 오일로 마감합니다." },
    ],
  },

  /* 문의 섹션 */
  contact: {
    title: "주문과 문의는 스마트스토어에서",
    description:
      "상품 주문, 배송, 선물 포장 문의는 네이버 스마트스토어에서 받고 있습니다. 상품 화면의 'Q&A'에 남겨 주시면 답변드립니다.",
    links: [{ label: "스마트스토어 바로가기", href: STORE_URL }],
  },

  /* 맨 아래(푸터) */
  footer: {
    copyright: "© 2026 WOOD & MORE. All rights reserved.",
  },

  /* 관리자 페이지에서 관리할 섹션 목록.
     key  = 데이터베이스에 저장되는 이름(영문 소문자),
     label = 관리자 화면에 보이는 이름.
     예) 후기를 따로 관리하려면 { key: "reviews", label: "후기" } 를 추가 */
  adminSections: [{ key: "features", label: "제품" }],
};

/* Supabase를 아직 연결하지 않았을 때 대신 보여줄 예시 카드 (스마트스토어 판매 상품).
   Supabase를 연결하면 이 내용 대신 관리자 페이지에서 등록한 카드가 보입니다.
   사진(image_url)은 3차시에 관리자 페이지에서 올리면 됩니다. 사진이 없으면 나무 무늬가 대신 보입니다. */
export const sampleItems: Item[] = [
  {
    id: "sample-1",
    section: "features",
    title: "원목 엔드그레인 도마",
    description: "나무 조각을 세워 이어 붙인 바둑판 무늬 도마. 칼자국이 덜 남습니다. (리뷰 41개)",
    image_url: null,
    link_url: `${STORE_URL}/products/13673652212`,
    sort_order: 1,
    is_visible: true,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "sample-2",
    section: "features",
    title: "미니 수납장",
    description: "서랍 하나에 선반이 붙은 작은 원목 수납장. 58,800원",
    image_url: null,
    link_url: STORE_URL,
    sort_order: 2,
    is_visible: true,
    created_at: "2026-01-01T00:00:00Z",
  },
  {
    id: "sample-3",
    section: "features",
    title: "행운 액막이 명태",
    description: "마음을 담아 건네는 작은 행운. 개업·이사·집들이 선물. 19,000원",
    image_url: null,
    link_url: `${STORE_URL}/products/13768516297`,
    sort_order: 3,
    is_visible: true,
    created_at: "2026-01-01T00:00:00Z",
  },
];
