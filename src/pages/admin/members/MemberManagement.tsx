import { useState } from 'react';

// 회원 데이터 타입
interface Member {
  id: number;
  name: string;
  trainerId: number;
  trainerName: string;
  branch: string;
  salesAmount: number;
  ptMonths: number;
  notes: string;
  registrationDate: string;
}

// 트레이너 데이터 타입
interface Trainer {
  id: number;
  name: string;
  branch: string;
}

// 임시 트레이너 데이터
const mockTrainers: Trainer[] = [
  { id: 1, name: '김지은', branch: '1호점' },
  { id: 2, name: '박서연', branch: '2호점' },
  { id: 3, name: '이민정', branch: '1호점' },
  { id: 4, name: '최유진', branch: '3호점' },
  { id: 5, name: '정하영', branch: '2호점' },
  { id: 6, name: '강소희', branch: '4호점' },
  { id: 7, name: '윤채영', branch: '1호점' },
  { id: 8, name: '임수빈', branch: '5호점' },
  { id: 9, name: '한예린', branch: '3호점' },
  { id: 10, name: '조아름', branch: '2호점' },
  { id: 11, name: '신다은', branch: '4호점' },
  { id: 12, name: '오지혜', branch: '5호점' },
  { id: 13, name: '배수정', branch: '1호점' },
  { id: 14, name: '송미래', branch: '3호점' },
  { id: 15, name: '류지원', branch: '2호점' },
  { id: 16, name: '문혜진', branch: '4호점' },
  { id: 17, name: '홍서영', branch: '5호점' },
  { id: 18, name: '김나연', branch: '1호점' },
  { id: 19, name: '이소영', branch: '3호점' },
  { id: 20, name: '박지수', branch: '2호점' }
];

// 임시 회원 데이터
const mockMembers: Member[] = [
  {
    id: 1,
    name: '김민지',
    trainerId: 1,
    trainerName: '김지은',
    branch: '1호점',
    salesAmount: 300000,
    ptMonths: 3,
    notes: '다이어트 목표, 주 3회 운동',
    registrationDate: '2024-01-15'
  },
  {
    id: 2,
    name: '이서연',
    trainerId: 1,
    trainerName: '김지은',
    branch: '1호점',
    salesAmount: 500000,
    ptMonths: 6,
    notes: '근력 강화 프로그램',
    registrationDate: '2024-01-20'
  },
  {
    id: 3,
    name: '박지혜',
    trainerId: 2,
    trainerName: '박서연',
    branch: '2호점',
    salesAmount: 400000,
    ptMonths: 4,
    notes: '체형 교정 및 자세 개선',
    registrationDate: '2024-02-01'
  },
  {
    id: 4,
    name: '최수진',
    trainerId: 2,
    trainerName: '박서연',
    branch: '2호점',
    salesAmount: 600000,
    ptMonths: 8,
    notes: '산후 다이어트',
    registrationDate: '2024-02-10'
  },
  {
    id: 5,
    name: '정유리',
    trainerId: 3,
    trainerName: '이민정',
    branch: '1호점',
    salesAmount: 350000,
    ptMonths: 3,
    notes: '기초 체력 향상',
    registrationDate: '2024-02-15'
  }
];

