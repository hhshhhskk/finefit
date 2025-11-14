
import { useState } from 'react';

// 트레이너 매출 임시 데이터
const mockTrainerSales = [
  {
    id: 1,
    name: '김지은',
    branch: '1호점',
    position: '트레이너',
    monthlySales: 4500000,
    memberCount: 45,
    avgSalesPerMember: 100000,
    rank: 1,
    previousRank: 2
  },
  {
    id: 2,
    name: '박서연',
    branch: '2호점',
    position: '트레이너',
    monthlySales: 4200000,
    memberCount: 42,
    avgSalesPerMember: 100000,
    rank: 2,
    previousRank: 1
  },
  {
    id: 3,
    name: '이민정',
    branch: '1호점',
    position: '트레이너',
    monthlySales: 3800000,
    memberCount: 38,
    avgSalesPerMember: 100000,
    rank: 3,
    previousRank: 3
  },
  {
    id: 4,
    name: '최유진',
    branch: '3호점',
    position: '트레이너',
    monthlySales: 3600000,
    memberCount: 36,
    avgSalesPerMember: 100000,
    rank: 4,
    previousRank: 5
  },
  {
    id: 5,
    name: '정하영',
    branch: '2호점',
    position: '트레이너',
    monthlySales: 3400000,
    memberCount: 34,
    avgSalesPerMember: 100000,
    rank: 5,
    previousRank: 4
  },
  {
    id: 6,
    name: '강소희',
    branch: '4호점',
    position: '트레이너',
    monthlySales: 3200000,
    memberCount: 32,
    avgSalesPerMember: 100000,
    rank: 6,
    previousRank: 6
  },
  {
    id: 7,
    name: '윤채영',
    branch: '1호점',
    position: '트레이너',
    monthlySales: 3000000,
    memberCount: 30,
    avgSalesPerMember: 100000,
    rank: 7,
    previousRank: 8
  },
  {
    id: 8,
    name: '임수빈',
    branch: '5호점',
    position: '트레이너',
    monthlySales: 2900000,
    memberCount: 29,
    avgSalesPerMember: 100000,
    rank: 8,
    previousRank: 7
  },
  {
    id: 9,
    name: '한예린',
    branch: '3호점',
    position: '트레이너',
    monthlySales: 2800000,
    memberCount: 28,
    avgSalesPerMember: 100000,
    rank: 9,
    previousRank: 9
  },
  {
    id: 10,
    name: '조아름',
    branch: '2호점',
    position: '트레이너',
    monthlySales: 2700000,
    memberCount: 27,
    avgSalesPerMember: 100000,
    rank: 10,
    previousRank: 11
  },
  {
    id: 11,
    name: '신다은',
    branch: '4호점',
    position: '트레이너',
    monthlySales: 2600000,
    memberCount: 26,
    avgSalesPerMember: 100000,
    rank: 11,
    previousRank: 10
  },
  {
    id: 12,
    name: '오지혜',
    branch: '5호점',
    position: '트레이너',
    monthlySales: 2500000,
    memberCount: 25,
    avgSalesPerMember: 100000,
    rank: 12,
    previousRank: 12
  },
  {
    id: 13,
    name: '배수정',
    branch: '1호점',
    position: '트레이너',
    monthlySales: 2400000,
    memberCount: 24,
    avgSalesPerMember: 100000,
    rank: 13,
    previousRank: 14
  },
  {
    id: 14,
    name: '송미래',
    branch: '3호점',
    position: '트레이너',
    monthlySales: 2300000,
    memberCount: 23,
    avgSalesPerMember: 100000,
    rank: 14,
    previousRank: 13
  },
  {
    id: 15,
    name: '류지원',
    branch: '2호점',
    position: '트레이너',
    monthlySales: 2200000,
    memberCount: 22,
    avgSalesPerMember: 100000,
    rank: 15,
    previousRank: 15
  },
  {
    id: 16,
    name: '문혜진',
    branch: '4호점',
    position: '트레이너',
    monthlySales: 2100000,
    memberCount: 21,
    avgSalesPerMember: 100000,
    rank: 16,
    previousRank: 17
  },
  {
    id: 17,
    name: '홍서영',
    branch: '5호점',
    position: '트레이너',
    monthlySales: 2000000,
    memberCount: 20,
    avgSalesPerMember: 100000,
    rank: 17,
    previousRank: 16
  },
  {
    id: 18,
    name: '김나연',
    branch: '1호점',
    position: '트레이너',
    monthlySales: 1900000,
    memberCount: 19,
    avgSalesPerMember: 100000,
    rank: 18,
    previousRank: 18
  },
  {
    id: 19,
    name: '이소영',
    branch: '3호점',
    position: '트레이너',
    monthlySales: 1800000,
    memberCount: 18,
    avgSalesPerMember: 100000,
    rank: 19,
    previousRank: 20
  },
  {
    id: 20,
    name: '박지수',
    branch: '2호점',
    position: '트레이너',
    monthlySales: 1700000,
    memberCount: 17,
    avgSalesPerMember: 100000,
    rank: 20,
    previousRank: 19
  }
];

