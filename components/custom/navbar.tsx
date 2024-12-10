"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ShoppingCart } from "lucide-react"; // Cart icon from lucide-react
import { Button } from "@/components/ui/button"; // Assuming a Button component

const Navbar = ({
  cartCount,
  onCartClick,
}: {
  cartCount: number;
  onCartClick: () => void;
}) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        scrolled ? "bg-white text-black shadow-md" : "bg-transparent text-white"
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center justify-center gap-2">
          <Image src="/logo.png" height={50} alt="Druk Photo Logo" width={50} />
          <a href="#" className="text-lg font-semibold">
            Druk Photo
          </a>
        </div>
        <div className="flex space-x-6 items-center">
          <a href="#home" className="hover:underline">
            Home
          </a>
          <a href="#explore" className="hover:underline">
            Explore
          </a>
          {/* Cart icon section */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              className="relative rounded-full"
              onClick={onCartClick} // Trigger onCartClick to open the cart sheet
            >
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-[#48BEB7] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
