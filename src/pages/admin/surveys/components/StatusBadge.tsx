export const getStatusBadge = (status: string) => {
  const statusConfig = {
    WAITING: { label: "대기중", color: "bg-yellow-100 text-yellow-800" },
    COMPLETED: { label: "상담완료", color: "bg-green-100 text-green-800" },
  };

  const config = statusConfig[status as keyof typeof statusConfig];
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}
    >
      {config.label}
    </span>
  );
};