export default function TrainerSales() {
  const [trainers] = useState(mockTrainerSales);
  const [branchFilter, setBranchFilter] = useState<string>('all');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('current');

  const filteredTrainers = trainers.filter(trainer => 
    branchFilter === 'all' || trainer.branch === branchFilter
  );

  const getRankBadge = (rank: number) => {
    if (rank <= 3) {
      const colors = {
        1: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        2: 'bg-gray-100 text-gray-800 border-gray-200',
        3: 'bg-orange-100 text-orange-800 border-orange-200'
      };
      return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colors[rank as keyof typeof colors]}`}>
          {rank}위
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border-blue-200">
        {rank}위
      </span>
    );
  };

  const getRankChange = (rank: number, previousRank: number) => {
    if (rank < previousRank) {
      return (
        <span className="text-green-600 text-xs flex items-center">
          <i className="ri-arrow-up-line mr-1"></i>
          {previousRank - rank}
        </span>
      );
    } else if (rank > previousRank) {
      return (
        <span className="text-red-600 text-xs flex items-center">
          <i className="ri-arrow-down-line mr-1"></i>
          {rank - previousRank}
        </span>
      );
    }
    return (
      <span className="text-gray-500 text-xs">
        <i className="ri-subtract-line"></i>
      </span>
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ko-KR').format(amount);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-gray-900">트레이너 매출 순위</h2>
        <div className="flex items-center space-x-4">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
          >
            <option value="current">이번 달</option>
            <option value="previous">지난 달</option>
            <option value="quarter">분기별</option>
          </select>
          <select
            value={branchFilter}
            onChange={(e) => setBranchFilter(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
          >
            <option value="all">전체 지점</option>
            <option value="1호점">1호점</option>
            <option value="2호점">2호점</option>
            <option value="3호점">3호점</option>
            <option value="4호점">4호점</option>
            <option value="5호점">5호점</option>
          </select>
        </div>
      </div>

      {/* 상위 3명 하이라이트 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {filteredTrainers.slice(0, 3).map((trainer, index) => (
          <div key={trainer.id} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {trainer.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{trainer.name}</h3>
                  <p className="text-sm text-gray-600">{trainer.branch}</p>
                </div>
              </div>
              {getRankBadge(trainer.rank)}
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">월 매출</span>
                <span className="font-medium text-gray-900">{formatCurrency(trainer.monthlySales)}원</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">회원 수</span>
                <span className="font-medium text-gray-900">{trainer.memberCount}명</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 전체 순위 테이블 */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">순위</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">트레이너</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">지점</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">월 매출</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">회원 수</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">순위 변동</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTrainers.map((trainer) => (
                <tr key={trainer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getRankBadge(trainer.rank)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium text-sm mr-3">
                        {trainer.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{trainer.name}</div>
                        <div className="text-sm text-gray-500">{trainer.position}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{trainer.branch}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {formatCurrency(trainer.monthlySales)}원
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{trainer.memberCount}명</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getRankChange(trainer.rank, trainer.previousRank)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 통계 요약 */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-sm text-gray-600 mb-1">총 매출</div>
          <div className="text-2xl font-bold text-gray-900">
            {formatCurrency(filteredTrainers.reduce((sum, trainer) => sum + trainer.monthlySales, 0))}원
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-sm text-gray-600 mb-1">평균 매출</div>
          <div className="text-2xl font-bold text-gray-900">
            {formatCurrency(Math.round(filteredTrainers.reduce((sum, trainer) => sum + trainer.monthlySales, 0) / filteredTrainers.length))}원
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-sm text-gray-600 mb-1">총 회원 수</div>
          <div className="text-2xl font-bold text-gray-900">
            {filteredTrainers.reduce((sum, trainer) => sum + trainer.memberCount, 0)}명
          </div>
        </div>
      </div>
    </div>
  );
}
