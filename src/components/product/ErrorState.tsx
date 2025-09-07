import { AlertTriangle } from "lucide-react";
import { Button } from "../ui/button";
import { useQueryClient } from "@tanstack/react-query";

const ErrorState = () => {
  const queryClient = useQueryClient();
  return (
    <div className="text-center col-span-full py-16">
      <div className="p-4 bg-gradient-to-r from-red-100 to-pink-100 rounded-full w-24 h-24 mx-auto mb-4">
        <AlertTriangle className="mx-auto h-16 w-16 text-red-600" />
      </div>
      <h3 className="mt-4 text-xl font-bold text-gray-900">
        Oops! Something went wrong
      </h3>
      <p className="mt-2 text-gray-600">
        We couldn’t load the products. Please check your connection and try
        again.
      </p>

      <Button
        variant="destructive"
        onClick={() => {
          queryClient.invalidateQueries({ queryKey: ["products"] });
        }}
        className="mt-6 px-6"
      >
        Retry
      </Button>
    </div>
  );
};

export default ErrorState;
