
import { useState } from 'react';

interface PendingUser {
  id: string;
  adminId: string;
  name: string;
  phone: string;
  position: string;
  branch: string;
  department: string;
  appliedAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

export default function ApprovalManagement() {
  const [pendingUsers, setPendingUsers] = useState<PendingUser[]>([
    {
      id: '1',
      adminId: 'trainer001',
      name: '김철수',
      phone: '010-1234-5678',
      position: '트레이너',
      branch: '1호점',
      department: '운동팀',
      appliedAt: '2024-01-15 14:30',
      status: 'pending'
    },
    {
      id: '2',
      adminId: 'manager002',
      name: '이영희',
      phone: '010-2345-6789',
      position: '매니저',
      branch: '2호점',
      department: '관리팀',
      appliedAt: '2024-01-14 09:15',
      status: 'pending'
    },
    {
      id: '3',
      adminId: 'counselor003',
      name: '박민수',
      phone: '010-3456-7890',
      position: '상담사',
      branch: '1호점',
      department: '상담팀',
      appliedAt: '2024-01-13 16:45',
      status: 'pending'
    },
    {
      id: '4',
      adminId: 'trainer004',
      name: '정수진',
      phone: '010-4567-8901',
      position: '트레이너',
      branch: '3호점',
      department: '운동팀',
      appliedAt: '2024-01-12 11:20',
      status: 'pending'
    },
    {
      id: '5',
      adminId: 'manager005',
      name: '최동욱',
      phone: '010-5678-9012',
      position: '운영팀장',
      branch: '2호점',
      department: '운영팀',
      appliedAt: '2024-01-11 13:10',
      status: 'pending'
    }
  ]);

  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');

  const handleApprove = (userId: string) => {
    setPendingUsers(prev => 
      prev.map(user => 
        user.id === userId 
          ? { ...user, status: 'approved' as const }
          : user
      )
    );
  };

  const handleReject = (userId: string) => {
    setPendingUsers(prev => 
      prev.map(user => 
        user.id === userId 
          ? { ...user, status: 'rejected' as const }
          : user
      )
    );
  };

  const filteredUsers = pendingUsers.filter(user => {
    if (filter === 'all') return true;
    return user.status === filter;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <i className="ri-time-line mr-1"></i>
            승인 대기
          </span>
        );
      case 'approved':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <i className="ri-check-line mr-1"></i>
            승인 완료
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <i className="ri-close-line mr-1"></i>
            승인 거부
          </span>
        );
      default:
        return null;
    }
  };

  const pendingCount = pendingUsers.filter(user => user.status === 'pending').length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">관리자 승인 관리</h2>
          <p className="text-sm text-gray-600 mt-1">
            관리자 회원가입 신청을 승인하거나 거부할 수 있습니다.
          </p>
        </div>
        {pendingCount > 0 && (
          <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
            {pendingCount}건 승인 대기 중
          </div>
        )}
      </div>

      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="border-b border-gray-200 p-4">
          <div className="flex space-x-4">
            <button
              onClick={() => setFilter('pending')}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                filter === 'pending'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              승인 대기 ({pendingUsers.filter(u => u.status === 'pending').length})
            </button>
            <button
              onClick={() => setFilter('approved')}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                filter === 'approved'
                  ? 'bg-green-100 text-green-800'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              승인 완료 ({pendingUsers.filter(u => u.status === 'approved').length})
            </button>
            <button
              onClick={() => setFilter('rejected')}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                filter === 'rejected'
                  ? 'bg-red-100 text-red-800'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              승인 거부 ({pendingUsers.filter(u => u.status === 'rejected').length})
            </button>
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-blue-100 text-blue-800'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              전체 ({pendingUsers.length})
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  신청자 정보
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  아이디
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  직책/지점
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  신청일시
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  상태
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  작업
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.phone}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.adminId}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.position}</div>
                    <div className="text-sm text-gray-500">{user.branch} · {user.department}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.appliedAt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(user.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {user.status === 'pending' && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleApprove(user.id)}
                          className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700 transition-colors cursor-pointer whitespace-nowrap"
                        >
                          승인
                        </button>
                        <button
                          onClick={() => handleReject(user.id)}
                          className="bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700 transition-colors cursor-pointer whitespace-nowrap"
                        >
                          거부
                        </button>
                      </div>
                    )}
                    {user.status !== 'pending' && (
                      <span className="text-gray-400 text-xs">처리 완료</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <i className="ri-user-search-line text-4xl text-gray-300 mb-4"></i>
            <p className="text-gray-500">
              {filter === 'pending' && '승인 대기 중인 신청이 없습니다.'}
              {filter === 'approved' && '승인 완료된 신청이 없습니다.'}
              {filter === 'rejected' && '승인 거부된 신청이 없습니다.'}
              {filter === 'all' && '신청 내역이 없습니다.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
