import { useSurveyDetail } from "@/hooks/admin/useSurveyDetail";
import {
  drinkingFrequencyLabelMap,
  drinkingFrequencyList,
} from "@/pages/contact/types/drinkingFrequency";
import {
  exerciseTypeLabelMap,
  type ExerciseType,
} from "@/pages/contact/types/exercise";
import {
  exerciseFrequencyLabelMap,
  exerciseFrequencyList,
} from "@/pages/contact/types/exerciseFrequency";
import {
  exerciseGoalLabelMap,
  type ExerciseGoalType,
} from "@/pages/contact/types/exerciseGoal";
import { exerciseStyleLabelMap } from "@/pages/contact/types/exerciseStyle";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getStatusBadge } from "./components/StatusBadge";
import { useSurveyStatusUpdate } from "@/hooks/admin/useSurveyStatusUpdate";

const InfoBox = ({ children }: { children: React.ReactNode }) => (
  <p className="w-full px-4 py-3 bg-gray-100 rounded-lg text-sm border border-gray-200">
    {children || "—"}
  </p>
);

export default function SurveyDetailPage() {
  const navigate = useNavigate();
  const { surveyId } = useParams();
  const { data: survey, isLoading, error } = useSurveyDetail(surveyId!);
  const { mutate: updateStatus } = useSurveyStatusUpdate();

  if (isLoading || survey === undefined) return <div>로딩중...</div>;
  if (error) return <div>에러 발생</div>;

  return (
    <div className="max-w-2xl mx-auto py-10">
      <div className="bg-white shadow-xl rounded-xl p-8 border border-gray-200">
        <button
          className="text-gray-600 text-sm mb-6 hover:underline"
          onClick={() => navigate(-1)}
        >
          ← 회원 리스트로 돌아가기
        </button>

        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold mb-6">
            📄 회원 설문 상세 보기
          </h2>
          <div className="flex w-auto h-6 bg-gray-100 rounded-full">
            {getStatusBadge(survey.counselStatus)}
            <div
              className="w-9 text-gray-600 text-sm hover:cursor-pointer"
              onClick={() => {
                const nextStatus =
                  survey.counselStatus === "WAITING" ? "COMPLETED" : "WAITING";

                updateStatus({
                  counselId: String(surveyId),
                  counselStatus: nextStatus,
                });
              }}
            >
              변경
            </div>
          </div>
        </div>

        {/* 성함 */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">성함</label>
          <InfoBox>{survey.name}</InfoBox>
        </div>

        {/* 연락처 */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">연락처</label>
          <InfoBox>{survey.contact}</InfoBox>
        </div>

        {/* 생년월일 / 나이 */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            생년월일 또는 나이
          </label>
          <InfoBox>{survey.birthDateOrAge}</InfoBox>
        </div>

        {/* 성별 */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">성별</label>
          <InfoBox>
            {survey.gender === "MALE"
              ? "남성"
              : survey.gender === "FEMALE"
              ? "여성"
              : "기타"}
          </InfoBox>
        </div>

        {/* 키 / 체중 */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">키 / 체중</label>
          <InfoBox>{survey.heightAndWeight}</InfoBox>
        </div>

        {/* 목표 체중 또는 바디 목표 */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            목표 체중 또는 바디 목표
          </label>
          <InfoBox>{survey.targetWeightOrBody}</InfoBox>
        </div>

        {/* 운동 목표 (Checkbox) */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">운동 목표</label>
          <div className="grid grid-cols-2 gap-2">
            {(
              Object.entries(survey.exerciseGoal) as [
                ExerciseGoalType,
                boolean
              ][]
            ).map(([key, checked]) => (
              <label key={key} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={checked}
                  disabled
                  className="w-4 h-4"
                />
                <span
                  className={
                    checked ? "text-blue-700 font-bold" : "text-gray-500"
                  }
                >
                  {exerciseGoalLabelMap[key]}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* 목표 기간 */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            목표 달성 기간
          </label>
          <InfoBox>{survey.targetPeriod}</InfoBox>
        </div>

        {/* 이전 PT 경험 */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            이전 퍼스널 트레이닝 경험
          </label>
          <InfoBox>{survey.hasPtExperience ? "있음" : "없음"}</InfoBox>
        </div>

        {/* 평소 운동 빈도 */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            평소 운동 빈도
          </label>

          <div className="flex flex-col gap-2">
            {exerciseFrequencyList.map((key) => (
              <label
                key={key}
                className="flex items-center gap-2 cursor-not-allowed"
              >
                <input
                  type="radio"
                  name="exerciseFrequency"
                  value={key}
                  checked={survey.exerciseFrequency === key}
                  disabled
                  className="w-4 h-4"
                />
                <span
                  className={
                    survey.exerciseFrequency === key
                      ? "text-blue-700 font-bold"
                      : "text-gray-500"
                  }
                >
                  {exerciseFrequencyLabelMap[key]}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* 해본 운동 종류 */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            해본 운동 종류
          </label>
          <div className="grid grid-cols-2 gap-2">
            {(Object.entries(survey.exercise) as [ExerciseType, boolean][]).map(
              ([key, checked]) => (
                <label key={key} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={checked}
                    disabled
                    className="w-4 h-4"
                  />
                  <span
                    className={
                      checked ? "text-blue-700 font-bold" : "text-gray-500"
                    }
                  >
                    {exerciseTypeLabelMap[key]}
                  </span>
                </label>
              )
            )}
          </div>
        </div>

        {/* 선호 운동 스타일 */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            선호 운동 스타일
          </label>

          <div className="grid grid-cols-2 gap-2">
            {Object.entries(exerciseStyleLabelMap).map(([key, label]) => (
              <label key={key} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="preferredStyle"
                  value={key}
                  checked={survey.preferredStyle === key}
                  disabled
                  className="w-4 h-4"
                />
                <span
                  className={
                    survey.preferredStyle === key
                      ? "text-blue-700 font-bold"
                      : "text-gray-500"
                  }
                >
                  {label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* 식습관 */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            하루 평균 식사 횟수
          </label>
          <InfoBox>{survey.mealsPerDay}</InfoBox>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            식사 시간 규칙성
          </label>
          <InfoBox>{survey.mealTimeRegularity}</InfoBox>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            즐겨 먹는 음식
          </label>
          <InfoBox>{survey.favoriteFoods}</InfoBox>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            다이어트 경험
          </label>
          <InfoBox>{survey.dietExperience}</InfoBox>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            현재 식단 목표
          </label>
          <InfoBox>{survey.dietGoal}</InfoBox>
        </div>

        {/* 건강 상태 */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            질환 / 통증 정보
          </label>
          <InfoBox>{survey.medicalHistory}</InfoBox>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            복용 약물 / 주의사항
          </label>
          <InfoBox>{survey.medicationOrPrecautions}</InfoBox>
        </div>

        {/* 생활 습관 */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            직업 및 활동량
          </label>
          <InfoBox>{survey.occupationAndActivity}</InfoBox>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">수면 정보</label>
          <InfoBox>{survey.sleepInfo}</InfoBox>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">흡연 여부</label>
          <InfoBox>{survey.smoking ? "예" : "아니오"}</InfoBox>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">음주 빈도</label>
          <div className="grid grid-cols-2 gap-2">
            {drinkingFrequencyList.map((key) => (
              <label key={key} className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={survey.drinkingFrequency === key}
                  disabled
                  className="w-4 h-4"
                />
                <span
                  className={
                    survey.drinkingFrequency === key
                      ? "text-blue-700 font-bold"
                      : "text-gray-500"
                  }
                >
                  {drinkingFrequencyLabelMap[key]}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            스트레스 수준 (1~5점)
          </label>
          <InfoBox>{survey.stressLevel}</InfoBox>
        </div>

        <div className="mb-10">
          <label className="block text-sm font-medium mb-2">
            운동 방해 요인
          </label>
          <InfoBox>{survey.exerciseObstacles}</InfoBox>
        </div>
      </div>
    </div>
  );
}
