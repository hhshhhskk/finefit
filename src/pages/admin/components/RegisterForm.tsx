
import { useState } from 'react';

interface RegisterFormProps {
  onRegister: () => void;
}

export default function RegisterForm({ onRegister }: RegisterFormProps) {
  const [formData, setFormData] = useState({
    id: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
    position: '',
    branch: '',
    department: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    // 실제 회원가입 로직은 나중에 Supabase로 구현
    if (formData.id && formData.password && formData.name && formData.phone && formData.position && formData.branch && formData.department) {
      // 승인 대기 상태로 저장
      setIsSubmitted(true);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-8">
        <div className="mb-6">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="ri-time-line text-2xl text-yellow-600"></i>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">승인 대기 중</h3>
          <p className="text-gray-600 text-sm">
            회원가입 신청이 완료되었습니다.<br />
            관리자 승인 후 로그인이 가능합니다.
          </p>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex items-start">
            <i className="ri-information-line text-yellow-600 mt-0.5 mr-2"></i>
            <div className="text-left">
              <p className="text-sm text-yellow-800 font-medium mb-1">신청 정보</p>
              <p className="text-xs text-yellow-700">아이디: {formData.id}</p>
              <p className="text-xs text-yellow-700">이름: {formData.name}</p>
              <p className="text-xs text-yellow-700">지점: {formData.branch}</p>
              <p className="text-xs text-yellow-700">직책: {formData.position}</p>
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            setIsSubmitted(false);
            setFormData({
              id: '',
              password: '',
              confirmPassword: '',
              name: '',
              phone: '',
              position: '',
              branch: '',
              department: ''
            });
          }}
          className="text-blue-600 hover:text-blue-700 text-sm font-medium cursor-pointer"
        >
          다시 신청하기
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="admin-id" className="block text-sm font-medium text-gray-700 mb-2">
          아이디
        </label>
        <input
          id="admin-id"
          type="text"
          required
          value={formData.id}
          onChange={(e) => setFormData({ ...formData, id: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          placeholder="관리자 아이디"
        />
      </div>

      <div>
        <label htmlFor="register-password" className="block text-sm font-medium text-gray-700 mb-2">
          비밀번호
        </label>
        <input
          id="register-password"
          type="password"
          required
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          placeholder="비밀번호 (8자 이상)"
          minLength={8}
        />
      </div>

      <div>
        <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-2">
          비밀번호 확인
        </label>
        <input
          id="confirm-password"
          type="password"
          required
          value={formData.confirmPassword}
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          placeholder="비밀번호를 다시 입력하세요"
        />
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          이름
        </label>
        <input
          id="name"
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          placeholder="관리자 이름"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
          전화번호
        </label>
        <input
          id="phone"
          type="tel"
          required
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          placeholder="010-1234-5678"
        />
      </div>

      <div>
        <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-2">
          직책
        </label>
        <div className="relative">
          <select
            id="position"
            required
            value={formData.position}
            onChange={(e) => setFormData({ ...formData, position: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pr-8 cursor-pointer"
          >
            <option value="">직책을 선택하세요</option>
            <option value="매니저">매니저</option>
            <option value="트레이너">트레이너</option>
            <option value="상담사">상담사</option>
            <option value="운영팀장">운영팀장</option>
            <option value="점장">점장</option>
            <option value="부점장">부점장</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <i className="ri-arrow-down-s-line text-gray-400"></i>
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="branch" className="block text-sm font-medium text-gray-700 mb-2">
          호점
        </label>
        <div className="relative">
          <select
            id="branch"
            required
            value={formData.branch}
            onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pr-8 cursor-pointer"
          >
            <option value="">호점을 선택하세요</option>
            <option value="1호점">1호점</option>
            <option value="2호점">2호점</option>
            <option value="3호점">3호점</option>
            <option value="4호점">4호점</option>
            <option value="5호점">5호점</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <i className="ri-arrow-down-s-line text-gray-400"></i>
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-2">
          소속
        </label>
        <input
          id="department"
          type="text"
          required
          value={formData.department}
          onChange={(e) => setFormData({ ...formData, department: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          placeholder="소속 부서 또는 팀"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors font-medium cursor-pointer whitespace-nowrap"
      >
        회원가입 신청
      </button>
    </form>
  );
}
