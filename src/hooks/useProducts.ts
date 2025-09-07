import { useQuery, useMutation } from "@tanstack/react-query";
import type { Product } from "@/types/productType";
import { PRODUCT } from "@/services/product.services";

export function useProducts() {
  const productsQuery = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await PRODUCT.getAll();
      return data;
    },
  });

  const addMutation = useMutation({
    mutationFn: (product: Omit<Product, "id">) => PRODUCT.add(product),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, product }: { id: number; product: Partial<Product> }) =>
      PRODUCT.update(id, product),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => PRODUCT.remove(id),
  });

  return {
    productsQuery,
    addMutation,
    updateMutation,
    deleteMutation,
    products: productsQuery?.data,
  };
}
