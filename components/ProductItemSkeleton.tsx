import Skeleton from "./Skeleton";

export default function ProductItemSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow p-2 space-y-2">
      <Skeleton className="h-[200px] w-full mb-4" />
      <Skeleton className="h-4" />
      <div className="flex items-center space-x-2">
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-4 w-[100px]" />
      </div>
      <div className="flex items-center justify-between ">
        <div className="flex items-center space-x-1">
          <Skeleton className="h-2 w-2" />
          <Skeleton className="h-2 w-2" />
          <Skeleton className="h-2 w-2" />
        </div>
        <Skeleton className="h-6 w-[80px]" />
      </div>
    </div>
  );
}
