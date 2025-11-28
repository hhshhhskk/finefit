export const getStatusBadge = (status: string) => {
  switch (status) {
    case "PENDING":
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          <i className="ri-time-line mr-1"></i>
          승인 대기
        </span>
      );
    case "APPROVED":
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <i className="ri-check-line mr-1"></i>
          승인 완료
        </span>
      );
    case "REJECTED":
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
