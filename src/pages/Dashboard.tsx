import React, { useMemo, useState } from "react";
import type { Product } from "@/types/productType";
import { useProducts } from "@/hooks/useProducts";
import { Plus, Search, Package, AlertTriangle } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import ProductForm from "@/components/product/ProductForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ProductSkeleton from "@/components/product/ProductSkeleton";
import { queryLoading } from "@/helpers/queryLoading";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type DialogTypes = {
  open: boolean;
  mode: "add" | "edit";
  product?: Omit<Product, "id">;
};

const dialogInitialValue: DialogTypes = {
  open: false,
  mode: "add",
};

export default function Dashboard() {
  const {
    products,
    productsQuery,
    addMutation,
    updateMutation,
    deleteMutation,
    setProducts,
  } = useProducts();
  const [dialog, setDialog] = React.useState<DialogTypes>(dialogInitialValue);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const queryClient = useQueryClient();
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const handleAdd = (values: any) => {
    addMutation.mutate(values, {
      onSuccess: (data: any) => {
        setProducts((prev) => [...prev, { ...data?.data }]);
        setDialog((d) => ({ ...d, open: false }));
        toast.success("Product Added", {
          description: `Product was added successfully!`,
        });
      },
    });
  };

  const handleEdit = (values: any) => {
    updateMutation.mutate(
      { id: values?.id, product: values },
      {
        onSuccess: () => {
          setProducts((prev) =>
            prev.map((p) => (p.id === values?.id ? { ...p, ...values } : p)),
          );
          setDialog((d) => ({ ...d, open: false }));
          toast.success("Product Updated", {
            description: `Product was updated successfully!`,
          });
        },
      },
    );
  };

  const handleDeleteConfirm = async () => {
    if (!deleteId) return;
    deleteMutation.mutate(deleteId, {
      onSuccess: () => {
        setProducts((prev) => prev.filter((p) => p.id !== deleteId));
        setDeleteId(null);
        toast.success("Product Deleted", {
          description: `Product was deleted successfully!`,
        });
      },
    });
  };

  const filteredProducts = useMemo(() => {
    return products?.filter((p) =>
      `${p?.title} ${p?.category}`
        ?.toLowerCase()
        ?.includes(debouncedSearchTerm?.toLowerCase()?.trim()),
    );
  }, [products, debouncedSearchTerm]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="bg-white shadow-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
                <Package className="h-8 w-8 text-white" />
              </div>
              <div className="ml-4">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Product Dashboard
                </h1>
                <p className="text-gray-500 text-sm">
                  Manage your inventory with ease
                </p>
              </div>
            </div>
            <Button
              variant="gradient"
              icon={<Plus className="h-4 w-4" />}
              onClick={() => {
                setDialog({ open: true, mode: "add" });
              }}
            >
              Add Product
            </Button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-50">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search products by name or category..."
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  // value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {queryLoading(productsQuery) ? (
            <ProductSkeleton />
          ) : productsQuery.isError ? (
            <div className="text-center col-span-full py-16">
              <div className="p-4 bg-gradient-to-r from-red-100 to-pink-100 rounded-full w-24 h-24 mx-auto mb-4">
                <AlertTriangle className="mx-auto h-16 w-16 text-red-600" />
              </div>
              <h3 className="mt-4 text-xl font-bold text-gray-900">
                Oops! Something went wrong
              </h3>
              <p className="mt-2 text-gray-600">
                We couldn’t load the products. Please check your connection and
                try again.
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
          ) : filteredProducts?.length === 0 ? (
            <div className="text-center col-span-full py-16">
              <div className="p-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full w-24 h-24 mx-auto mb-4">
                <Package className="mx-auto h-16 w-16 text-blue-600" />
              </div>
              <h3 className="mt-4 text-xl font-bold text-gray-900">
                No products found
              </h3>
              <p className="mt-2 text-gray-600">
                Try adjusting your search terms or filters to find what you're
                looking for.
              </p>
            </div>
          ) : (
            filteredProducts?.map((product) => (
              <ProductCard
                key={`product-${product?.id}`}
                product={product}
                handleDelete={(id) => setDeleteId(id)}
                handleEdit={(product: Product) => {
                  setDialog({ open: true, mode: "edit", product });
                }}
              />
            ))
          )}
        </div>
      </div>
      <Dialog
        open={dialog.open}
        onOpenChange={(open) => setDialog((d) => ({ ...d, open }))}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {dialog.mode === "add" ? "Add Product" : "Edit Product"}
            </DialogTitle>
          </DialogHeader>

          <ProductForm
            mode={dialog.mode}
            initialValues={dialog.product}
            onSubmit={dialog.mode === "add" ? handleAdd : handleEdit}
            loading={addMutation?.isPending || updateMutation?.isPending}
          />
        </DialogContent>
      </Dialog>
      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this product? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setDeleteId(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              loading={deleteMutation?.isPending}
              onClick={handleDeleteConfirm}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
