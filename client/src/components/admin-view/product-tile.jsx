import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

function AdminProductTile({
  product,
  setFormData,
  setOpenCreateProductsDialog,
  setCurrentEditedId,
  handleDelete,
}) {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <div>
        <div className="relative">
          <img
            src={product?.image || "/default-product.jpg"} // ✅ Fallback image
            alt={product?.title || "Product Image"}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
        </div>
        <CardContent>
          <h2 className="text-xl font-bold mb-2 mt-2">{product?.title}</h2>
          
         
        </CardContent>
        <CardFooter className="flex justify-between items-center gap-2">
          <Button
            onClick={() => {
              setOpenCreateProductsDialog(true);
              setCurrentEditedId(product?._id);
              setFormData(product);
            }}
          >
            Edit
          </Button>
          <Button variant="destructive" onClick={() => handleDelete(product?._id)}>
            Delete
          </Button>
         
        </CardFooter>
      </div>
    </Card>
  );
}

export default AdminProductTile;
