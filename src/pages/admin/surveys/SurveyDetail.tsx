import {
  drinkingFrequencyLabelMap,
  drinkingFrequencyList,
  type DrinkingFrequencyType,
} from "@/pages/contact/types/drinkingFrequency";
import {
  exerciseTypeLabelMap,
  type ExerciseType,
} from "@/pages/contact/types/exercise";
import {
  exerciseGoalLabelMap,
  type ExerciseGoalType,
} from "@/pages/contact/types/exerciseGoal";
import {
  exerciseStyleLabelMap,
  type ExerciseStyleType,
} from "@/pages/contact/types/exerciseStyle";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const InfoBox = ({ children }: { children: React.ReactNode }) => (
  <p className="w-full px-4 py-3 bg-gray-100 rounded-lg text-sm border border-gray-200">
    {children || "—"}
  </p>
);

export default function SurveyDetailPage() {
  const navigate = useNavigate();
  const survey = {
    // 기본 정보
    name: "홍길동",
    contact: "010-1234-5678",
    birthDateOrAge: "1995-04-12",
    gender: "MALE",
    heightAndWeight: "175cm / 78kg",
    targetWeightOrBody: "70kg / 탄탄한 몸",

    // 운동 목표
    exerciseGoal: {
      WEIGHT_LOSS: true,
      WEIGHT_GAIN: false,
      POSTURE_CORRECTION: true,
      STRENGTH_INCREASE: true,
      HEALTH_MANAGEMENT: true,
      PAIN_RELIEF: false,
      POSTURE_ADJUSTMENT: false,
      ETC: false,
    },
    exerciseGoalEtc: "",
    targetPeriod: "3개월",

    // 운동 경험
    hasPtExperience: true,
    exerciseFrequency: "WEEK_3_4",
    exercise: {
      GYM: true,
      CARDIO: true,
      HOME_TRAINING: false,
      PILATES_YOGA: false,
      MARTIAL_ARTS_CROSSFIT: false,
      ETC: false,
    },
    exerciseTypeEtc: "",
    preferredStyle: {
      DETAILED_POSTURE: true,
      HIGH_INTENSITY: false,
      FUN_AND_LIGHT: true,
      CUSTOMIZED: false,
    },

    // 식습관
    mealsPerDay: "2끼",
    mealTimeRegularity: "불규칙",
    favoriteFoods: "라면, 치킨, 아이스크림, 빵",
    dietExperience: "예전에 2개월 동안 식단 관리 해본 적 있음",
    dietGoal: "야식 줄이고 단백질 섭취 늘려보고 싶음",

    // 건강 상태
    medicalHistory: "왼쪽 어깨 회전근 약간 통증",
    medicationOrPrecautions: "특별한 약 없음",

    // 생활 습관
    occupationAndActivity: "사무직, 하루 종일 앉아서 근무",
    sleepInfo: "평균 5~6시간, 숙면 어려움",
    smoking: false,
    drinkingFrequency: "RARELY",
    stressLevel: 4,
    exerciseObstacles: "시간 부족, 식단 관리 어려움",
  };

  return (
    <div className="max-w-2xl mx-auto py-10">
      <div className="bg-white shadow-xl rounded-xl p-8 border border-gray-200">
        <button
          className="text-gray-600 text-sm mb-6 hover:underline"
          onClick={() => navigate(-1)}
        >
          ← 회원 리스트로 돌아가기
        </button>

        <h2 className="text-2xl font-semibold mb-6">📄 회원 설문 상세 보기</h2>

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
                <span>{exerciseGoalLabelMap[key]}</span>
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
          <InfoBox>{survey.exerciseFrequency}</InfoBox>
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
                  <span>{exerciseTypeLabelMap[key]}</span>
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
            {(
              Object.entries(survey.preferredStyle) as [
                ExerciseStyleType,
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
                <span>{exerciseStyleLabelMap[key]}</span>
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
                <span>
                  {drinkingFrequencyLabelMap[key as DrinkingFrequencyType]}
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
