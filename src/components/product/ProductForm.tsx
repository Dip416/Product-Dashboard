import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";

// ✅ Validation Schema
const schema = yup.object({
  id: yup.number().notRequired().nullable().optional(),
  title: yup.string().required("Title is required"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .positive("Price must be positive")
    .required("Price is required"),
  description: yup.string().optional(),
  category: yup.string().required("Category is required"),
  image: yup
    .string()
    .url("Must be a valid URL")
    .required("Image URL is required"),
});

type ProductFormValues = yup.InferType<typeof schema>;

interface ProductFormProps {
  mode: "add" | "edit";
  initialValues?: Partial<ProductFormValues>;
  onSubmit: (values: ProductFormValues) => void;
  loading?: boolean;
}

export default function ProductForm({
  mode,
  initialValues,
  onSubmit,
  loading = false,
}: ProductFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      price: 0,
      category: "",
      image: "",
    },
  });

  useEffect(() => {
    if (mode === "edit" && initialValues) {
      reset({
        id: initialValues?.id || null,
        title: initialValues?.title || "",
        price: initialValues?.price || 0,
        category: initialValues?.category || "",
        image: initialValues?.image || "",
        description: initialValues?.description || "",
      });
    } else if (mode === "add") {
      reset({
        title: "",
        price: 0,
        category: "",
        image: "",
        description: "",
      });
    }
  }, [mode, initialValues, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Title */}
      <div className="space-y-2">
        <Label required htmlFor="title">
          Title
        </Label>
        <Input id="title" placeholder="Product title" {...register("title")} />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}
      </div>

      {/* Price */}
      <div className="space-y-2">
        <Label required htmlFor="price">
          Price
        </Label>
        <Input
          id="price"
          type="number"
          step="0.01"
          placeholder="12.99"
          {...register("price")}
        />
        {errors.price && (
          <p className="text-red-500 text-sm">{errors.price.message}</p>
        )}
      </div>

      {/* Category */}
      <div className="space-y-2">
        <Label required htmlFor="category">
          Category
        </Label>
        <Input
          id="category"
          placeholder="e.g. Women's clothing"
          {...register("category")}
        />
        {errors.category && (
          <p className="text-red-500 text-sm">{errors.category.message}</p>
        )}
      </div>

      {/* Image */}
      <div className="space-y-2">
        <Label required htmlFor="image">
          Image URL
        </Label>
        <Input
          id="image"
          placeholder="https://example.com/image.png"
          {...register("image")}
        />
        {errors.image && (
          <p className="text-red-500 text-sm">{errors.image.message}</p>
        )}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Write product description..."
          className="min-h-[100px]"
          {...register("description")}
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}
      </div>

      <Button type="submit" loading={loading} className="w-full">
        {mode === "add" ? "Submit" : "Save"}
      </Button>
    </form>
  );
}
