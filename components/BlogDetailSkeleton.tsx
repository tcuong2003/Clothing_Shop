import Skeleton from "./Skeleton";

export default function BlogDetailSkeleton() {
  return (
    <>
      <div className="max-w-4xl bg-white rounded-lg shadow p-6 space-y-2 mx-auto">
        <Skeleton className="h-4 w-full " />
        <Skeleton className="h-[500px] w-full" />
        <Skeleton className="h-10 w-full " />
        <Skeleton className="h-2 w-10 " />
      </div>
    </>
  );
}
