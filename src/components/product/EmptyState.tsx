import { Package } from "lucide-react";

const EmptyState = () => {
  return (
    <div className="text-center col-span-full py-16">
      <div className="p-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full w-24 h-24 mx-auto mb-4">
        <Package className="mx-auto h-16 w-16 text-blue-600" />
      </div>
      <h3 className="mt-4 text-xl font-bold text-gray-900">
        No products found
      </h3>
      <p className="mt-2 text-gray-600">
        Try adjusting your search terms or filters to find what you're looking
        for.
      </p>
    </div>
  );
};

export default EmptyState;
