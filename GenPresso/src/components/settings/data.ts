import { getGlassmorphismStyle } from "../layout/style-utils";

export const GLASS_CARD_STYLE = getGlassmorphismStyle();

export const ROLE_BADGE_STYLES = {
  Owner: {
    light: { backgroundColor: '#dc2626', color: '#ffffff', borderColor: '#dc2626' },
    dark: { backgroundColor: 'rgba(239, 68, 68, 0.3)', color: '#f87171', borderColor: 'rgba(239, 68, 68, 0.3)' }
  },
  Manager: {
    light: { backgroundColor: '#16a34a', color: '#ffffff', borderColor: '#16a34a' },
    dark: { backgroundColor: 'rgba(34, 197, 94, 0.3)', color: '#4ade80', borderColor: 'rgba(34, 197, 94, 0.3)' }
  },
  Member: {
    light: { backgroundColor: '#2563eb', color: '#ffffff', borderColor: '#2563eb' },
    dark: { backgroundColor: 'rgba(59, 130, 246, 0.3)', color: '#60a5fa', borderColor: 'rgba(59, 130, 246, 0.3)' }
  },
} as const;

export const MOCK_WORKSPACES = [
  { id: 1, name: "홍길동(나)의 워크스페이스", role: "Owner", projects: 12 },
  { id: 2, name: "디자인팀 워크스페이스", role: "Manager", projects: 8 },
  { id: 3, name: "개발팀 워크스페이스", role: "Member", projects: 24 },
  { id: 4, name: "마케팅팀 워크스페이스", role: "Member", projects: 6 },
];

export const MOCK_MEMBERS = [
  { id: 1, name: "홍길동", email: "user1@genpresso.ai", team: "디자인팀", role: "Owner" },
  { id: 2, name: "김철수", email: "user2@genpresso.ai", team: "개발팀", role: "Manager" },
  { id: 3, name: "이영희", email: "user3@genpresso.ai", team: "기획팀", role: "Manager" },
  { id: 4, name: "박민수", email: "user4@genpresso.ai", team: "디자인팀", role: "Member" },
  { id: 5, name: "최지은", email: "user5@genpresso.ai", team: "개발팀", role: "Member" },
  { id: 6, name: "정서연", email: "user6@genpresso.ai", team: "마케팅팀", role: "Member" },
  { id: 7, name: "강동현", email: "user7@genpresso.ai", team: "기획팀", role: "Member" },
  { id: 8, name: "이수진", email: "user8@genpresso.ai", team: "연구팀", role: "Member" },
  { id: 9, name: "윤재욱", email: "user9@genpresso.ai", team: "디자인팀", role: "Member" },
  { id: 10, name: "한지우", email: "user10@genpresso.ai", team: "개발팀", role: "Member" },
  { id: 11, name: "오세진", email: "user11@genpresso.ai", team: "마케팅팀", role: "Member" },
  { id: 12, name: "서민준", email: "user12@genpresso.ai", team: "기획팀", role: "Member" },
  { id: 13, name: "임수빈", email: "user13@genpresso.ai", team: "연구팀", role: "Member" },
  { id: 14, name: "노현우", email: "user14@genpresso.ai", team: "디자인팀", role: "Member" },
  { id: 15, name: "하윤서", email: "user15@genpresso.ai", team: "개발팀", role: "Member" },
  { id: 16, name: "송지민", email: "user16@genpresso.ai", team: "마케팅팀", role: "Member" },
  { id: 17, name: "장예은", email: "user17@genpresso.ai", team: "기획팀", role: "Member" },
  { id: 18, name: "안도윤", email: "user18@genpresso.ai", team: "연구팀", role: "Member" },
  { id: 19, name: "조서진", email: "user19@genpresso.ai", team: "디자인팀", role: "Member" },
  { id: 20, name: "배준서", email: "user20@genpresso.ai", team: "개발팀", role: "Member" },
  { id: 21, name: "황시우", email: "user21@genpresso.ai", team: "마케팅팀", role: "Member" },
  { id: 22, name: "문채원", email: "user22@genpresso.ai", team: "기획팀", role: "Member" },
  { id: 23, name: "유하준", email: "user23@genpresso.ai", team: "연구팀", role: "Member" },
  { id: 24, name: "신다은", email: "user24@genpresso.ai", team: "디자인팀", role: "Member" },
  { id: 25, name: "곽태양", email: "user25@genpresso.ai", team: "개발팀", role: "Member" },
  { id: 26, name: "허아인", email: "user26@genpresso.ai", team: "마케팅팀", role: "Member" },
  { id: 27, name: "남민재", email: "user27@genpresso.ai", team: "기획팀", role: "Member" },
  { id: 28, name: "표소연", email: "user28@genpresso.ai", team: "연구팀", role: "Member" },
  { id: 29, name: "채은우", email: "user29@genpresso.ai", team: "디자인팀", role: "Member" },
  { id: 30, name: "성지원", email: "user30@genpresso.ai", team: "개발팀", role: "Member" },
  { id: 31, name: "도현수", email: "user31@genpresso.ai", team: "마케팅팀", role: "Member" },
  { id: 32, name: "류서윤", email: "user32@genpresso.ai", team: "기획팀", role: "Member" },
  { id: 33, name: "권준혁", email: "user33@genpresso.ai", team: "연구팀", role: "Member" },
  { id: 34, name: "변수아", email: "user34@genpresso.ai", team: "디자인팀", role: "Member" },
  { id: 35, name: "석민호", email: "user35@genpresso.ai", team: "개발팀", role: "Member" },
  { id: 36, name: "주연우", email: "user36@genpresso.ai", team: "마케팅팀", role: "Member" },
  { id: 37, name: "탁지안", email: "user37@genpresso.ai", team: "연구팀", role: "Member" },
];

export const MOCK_TEAMS = [
  { id: 1, name: "디자인팀", members: 7, projects: 15, createdAt: "2024-01-15", status: "사용중", credits: 5000 },
  { id: 2, name: "개발팀", members: 8, projects: 24, createdAt: "2024-01-10", status: "사용중", credits: 8500 },
  { id: 3, name: "기획팀", members: 6, projects: 12, createdAt: "2024-02-01", status: "사용중", credits: 3200 },
  { id: 4, name: "마케팅팀", members: 5, projects: 9, createdAt: "2024-02-15", status: "사용중", credits: 2800 },
  { id: 5, name: "연구팀", members: 5, projects: 18, createdAt: "2024-01-20", status: "사용중", credits: 6400 },
  { id: 6, name: "운영팀", members: 4, projects: 6, createdAt: "2024-03-01", status: "아카이브", credits: 1500 },
  { id: 7, name: "HR팀", members: 3, projects: 4, createdAt: "2024-03-10", status: "사용중", credits: 1200 },
  { id: 8, name: "재무팀", members: 3, projects: 5, createdAt: "2024-03-15", status: "사용중", credits: 1800 },
];
