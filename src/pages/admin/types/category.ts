// tabs 배열을 먼저 정의
export const tabs = [
  { key: "surveys", label: "설문지 관리" },
  { key: "sales", label: "트레이너 매출 순위" },
  { key: "members", label: "회원 관리" },
  { key: "approvals", label: "승인 관리" },
] as const;

// key 값을 기반으로 타입 추출
export type DashboardTab = (typeof tabs)[number]["key"];

export interface CategoryProps {
  dashboardTab: DashboardTab;
  setDashboardTab: React.Dispatch<React.SetStateAction<DashboardTab>>;
}
