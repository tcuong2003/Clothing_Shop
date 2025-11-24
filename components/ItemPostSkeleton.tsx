import Skeleton from "./Skeleton";

export default function ItemPostSkeleton({ isNew }: { isNew: any }) {
  return (
    <>
      <div className="bg-white rounded-lg shadow p-2 space-y-2">
        <Skeleton className={`w-full ${isNew ? "h-[150px]" : "h-[250px]"}`} />
        <Skeleton className="h-6 w-full" />
        {isNew && <Skeleton className="h-6 w-full" />}
      </div>
    </>
  );
}
