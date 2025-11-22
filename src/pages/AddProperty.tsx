import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Upload, X } from "lucide-react";

const formSchema = z.object({
  category: z.string().min(1, "Category is required"),
  subcategory: z.string().min(1, "Subcategory is required"),
  name: z.string().min(1, "Property name is required"),
  originalPrice: z.string().min(1, "Original price is required"),
  discountedPrice: z.string().min(1, "Discounted price is required"),
  additionalInfo: z.string().optional(),
  dimensions: z.string().min(1, "Dimensions are required"),
  location: z.string().min(1, "Location is required"),
});

const AddProperty = () => {
  const [images, setImages] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([])
  const [removeImageIds, setRemoveImageIds] = useState<string[]>([])
  const [uploading, setUploading] = useState(false)
  const location = useLocation();
  const navigate = useNavigate();
  const property = (location.state as any)?.property;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: property?.category ?? "",
      subcategory: property?.subcategory ?? "",
      name: property?.name ?? "",
      originalPrice: property ? String(property.originalPrice) : "",
      discountedPrice: property ? String(property.discountedPrice) : "",
      additionalInfo: property?.additionalInfo ?? "",
      dimensions: property?.dimensions ?? "",
      location: property?.location ?? "",
    },
  });

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const files = Array.from(e.target.files)
    setImages(files)
    const localPreviews = files.map((f) => URL.createObjectURL(f))
    setPreviews(localPreviews)
    try {
      setUploading(true)
      const apiBase = "http://65.1.55.93:4000/api"
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
      const results: string[] = []
      for (const f of files) {
        const fd = new FormData()
        fd.append('file', f)
        const res = await fetch(`${apiBase}/uploads`, {
          method: 'POST',
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
          body: fd,
        })
        if (!res.ok) {
          toast.error("Image upload failed")
          continue
        }
        const data = await res.json()
        if (data?.url) results.push(String(data.url))
      }
      setUploadedUrls((prev) => Array.from(new Set([...prev, ...results])))
      if (results.length) toast.success(`${results.length} image(s) uploaded`)
      // clear previews after successful upload to avoid duplicate visual tiles
      setPreviews([])
    } catch {
      toast.error("Upload error")
    } finally {
      setUploading(false)
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const apiBase = "http://65.1.55.93:4000/api"
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
      const existingImages = Array.isArray(property?.images) ? property.images : []
      const keptExisting = existingImages.filter((img: any) => {
        const id = typeof img === 'object' ? String(img._id || '') : ''
        return id ? !removeImageIds.includes(id) : true
      })
      const payload = {
        category: values.category,
        subcategory: values.subcategory,
        name: values.name,
        location: values.location,
        originalPrice: Number(values.originalPrice),
        discountedPrice: Number(values.discountedPrice),
        dimensions: values.dimensions,
        additionalInfo: values.additionalInfo || undefined,
        images: [...keptExisting, ...uploadedUrls.map((url) => ({ url }))],
        ...(property?._id && removeImageIds.length ? { removeImageIds } : {}),
      }
      const url = `${apiBase}/properties${property?._id ? `/${property._id}` : ''}`
      const res = await fetch(url, {
        method: property?._id ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        toast.error("Failed to save property")
        return
      }
      toast.success(property?._id ? "Property updated successfully!" : "Property added successfully!")
      navigate('/properties')
    } catch {
      toast.error("Request failed")
    }
  };

  return (
    <div className="py-6 md:py-10 px-0">
      <Card className="shadow-lg border border-gray-200">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Property Details</CardTitle>
          <CardDescription>Enter all required information about the property</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* GRID FORM */}
              <div className="grid gap-8 sm:grid-cols-2">
                {/* CATEGORY */}
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem className="text-left">
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Off Plan Property">Off Plan Property</SelectItem>
                          <SelectItem value="Buy Property">Buy Property</SelectItem>
                          <SelectItem value="Rent Property">Rent Property</SelectItem>
                          <SelectItem value="International Properties">International Properties</SelectItem>
                          <SelectItem value="Ready To Move In">Ready To Move In</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* SUBCATEGORY */}
                <FormField
                  control={form.control}
                  name="subcategory"
                  render={({ field }) => (
                    <FormItem className="text-left">
                      <FormLabel>Subcategory</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select subcategory" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="apartment">Apartment</SelectItem>
                          <SelectItem value="villa">Villa</SelectItem>
                          <SelectItem value="office">Office</SelectItem>
                          <SelectItem value="retail">Retail</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* NAME */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="text-left">
                      <FormLabel>Property Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter property name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* LOCATION */}
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem className="text-left">
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter location" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* ORIGINAL PRICE */}
                <FormField
                  control={form.control}
                  name="originalPrice"
                  render={({ field }) => (
                    <FormItem className="text-left">
                      <FormLabel>Original Price</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Enter original price" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* DISCOUNTED PRICE */}
                <FormField
                  control={form.control}
                  name="discountedPrice"
                  render={({ field }) => (
                    <FormItem className="text-left">
                      <FormLabel>Discounted Price</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Enter discounted price" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* DIMENSIONS */}
                <FormField
                  control={form.control}
                  name="dimensions"
                  render={({ field }) => (
                    <FormItem className="text-left">
                      <FormLabel>Dimensions</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 1500 sq ft" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* ADDITIONAL INFO */}
              <FormField
                control={form.control}
                name="additionalInfo"
                render={({ field }) => (
                  <FormItem className="text-left">
                    <FormLabel>Additional Information</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter any additional details about the property"
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* IMAGES */}
              <div className="text-left">
                <FormLabel>Property Images</FormLabel>
                <div className="mt-3 border-2 border-dashed border-gray-300 rounded-lg p-10 text-center hover:border-primary transition-all">
                  <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <div className="space-y-2">
                    <label htmlFor="images" className="cursor-pointer font-medium text-primary hover:underline">
                      Click to upload
                    </label>
                    <p className="text-xs text-gray-500">PNG, JPG, WEBP up to 10MB</p>
                  </div>
                  <Input
                    id="images"
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </div>
                {/* Existing images (edit mode) */}
                {Array.isArray((location.state as any)?.property?.images) && (location.state as any)?.property?.images.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-700">Existing Images</p>
                    <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {((location.state as any)?.property?.images as any[]).map((img, idx) => {
                        const src = typeof img === 'string' ? img : img?.url
                        if (!src) return null
                        const id = typeof img === 'object' ? String(img._id || '') : ''
                        const removed = id && removeImageIds.includes(id)
                        return (
                          <div key={`existing-${idx}`} className={`relative w-full h-32 rounded overflow-hidden border ${removed ? 'opacity-40' : ''}`}>
                            <img src={String(src)} alt={`existing-${idx}`} className="w-full h-full object-cover" />
                            {id && (
                              <button type="button" className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1" onClick={() => {
                                setRemoveImageIds((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])
                              }}>
                                <X className="h-4 w-4" />
                              </button>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
                {previews.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {previews.map((src, idx) => (
                      <div key={idx} className="relative w-full h-32 rounded overflow-hidden border">
                        <img src={src} alt={`preview-${idx}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                )}
                {uploadedUrls.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-500">{uploading ? 'Uploading...' : `${uploadedUrls.length} image(s) uploaded`}</p>
                    <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {uploadedUrls.map((src, idx) => (
                        <div key={idx} className="relative w-full h-32 rounded overflow-hidden border">
                          <img src={src} alt={`uploaded-${idx}`} className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Button type="submit" className="w-full md:w-auto px-8 py-3 text-md">
                {property ? "Update Property" : "Add Property"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddProperty;