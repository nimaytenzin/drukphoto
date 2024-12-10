"use client";

import { useState } from "react";
import { Masonry } from "react-plock";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Navbar from "@/components/custom/navbar";
import Header from "@/components/custom/header";
import { photos } from "./photos";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tabs, TabsTrigger } from "@/components/ui/tabs";
import { TabsList } from "@radix-ui/react-tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface Photo {
  src: string;
  title: string;
  author?: string;
  description?: string;
}

export interface CartItem {
  id: number;
  title: string;
  src: string;
  price: number;
  quantity: number;
}

export default function Home() {
  const { toast } = useToast();

  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State for dialog visibility
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState(0);

  const [isCheckoutDialogOpen, setCheckoutDailogOpen] = useState(false);

  const handleCheckoutDialogOpen = () => {
    setCheckoutDailogOpen(true);
  };

  const handleCheckoutDialogClose = () => {
    setCheckoutDailogOpen(false);
  };

  const handleCartClick = () => {
    setIsSheetOpen(true);
  };

  const handlePhotoClick = (photo: Photo) => {
    setSelectedPhoto(photo);
    setIsDialogOpen(true);
  };

  const addToCart = (photo: Photo) => {
    // Check if the item is already in the cart
    const existingItem = cartItems.find((item) => item.title === photo.title);

    if (existingItem) {
      // If item is already in the cart, show a toast with a message
      toast({
        title: "Item already in cart",
        description: "This item is already added to your cart.",
        action: (
          <ToastAction
            altText="Go to Cart"
            onClick={() => setIsSheetOpen(true)}
          >
            View Cart
          </ToastAction>
        ),
      });
    } else {
      // If item is not in the cart, add it to the cart
      const newItem: CartItem = {
        id: Date.now(),
        title: photo.title,
        src: photo.src,
        price: 250,
        quantity: 1,
      };

      setCartItems((prev) => {
        const updatedCart = [...prev, newItem];
        setCartCount(updatedCart.length); // Update cart count
        return updatedCart;
      });

      toast({
        title: "Success",
        description: "The item has been added to the cart",
        action: (
          <ToastAction
            altText="Go to Cart"
            onClick={() => setIsSheetOpen(true)}
          >
            Check Out
          </ToastAction>
        ),
      });
    }
  };

  const removeFromCart = (id: number) => {
    setCartItems((prev) => {
      const updatedCart = prev.filter((item) => item.id !== id);
      setCartCount(updatedCart.length); // Update cart count
      return updatedCart;
    });
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handlePlaceOrder = () => {
    toast({
      title: "Order Placed",
      description: "The sales team will contact you shortly.",
      className: "bg-[#48BEB6] text-white border-none",
    });

    setCartItems([]);

    setCartCount(0);
    handleCheckoutDialogClose();
    setIsSheetOpen(false);
    setIsDialogOpen(false);
  };

  return (
    <>
      <Navbar cartCount={cartCount} onCartClick={handleCartClick} />
      <Header />

      <div className="flex flex-col items-center justify-center mt-4">
        <div className="flex justify-end my-8">
          <Tabs defaultValue="account" className="w-[400px]">
            <TabsList>
              <TabsTrigger value="editorsChoice">Editors Choice</TabsTrigger>
              <TabsTrigger value="popular">Popular</TabsTrigger>
              <TabsTrigger value="mostSold">Most Sold</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div style={{ width: "80vw" }}>
          <Masonry
            items={photos}
            config={{
              columns: [1, 2, 3],
              gap: [24, 12, 6],
              media: [640, 768, 1024],
            }}
            render={(item, idx) => (
              <div
                key={idx}
                className="relative group cursor-pointer"
                onClick={() => handlePhotoClick(item)}
              >
                <img
                  src={item.src}
                  alt={item.title}
                  style={{ width: "100%", height: "auto" }}
                />

                {/* Title and Author */}
                <div className="absolute bottom-4 left-0 bg-black bg-opacity-20 text-white text-sm flex justify-between w-full px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-100">
                  <p className="text-sm">{item.title}</p>
                  <p>{item.author}</p>
                </div>
              </div>
            )}
          />
        </div>
      </div>
      {selectedPhoto && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-4xl w-full p-0">
            <div className="flex h-[80vh]">
              {/* Left: Photo */}
              <div className="w-2/3 bg-black flex items-center justify-center">
                <img
                  src={selectedPhoto.src}
                  alt={selectedPhoto.title}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="w-1/3 p-6 flex flex-col justify-between">
                <DialogHeader>
                  <DialogTitle className="text-lg font-semibold">
                    {selectedPhoto.title}
                  </DialogTitle>
                  <p className="text-sm text-gray-500 mb-4">
                    By {selectedPhoto.author}
                  </p>
                </DialogHeader>

                <div className="flex-grow overflow-y-auto mt-4">
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-gray-200 text-gray-600 rounded-full text-sm">
                        Landscape
                      </span>
                      <span className="px-3 py-1 bg-gray-200 text-gray-600 rounded-full text-sm">
                        Dzongs
                      </span>
                      <span className="px-3 py-1 bg-gray-200 text-gray-600 rounded-full text-sm">
                        Paro
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-700 text-sm">
                    <strong>License and Usage Terms for this Photo</strong>
                    <br />
                    <br />
                    <strong>Allowed Uses:</strong>
                    <ul className="list-disc pl-4">
                      <li>
                        <strong>Personal Use:</strong> You may use this photo
                        for personal, non-commercial projects such as
                        wallpapers, social media posts, and personal blogs.
                      </li>
                      <li>
                        <strong>Commercial Use:</strong> This photo can be used
                        for commercial purposes such as marketing materials,
                        websites, advertisements, or print media, provided it is
                        not resold or redistributed in its original form.
                      </li>
                    </ul>
                    <br />
                    <strong>Prohibited Uses:</strong>
                    <ul className="list-disc pl-4">
                      <li>
                        Reselling, sublicensing, or redistributing this photo in
                        its original, unaltered form.
                      </li>
                      <li>
                        Using this photo in projects that promote illegal,
                        defamatory, or offensive content.
                      </li>
                      <li>
                        Incorporating the photo into trademarks, logos, or
                        branding without prior written consent.
                      </li>
                    </ul>
                    <br />
                    <strong>Attribution:</strong> No attribution is required,
                    but it is appreciated if credit is given to the author for
                    editorial or personal uses.
                    <br />
                    <br />
                    <strong>License Coverage:</strong> This license grants
                    non-exclusive, worldwide usage rights for the photo. This
                    license is perpetual, meaning there is no expiration for its
                    use, provided terms are adhered to.
                    <br />
                    <br />
                    <strong>Contact for Extended Licensing:</strong> For
                    high-volume commercial projects, redistribution rights, or
                    exclusive usage, please contact us at
                    <strong>support@drukphoto.com</strong> for an extended
                    license.
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <p className="text-xl font-semibold text-gray-800">Nu. 250</p>
                  {cartItems.find(
                    (item) => item.title === selectedPhoto?.title
                  ) ? (
                    // If the item is already in the cart, show the text
                    <p className="text-sm text-gray-500">
                      Item already in cart
                    </p>
                  ) : (
                    // If the item is not in the cart, show the "Add to Cart" button
                    <Button
                      className="bg-[#48BEB7]"
                      onClick={() => {
                        addToCart(selectedPhoto);
                        // Optionally close the dialog if needed
                        // setIsDialogOpen(false);
                      }}
                    >
                      <ShoppingBag /> Add to Cart
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* //cart */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent side="right" className="w-[400px]">
          <SheetHeader>
            <SheetTitle>Shopping Cart</SheetTitle>
            <SheetDescription>
              Review the items in your cart before proceeding to checkout.
            </SheetDescription>
          </SheetHeader>
          <div className="mt-4">
            {cartItems.length > 0 ? (
              <>
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center border-b pb-2"
                    >
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-gray-500">
                          Nu. {item.price}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>

                {/* Total Price and Checkout */}
                <div className="mt-6 border-t pt-4">
                  <div className="flex justify-between">
                    <p className="font-medium">Total</p>
                    <p className="font-semibold">Nu. {calculateTotal()}</p>
                  </div>
                  <Button
                    className="w-full mt-4"
                    onClick={handleCheckoutDialogOpen}
                  >
                    Proceed to Checkout
                  </Button>

                  <Dialog
                    open={isCheckoutDialogOpen}
                    onOpenChange={setCheckoutDailogOpen}
                  >
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Checkout</DialogTitle>
                        <DialogDescription>
                          Fill out the details below to proceed with the
                          checkout.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="flex flex-col justify-end items-end ">
                          <p className="font-medium">Total</p>
                          <p className="font-semibold">
                            Nu. {calculateTotal()}
                          </p>
                        </div>
                        <div>
                          <Label htmlFor="name" className="text-right">
                            Name
                          </Label>
                          <Input type="text" id="name" />
                        </div>
                        <div>
                          <Label htmlFor="email" className="text-right">
                            Email
                          </Label>
                          <Input type="email" />
                        </div>
                        <div>
                          <Label htmlFor="phoneNumber" className="text-right">
                            Phone Number
                          </Label>
                          <Input id="phoneNumber" type="tel" />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit" onClick={handlePlaceOrder}>
                          Place Order
                        </Button>
                        <Button
                          variant="outline"
                          onClick={handleCheckoutDialogClose}
                        >
                          Cancel
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </>
            ) : (
              <p className="text-gray-500 text-sm">Your cart is empty.</p>
            )}
          </div>
        </SheetContent>
      </Sheet>
      <Toaster />
    </>
  );
}
