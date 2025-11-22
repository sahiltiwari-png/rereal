import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, Plus, MapPin, Image as ImageIcon, Ruler } from "lucide-react";
import { Link } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

type ImageObj = { url: string }
type PropertyItem = {
  _id: string
  category: string
  subcategory: string
  name: string
  location: string
  originalPrice: number
  discountedPrice: number
  dimensions: string
  additionalInfo?: string
  images?: ImageObj[]
}

const Properties = () => {
  const [properties, setProperties] = useState<PropertyItem[]>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const base = "http://65.1.55.93:4000/api"
        const res = await fetch(`${String(base).replace(/\/$/, '')}/properties`)
        if (res.ok) {
          const data = await res.json()
          setProperties(Array.isArray(data) ? data : [])
        }
      } catch {}
    }
    load()
  }, [])

  const handleDelete = () => {
    if (selectedProperty) {
      setProperties(properties.filter((p) => p.id !== selectedProperty.id));
      toast({
        title: "Property Deleted",
        description: `${selectedProperty.name} has been removed successfully.`,
        variant: "destructive",
      });
      setDeleteDialogOpen(false);
      setSelectedProperty(null);
    }
  };

  const handleEdit = (property) => {
    navigate("/properties/add", { state: { property } });
  };

  const openDeleteDialog = (property) => {
    setSelectedProperty(property);
    setDeleteDialogOpen(true);
  };

  return (
    <div className="py-4 md:py-8 px-3 md:px-0 animate-fade-in">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h1 className="text-2xl sm:text-3xl font-bold">Properties</h1>
        <Link to="/properties/add" className="w-full sm:w-auto">
          <Button className="w-full sm:w-auto gap-2 shadow-md hover:shadow-lg">
            <Plus className="h-4 w-4" /> Add New Property
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <Card
            key={property._id}
            className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border bg-white"
          >
            {/* Image */}
            <div className="relative h-56 w-full overflow-hidden">
              <img
                src={property.images && property.images[0] ? property.images[0].url : "/applog-min.webp"}
                alt={property.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Image Count */}
              {property.images && property.images.length > 1 && (
                <div className="absolute top-3 right-3 bg-black/60 text-white px-3 py-1 rounded-full text-xs flex items-center gap-1">
                  <ImageIcon className="h-3 w-3" /> +{property.images.length - 1}
                </div>
              )}
            </div>

            <CardContent className="p-5 text-left">
              {/* Category / Subcategory */}
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge variant="secondary">{property.category}</Badge>
                <Badge variant="outline">{property.subcategory}</Badge>
              </div>
              {/* Price */}
              <div className="text-xl font-bold mb-2 text-gray-900">
                AED {property.originalPrice.toLocaleString()}
              </div>

              {/* Name */}
              <div className="text-lg font-semibold text-gray-800 mb-1">
                {property.name}
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                <Ruler className="h-4 w-4" /> {property.dimensions}
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 text-gray-600 text-sm mb-4">
                <MapPin className="h-4 w-4" /> {property.location}
              </div>

              {/* Buttons */}
              <div className="flex gap-2 mt-4">
                <Button
                  variant="outline"
                  className="flex-1 gap-2"
                  onClick={() => handleEdit(property)}
                >
                  <Pencil className="h-4 w-4" /> Edit
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => openDeleteDialog(property)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Delete Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete
              <span className="font-semibold"> {selectedProperty?.name}</span>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 text-white">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Properties;
