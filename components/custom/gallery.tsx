import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@radix-ui/react-dialog";
import { Heart, ShoppingBag } from "lucide-react";
import { Masonry } from "react-plock";
import { DialogHeader } from "../ui/dialog";
import { photos } from "@/app/photos";

const MasonryGallery = () => {
  return (
    <div className="flex justify-center mt-12">
      <div style={{ width: "80vw" }}>
        <Masonry
          items={photos}
          config={{
            columns: [1, 2, 3],
            gap: [24, 12, 6],
            media: [640, 768, 1024],
          }}
          render={(item, idx) => (
            <Dialog>
              <DialogTrigger asChild>
                <div className="relative group cursor-pointer">
                  <img
                    key={idx}
                    src={item.src}
                    style={{ width: "100%", height: "auto" }}
                    alt={item.title}
                  />

                  {/* Add to Cart Button */}
                  <div className="absolute flex w-full bg-black bg-opacity-5 justify-between px-4 top-2 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Heart
                      size={20}
                      strokeWidth={1.25}
                      color="#FCF9EA"
                      className="hover:text-red-600"
                    />
                    <ShoppingBag
                      size={20}
                      strokeWidth={1.25}
                      color="#FCF9EA"
                      className="hover:text-red-600"
                    />
                  </div>

                  {/* Title and Author */}
                  <div className="absolute bottom-4 left-0 bg-black bg-opacity-20 text-white text-sm flex justify-between w-full px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-100">
                    <p className="text-sm">{item.title}</p>
                    <p>{item.author}</p>
                  </div>
                </div>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{item.title}</DialogTitle>
                  <DialogDescription>
                    Captured by {item.author}
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          )}
        />
      </div>
    </div>
  );
};

export default MasonryGallery;
