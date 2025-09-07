import { Edit2, Trash2 } from "lucide-react";
import type { Product } from "@/types/productType";
import { Button } from "../ui/button";
import { memo } from "react";

interface ProductCardProps {
  product: Product;
  handleEdit: (product: Product) => void;
  handleDelete: (id: number) => void;
}

const ProductCard = ({
  product,
  handleEdit,
  handleDelete,
}: ProductCardProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-50 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      <div className="relative">
        <img
          src={product?.image}
          alt={product?.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-bold text-gray-900 truncate">
            {product.title}
          </h3>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            ${product.price}
          </span>
        </div>
        <p className="text-sm text-blue-600 font-medium mb-2">
          {product.category}
        </p>
        <p className="text-sm text-gray-600 mb-4 h-10 overflow-hidden">
          {product.description}
        </p>
        <div className="flex gap-3">
          <Button
            variant="outline"
            icon={<Edit2 className="h-4 w-4" />}
            className="flex-1"
            onClick={() => handleEdit(product)}
          >
            Edit
          </Button>
          <Button
            variant="destructive"
            className="flex-1"
            icon={<Trash2 className="h-4 w-4" />}
            onClick={() => handleDelete(product.id)}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default memo(ProductCard);