export default function MemberManagement() {
  const [members, setMembers] = useState<Member[]>(mockMembers);
  const [selectedTrainer, setSelectedTrainer] = useState<number | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [branchFilter, setBranchFilter] = useState<string>('all');
  
  // 새 회원 등록 폼 데이터
  const [newMember, setNewMember] = useState({
    name: '',
    trainerId: 0,
    salesAmount: '',
    ptMonths: '',
    notes: ''
  });

  // 필터링된 트레이너 목록
  const filteredTrainers = mockTrainers.filter(trainer => 
    branchFilter === 'all' || trainer.branch === branchFilter
  );

  // 선택된 트레이너의 회원 목록
  const selectedTrainerMembers = selectedTrainer 
    ? members.filter(member => member.trainerId === selectedTrainer)
    : [];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ko-KR').format(amount);
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMember.name || !newMember.trainerId || !newMember.salesAmount || !newMember.ptMonths) {
      alert('모든 필수 항목을 입력해주세요.');
      return;
    }

    const trainer = mockTrainers.find(t => t.id === newMember.trainerId);
    if (!trainer) return;

    const member: Member = {
      id: Date.now(),
      name: newMember.name,
      trainerId: newMember.trainerId,
      trainerName: trainer.name,
      branch: trainer.branch,
      salesAmount: parseInt(newMember.salesAmount),
      ptMonths: parseInt(newMember.ptMonths),
      notes: newMember.notes,
      registrationDate: new Date().toISOString().split('T')[0]
    };

    setMembers([...members, member]);
    setNewMember({
      name: '',
      trainerId: 0,
      salesAmount: '',
      ptMonths: '',
      notes: ''
    });
    setShowAddForm(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-gray-900">회원 관리</h2>
        <div className="flex items-center space-x-4">
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
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium cursor-pointer whitespace-nowrap"
          >
            회원 등록
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 트레이너 목록 */}
        <div className="lg:col-span-1">
          <h3 className="text-md font-medium text-gray-900 mb-4">트레이너 목록</h3>
          <div className="bg-white rounded-lg border border-gray-200 max-h-96 overflow-y-auto">
            {filteredTrainers.map((trainer) => (
              <div
                key={trainer.id}
                onClick={() => setSelectedTrainer(trainer.id)}
                className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${
                  selectedTrainer === trainer.id ? 'bg-blue-50 border-blue-200' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
                    {trainer.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{trainer.name}</div>
                    <div className="text-xs text-gray-500">{trainer.branch}</div>
                  </div>
                </div>
                <div className="mt-2 text-xs text-gray-600">
                  회원 수: {members.filter(m => m.trainerId === trainer.id).length}명
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 선택된 트레이너의 회원 목록 */}
        <div className="lg:col-span-2">
          {selectedTrainer ? (
            <>
              <h3 className="text-md font-medium text-gray-900 mb-4">
                {mockTrainers.find(t => t.id === selectedTrainer)?.name} 트레이너 회원 목록
              </h3>
              <div className="bg-white rounded-lg border border-gray-200">
                {selectedTrainerMembers.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">회원명</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">매출 금액</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PT 개월수</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">등록일</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">기타</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {selectedTrainerMembers.map((member) => (
                          <tr key={member.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{member.name}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{formatCurrency(member.salesAmount)}원</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{member.ptMonths}개월</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{member.registrationDate}</div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm text-gray-900 max-w-xs truncate">{member.notes || '-'}</div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="p-8 text-center text-gray-500">
                    등록된 회원이 없습니다.
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 p-8 text-center text-gray-500">
              트레이너를 선택하여 회원 목록을 확인하세요.
            </div>
          )}
        </div>
      </div>

      {/* 회원 등록 모달 */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">새 회원 등록</h3>
            <form onSubmit={handleAddMember} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">회원명 *</label>
                <input
                  type="text"
                  value={newMember.name}
                  onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">담당 트레이너 *</label>
                <select
                  value={newMember.trainerId}
                  onChange={(e) => setNewMember({...newMember, trainerId: parseInt(e.target.value)})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
                  required
                >
                  <option value={0}>트레이너 선택</option>
                  {filteredTrainers.map((trainer) => (
                    <option key={trainer.id} value={trainer.id}>
                      {trainer.name} ({trainer.branch})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">매출 금액 *</label>
                <input
                  type="number"
                  value={newMember.salesAmount}
                  onChange={(e) => setNewMember({...newMember, salesAmount: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="원"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">PT 개월수 *</label>
                <input
                  type="number"
                  value={newMember.ptMonths}
                  onChange={(e) => setNewMember({...newMember, ptMonths: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="개월"
                  min="1"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">기타 사항</label>
                <textarea
                  value={newMember.notes}
                  onChange={(e) => setNewMember({...newMember, notes: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="운동 목표, 특이사항 등"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors cursor-pointer whitespace-nowrap"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap"
                >
                  등록
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}