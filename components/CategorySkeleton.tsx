import Skeleton from "./Skeleton";

export default function CategorySkeleton() {
  return (
    <div className="relative">
      <Skeleton className="w-full h-44 md:h-56" />
      <div className="absolute left-[10%] bottom-[10%] flex flex-col space-y-2">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
  );
}
