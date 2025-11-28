import { useApprovalList } from "@/hooks/admin/useApprovalList";
import { useState } from "react";
import { getStatusBadge } from "./components/StatusBadge";
import { useUpdateApprovalStatus } from "@/hooks/admin/useApprovalStatusUpdate";

export default function ApprovalManagement() {
  const { data: approvalList, isLoading, isError } = useApprovalList("");
  const { mutate: updateStatus } = useUpdateApprovalStatus();
  const [filter, setFilter] = useState<
    "" | "PENDING" | "APPROVED" | "REJECTED"
  >("PENDING");
  console.log(approvalList);

  const handleApprove = (userId: string) => {
    updateStatus({ userId, approvalStatus: "APPROVED" });
  };

  const handleReject = (userId: string) => {
    updateStatus({ userId, approvalStatus: "REJECTED" });
  };
  const filteredUsers = approvalList?.filter((data) => {
    if (filter === "") return true;
    return data.approvalStatus === filter;
  });

  const pendingCount =
    approvalList?.filter((data) => data.approvalStatus === "PENDING").length ??
    0;

  if (isLoading) return <div className="p-6">로딩 중...</div>;
  if (isError) return <div className="p-6 text-red-500">데이터 로딩 실패</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            관리자 승인 관리
          </h2>
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
              onClick={() => setFilter("PENDING")}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                filter === "PENDING"
                  ? "bg-yellow-100 text-yellow-800"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              승인 대기 (
              {
                approvalList?.filter((u) => u.approvalStatus === "PENDING")
                  .length
              }
              )
            </button>
            <button
              onClick={() => setFilter("APPROVED")}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                filter === "APPROVED"
                  ? "bg-green-100 text-green-800"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              승인 완료 (
              {
                approvalList?.filter((u) => u.approvalStatus === "APPROVED")
                  .length
              }
              )
            </button>
            <button
              onClick={() => setFilter("REJECTED")}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                filter === "REJECTED"
                  ? "bg-red-100 text-red-800"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              승인 거부 (
              {
                approvalList?.filter((u) => u.approvalStatus === "REJECTED")
                  .length
              }
              )
            </button>
            <button
              onClick={() => setFilter("")}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                filter === ""
                  ? "bg-blue-100 text-blue-800"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              전체 ({approvalList?.length})
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
              {filteredUsers?.map((user) => (
                <tr key={user.userId} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {user.trainerName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {user.connect}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {user.trainerId}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.role}</div>
                    <div className="text-sm text-gray-500">
                      {user.storeNumber} · {user.team}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.createAt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(user.approvalStatus)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {user.approvalStatus === "PENDING" && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleApprove(user.userId)}
                          className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700 transition-colors cursor-pointer whitespace-nowrap"
                        >
                          승인
                        </button>
                        <button
                          onClick={() => handleReject(user.userId)}
                          className="bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700 transition-colors cursor-pointer whitespace-nowrap"
                        >
                          거부
                        </button>
                      </div>
                    )}
                    {user.approvalStatus !== "PENDING" && (
                      <span className="text-gray-400 text-xs">처리 완료</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers?.length === 0 && (
          <div className="text-center py-12">
            <i className="ri-user-search-line text-4xl text-gray-300 mb-4"></i>
            <p className="text-gray-500">
              {filter === "PENDING" && "승인 대기 중인 신청이 없습니다."}
              {filter === "APPROVED" && "승인 완료된 신청이 없습니다."}
              {filter === "REJECTED" && "승인 거부된 신청이 없습니다."}
              {filter === "" && "신청 내역이 없습니다."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
