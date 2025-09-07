import { Skeleton } from "../ui/skeleton";

const ProductSkeleton = () => {
  return [...Array(8)].map((_, i) => (
    <div
      key={i}
      className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-50"
    >
      <Skeleton className="h-48 w-full rounded-none" />
      <div className="p-6">
        <div className="space-y-4">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-5 w-4/5" />
          <Skeleton className="h-5 w-3/4" />
        </div>
        <div className="flex gap-3 mt-5">
          <Skeleton className="h-9 w-full" />{" "}
          <Skeleton className="h-9 w-full" />
        </div>
      </div>
    </div>
  ));
};

export default ProductSkeleton;
