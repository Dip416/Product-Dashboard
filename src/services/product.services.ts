import AXIOS from "@/axios/axiosClient";
import type { Product } from "@/types/productType";

export const PRODUCT = {
  getAll: () => AXIOS.get<Product[]>("/products"),
  getByCategory: (category: string) =>
    AXIOS.get<Product[]>(`/products/category/${category}`),
  add: (product: Omit<Product, "id">) =>
    AXIOS.post<Product>("/products", product),
  update: (id: number, product: Partial<Product>) =>
    AXIOS.put<Product>(`/products/${id}`, product),
  remove: (id: number) => AXIOS.delete(`/products/${id}`),
};
