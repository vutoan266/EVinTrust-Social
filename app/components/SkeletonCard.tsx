import { Skeleton } from "antd";

export const SkeletonCard = () => (
  <div className="relative hover:before:bg-gray-600 before:opacity-50 before:w-full before:h-full before:z-10 cursor-pointer flex flex-col overflow-auto">
    <div className="relative mb-4">
      <Skeleton.Image active className="w-full h-80" />
    </div>
    <Skeleton avatar paragraph={{ rows: 1 }} />
  </div>
);
